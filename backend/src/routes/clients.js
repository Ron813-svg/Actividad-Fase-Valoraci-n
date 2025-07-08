import express from 'express'
import clientsControl from '../controller/clientsControl.js'

const router = express.Router()

router.route('/').get(clientsControl.get)
router.route('/').post(clientsControl.post)

router.route('/:id').put(clientsControl.put)
router.route('/:id').delete(clientsControl.delete)
router.route('/:id').get(clientsControl.getById)

export default router;