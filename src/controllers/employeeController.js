const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createEmployee(ctx) {
  try {
    const { name, email, post } = ctx.request.body;
    const newEmployee = await prisma.employer.create({
      data: {
        name,
        email,
        post,
      },
    });
    ctx.body = newEmployee;
  } catch (error) {
    console.error("Erro ao cadastrar o funcionário:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao cadastrar o funcionário" };
  }
}

async function getEmployees(ctx) {
  try {
    const employees = await prisma.employer.findMany();
    ctx.body = employees;
  } catch (error) {
    console.error("Erro ao buscar os funcionários:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao buscar os funcionários" };
  }
}

async function deleteEmployee(ctx) {
  try {
    const { id } = ctx.params;
    await prisma.employer.delete({
      where: {
        id: id,
      },
    });
    ctx.status = 204;
  } catch (error) {
    console.error("Erro ao excluir o funcionário:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao excluir o funcionário" };
  }
}
async function updateEmployee(ctx) {
  try {
    const { id } = ctx.params;
    const { name, email, post } = ctx.request.body;
    const updatedEmployee = await prisma.employer.update({
      where: {
        id: id,
      },
      data: {
        name,
        email,
        post,
      },
    });
    ctx.body = updatedEmployee;
  } catch (error) {
    console.error("Erro ao atualizar o funcionário:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao atualizar o funcionário" };
  }
}
module.exports = {
  createEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
};
