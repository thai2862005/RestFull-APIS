import { PrismaClient } from '@prisma/client';
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

const createUserApi = async (name: string, email: string,address:string) => {
  const newUser = await prisma.user.create({
    data: { name, email, address },
  });
  return newUser;
}

const DeleteUserApi = async (id: number) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
}

const updateUserApi = async (id: number, name: string, email: string,address:string) => {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name, email, address },
  });
  return updatedUser;
}
export { getUserByIdApi, getAllUsersApi, createUserApi, DeleteUserApi, updateUserApi };