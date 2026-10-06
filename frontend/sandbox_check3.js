const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const latestOrder = await prisma.order.findFirst({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      status: true,
      createdAt: true
    }
  });
  console.log("CREATED_AT:", latestOrder.createdAt);
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
