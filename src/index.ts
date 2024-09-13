import "dotenv/config"
import express from 'express';

import { registerComponents } from './components'
import { errorHandler } from './middlewares/errorHandler';
import { config } from './middlewares/config';


const app: express.Application = express();

config(app);

registerComponents(app);

errorHandler(app);

app.listen(5000,()=>{
    console.log("started");
    
})

