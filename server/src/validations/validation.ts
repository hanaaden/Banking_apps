import { PassThrough } from "node:stream";

import {z} from "zod";

export const signupSchema = z.object({
    email: z.string().email("invalid email"),
    password: z.string().min(6 , "password must be at least 6 characters long"),
  
});

export const loginSchema = z.object({
      email: z.string().email("invalid email"),
    password: z.string().min(6 , "password must be at least 6 characters long"),
});