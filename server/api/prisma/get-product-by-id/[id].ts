import { Addresses, OrderItem, Orders, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const params = event.context.params?.id as string;
  const product = await prisma.products.findFirst({
    where: {
      id: Number(params),
    },
  });
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' });
  }

  return product;
});
