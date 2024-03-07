import express from 'express';
import { pool } from '../config/db';
import { GetSubmodules  , GetLeaderboard ,GetModulesById , GetModules } from '../queries/moduleQuery';

import { Request , Response } from 'express';


const BASE = '/modules';


const router = express.Router();

router.get('/' , async (req : Request , res : Response) =>{
    const client = await pool.connect();
    try{

        const result = await client.query(GetModules);
        if(result){
            return res.status(201).json(
                {
                    statusCode : 201 ,
                    data : result.rows
                }
            )
        }
        else{
            return res.status(404).json({
                statusCode : 404,
                error : 'fetching error'
            })
        }

    }
    catch(err){
         return res.status(500).json({
                statusCode : 500,
                error : 'Internal Server Error'
            })

    }
    finally{

        client.release();

    }
})

router.get('/:module_id' ,   async (req : Request , res : Response) =>{
    const module_id = req.params.module_id;
    const client = await pool.connect();
    try{

        const result = await client.query(GetModulesById , [module_id]);
        if(result){
            return res.status(201).json(
                {
                    statusCode : 201 ,
                    data : result.rows
                }
            )
        }
        else{
            return res.status(404).json({
                statusCode : 404,
                error : 'fetching error'
            })
        }

    }
    catch(err){
         return res.status(500).json({
                statusCode : 500,
                error : 'Internal Server Error'
            })

    }
    finally{

        client.release();

    }

})

router.get('/submodules/:module_id',   async (req: Request, res: Response) => {
    const module_id = req.params.module_id;
    const client = await pool.connect();

    try {
        const result = await client.query(GetSubmodules, [module_id]);

        if (result.rows.length > 0) {
            return res.status(200).json({
                statusCode: 200,
                data: result.rows
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                error: 'Submodules not found for the specified module'
            });
        }
    } catch (err) {
        console.error('Error fetching submodules:', err);
        return res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error'
        });
    } finally {
        client.release();
    }
});


const MODULE = {
    BASE, 
    router
}
export default MODULE;
