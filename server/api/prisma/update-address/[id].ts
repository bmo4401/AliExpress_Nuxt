import { Addresses, OrderItem, Orders, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as Partial<Addresses>;
  const params = event.context.params?.id as string;
  console.log('❄️ ~ file: [id].ts:7 ~ event.context:', event.context);
  const { address, city, country, name, zipcode } = body;
  const res = await prisma.addresses.update({
    where: { id: Number(params) },
    data: {
      address,
      country,
      city,
      name,
      zipcode,
    },
  });
  return res;
});
