import { getPrisma } from "./dbPostgre";

async function main() {
  const prisma = getPrisma();
  
  await prisma.user.createMany({
    data: [
      {
        name: "Leo Tobing",
        email: "leo@example.com",
      },
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
      },
    ],
  });
  
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});