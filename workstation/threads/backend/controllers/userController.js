import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndCookie.js";
import { v2 as cloudinary } from "cloudinary";

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.email,
        bio: newUser.bio,
        profilePic: newUser.profilePic
      });
    } else {
      res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in signupUser:", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password || ""
    );
    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid credentials" });
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log("error in loginUser", err.message);
  }
};
const logoutUser = (req, res) => {
  try {
    res.cookie("jwtToken", "", { maxAge: 1 });
    res.status(200).json({ message: "user logged out successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in logoutUser", err.message);
  }
};
const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (id === req.user._id.toString())
      return res.status(400).json({ error: "Invalid action" });
    if (!userToModify || !currentUser)
      return res.status(400).json({ error: "User does not exist" });
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "successfully unfollowed user" });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "successfully followed user" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in followUnfollowUser", err.message);
  }
};
const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let {profilePic} = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "unauthorized" });
    if(req.params.id !== userId.toString()) return res.status(400).json({error: "unauthorized access"})
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    if (profilePic){
      if(user.profilePic){
        await cloudinary.uploader.destroy(user.profilePic.split('/').pop().split(".")[0]);
      }
      const uploadedResponse = await cloudinary.uploader.upload(profilePic);
      profilePic = uploadedResponse.secure_url;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user = await user.save();
// protect user password by making it null
    user.password = null

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in updating User", err.message);
  }
};

const getUserProfile = async (req, res)=>{
  const {username} = req.params;
  try {
    const user = await User.findOne({username}).select("-password").select("-updatedAt");
    if (!user) return res.status(400).json({error: "User not found"});
    res.status(200).json(user);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in updating User", err.message);
    
  }

};
export { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile };
