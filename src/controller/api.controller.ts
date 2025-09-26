import { Request, Response } from 'express';
import { createUserApi, DeleteUserApi, getAllUsersApi, getUserByIdApi, handleLogin, updateUserApi, } from '../service/api.service';

const getUserById = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = await getUserByIdApi(userId);
  if (user) {
    res.status(200).json({ data: user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
  const   fetchAccountApi = async (req: Request, res: Response) => {
   const user = (req as any).user;
   res.status(200).json({ data: user });
  }
const getAllUserApi = async (req: Request, res: Response  ) => {
  // const users = await getAllUsersApi();
  const users = (req as any).user;
  console.log("check users", users);
  try {
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(404).json({ message: 'no users found', data: null });
  }

};

const postCreateUserApi = async (req: Request, res: Response) => {

  const{username,fullname,address,password,roleId} = req.body;
  if(!username || !fullname || !address || !password || !roleId){
    return res.status(400).json({message: 'Missing required fields: fullname, username, address, password and roleId'});
  }
  const newUser = await createUserApi(fullname, username, address, password, roleId);
  res.status(201).json({ data: newUser, message: 'User created successfully' });
}
const DeleteUserapi = async (req: Request, res: Response) => {
  const{id} = req.params
  const deletedUser = await DeleteUserApi(+id);
  try{
    res.status(200).json({data: deletedUser, message: 'User deleted successfully'});
  }catch(error){
    res.status(404).json({message: 'User not found'});
  }
}

const putUpdateUserApi = async (req: Request, res: Response) => {
  const {fullname, username, address, password, roleId} = req.body;
  const {id} = req.params;
  if(!fullname || !username || !address || !password || !roleId){
    return res.status(400).json({message: 'Missing required fields: fullname, username, address, password and roleId'});
  }
  const updatedUser = await updateUserApi(+id, fullname, username, address, password, roleId);
  try{
    res.status(200).json({data: updatedUser, message: 'User updated successfully'});
  }catch(error){
    res.status(404).json({message: 'User not found'});
  }
}
//login api
const loginApi = async (req: Request, res: Response) => {
  const {username,password} = req.body;
  try {
    const access_token = await handleLogin(username,password);
    res.status(200).json({data: {access_token}, message: 'Login successful'});
  } catch (error) {
    res.status(401).json({message: error.message,data:null});
  }
}

export { getUserById, getAllUserApi, postCreateUserApi, DeleteUserapi, putUpdateUserApi, loginApi ,fetchAccountApi};