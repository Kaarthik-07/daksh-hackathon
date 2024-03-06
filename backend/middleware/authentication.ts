// import {  Response , NextFunction } from "express";
// import { JWT_SECRET } from "../constant";
// import jwt from 'jsonwebtoken'
// const authValidation = (req : any , res : Response , next : NextFunction) =>{
//     if(!req.cookies){
//         return res.status(404).json(
//             {
//                 err : 'Unauthorised'
//             }
//         )
//     }
//     const {authToken} = req.cookies;
//     if(authToken){
//         jwt.verify(authToken , JWT_SECRET , (err:any , data : any) =>{
//             if (err) return res.status(401).send('Unauthorised')
//             req.user = data
//             next();
//         })
//     }
//     else{
//         return res.status(401).json({
//             message : 'Unauthorised',
//         })
//     }
// }
// export {authValidation}