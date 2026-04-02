import {Pool} from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString : connectionString,
    ssl : true
})
const connectDB = async ()=>{
    try {
        const client = await pool.connect();
        console.log("connected to database successfully")
        client.release();
    } catch (err) {
        console.log("error while connecting" , err)
    }
}

export {connectDB , pool};

