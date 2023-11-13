const Project = require("../models/project");
const About = require("../models/about");
const Conatct = require("../models/contact");
const HomeModel = require("../models/home");

const { CustomError, BadRequest, NotFound } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const getHome = async (req, res) => {
  const homeData = await HomeModel.find({});
  if (!homeData) {
    throw new NotFound("No available data in home");
  }
  res.status(StatusCodes.OK).json(homeData[0]);
};
const getAboutMe = async (req, res) => {
  const about = await About.find();
  if (!about) {
    throw new NotFound("No available about");
  }
  res.status(StatusCodes.OK).json(about[0]);
};
//get a single project
const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    throw new NotFound(`No project with id:${id}`);
  }
  res.status(StatusCodes.OK).json(project);
};
//get all projects
const getAllProjects = async (req, res) => {
  const projects = await Project.find();
  if (!projects) {
    throw new NotFound(`No available projects`);
  }
  res.status(StatusCodes.OK).json({ projects });
};
// create a new project
const createProject = async (req, res) => {
  const project = await Project.create(req.body);
  res.status(StatusCodes.CREATED).json({ project });
};

//send email
const contactMe = async (req, res) => {
  const contact = await Conatct.create(req.body);
  res.status(StatusCodes.CREATED).json(contact);
};

module.exports = {
  getHome,
  getAboutMe,
  getAllProjects,
  getProject,
  contactMe,
  createProject,
};
