import { Addresses, OrderItem, Orders, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const params = event.context.params?.id as string;
  const orders = await prisma.orders.findMany({
    where: {
      userId: params,
    },
    orderBy: {
      id: 'desc',
    },
    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });
  return orders;
});
