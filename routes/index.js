const router = require("express").Router();
const ActivityRoutes = require("./ActivityRoutes.js");
const UserRoutes = require("./UserRoutes.js");

router.use("/users", UserRoutes);
router.use("/activities", InterestRoutes);

module.exports = router;
