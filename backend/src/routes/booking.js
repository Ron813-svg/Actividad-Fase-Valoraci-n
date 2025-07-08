import express from 'express';
import bookingControl from '../controller/bookingControl.js';

const router = express.Router()

router.route('/').get(bookingControl.get)
router.route('/').post(bookingControl.post)

router.route('/:id').get(bookingControl.getById)
router.route('/:id').put(bookingControl.put)
router.route('/:id').delete(bookingControl.delete)

export default router;