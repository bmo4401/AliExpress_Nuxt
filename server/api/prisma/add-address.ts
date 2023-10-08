import { Addresses, OrderItem, Orders, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Addresses;
  const { address, city, country, name, userId, zipcode } = body;
  const order = await prisma.addresses.create({
    data: {
      userId,
      address,
      country,
      city,
      name,
      zipcode,
    },
  });
  return order;
});
