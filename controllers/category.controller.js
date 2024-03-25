const category_model = require("../models/category.model");
exports.createNewCategory = async (req, res) => {
  const cat_data = {
    name: req.body.name,
    description: req.body.description,
  };
  try {
    const category = await category_model.create(cat_data);
    return res.status(201).send(category);
  } catch (error) {
    console.log("Error while creating the category");
    return res.status(500).send({
      message: "Error while creating the category",
    });
  }
};
exports.getCategories = async (req, res) => {
  try {
    const categories = await category_model.find({});
    return res.status(200).send(categories);
  } catch (error) {
    console.log("Error while getting the categories");
    return res.status(500).send({
      message: "Error while getting the categories",
    });
  }
};
exports.getCategoriesById = async (req, res) => {
  debugger;
  const categoryId = req.params.categoryId;

  try {
    const categoryById = await category_model.find({ _id: categoryId });
    return res.status(200).send(categoryById);
  } catch (error) {
    console.log("Error while creating the category");
    return res.status(500).send({
      message: "Error while getting the category",
    });
  }
};
exports.updateCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  const categoryBody = req.body;
  try {
    await category_model.updateOne({ _id: categoryId }, categoryBody);
    return res.status(200).send({
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log("Error in updation ", error);
    return res.status(500).send({
      message: "Error in updation",
    });
  }
};

exports.deleteCategoryById = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    await category_model.deleteOne({ _id: categoryId });
    return res.status(200).send({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error in deletion",
    });
  }
};
