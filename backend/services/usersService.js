import models from '../models/index.js';


export const getAllUsers = async () => {
  return await models.User.findAll({
    attributes: { exclude: ['password'] },
  });
};

export const getUserById = async (id) => {
  return await models.User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
};

export const updateUser = async (id, data) => {
  const user = await models.User.findByPk(id);
  if (!user) return null;
  await user.update(data);
  return user;
};

export const deleteUser = async (id) => {
  const user = await models.User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return true;
};

export const getMyProfile = async (userId) => {
    const user = await models.User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'role', 'created_at'],
    });
  
    return user;
  };