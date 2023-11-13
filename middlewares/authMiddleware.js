import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import usrModel from '../models/usrModel.js';




dotenv.config();
export const requireSignin = async(req,res,next) => {
    try{

        console.log(req.headers.authorization);

          if (!req.headers.authorization) {
            return res.status(401).json({ error: "JWT must be provided" });
         }


        const decode = jwt.verify(
                       req.headers.authorization,
                       process.env.JWT_SECRET
                       )

        req.user = decode;
        next();

    }catch(error){
      console.log(error)
    }

}

export const isAdmin = async(req,res,next) =>{

    try{
        const user = await usrModel.findById(req.user._id);
        if(user.role !== 1)
        {
            return res.status(401).send({
                message : 'Unauthorized access',
                success : false
            })

        }
        else {
            next();
        }

    }
    catch(error)
    {
        console.log(error);

         return res.status(401).send({
                message : error,
                success : false
            })
    }

}