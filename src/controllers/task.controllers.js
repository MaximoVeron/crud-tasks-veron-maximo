import modelTask from "../models/task.model.js";

export const createTask = async (req, res) => {
  const { title, description, isComplete } = req.body;

  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Los campos 'title' y 'description' son obligatorios" });
    }

    const taskExist = await modelTask.findOne({ where: { title } });
    if (taskExist) {
      return res.status(400).json({ message: "Ya existe una tarea con ese título" });
    }

    const task = await modelTask.create({ title, description, isComplete });
    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al crear la tarea" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await modelTask.findAll();
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al obtener las tareas" });
  }
};


export const getTaskById = async (req, res) => {
  try {
    const task = await modelTask.findByPk(req.params.id);
    if (task) {
      return res.status(200).json(task);
    } else {
      return res.status(404).json({ message: "No se encontró la tarea" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al buscar la tarea" });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, isComplete } = req.body;

  try {
    const { id } = req.params;

    const task = await modelTask.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    if (title && title !== task.title) {
      const titleExist = await modelTask.findOne({ where: { title } });
      if (titleExist) {
        return res.status(400).json({ message: "Ya existe una tarea con ese título" });
      }
    }

    await task.update({ title, description, isComplete });
    return res.status(200).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al actualizar la tarea" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await modelTask.findByPk(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "No se encontró la tarea a eliminar" });
    }

    await task.destroy();
    return res.status(200).json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al eliminar la tarea" });
  }
};