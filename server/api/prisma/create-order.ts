import { Addresses, OrderItem, Orders, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Orders & { products: OrderItem[] };
  const { address, city, country, name, userId, zipcode, stripeId, products } =
    body;
  const order = await prisma.orders.create({
    data: {
      userId,
      stripeId,
      address,
      country,
      city,
      name,
      zipcode,
    },
  });
  products.forEach(async (prod) => {
    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId: Number(prod.id),
      },
    });
  });
});
