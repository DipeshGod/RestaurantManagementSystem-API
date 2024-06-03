import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('delete all data ...');
  // order of execution matters due to referential integrity
  await prisma.user.deleteMany();

  console.log('start seeding ...');

  //create sysadmin user
  await prisma.user.create({
    data: {
      email: 'admin@email.com',
      name: 'Balen Shah',
      password: 'unencryptedfornow',
      type: 'sysAdmin',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
