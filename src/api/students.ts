import express from 'express';
import {  StudentController } from '../controllers/students.controllers';


const router = express.Router()
const studentController = new StudentController()

router.get('/all', studentController.getAll)
router.get('/:id/u', studentController.getOne)

router.post('/', studentController.create);

router.put('/:id', studentController.update);
router.put('/:id/details', studentController.updateDetails);



router.delete('/:id', studentController.remove);







export default router