import React from 'react';
import usrModel from '../models/usrModel.js';
import dotenv from "dotenv";
import {comparePassword, hashPassword} from '../helpers/authHelper.js';
import jwt from 'jsonwebtoken';

  //  import User from '../models/usrModel.js'; // Make sure the import path is correct


export const registerController = async(req,res) => {
 
   // console.log(req);
    try{
        

        const {name,email,password,phone,address,question,role} = req.body;

        

        if(!name)
        {
           return  res.send({message : "Name is required"});
        }
         if(!email)
        {
           return  res.send({message :"Email is required"});
        }
         if(!password)
        {
           return  res.send( {message :"Password is required"});
        }
         if(!phone)
        {
           return  res.send( {message :"Phone is required"});
        }
         if(!address)
        {
           return  res.send( {message :"Address is required"});
        }
          if(!question)
        {
           return  res.send( {message :"Question is required"});
        }

        //check for existing user
        const existinguser = await usrModel.findOne({email})

        if(existinguser)
        {
            return res.status(200).send({
                success : true,
                message : "User already exists. Please login"
            })
        }

        const hashedPassword = await hashPassword(password);
        if(role)
       { const user= await new usrModel({name,email,phone,address,password:hashedPassword,question,role}).save();
         res.status(201).send({
            succes:true,
            message : "User registered successfully",
            user
        })
    
    }
       else  {const user= await new usrModel({name,email,phone,address,password:hashedPassword,question}).save();
         res.status(201).send({
            succes:true,
            message : "User registered successfully",
            user
        })
    
    }



    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in registration',

        })
    }


}

export const loginController = async(req,res) =>{

    dotenv.config();

    try{
  
       const{email,password} = req.body;

          if(!email || !password)
        {
           return res.status(404).send({
            succes: false,
            message : 'Invalid username or Password'
           })
        }

        const user = await usrModel.findOne({email});

        if( ! user)
        {
          return res.status(404).send({
            succes: false,
            message : 'This user doesnt exist, Please sign up'
           })
        }

        const match = await comparePassword(password, user.password);
        if( ! match)
        {
             return res.status(200).send({
            succes: false,
            message : 'Invalid Password'
           })
        }

        const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET, { expiresIn : "7d" });


        res.status(200).send({
            success : true,
            message : "login successfully",
            user : {
                name : user.name,
                email : user.email,
                phone : user.phone,
                address : user.address,
                role : user.role,
                id : user._id
            }
        ,token})
        

    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in Log in',

        })
    }

}

export const testController = (req,res) => {
   res.send('Protected routes');
}

export const forgotPasswordController = async(req,res) =>{

    try{
        const{email, question, password} = req.body;
        console.log(email,question,password);

           if(!email)
        {
           return res.status(400).send({message :"Email is required"});
        }
         if(!password)
        {
           return res.status(400).send( {message :"New Password is required"});
        }
         if(!question)
        {
           return  res.status(400).send( {message :"Question is required"});
        }
        
        const user = await usrModel.findOne({email});

           if( ! user)
        {
          return res.status(404).send({
            succes: false,
            message : 'This user doesnt exist, Please sign up'
           })
        }

         const hashedPassword = await hashPassword(password);
      
        await usrModel.findByIdAndUpdate(user._id,{password : hashedPassword});

        res.status(200).send({
            succes:true,
            message : "Password reset successfully",
            
        })

    }
    catch(e){
           console.log(e);
           res.status(500).send({
            success : false,
            message : 'Error in Log in',

        })
    }



}




