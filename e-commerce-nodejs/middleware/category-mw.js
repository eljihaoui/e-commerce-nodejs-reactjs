const Category = require('../models/categoryModel');
exports.categoryById=(req,res,next,id)=>{
Category.findById(id).exec((err,category)=>{
    if(err || !category){
      return res.status(404).json({
        error: "fct categoryById : Category not found"
      });
    }
    req.category=category;
    next();
})
}