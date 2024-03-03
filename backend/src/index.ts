import express from 'express';
import cors from 'cors';
import { Auth } from '../routers';
import { errorHandler } from '../middleware/errorHandler';
const app = express();

app.use(cors());

app.use(express.json());

const PORT  = process.env.PORT || 6969;

app.get('/' , (req , res) =>{
    res.send('working ...');
})

app.use(Auth.BASE , Auth.router);

app.use(errorHandler);

app.listen(PORT , () =>{
    console.log(`Server is working at *${PORT}`);
    
});

