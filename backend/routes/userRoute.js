const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  getDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, autheriseRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/user").get(isAuthenticatedUser, getDetails);
router.route("/user/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/user/profile/update").put(isAuthenticatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, autheriseRole, getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, autheriseRole, getSingleUser)
  .put(isAuthenticatedUser, autheriseRole, updateUser)
  .delete(isAuthenticatedUser, autheriseRole, deleteUser);

module.exports = router;
