import express from 'express'
import { CourseController } from '../controllers/courses.controllers';

const router = express.Router()
const courseController = new CourseController()

router.get('/all', courseController.getAll)
router.get('/:id/u', courseController.getOne)

router.post('/', courseController.create);
router.put('/:id', courseController.update);

router.delete('/:id', courseController.remove);



export default router