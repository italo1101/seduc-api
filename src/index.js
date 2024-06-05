const Koa = require('koa');
const Router = require('@koa/router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors'); // Importar o pacote @koa/cors
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const app = new Koa();
const router = new Router();

app.use(cors()); // Usar CORS para permitir todas as origens
app.use(bodyParser());

//* Importar controllers
const employeeController = require('./controllers/employeeController');
const videoBNCCController = require('./controllers/videobnccController');

//! Rotas para Funcionarios
router.post('/employees/create', employeeController.createEmployee);
router.post('/employees/login', employeeController.loginEmployee);
router.get('/employees/get', employeeController.getEmployees);
router.delete('/employees/delete/:id', employeeController.deleteEmployee);
router.put('/employees/update/:id', employeeController.updateEmployee);

//! Rotas para VideosBNCC
router.post('/videosbncc/create', videoBNCCController.createVideoBNCC);
router.get('/videosbncc/get', videoBNCCController.getVideosBNCC);
router.get('/videosbncc/filter', videoBNCCController.getVideosBNCCFilter);
router.put('/videosbncc/update/:id', videoBNCCController.updateVideoBNCC);
router.delete('/videosbncc/delete/:id', videoBNCCController.deleteVideoBNCC);

const PORT = process.env.PORT || 3000;

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
