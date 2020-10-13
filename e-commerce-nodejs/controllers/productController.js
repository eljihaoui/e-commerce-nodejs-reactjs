const Product = require("../models/productModel");
const formidable = require("formidable");
const _lodash = require("lodash");
const fs = require("fs");
const joi = require("joi");

/****************** function create product ******************** */
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  try {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "image could not uploaded",
        });
      }
      //1mb =1000000 = 10^6
      let product = new Product(fields);
      // console.log(form)
      // console.log("product;", product)
      if (files.photo) {
        //console.log("photo :" , files.photo);
        if (files.photo.size >= Math.pow(10, 6)) {
          return res.status(400).json({
            error: "image should be less than 1MB in size",
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }


      // const schema = joi.object({
      //   name: joi.string().required(),
      //   description: joi.string().required(),
      //   category: joi.string().required(),
      //   price: joi.number().required(),
      //   quantity: joi.number()
      // });

      // console.log(fields);
      // const { error } = schema.validate(fields);
      // if (error) {
      //   return res.status(400).json({
      //     error:"ereeeeeer : " + error.details[0].message,
      //   });
      // }

      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "bad request product not saved",
          });
        }
        res.json({
          product: product,
        });
      });
    });

  } catch (err) {

    console.log(err)
  }


};
/**********   function update Product  ****************/
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "image could not uploade",
      });
    }
    //1mb =1000000 = 10^6
    let product = req.product;
    product = _lodash.extend(product, fields); // mapping
    if (files.photo) {
      //console.log("photo :" , files.photo);
      if (files.photo.size >= Math.pow(10, 6)) {
        return res.status(400).json({
          error: "image should be less than 1MB in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    const schema = joi.object({
      name: joi.string().required(),
      description: joi.string().required(),
      category: joi.string().required(),
      price: joi.number().required(),
      quantity: joi.number(),
    });

    //console.log(fields);
    const { error } = schema.validate(fields);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "bad request product not update",
        });
      }
      res.json({
        product: product,
      });
    });
  });
};

/********************* function show product  */
exports.showProduct = (req, res) => {
  req.product.photo = undefined; // pour ne pas recupérer la photo
  res.json({
    product: req.product,
  });
};

exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, product) => {
    if (err) {
      return res.status(404).json({
        erreur: "product not found ! for remove",
      });
    }
    res.status(204).json({}); // 204 no content bon pratique sinon vous pouvez returner le produit supprimé
  });
};

exports.allProducts = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let order = req.query.order ? req.query.order : "asc";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  Product.find()
    .select("-photo") // ne pas charger la photo
    .populate("category", "name createdAt") // charge libe categ
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        res.status(404).json({
          error: "products not founds",
        });
      }
      res.json({
        products: products,
      });
    });
};
exports.relatedProduct = (req, res) => {
  //$ne : not equal
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  Product.find({
    category: req.product.category,
    _id: { $ne: req.product._id },
  })
    .select("-photo")
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(404).json({
          error: "products not found",
        });
      }
      res.json({
        products: products,
      });
    });
};

exports.searchProduuct = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let order = req.query.order ? req.query.order : "asc";
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = parseInt(req.body.skip);
  let findArgs = {};
  console.log('===>', skip,limit);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  //console.log(findArgs);
  Product.find(findArgs)
    .select("-photo") // ne pas charger la photo
    .populate("category", "name createdAt") // charge libe categ
    .sort([[sortBy, order]])
    .limit(limit)
    .skip(skip)
    .exec((err, products) => {
      if (err) {
        res.status(404).json({
          error: "products not founds",
        });
      }
      res.json({
        products: products,
      });
    });
};
/********************* get Photo product */
exports.photoProduuct = (req, res) => {
  const { data, contentType } = req.product.photo;
  if (data) {
    res.set("Content-Type", contentType); //set headers
    return res.send(data);
  }
};
