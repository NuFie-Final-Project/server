const router = require("express").Router();
const UserController = require("../controllers/UserController.js");

router.post("/", UserController.create);
router.get("/:id", UserController.readOne);
router.patch("/:id", UserController.updateOne);
router.delete("/", UserController.deleteOne);

module.exports = router;
