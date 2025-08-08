import express from "express";

import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controllers.js";

const routes = express.Router();

routes.post("/", createTask);
routes.get("/", getAllTasks);
routes.get("/:id", getTaskById);
routes.put("/:id", updateTask);
routes.delete("/:id", deleteTask);

export default routes;
