const productController = require("../../controllers/dashboard/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add-product", authMiddleware, productController.addProduct);
router.get("/get-products", authMiddleware, productController.getProducts);

module.exports = router;
