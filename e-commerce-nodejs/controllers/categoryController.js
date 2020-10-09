const Category = require("../models/categoryModel");
exports.createCategory = (req, res) => {
  console.log(req.body);
  const category = new Category(req.body);
  category.save((err, categ) => {
    if (err) {
      return res.status(400).json({
        error: "bad request for creating a new category",
      });
    }
    res.json({
      category: categ,
    });
  });
};

exports.showCetegory = (req, res) => {
  res.json({
    category: req.category,
  });
};

exports.allCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    }
    res.json({
      categories: categories,
    });
  });
};

exports.updateCategory = (req, res) => {
  let category = req.category;
  category.name = req.body.name;
  category.save((err, categ) => {
    if (err) {
      return res.status(404).json({
        error: "bad requesst for updating categoory",
      });
    }
    res.json({
      category: categ,
      message: "Category updated",
    });
  });
};

exports.removeCategory = (req, res) => {
  let category = req.category;
  category.remove((err, categ) => {
    if (err) {
      return res.status(404).json({
        error: "bad request  categoory not found",
      });
    }
    res.json({
      message: "Category deleted ",
    });
  });
};
