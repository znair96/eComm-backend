const productController = require("../controllers/product.controller");
const { verifyToken, isAdmin } = require("../middlewares/auth.mw");

module.exports = (app) => {
  app.get(
    "/ecomm/api/v1/products",
    [verifyToken],
    productController.getAllProducts
  );
  app.post(
    "/ecomm/api/v1/products",
    [verifyToken, isAdmin],
    productController.createProduct
  );
  app.get(
    "/ecomm/api/v1/products/:productId",
    [verifyToken],
    productController.getProduct
  );
  app.put(
    "/ecomm/api/v1/products/:productId",
    [verifyToken, isAdmin],
    productController.updateProduct
  );
  app.delete(
    "/ecomm/api/v1/products/:productId",
    [verifyToken, isAdmin],
    productController.deleteProduct
  );
};
