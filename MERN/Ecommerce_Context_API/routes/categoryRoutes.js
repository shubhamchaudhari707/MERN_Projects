import express from 'express';
const router = express.Router();
import { isAdmin, requireSignin } from '../middilewares/authMiddileware.js';
import { createCategoryController, updateCategoryController, categoryController, singleCategoryCotroller,deleteCategoryController } from '../controller/categoryContoller.js';


//routes
//create Category
router.post('/create-category', requireSignin, isAdmin, createCategoryController);

//update CAtegory
router.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController);

//getAll Category
router.get('/get-category', categoryController);

//single Category
router.get('/single-category/:slug', singleCategoryCotroller);

//delete Category
router.delete('/delete-category/:id',requireSignin, isAdmin, deleteCategoryController)



export default router;
















