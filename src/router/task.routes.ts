import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';

const router = Router();

router.get('/', TaskController.list);
router.post('/', TaskController.create);
router.get('/:id', TaskController.get);
router.put('/:id', TaskController.update);

export default router;
