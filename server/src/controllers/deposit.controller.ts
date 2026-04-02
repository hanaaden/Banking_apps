import {  Response } from "express";
import { CustomRequest } from "../types/customRequest";
import { pool } from "../config/db";
export const Deposit = async (req: CustomRequest , res: Response) => {
    try {
        const deposit = req.body.amount
        const userId = req.user?.id

        try {
            const result = await pool.query("INSERT INTO deposit (user_id , deposit_amount) VALUES ($1 , $2) RETURNING *" , [userId , deposit]);
            const updateBalance = await pool.query("UPDATE users SET balance = balance + $1 WHERE user_id = $2" , [deposit , userId]);
            return res.status(201).json({message : "funds deposited successfully" , deposit : result.rows[0] ,  updated_deposit : updateBalance.rows[0]   } 
            );
        } catch (error) {
            return res.status(500).json({message : "error depositing funds"});
        }
    } catch (err) {
        return res.status(500).json({message : "error depositing funds"});
    }
}