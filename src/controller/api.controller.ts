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

const getAllUserApi = async (req: Request, res: Response) => {
  const users = await getAllUsersApi();
  if(users && users.length > 0){
    res.status(200).json({ data: users });
  } else {
    res.status(404).json({ message: 'No users found' });
  }

};

const postCreateUserApi = async (req: Request, res: Response) => {

  const{email,name,address,password} = req.body;
  if(!email || !name || !address || !password){
    return res.status(400).json({message: 'Missing required fields: name, email, address and password'});
  }
  const newUser = await createUserApi(name, email,address,password);
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
  const {name, email,address,password} = req.body;
  const {id} = req.params;
  if(!name || !email || !address || !password){
    return res.status(400).json({message: 'Missing required fields: name, email, address and password'});
  }
  const updatedUser = await updateUserApi(+id, name, email,address,password);
  try{
    res.status(200).json({data: updatedUser, message: 'User updated successfully'});
  }catch(error){
    res.status(404).json({message: 'User not found'});
  }
}
//login api
const loginApi = async (req: Request, res: Response) => {
  const {email,password} = req.body;
  try {
    const accessToken = await handleLogin(email,password);
    res.status(200).json({data: {accessToken}, message: 'Login successful'});
  } catch (error) {
    res.status(401).json({message: error.message,data:null});
  }
}

export { getUserById, getAllUserApi, postCreateUserApi, DeleteUserapi, putUpdateUserApi, loginApi };