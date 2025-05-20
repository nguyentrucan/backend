const categoryController = require("../../controllers/dashboard/categoryController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add-category", authMiddleware, categoryController.addCategory);
router.get("/get-category", authMiddleware, categoryController.getCategory);

module.exports = router;
