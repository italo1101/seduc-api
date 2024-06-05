const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

async function createEmployee(ctx) {
  try {
    const { name, email, post, password } = ctx.request.body;
    const existingEmployee = await prisma.employer.findUnique({ where: { email } });

    if (existingEmployee) {
      ctx.status = 400;
      ctx.body = { message: "Colaborador já cadastrado" };
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = await prisma.employer.create({
      data: {
        name,
        email,
        post,
        password: hashedPassword,
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
        id: parseInt(id),
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
    const { name, email, post, password } = ctx.request.body;
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;
    const updatedEmployee = await prisma.employer.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        post,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });
    ctx.body = updatedEmployee;
  } catch (error) {
    console.error("Erro ao atualizar o funcionário:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao atualizar o funcionário" };
  }
}

async function loginEmployee(ctx) {
  try {
    const { email, password } = ctx.request.body;
    const employee = await prisma.employer.findUnique({
      where: { email },
    });

    if (!employee) {
      ctx.status = 401;
      ctx.body = { message: "Usuário não encontrado" };
      return;
    }

    // Comparando a senha fornecida com a senha hash armazenada no banco de dados
    const validPassword = await bcrypt.compare(password, employee.password);

    if (!validPassword) {
      ctx.status = 401;
      ctx.body = { message: "Senha incorreta" };
      return;
    }

    const token = jwt.sign({ id: employee.id }, employee.password, {
      expiresIn: "1h",
    });

    ctx.body = { token };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    ctx.status = 500;
    ctx.body = { error: "Erro ao fazer login" };
  }
}

module.exports = {
  createEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
  loginEmployee,
};