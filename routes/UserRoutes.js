const router = require("express").Router();
const UserController = require("../controllers/UserController.js");

router.post("/", UserController.create);
router.get("/", UserController.read);
router.get("/:id", UserController.readOne);
router.patch("/:id", UserController.updateOne);
router.delete("/:id", UserController.deleteOne);

module.exports = Router;
