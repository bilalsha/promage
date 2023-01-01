import { Router } from 'express';

import projectRouter from './project.routes';
import taskRouter from './task.routes';
import notificationRouter from './notification.routes';

const router = Router();

router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);
router.use('/notifications', notificationRouter);

export default router;
