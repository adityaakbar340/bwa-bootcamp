const express = require("express");
const router = express();
const { createCMSorganizer, createCMSUsers, getCMSUsers } = require("./controller");
const { authenticateUser, authorizeRoles } = require('../../../middlewares/auth');


router.get("/users", authenticateUser, authorizeRoles('owner'), getCMSUsers);
router.post("/organizers", createCMSorganizer);
router.post("/users", authenticateUser, createCMSUsers);

module.exports = router;
