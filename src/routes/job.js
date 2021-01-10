const express = require("express");
const router = express.Router();

const jobController = require("../controller/job");

router.put("/", jobController.create);
router.patch("/", jobController.update);
router.get("/fail", jobController.fail);
router.get("/", jobController.list);
router.get("/:id", jobController.read);
router.delete("/:id", jobController.delete);

module.exports = router;
