const productController = require("../../controllers/dashboard/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add-product", authMiddleware, productController.addProduct);

module.exports = router;
