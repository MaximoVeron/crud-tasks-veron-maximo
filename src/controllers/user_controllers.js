import modelUser from "../modules/user.modules.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name)
      return res.status(400).json({ message: "El campo `name` es obligatorio" });

    if (!email)
      return res.status(400).json({ message: "El campo `email` es obligatorio" });

    if (!password)
      return res.status(400).json({ message: "El campo `password` es obligatorio" });

    const userExist = await modelUser.findOne({ where: { email } });
    if (userExist)
      return res.status(400).json({ message: "Ya existe un usuario con este email" });

    const user = await modelUser.create({
      name,
      email,
      password,
    });

    return res.status(201).json(user);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al crear el usuario" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await modelUser.findAll();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Hubo un error al obtener los usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await modelUser.findByPk(req.params.id);
    
    if (user)
      return res.status(200).json(user);
    else
      return res.status(404).json({ message: "No se encontró el usuario" });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al buscar el usuario" });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const { id } = req.params;

    const user = await modelUser.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (email) {
      const existingEmail = await modelUser.findOne({ where: { email } });
      if (existingEmail && existingEmail.id !== parseInt(id)) {
        return res.status(400).json({ message: "Ya existe un usuario con ese email" });
      }
    }

    await user.update({ name, email, password });

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un problema al actualizar el usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await modelUser.findByPk(req.params.id);

    if (user) {
      await user.destroy();
      return res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      return res.status(404).json({ message: "No se encontró el usuario a eliminar" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al eliminar el usuario" });
  }
};



