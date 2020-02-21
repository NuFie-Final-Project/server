const router = require("express").Router();
const InterestRoutes = require("./InterestRoutes.js");
const UserRoutes = require("./UserRoutes.js");

router.use("/users", UserRoutes);
router.use("/interests", InterestRoutes);

module.exports = router;
