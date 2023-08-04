const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  createProductReview,
  getProductReviews,
  deleteProductReview,
} = require("../controllers/productController");
const { isAuthenticatedUser, autheriseRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(/*isAuthenticatedUser,*/ getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, autheriseRole, createProduct);
router
  .route("/admin/product/:id")
  .get(getSingleProduct)
  .put(isAuthenticatedUser, autheriseRole, updateProduct)
  .delete(isAuthenticatedUser, autheriseRole, deleteProduct);
router.route("/product/:id").get(/*isAuthenticatedUser,*/ getSingleProduct);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, autheriseRole, deleteProductReview);

module.exports = router;
