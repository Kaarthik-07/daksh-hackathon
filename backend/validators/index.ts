import { Request , Response , NextFunction } from "express";

export const validateSignUp = (req : Request , res : Response ,next : NextFunction) =>{

    const {email , password , username , age , phone_no , avatar} = req.body;
    if(!email || typeof email != 'string' || !password || typeof password != 'string' || typeof username != 'string' || typeof age != "number"
    || !phone_no || typeof phone_no != 'string' || !avatar || typeof avatar != 'string'
    ){
        return res.status(404).json(
            {
                error : 'Invalid Parameters'
            }
        )
    }
    next();
}
export const validateLogin = (req : Request , res : Response , next : NextFunction) =>{
    const {email , password} = req.body;
    if(!email || typeof email != 'string' || !password || typeof password != 'string' || password.length < 6){
        return res.status(404).json(
            {
                error : 'Invalid Parameters'
            }
        )
    }
    next();
}
