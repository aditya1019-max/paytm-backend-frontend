const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/userController");
const { getProfile } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware");


router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;