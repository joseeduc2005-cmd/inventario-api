const app = require("./app");
const { syncModels } = require("./entities");

const PORT = process.env.PORT || 3000;

(async () => {
  await syncModels();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Swagger UI en      http://localhost:${PORT}/api-docs`);
  });
})();
