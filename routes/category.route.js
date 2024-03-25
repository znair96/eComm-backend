const categoryController = require("../controllers/category.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.mw");
module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    [verifyToken, isAdmin],
    categoryController.createNewCategory
  );
  app.get(
    "/ecomm/api/v1/categories",
    [verifyToken],
    categoryController.getCategories
  );
  app.get(
    "/ecomm/api/v1/categories/:categoryId",
    [verifyToken],
    categoryController.getCategoriesById
  );
  app.put(
    "/ecomm/api/v1/categories/:categoryId",
    [verifyToken, isAdmin],
    categoryController.updateCategoryById
  );
  app.delete(
    "/ecomm/api/v1/categories/:categoryId",
    [verifyToken, isAdmin],
    categoryController.deleteCategoryById
  );
};
