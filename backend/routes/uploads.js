const express = require("express");
const router = express.Router();
const { publicUploads } = require("../controllers/uploads");
router.post("/publicUploads", publicUploads);
module.exports = router;
