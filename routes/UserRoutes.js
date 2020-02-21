const router = require("express").Router();
const UserController = require("../controllers/UserController.js");
const {
    userAuthentication,
    activityAuthorization
} = require("../middlewares/auth.js");

// router.post("/", UserController.create);
// router.post("/", UserController.register);
router.post("/", UserController.registerWithGoogle);
router.use(userAuthentication);
router.get("/:id", UserController.readOne);
router.patch("/", UserController.updateOne);
router.delete("/", UserController.deleteOne);

module.exports = router;
