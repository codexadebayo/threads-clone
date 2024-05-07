import express from "express";
import {
  createPost,
  getFeedPosts,
  getPost,
  deletePost,
  likeUnlike,
  replyToPost
} from "../controllers/postController.js";
import protectRoute from "../middlewears/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/feed",protectRoute, getFeedPosts);
router.get("/:id", getPost);
router.delete("/:id", protectRoute, deletePost)
router.post("/likes/:id", protectRoute, likeUnlike)
router.post("/reply/:id", protectRoute, replyToPost)

export default router;
