import express from 'express';
import { pool } from '../config/db';

import { Request , Response } from 'express';
import { authValidation } from '../middleware/authentication';
import { GetUser , GetUserDashBoard } from '../queries/userQuery';

const router = express.Router();



const BASE = '/user';
router.get("/" , (req:Request , res : Response) =>{
    res.send('this route is working');
})
router.get('/profile/:user_id' , authValidation , async (req : Request , res : Response) =>{
  const user_id = req.params.user_id;
   const client = await pool.connect();

  try{


       const result = await client.query(GetUser , [user_id]);

    const data = result.rows;

    if(!data){
        return res.status(404).json({error : 'user not found'});
    }
    if(data){
        res.status(200).json({
            user : data
        })
    }

  }
  catch(err){
    return res.status(500).json({
        error : 'Internal Server Error'
    })
  }
  finally{
   client.release(); 
  }
})

router.get('/dashboard/:userName' , async (req : Request , res : Response  ) =>{
    console.log(req.params);
    
    const userName = req.params.userName;

    const client  = await pool.connect();
    //console.log(client);
    
    try{

        console.log('reached here');
        

        const result = await client.query(GetUserDashBoard , [userName]);
        //console.log(result);
        
        const data = result.rows;

        if(!data){
            return res.status(404).send('user not found');
        }
        if(data){
            return res.status(200).json({
                user : data, 
            })
        }

    }
    catch(err){
        return res.status(500).json({
            error : 'Internal Server Error'
        })
    }
    finally{
        client.release();
    }
})

const MODULE = {
    
    BASE,
    router
}

export default MODULE;

