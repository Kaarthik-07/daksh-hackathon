import express from 'express';
import { Request , Response } from 'express';
import { gptassist } from '../config/openai';

const BASE = '/bot';

const router = express.Router();

router.get('/' , async (req :Request , res : Response) =>{
    return res.status(200).json({
        statusCode : 200,
        data : 'working....'
    })
})
// router.post('/' , async (req : Request , res : Response) => {
//     const {prompt} = req.body;
//     console.log(String(prompt));
//     try{
//         const response = await gptassist(prompt);
//         if(response != null){
//            return  res.status(200).json({
//                 statusCode : 200,
//                 ans : response
//             })
//         }
//         else{
//            return  res.status(404).json({
//                 statusCode : 404,
//                 err :'ai error'
//             })
//         }
//     }
//     catch(err){
//        return res.status(500).json({
//         statusCode : 500,
//         err : err
//        })
//     }
// })

const MODULE = {
    BASE ,
    router
};

export default MODULE;