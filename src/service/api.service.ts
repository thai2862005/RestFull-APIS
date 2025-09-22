import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const prisma = new PrismaClient();

const getUserByIdApi = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}


const getAllUsersApi = async () => {
  const users = await prisma.user.findMany();
  return users;
}

const createUserApi = async (name: string, email: string,address:string,password:string) => {
  const hashPassworded = await hashPassword(password);
  const newUser = await prisma.user.create({
    data: { name, email, address, password: hashPassworded },
  });
  return newUser;
}

const DeleteUserApi = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
}

const updateUserApi = async (id: number, name: string, email: string, address: string, password: string) => {
  const hashedPassword = await hashPassword(password); // hash lại
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name, email, address, password: hashedPassword },
  });
  return updatedUser;
};

const hashPassword = async (plainText: string) => {
    return await bcrypt.hash(plainText, saltRounds);
  }




  const comparePassword = async (plainText: string, hashPassword: string) => {
    return await bcrypt.compare(plainText, hashPassword);
  }

  const handleLogin = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    throw new Error(`Email: ${email} not found`);
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }

  const payload = { id: user.id, name: user.name, email: user.email };
  const accessToken = jwt.sign(payload, "HHT_SECRET", { expiresIn: '1h' });
  return accessToken;
};

export { getUserByIdApi, getAllUsersApi, createUserApi, DeleteUserApi, updateUserApi, hashPassword, comparePassword, handleLogin };