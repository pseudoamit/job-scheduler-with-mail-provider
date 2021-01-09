const express = require("express");
const router = express.Router();

const jobController = require("../controller/job");

router.get("/", jobController.createScheduling);

module.exports = router;
