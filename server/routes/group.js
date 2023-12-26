const express = require("express");
const router = express.Router();
const {
  createGroup,
  getGroups,
  getGroup,
  deleteGroup,
  updateGroup,
} = require("../controllers/group.js"); 
const { upload } = require("../utils/fileUpload");

router.post("/",  upload.single("image"), createGroup); 
router.patch("/:id",  upload.single("image"), updateGroup); 
router.get("/",  getGroups); 
router.get("/:id",  getGroup); 
router.delete("/:id",  deleteGroup); 

module.exports = router;
