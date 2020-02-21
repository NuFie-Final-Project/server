const router = require("express").Router();
const PromoController = require("../controllers/PromoController.js");

router.post("/", PromoController.create);
router.get("/", PromoController.read);
router.get("/:id", PromoController.readOne);
router.patch("/:id", PromoController.updateOne);
router.delete("/:id", PromoController.deleteOne);

module.exports = router;
