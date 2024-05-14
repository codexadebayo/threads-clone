import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import {v2 as cloudinary} from "cloudinary"

const createPost = async (req, res) => {
  //the createdBy field can be appended and verified without being passed directly by the user.
  try {
    const { postedBy, text} = req.body;
    let {img} = req.body
    if (!postedBy || !text) {
      return res.status(400).json({ error: "missing postedBy and or text" });
    }
    const user = await User.findById(postedBy);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user._id.toString() != req.user._id.toString())
      return res
        .status(401)
        .json({ error: "unauthorized to create post for another user" });
    const maxLength = 500;
    if (text.length > maxLength)
      return res
        .status(400)
        .json({ error: "post length should be less than 500 characters" });
      if(img){
        const uploadImg = await cloudinary.uploader.upload(img);
        img = uploadImg.secure_url;
      }
    const newPost = new Post({
      postedBy,
      text,
      img,
    });
    await newPost.save();
    res.status(201).json({ message: "New post successfully created", newPost });
  } catch (err) {
    res.status(500).json({ error: "Error in createPost" });
    console.log(err);
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "post not found" });
    }
    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ error: "Error in getting post" });
    console.log(err);
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({error: "User not found"})
    const following = user.following
    const feedPosts = await Post.find({postedBy: {$in: following }}).sort({createdAt: -1});
    res.status(200).json(feedPosts)
  } catch (err) {
    res.status(500).json({ error: "Error in getting feed" });
    console.log(err);
  }
};
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: "Post not found" });

    if (req.user._id.toString() !== post.postedBy.toString())
      return res.status(401).json({ error: "unauthorized to delete post" });

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error in deleting post" });
    console.log(err);
  }
};

const likeUnlike = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);

    if (!post) return res.status(401).json({ error: "post does not exist" });
    if (!userId) return res.status(401).json({ error: "invalid user" });

    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: "post unliked successfully" });
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: "post liked successfully" });
    }

    //update the likes array with the user id
  } catch (err) {
    res.status(500).json({ error: "Error in likeUnlike" });
    console.log(err);
  }
};

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const userProfilePic = req.user.profilePic;
    const username = req.user.username;

    if (!text) return res.status(400).json({ error: "text field is required"});
    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ error: "Post not found" });
    const reply = {userId, text, username, userProfilePic}; 
    post.replies.push(reply)
    res.status(200).json({message: "Reply sent successfully", post})
    await post.save()

  } catch (err) {
    res.status(500).json({ error: "Error in comment" });
    console.log(err);
  }
};
const getRandomPosts = async ()=>{
  try {
    const posts = await Post.find({});
    if (posts.length === 0)
      return res.status(200).json({ message: "No posts yet" });
    res.status(200).json({ posts });
  } catch (error) {
    
  }
}
export {
  createPost,
  getPost,
  getFeedPosts,
  deletePost,
  likeUnlike,
  replyToPost,
  getRandomPosts
};
