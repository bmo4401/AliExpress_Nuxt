import { Addresses, OrderItem, Orders, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const params = event.context.params?.id as string;
  const items = await prisma.products.findMany({
    take: 5,
    where: {
      title: {
        contains: params,
        mode: 'insensitive',
      },
    },
  });
  return items;
});
