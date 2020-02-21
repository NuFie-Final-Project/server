const router = require("express").Router();
const ActivityController = require("../controllers/ActivityController.js");
const {
    userAuthentication,
    activityAuthorization
} = require("../middlewares/auth");

router.use(userAuthentication);
router.post("/", ActivityController.create);
router.get("/", ActivityController.read);
router.get("/:id", ActivityController.readOne);
router.patch("/:id", activityAuthorization, ActivityController.updateOne);
router.delete("/:id", activityAuthorization, ActivityController.deleteOne);

module.exports = router;
