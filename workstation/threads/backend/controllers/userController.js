import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndCookie.js";

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: "user already exists" });
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
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in signupUser:", error.message);
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
      return res.status(400).json({ message: "Invalid credentials" });
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in loginUser", error.message);
  }
};
const logoutUser = (req, res) => {
  try {
    res.cookie("jwtToken", "", { maxAge: 1 });
    res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in logoutUser", error.message);
  }
};
const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (id === req.user._id.toString())
      return res.status(400).json({ message: "Invalid action" });
    if (!userToModify || !currentUser)
      return res.status(400).json({ message: "User does not exist" });
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({ message: "unfollowed user" });
    } else {
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({ message: "followed user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in followUnfollowUser", error.message);
  }
};
const updateUser = async (req, res) => {
  const { name, email, username, password, profilePic, bio } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "unauthorized" });
    if(req.params.id !== userId.toString()) return res.status(400).json({message: "unauthorized access"})
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.profilePic = profilePic || user.profilePic;
    user.bio = bio || user.bio;
    user = await user.save();
    res.status(200).json({ message: "Profile updated successfully"}, user.select("-password"));
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in updating User", error.message);
  }
};

const getUserProfile = async (req, res)=>{
  const {username} = req.params;
  try {
    const user = await User.findOne({username}).select("-password").select("-updatedAt");
    if (!user) return res.status(400).json({message: "User not found"});
    res.status(200).json(user);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("error in updating User", error.message);
    
  }

};
export { signupUser, loginUser, logoutUser, followUnfollowUser, updateUser, getUserProfile };
