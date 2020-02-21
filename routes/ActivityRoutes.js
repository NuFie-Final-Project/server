const router = require("express").Router();
const ActivityController = require("../controllers/ActivityController.js");

router.post("/", ActivityController.create);
router.get("/", ActivityController.read);
router.get("/:id", ActivityController.readOne);
router.patch("/:id", ActivityController.updateOne);
router.delete("/:id", ActivityController.deleteOne);

module.exports = router;
