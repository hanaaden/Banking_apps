import { Response } from "express";
import { pool } from "../config/db";
import { CustomRequest } from "../types/customRequest";

export const GetBalance = async (req: CustomRequest , res: Response) => {
    try {
        const result = await pool.query("SELECT balance FROM users WHERE user_id = $1" , [req.user?.id]);
        if(result.rowCount === 0){
            return res.status(404).json({message : "user not found"});
        }
        return res.status(200).json({balance : result.rows[0].balance});
    } catch (err) {
        return res.status(500).json({message : "error getting balance"});
    }
}