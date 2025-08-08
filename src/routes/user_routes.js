import express from "express";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const routes = express.Router();

routes.post("/", createUser);
routes.get("/", getAllUsers);
routes.get("/:id", getUserById);
routes.put("/:id", updateUser);
routes.delete("/:id", deleteUser);

export default routes;