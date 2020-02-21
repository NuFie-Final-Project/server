const router = require("express").Router();
const PartnerPromoController = require("../controllers/PartnerPromoController");

router.post("/", PartnerPromoController.create);
router.get("/", PartnerPromoController.read);
router.get("/:id", PartnerPromoController.readOne);
router.patch("/:id", PartnerPromoController.updateOne);
router.delete("/:id", PartnerPromoController.deleteOne);

module.exports = Router;
