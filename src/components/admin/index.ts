import { Router } from 'express';
import * as controller from './admin.controller';
import { isAdmin } from '../../utils/auth';


const router = Router();

router.get('/users',isAdmin, controller.getAllUsers );
router.put('/users',isAdmin, controller.editRole );


export default router;
