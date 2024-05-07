import express from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
  likeUnlike,
} from "../controllers/postController.js";
import protectRoute from "../middlewears/protectRoute.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("", getAllPosts);
router.get("/:id", getPost);
router.delete("/:id", protectRoute, deletePost)
router.post("/likes/:id", protectRoute, likeUnlike)

export default router;
