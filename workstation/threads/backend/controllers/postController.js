import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
  //the createdBy field can be appended and verified without being passed directly by the user.
  try {
    const { postedBy, text, img } = req.body;
    if (!postedBy || !text) {
      return res.status(400).json({ message: "missing postedBy and or text" });
    }
    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user._id.toString() != req.user._id.toString())
      return res
        .status(401)
        .json({ message: "unauthorized to create post for another user" });
    const maxLength = 500;
    if (text.length > maxLength)
      return res
        .status(400)
        .json({ message: "post length should be less than 500 characters" });
    const newPost = new Post({
      postedBy,
      text,
      img,
    });
    await newPost.save();
    res.status(201).json({ message: "New post successfully created", newPost });
  } catch (error) {
    res.status(500).json({ message: "Error in createPost" });
    console.log(error);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Error in getting post" });
    console.log(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    if (posts.length === 0)
      return res.status(200).json({ message: "No posts yet" });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Error in getting all posts" });
    console.log(error);
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (req.user._id.toString() !== post.postedBy.toString())
      return res.status(401).json({ message: "unauthorized to delete post" });

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error in deleting post" });
    console.log(error);
  }
};

const likeUnlike = async (req, res) => {
  try {
    const {id:postId} = req.params
    const userId = req.user._id;
    const post = await Post.findById(postId);


    if (!post) return res.status(401).json({message: "post does not exist"});
    if (!userId) return res.status(401).json({message: "invalid user"})

    const userLikedPost = post.likes.includes(userId);
    if(userLikedPost){
      await Post.updateOne({_id: postId}, {$pull: {likes: userId}})
      res.status(200).json({message: "post unliked successfully"})

    } else{
      post.likes.push(userId)
      await post.save()
      res.status(200).json({message: "post liked successfully"})

    }


    
    
    //update the likes array with the user id
  




  } catch (error) {
    res.status(500).json({ message: "Error in likeUnlike" });
    console.log(error);
  }
};
export { createPost, getPost, getAllPosts, deletePost, likeUnlike };
