const express = require("express");
const { isAuthenticatedUser, autheriseRole } = require("../middleware/auth");
const {
  newOrder,
  getOrderDetails,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getOrderDetails);
router.route("/orders/me").get(isAuthenticatedUser, getMyOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, autheriseRole, getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, autheriseRole, updateOrderStatus)
  .delete(isAuthenticatedUser, autheriseRole, deleteOrder);

module.exports = router;
