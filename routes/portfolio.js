const express = require("express");
const {
  getHome,
  getAboutMe,
  getAllProjects,
  getProject,
  contactMe,
  createProject,
} = require("../controllers/portfolio");
const router = express.Router();
router.route("/").get(getHome);
router.route("/about").get(getAboutMe);
router.route("/projects").get(getAllProjects).post(createProject);
router.route("/projects/:id").get(getProject);
router.route("/contact").post(contactMe);

module.exports = router;
