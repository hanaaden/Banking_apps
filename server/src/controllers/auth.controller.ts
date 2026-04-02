import { Request , Response } from "express";
import { loginSchema, signupSchema } from "../validations/validation";
import bcrypt from "bcrypt";
import { pool } from "../config/db";
import jwt from "jsonwebtoken"

export const signup =async (req: Request , res: Response) => {
    try {
        const result = signupSchema.safeParse(req.body);
        
        if(!result.success){
            return res.status(400).json({message : "invalid inputs" , errors : result.error.format()});
        }

        const {email , password} = result.data;
        const hashed = await bcrypt.hash(password , 10);
         await pool.query("INSERT INTO users (user_email , user_password) VALUES ($1 , $2)" , [email , hashed]);
            return res.status(201).json({message : "user created successfully"});

    } catch (err) {
        return res.status(500).json({message : "error creating user"});
    }
}


export const login = async (req: Request , res: Response) => {

     try {
        const result = loginSchema.safeParse(req.body);
        if(!result.success){        
            return res.status(400).json({message : "invalid inputs" , errors : result.error.format()});
        }

        const {email , password} = result.data;
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1" , [email]);

        if(user.rowCount === 0){
            return res.status(400).json({message : "invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password , user.rows[0].user_password);

        if(!isMatch){
            return res.status(400).json({message : "invalid credentials"});
        }
        const token = jwt.sign({id : user.rows[0].user_id} , process.env.JWT_SECRET as string , {expiresIn : "2d"});
        res.cookie("token" , token , {
            httpOnly : true,
            secure : true,
            sameSite : "none",
            maxAge : 24 * 60 * 60 * 1000
        });
        return res.status(200).json({message : "logged in successfully"});  

      

     } catch (err) {
        return res.status(500).json({message : "error logging in user"});
     }
}