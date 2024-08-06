import CategoryModel from './../models/categoryModel.js';
import slugify from 'slugify';

export const createCategoryController = async (req, res) => {
  try {

    const {name} = req.body;
    
    if (!name) {
      return res.send({message:"Name is required"})
    }

    const existingCategory = await CategoryModel.findOne({name})
    if (existingCategory) {
      return res.status(200).send({
        success:true,
        message:"Category Already Exisits"
      })
    }

    const category = await new CategoryModel({name,slug:slugify(name)}).save()
    res.status(201).send({
      success:true,
      message:"Category Created",
      category
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message:"Error in Category"
    })
  }
};


//upadte Category

export const updateCategoryController = async (req, res)=>{
  try {
    const {name} = req.body;
    const {id} = req.params;
    const category  = await CategoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true} );
    res.status(200).send({
      success:true,
      message:"Category Upadted Sucessfully",
      category
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while updating category",
      error
    })
  }
}

//get all Category
export const categoryController =async(req, res)=>{
  try {
    const category  = await CategoryModel.find({})
    res.status(200).send({
      success:true,
      message:"All Categories List",
      category
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"Error While getting all categories",
      error
    })
  }
}


//single Category
export const singleCategoryCotroller = async (req, res)=>{
  try {
    
    const {slug} = req.params;
    const category = await CategoryModel.findOne({slug});
    res.status(200).send({
      success:true,
      message:"Get Single Category Sucessfully",
      category
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while getting single categories",
      error
    })
  }
}


//delete Category
export const deleteCategoryController = async (req, res) =>{
  try {
    const {id} = req.params
    
    const deleteCategory = await CategoryModel.findByIdAndDelete(id);
    
    res.status(200).send({
      success:true,
      message:"Category Deleted Successfully",
      deleteCategory
    })

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error while delete category",
      error
    })
  }
}

