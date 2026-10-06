const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const envFile = fs.readFileSync('.env', 'utf-8');
  let appId, secretKey;
  for (const line of envFile.split('\n')) {
    if (line.startsWith('CASHFREE_APP_ID=')) appId = line.split('=')[1].replace(/"/g, '');
    if (line.startsWith('CASHFREE_SECRET_KEY=')) secretKey = line.split('=')[1].replace(/"/g, '');
  }

  const latestOrder = await prisma.order.findFirst({
    orderBy: { createdAt: 'desc' },
    select: { id: true }
  });
  
  const order_id = latestOrder.id;
  console.log("Checking order:", order_id);
  console.log("APP ID:", appId.substring(0, 5) + '...');
  
  const baseUrl = `https://sandbox.cashfree.com/pg/orders/${order_id}`;
  const cfRes = await fetch(baseUrl, {
    method: 'GET',
    headers: {
      'x-api-version': '2025-01-01',
      'x-client-id': appId,
      'x-client-secret': secretKey,
    }
  });

  console.log("STATUS:", cfRes.status);
  const data = await cfRes.json();
  console.log("CF_ORDER_STATUS:", data.order_status);
}
main().catch(console.error).finally(() => prisma.$disconnect());
