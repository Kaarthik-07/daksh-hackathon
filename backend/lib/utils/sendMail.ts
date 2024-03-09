import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;


export const sendthroughMail = async (token : string , Email : string) =>{
  
    const config = {
        service : 'gmail',
        auth : {
            user : email,
            pass : password
            
        }
    }

    const transporter = nodemailer.createTransport(config);

    const info = {
        from : `GIT HELP 🐱 ${email}`,
        to : `${Email}`,
        subject : `OTP FOR PASSWORD RESET`,
        text : `otp for password enter the following otp`,
        html : `<b>${token}</b>`
    }
    try{
    const response = await transporter.sendMail(info);
    if(response){
        console.log(`mail sent successfully`);
        
        return response;
    }
    }
    catch(error){
        console.error(error);
        
      return null
    }

}

export const sendConfirmationMail = async (Email : string , userName : string) => {
    const config = {
        service : 'gmail',
        auth : {
            user : email,
            pass : password
            
        }
    }

    const transporter = nodemailer.createTransport(config);
    const info = {
        from : `GIT HELP 🐱 ${email}`,
        to : `${Email}`,
        subject : `confirmation mail`,
        text : `welcome ${userName} `,
        html : `<h3>
        we are grateful to have you in our  family !
        </h3>`
    }
    try{
    const response = await transporter.sendMail(info);
    if(response){
        console.log(`mail sent successfully`);
        
        return response;
    }
    }
    catch(error){
        console.error(error);
        
      return null
    }

    
}