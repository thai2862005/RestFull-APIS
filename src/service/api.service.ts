import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getUserByIdApi = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return user;
}
export { getUserByIdApi };