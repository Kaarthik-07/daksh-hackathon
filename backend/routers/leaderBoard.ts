import express from 'express';
import { pool } from '../config/db';
import { Request , Response } from 'express';

import { GetRanking } from '../queries/leaderboardQuery';

const BASE = '/leaderboard';


const router = express.Router();

router.get('/' , async (req : Request , res : Response) =>{

    const client = await pool.connect();

    let data;
    try{

        const result = await client.query(GetRanking);
        if(result.rows){
            data = result.rows;
            return res.status(200).json({
                statusCode : 200,
                data : data
            })
        }
        else{
            return res.status(404).json({
                error :'404 not found'
            })
        }


    }
    catch(err){
        return res.status(500).json({
            err : 'Internal Server Error'
        })

    }

});

const MODULE = {
    BASE , 
    router
}
export default MODULE;

