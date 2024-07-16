import express from 'express';

import students from './students'
import courses from './courses'

const router = express.Router();

router.use('/students', students)
router.use('/courses', courses)


export default router;
