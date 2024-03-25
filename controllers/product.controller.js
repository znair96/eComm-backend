const product_model = require("../models/product.model");

exports.createProduct = async (req, res) => {
  const product_body = req.body;
  try {
    const created_product = await product_model.create(product_body);
    return res.status(201).send({
      product: created_product,
      message: "Product created...",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Product not created due to following error :: ${error}`,
    });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await product_model.find({});
    return res.status(200).send({
      products: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Unable to fetch products`,
    });
  }
};

exports.getProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const products = await product_model.find({ id: productId });
    return res.status(200).send({
      products: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Unable to fetch product`,
    });
  }
};
exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const product_body = req.body;
  try {
    const updatedProduct = await product_model.updateOne(
      { id: productId },
      { product_body }
    );
    return res.status(200).send({
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Unable to update product`,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedProduct = await product_model.deleteOne({ id: productId });
    return res.status(200).send({
      product: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: `Unable to delete product`,
    });
  }
};
