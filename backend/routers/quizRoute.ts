
import express from 'express';
import { Request , Response } from 'express';
import { pool } from '../config/db';
import { GetQuizByModuleId } from '../queries/quizQuery';
import { gptassist } from '../config/openai';
const router = express.Router();

const BASE = '/quiz'
router.get('/' , (req:Request , res : Response) =>{
   return res.status(200).json({
    statusCode : 200,
    msg :'workking ....'
   })
})

const prompt1 = 'rephrase this into harder quiz';
const prompt2 = 'a little bit easier this one is too hard';
router.get('/:moduleID' , async (req : Request , res : Response) =>{
    const moduleID =  req.params.moduleID;
    const client  = await pool.connect();
    try{
        const response = await client.query(GetQuizByModuleId , [moduleID]);
        if(response){
         return res.status(200).json({
            data : response.rows
         })
        }
        else{
            return res.status(404).json({
                err :'cant find quiz for this sorry 😘'
            })
        }


    }
    catch(err){
        return res.status(500).json({
            err : 'Error'
        })
    }
    finally{
        client.release();
    }
})

router.get('/results/:score/:moduleID' , async ( req : Request , res : Response) =>{
    const client = await pool.connect();
    const {score}:any = req.params;
    const {moduleID} = req.params;
    let data;
    try{
        const response = await client.query(GetQuizByModuleId , [moduleID]);

        if(response){
         data = response.rows;
        }
        else{
            return res.status(404).json({
                err :'unauthorised'
            })
        }
        
    }
    catch(err){
        return res.status(500).json({
            statusCode : 500,
            err : 'Internal Server Error'
        })
    }
    if(data){
        if(score >=4){
            try{
                const result = await gptassist(data+prompt1);
                if(result!=null){
                    return res.status(200).json({
                        statusCode : 200,
                        data : result
                    })
                }
                else{
                    return res.status(404).json({
                        statusCode : 404, 
                        err : 'ai error'
                    })
                }

            }
            catch(err){
           return res.status(500).json({
            err : 'Internal Server Error'
           })
            }
        }
        else{
                try{
                const result = await gptassist(data+prompt2);
                if(result!=null){
                    return res.status(200).json({
                        statusCode : 200,
                        data : result
                    })
                }
                else{
                    return res.status(404).json({
                        statusCode : 404, 
                        err : 'ai error'
                    })
                }

            }
            catch(err){
           return res.status(500).json({
            err : 'Internal Server Error'
           })
            }

        }
    }

})

const MODULE = {
    BASE , 
    router
}

export default MODULE;
