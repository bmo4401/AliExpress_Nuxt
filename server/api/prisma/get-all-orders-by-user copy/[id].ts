import { Addresses, OrderItem, Orders, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const params = event.context.params?.id as string;
  const res = await prisma.addresses.findMany({
    where: {
      userId: params,
    },
  });
  return res;
});
