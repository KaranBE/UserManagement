const express = require("express");
const {
  registerUser,
  getAllUsers,
  getUserDetails,
  updateUser,
  deleteUser,
} = require("../controllers/auth");

const router = express.Router();
router.post("/register", registerUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserDetails", getUserDetails);
router.post("/updateUser", updateUser);
router.post("/deleteUser", deleteUser);

module.exports = router;
