import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET, TOKEN_EXPIRY_DATE } from '../constant';
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { generateotp } from '../lib/utils/generateOtp';
import { Login, Signup } from '../lib/interfaces';
import { sendthroughMail , sendConfirmationMail } from '../lib/utils/sendMail';
import { validateLogin  , validateSignUp} from '../validators';

const prisma = new PrismaClient();
const router = express.Router();

const BASE = '/auth';
router.get("/", (req , res) =>{
    res.status(200).send('it is working')
})
router.post('/signup', validateSignUp ,  async (req: Request, res: Response) => {
    const { email, password,
        username, age,
        phone_no,
        avatar

    }: Signup = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                username: username,
                age: age,
                phone_no: phone_no,
                avatar: avatar

            }
        }
        )

        if (user) {
            const mail = await sendConfirmationMail(email , username);
            if(mail != null || mail != undefined){
                console.log('mail sent successfully');
                
            return res.status(201).json(
                {
                    statusCode: 201,
                    message: 'user created successfully & mail sent'
                }
            )
            }
        }
        else {
            res.status(500).json(
                {
                    statusCode: 500,
                    error: 'Server error'
                }
            )
        }

    }
    catch (err) {
        return res.status(500).json(
            { error: err }
        );
    }
})

router.post('/login', validateLogin , async (req: Request, res: Response) => {
    const {
        email, password
    }: Login = req.body;

    try {
        const user = await prisma.user.findUnique(
            {
                where: {
                    email: email,

                }
            }
        )
        if (!user) {
            return res.status(401).send('mail not found');
        }
        if (user) {
            const degenpass = await bcrypt.compare(password, user.password);
            if (!degenpass) {
                return res.status(401).send('password not correct');
            }
            else {
                const token = jwt.sign({
                    email: user.email
                }, JWT_SECRET);
                res.cookie('authToken', token).json({
                    email: user.email,
                    token: token
                })
            }
        }
    }
    catch (err) {
        return res.status(500).json({
            error: err
        })
    }
})

router.post('/logout', (req: Request, res: Response) => {
    res.clearCookie('authToken');
    res.status(200).send('user logged out successfully ');
})

router.post('/forget-pass', async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        return res.status(401).send('unauthorised');
    }
    const otp = generateotp();
    try {
        const response = await prisma.passwordReset.upsert({
            where: {
                email: email
            },
            update: {
                token: otp
            },
            create: {
                email: email,
                token: otp,
                expiresAt: new Date(Date.now() + TOKEN_EXPIRY_DATE)
            }
        })
        if (response) {
            const mail = await sendthroughMail(otp, email);
            if (mail !== null || mail !== undefined) {
                return res.status(201).json({
                    statusCode: 201,
                    message: 'otp send through mail'
                })
            }
            else {
                res.status(401).json({
                    error: 'some error in sending mail'
                })
            }
        }
    }
    catch (err) {
        return res.status(500).send('Internal server error');
    }
})

router.post('/verify-token', async (req: Request, res: Response) => {
    const { otp, email } = req.body;
    try {

        const response = await prisma.passwordReset.findFirst({
            where: {
                email: email,
                token: otp,
                expiresAt: { gte: new Date() }
            }
        })
        if (!response) {
            return res.status(404).json({
                statusCode: 404,
                error: 'token expired or not matched'
            })
        }
        else {
            return res.status(201).json({
                message: 'token verified password can be changed now'
            })
        }

    }
    catch (err) {

    }
})

router.post('/reset-password', async (req: Request, res: Response) => {
    const { password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const response = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashedPassword
            }
        })
        if (response) {
            return res.status(201).json({
                msg: 'password reset successfull'
            })

        }
    }
    catch (err) {
        return res.status(500).json({
            error: err
        })
    }

})

const MODULE = {
    BASE , 
    router
}
export default MODULE;