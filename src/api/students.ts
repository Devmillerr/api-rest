import express from 'express';
import {  StudentController } from '../controllers/students.controllers';
import { STUDENT_CREATE_SCHEMA, STUDENTDETAILS_CREATE_SCHEMA } from '../utils/schema/students';
import { ID_UUID } from '../utils/schema/general';
import { validatorHandler } from '../../middleware/validator.handler';

const router = express.Router()
const studentController = new StudentController()

router.get('/all', studentController.getAll)
router.get('/:id/u', validatorHandler(ID_UUID, 'params'), studentController.getOne)

router.post('/', validatorHandler(STUDENT_CREATE_SCHEMA, 'body'), studentController.create);

router.put('/:id', validatorHandler(ID_UUID, 'params'), studentController.update);
router.put('/:id/details',validatorHandler(STUDENTDETAILS_CREATE_SCHEMA, 'body'), studentController.updateDetails);



router.delete('/:id', validatorHandler(ID_UUID, 'params'), studentController.remove);







export default router