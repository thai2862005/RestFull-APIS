import { Request, Response } from 'express';
import { createUserApi, getAllUsersApi, getUserByIdApi, } from '../service/api.service';

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

  const{email,name,address} = req.body;
  if(!email || !name || !address){
    return res.status(400).json({message: 'Missing required fields: name, email and address'});
  }
  const newUser = await createUserApi(name, email,address);
  res.status(201).json({ data: newUser, message: 'User created successfully' });
}

export { getUserById, getAllUserApi, postCreateUserApi };