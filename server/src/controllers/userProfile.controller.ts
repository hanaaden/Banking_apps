import { Request , Response } from "express";
import { CustomRequest } from "../types/customRequest";
import { pool } from "../config/db";

export const getUserProfile = async (req:CustomRequest , res:Response) => {
    try {
        
        const userId = req.user?.id;
    const result = await pool.query("SELECT user_email FROM users WHERE user_id = $1" , [userId])
         const result2 = await pool.query("SELECT balance FROM users WHERE user_id = $1" , [req.user?.id]);
    if (result.rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
}
    const email = result.rows[0].user_email;
    const balance = result2.rows[0].balance
    res.status(200).json({
        message : "user profile retrieved",
        data : {
            email,
            balance
        }
    })
    } catch (err) {
        res.status(500).json({ message: "Error retrieving user profile" 
        })
    }
}