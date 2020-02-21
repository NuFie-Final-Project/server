const router = require("express").Router();
const InterestController = require("../controllers/InterestController.js");

router.post("/", InterestController.create);
router.get("/", InterestController.read);
router.get("/:id", InterestController.readOne);
router.patch("/:id", InterestController.updateOne);
router.delete("/:id", InterestController.deleteOne);

module.exports = Router;
