import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

async function main() {
  const connectionString = `${process.env.DATABASE_URL}`;
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    const count = await prisma.property.count();
    console.log(`Property count: ${count}`);
    const properties = await prisma.property.findMany();
    console.log("Properties:", JSON.stringify(properties, null, 2));
  } catch (error) {
    console.error("Error fetching properties:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
