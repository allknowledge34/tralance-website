const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const latestOrder = await prisma.order.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  if (!latestOrder) {
    console.log("No orders found.");
    return;
  }

  console.log("ORDER_ID:", latestOrder.id);
  console.log("ORDER_STATUS:", latestOrder.status);
  console.log("PLAN_ID:", latestOrder.planId);
  console.log("AMOUNT:", latestOrder.amount);
  
  const entitlements = await prisma.entitlement.findMany({
    where: { userId: latestOrder.userId }
  });
  
  console.log("ENTITLEMENTS:", JSON.stringify(entitlements, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
