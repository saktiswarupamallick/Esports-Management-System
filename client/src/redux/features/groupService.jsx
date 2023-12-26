import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/groups/`; 

// Create New Group
const createGroup = async (formData) => {
  const response = await axios.post(API_URL, formData);
  return response.data;
};

// Get all groups
const getGroups = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Delete a Group
const deleteGroup = async (id) => {
  const response = await axios.delete(API_URL + id);
  return response.data;
};

// Get a Group
const getGroup = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Update Group
const updateGroup = async (id, formData) => {
  const response = await axios.patch(`${API_URL}${id}`, formData);
  return response.data;
};

const groupService = { // Update the service object
  createGroup,
  getGroups,
  getGroup,
  deleteGroup,
  updateGroup,
};

export default groupService;
