import express from 'express';
import {requireSignin, isAdmin} from '../middlewares/authMiddleware.js';
import { createtransactionController, deletetransactionController, transactionController} from '../controllers/transactionController.js';

const router = express.Router()

router.post('/create-transaction', createtransactionController);

//router.put('/update-transaction/:id', UpdatetransactionController);

router.get('/transaction',transactionController);

//router.get('/single-transaction/:id',singletransactionController);

router.delete('/delete/:id', deletetransactionController)


export default router;


