const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      status: true,
      planId: true,
      createdAt: true
    }
  });

  console.log("RECENT ORDERS:");
  console.dir(orders);
}

main().catch(console.error).finally(() => prisma.$disconnect());
