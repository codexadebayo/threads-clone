import express  from "express";
import {signupUser, getUserProfile, updateUser, loginUser, logoutUser, followUnfollowUser} from '../controllers/userController.js'
import protectRoute from "../middlewears/protectRoute.js";

const router = express.Router()

router.get('/profile/:username', getUserProfile)
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/follow/:id',  protectRoute, followUnfollowUser)
router.put('/update/:id', protectRoute, updateUser)

router.get('/test', (req, res)=>{
     console.log(req.user);
    
})


export default router