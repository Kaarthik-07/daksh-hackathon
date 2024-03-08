import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Auth , User , Module  , LeaderBoard , AI , QUIZ} from '../routers';
import { errorHandler } from '../middleware/errorHandler';
dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const PORT  = process.env.PORT || 6969;

app.get('/' , (req , res) =>{
    res.send('on the way working ...');
})

app.use(Auth.BASE , Auth.router);
app.use(User.BASE , User.router);
app.use(Module.BASE , Module.router);
app.use(LeaderBoard.BASE , LeaderBoard.router);
app.use(AI.BASE , AI.router);
app.use(QUIZ.BASE , QUIZ.router);
app.use(errorHandler);

app.listen(PORT , () =>{
    console.log(`Server is working at *${PORT}`);
    
});

export default app;