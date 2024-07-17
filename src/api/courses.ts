import express from 'express'
import { CourseController } from '../controllers/courses.controllers';
import { validatorHandler } from '../../middleware/validator.handler';
import { COURSE_CREATE_SCHEMA } from '../utils/schema/courses';
import { ID_UUID } from '../utils/schema/general';

const router = express.Router()
const courseController = new CourseController()

router.get('/all', courseController.getAll)
router.get('/:id/e', validatorHandler(ID_UUID, 'params'), courseController.getOne)

router.post('/', validatorHandler(COURSE_CREATE_SCHEMA, 'body'),courseController.create);
router.put('/:id', validatorHandler(ID_UUID, 'params'), courseController.update);

router.delete('/:id', validatorHandler(ID_UUID, 'params'), courseController.remove);



export default router