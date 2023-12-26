const asyncHandler = require("express-async-handler");
const Group = require("../models/groupModel");
const { fileSizeFormatter } = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

// Create Group
const createGroup = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  //   Validation
  if (!name || !description) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Esports App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Group
  const group = await Group.create({
    user: req.user.id,
    name,
    description,
    image: fileData,
  });

  res.status(201).json(group);
});

// Get all Groups
const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find({ user: req.user.id }).sort("-createdAt");
  res.status(200).json(groups);
});

// Get single group
const getGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  // if group doesnt exist
  if (!group) {
    res.status(404);
    throw new Error("Group not found");
  }
  // Match group to its user
  if (group.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  res.status(200).json(group);
});

// Delete Group
const deleteGroup = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.id);
  // if group doesnt exist
  if (!group) {
    res.status(404);
    throw new Error("Group not found");
  }
  // Match group to its user
  if (group.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await group.remove();
  res.status(200).json({ message: "Group deleted." });
});

// Update Group
const updateGroup = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  const group = await Group.findById(id);

  // if group doesnt exist
  if (!group) {
    res.status(404);
    throw new Error("Group not found");
  }
  // Match group to its user
  if (group.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // Handle Image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: "Esports App",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be uploaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Update Group
  const updatedGroup = await Group.findByIdAndUpdate(
    { _id: id },
    {
      name,
      description,
      image: Object.keys(fileData).length === 0 ? group?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedGroup);
});

module.exports = {
  createGroup,
  getGroups,
  getGroup,
  deleteGroup,
  updateGroup,
};
