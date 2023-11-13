import React from 'react';
import transactionModel from '../models/transactionModel.js';
import dotenv from "dotenv";
import slugify from 'slugify';
import jwt from 'jsonwebtoken';


export const createtransactionController = async (req, res) => {

    try {
     // console.log(req);
        const { name, amount, Txntype,user } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required!',
            });
        }

        if (!amount) {
            return res.status(400).json({
                success: false,
                message: 'Amount is required!',
            });
        }

        if (Txntype === null) {
            return res.status(400).json({
                success: false,
                message: 'Type of expense is required!',
            });
        }

        // If all validations pass, create the transaction
        const transaction = await transactionModel({
            name,
            amount,
            Txntype,
            slug: slugify(name),
            user: user
        }).save();

        return res.status(201).json({
            success: true,
            message: 'Transaction created',
            transaction,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Error in saving transaction, please retry',
            error: e,
        });
    }
};


export const UpdatetransactionController = async(req,res) =>{
    try{
        const {name} = req.body;
        const {id} = req.params;
        const transaction =  await transactionModel.findByIdAndUpdate(id,
             {name , slug : slugify(name)}, 
             {new:true}
             )

        return res.status(200).send({
                success : true,
                message :'transaction updated successfully',
                transaction
            });

    }catch(e)
    {
         console.log(e);
      res.status(500).send({
        message : 'Error in transaction',
        e,
        success : false
      }) 
    }
}

export const transactionController = async (req,res) =>{
      
       
    try{
  
        // const userID = req.query;
        console.log('req.query:',req.query);

        const userId = req.query.userID;
        console.log(userId);

        const transaction = await transactionModel.find({user : userId  });
        res.status(200).send({
        message : 'Succes, fetched all the transactions',
        success : true,
        transaction
      }) 


    }catch(e)
    {
        console.log(e);
        res.status(500).send({
        message : 'Error getting all the transactions',
        e,
        success : false
      }) 
    }
}

export const singletransactionController = async(req,res) =>{
    try{
         const {id} = req.params;
         const transaction = await transactionModel.findOne({slug : id});
           res.status(200).send({
           message : 'Get single transaction success',
        success : true,
        transaction
      }) 

    }catch(e)
    {
        console.log(e);
        res.status(500).send({
        message : 'Error in fetching transaction',
        e,
        success : false
      }) 
    }
}

export const deletetransactionController = async(req,res) =>{

    try{
        const{id} = req.params;
        console.log(id);
        await transactionModel.findByIdAndDelete(id);

         res.status(200).send({
        message : 'Success, deleted transaction successfully',
        success : true,
       
      }) 

    }
    catch(e)
    {
         console.log(e);
         res.status(500).send({
        message : 'Error in deleting this transaction',
        e,
        success : false
      }) 
    }
}
