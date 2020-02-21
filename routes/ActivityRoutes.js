const router = require("express").Router();
const ActivityController = require("../controllers/ActivityController.js");
const {
    userAuthentication,
    activityAuthorization
} = require("../middlewares/auth");
const { singleUpload } = require("../services/imageUpload");

router.use(userAuthentication);
router.post("/", singleUpload, ActivityController.create);
router.get("/", ActivityController.read);
router.get("/:id", ActivityController.readOne);
router.patch(
    "/:id",
    activityAuthorization,
    singleUpload,
    ActivityController.updateOne
);
router.delete("/:id", activityAuthorization, ActivityController.deleteOne);

module.exports = router;
