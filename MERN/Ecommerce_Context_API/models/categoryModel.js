import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})

const CategoryModel = new mongoose.model('Category', categorySchema)


export default CategoryModel;


