import express from 'express';
const router = express.Router();



import userComponent from './user';
import adminComponent from './admin';

router.use('/',userComponent)
router.use('/admin',adminComponent)



export default router;
