const categoryController = require("../../controllers/dashboard/categoryController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/category-add", authMiddleware, categoryController.addCategory);

module.exports = router;
