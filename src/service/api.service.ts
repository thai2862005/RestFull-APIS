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

  const createUserApi = async (fullname:string,username:string,address:string,password:string,roleId:number) => {
    const hashPassworded = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: { fullname, username, address, password: hashPassworded, roleId },
    });
    return newUser;
  }

  const DeleteUserApi = async (id: number) => {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }

  const updateUserApi = async (id: number, fullname: string, username: string, address: string, password: string, roleId: number) => {
    const hashedPassword = await hashPassword(password); // hash lại
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { fullname, username, address, password: hashedPassword, roleId },
    });
    return updatedUser;
  };

  const hashPassword = async (plainText: string) => {
      return await bcrypt.hash(plainText, saltRounds);
    }




    const comparePassword = async (plainText: string, hashPassword: string) => {
      return await bcrypt.compare(plainText, hashPassword);
    }

    const handleLogin = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: true }, 
    });

    if (!user) {
      throw new Error(`Username ${username} not found`);
    }

    const isMatch = await comparePassword(password, user.password!);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const secretKey :any = process.env.SECRET_KEY;
    const expiresIn :any = process.env.EXPIRES_IN;

    const payload = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      roleId: user.roleId,
      role: user.role
    }

    const access_token = jwt.sign(payload, secretKey, { expiresIn });
    return access_token;
  };
  export { getUserByIdApi, getAllUsersApi, createUserApi, DeleteUserApi, updateUserApi, hashPassword, comparePassword, handleLogin };