
let digits = "0123456789";
let otp = "";
const generateotp = () : string =>{
  for(let i =0; i < 6 ; i++){
    otp += digits[Math.floor(Math.random()*10)];

  }
  return otp;
}

export {generateotp};
