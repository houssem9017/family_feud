import express from 'express';
import { login, testfct, signup, deleteOnce, changepassword, getOnce, getAll } from '../Controllers/user.js';

const router = express.Router();

router.route('/login').post(login)
router.route('/testfct').get(testfct)
router.route('/signup').post(signup)
router.route('/delete/:username').delete(deleteOnce);
router.route('/update/:username').put(changepassword);
router.route('/listuser').get(getAll);
router.route('/:username').get(getOnce);
export default router;


