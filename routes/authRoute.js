import express from 'express';
import {registerController,loginController,testController,forgotPasswordController} from '../controllers/authController.js';
import {requireSignin, isAdmin} from '../middlewares/authMiddleware.js';



const router = express.Router()

router.post('/register',registerController)

router.post('/login',loginController)

router.get('/test',requireSignin, isAdmin, testController)

router.post('/forgot-password',forgotPasswordController)

//protected User-route
router.get("/user-auth",requireSignin,(req,res)=>{
res.status(200).send({ok:true});
})

//protected Admin-route
router.get("/admin-auth",requireSignin, isAdmin,(req,res)=>{
res.status(200).send({ok:true});
})



export default router;