const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: "Alice",
    },
  });

  console.log("Customer created", createdCustomer);

  // Add your code here
  const createdContact = await prisma.contact.create({
    data: {
      phone: "0800 1234 56",
      email: "random@email.com",
      customer: { connect: { id: createdCustomer.id } },
    },
  });

  const createdMovie = await prisma.movie.create({
    data: {
      title: "BAd Shit",
      runtimeMins: 23,
    },
  });

  const createdScreen = await prisma.screen.create({
    data: {
      number: 1,
    },
  });

  const createdScreening = await prisma.screening.create({
    data: {
      startsAt: "2004-12-13T21:39:45.618-08:00",
      movie: { connect: { id: createdMovie.id } },
      screen: { connect: { id: createdScreen.id } },
    },
  });

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
