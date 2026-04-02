import { Response } from "express";
import { CustomRequest } from "../types/customRequest";
import { pool } from "../config/db";
export const Withdrawal = async (req: CustomRequest , res: Response) => {
    try {
        const withdrawal = req.body.amount
        const userId = req.user?.id

        try {
             const balance = await pool.query("SELECT balance FROM users WHERE user_id = $1" , [req.user?.id]);
                if(balance.rows[0].balance < withdrawal){
                    return res.status(400).json({message : "insufficient funds"});
                }else{
            const result = await pool.query("INSERT INTO withdraw (user_id , withdraw_amount) VALUES ($1 , $2) RETURNING *" , [userId , withdrawal]);

                       const updateBalance = await pool.query("UPDATE users SET balance = balance - $1 WHERE user_id = $2 RETURNING *" , [withdrawal , userId]);
            return res.status(201).json({message : "funds withdrawn successfully" , withdrawal : result.rows[0] ,  updated_balance : updateBalance.rows[0]   } )
                }
         
        
        } catch (error) {
            return res.status(500).json({message : "error withdrawing funds"});
        }
    } catch (err) {
        return res.status(500).json({message : "error withdrawing funds"});
    }
}