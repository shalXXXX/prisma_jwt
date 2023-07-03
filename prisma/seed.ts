import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  const users: Prisma.UserCreateInput[] = [
    {
      email: "test01@test.com",
      name: "testuser01",
      password: "test01",
    },
    {
      email: "test02@test.com",
      name: "testuser02",
      password: "test02",
    },
    {
      email: "test03@test.com",
      name: "testuser03",
      password: "test03",
    },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })