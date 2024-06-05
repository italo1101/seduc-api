const nodemailer = require('nodemailer');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.recoverPassword = async (ctx) => {
  const { name, email } = ctx.request.body;

  if (!name || !email) {
    ctx.status = 400;
    ctx.body = { message: 'Nome e email são obrigatórios.' };
    return;
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    ctx.status = 404;
    ctx.body = { message: 'Conta não encontrada. Por favor, crie uma conta.' };
    return;
  }

  // Configurar o transportador de email
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperação de Senha - EducaRecife',
    text: `Olá ${name},\n\nVocê solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:\n\nhttp://localhost:3000/redefinir-senha?token=uniqueToken\n\nSe você não solicitou esta recuperação, ignore este email.\n\nObrigado,\nEquipe EducaRecife`,
  };

  try {
    await transporter.sendMail(mailOptions);
    ctx.status = 200;
    ctx.body = { message: 'Email de recuperação enviado com sucesso!' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: 'Erro ao enviar email de recuperação.' };
  }
};
