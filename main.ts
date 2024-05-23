const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  //! Criação employers
  //   const employer1 = await prisma.employer.create({
  //     data: {
  //       name: "Laura",
  //       email: "Laura@email.com",
  //       post: "Estagiaria",
  //     }
  //   });
  //   const employer2 = await prisma.employer.create({
  //     data: {
  //       name: "Marcos",
  //       email: "Marcos@email.com",
  //       post: "Coordenador",
  //     }
  //   });
  
  //! Consulta
  //   const employers = await prisma.employer.findMany({
  //     where: {
  //       name: { contains: "L" },
  //     },
  //   });
  //! Atualizar
  //   const updatedEmployer = await prisma.employer.update({
  //     where: {
  //       id: "f641a45c-fa2a-410b-9c3a-467d6bec6cd0",
  //     },
  //     data: {
  //       name: "Laure",
  //     },
  //   });
  //! Excluir
  // const deletedEmployer = await prisma.employer.delete({
  //   where: {
  //     id: 'f641a45c-fa2a-410b-9c3a-467d6bec6cd0'
  //   },
  // })
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
