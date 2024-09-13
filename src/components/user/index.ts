import { Router } from 'express';
import * as controller from './user.controller';
import { isAuthenticated } from '../../utils/auth';


const router = Router();

router.post('/login', controller.login );
router.post('/signup', controller.signup );
router.get('/profile',isAuthenticated, controller.profile );


export default router;
