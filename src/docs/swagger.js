const swaggerUi = require("swagger-ui-express");

const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "Inventario API",
    version: "1.0.0",
    description:
      "API REST por capas: Categoría, Producto, MovimientoInventario con JWT"
  },
  servers: [{ url: "http://localhost:3000" }],
  components: {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
    },
    schemas: {
      LoginInput: {
        type: "object",
        properties: {
          username: { type: "string", example: "admin" },
          password: { type: "string", example: "admin123" }
        },
        required: ["username", "password"]
      },
      CategoriaInput: {
        type: "object",
        properties: {
          nombre: { type: "string", example: "Bebidas" },
          descripcion: { type: "string", example: "Líquidos y refrescos" }
        },
        required: ["nombre"]
      },
      ProductoInput: {
        type: "object",
        properties: {
          sku: { type: "string", example: "COLA-330" },
          nombre: { type: "string", example: "Cola 330ml" },
          precio: { type: "number", example: 0.8 },
          categoriaId: { type: "integer", example: 1 }
        },
        required: ["sku", "nombre", "precio", "categoriaId"]
      },
      MovimientoInput: {
        type: "object",
        properties: {
          productoId: { type: "integer", example: 1 },
          tipo: { type: "string", enum: ["ENTRADA", "SALIDA"], example: "ENTRADA" },
          cantidad: { type: "integer", example: 10 },
          nota: { type: "string", example: "Compra inicial" }
        },
        required: ["productoId", "tipo", "cantidad"]
      }
    }
  },
  security: [],
  paths: {
    "/api/auth/login": {
      post: {
        summary: "Obtener token JWT (login)",
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/LoginInput" } }
          }
        },
        responses: {
          200: {
            description: "Token JWT generado",
            content: {
              "application/json": {
                example: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
              }
            }
          },
          401: { description: "Credenciales inválidas" }
        }
      }
    },

    "/api/categorias": {
      get: { summary: "Listar categorías", responses: { 200: { description: "OK" } } },
      post: {
        summary: "Crear categoría",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/CategoriaInput" } }
          }
        },
        responses: {
          201: { description: "Creado" },
          400: { description: "Validación" },
          401: { description: "No autorizado" }
        }
      }
    },

    "/api/categorias/{id}": {
      get: {
        summary: "Obtener categoría",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "OK" }, 404: { description: "No encontrado" } }
      },
      put: {
        summary: "Actualizar categoría",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/CategoriaInput" } }
          }
        },
        responses: { 200: { description: "OK" }, 401: { description: "No autorizado" } }
      },
      delete: {
        summary: "Eliminar categoría",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "OK" },
          401: { description: "No autorizado" },
          409: { description: "Conflicto" }
        }
      }
    },

    "/api/productos": {
      get: { summary: "Listar productos", responses: { 200: { description: "OK" } } },
      post: {
        summary: "Crear producto",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/ProductoInput" } }
          }
        },
        responses: {
          201: { description: "Creado" },
          400: { description: "Validación" },
          401: { description: "No autorizado" }
        }
      }
    },

    "/api/productos/{id}": {
      get: {
        summary: "Obtener producto",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "OK" }, 404: { description: "No encontrado" } }
      },
      put: {
        summary: "Actualizar producto",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/ProductoInput" } }
          }
        },
        responses: { 200: { description: "OK" }, 401: { description: "No autorizado" } }
      },
      delete: {
        summary: "Eliminar producto",
        security: [{ bearerAuth: [] }],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          200: { description: "OK" },
          401: { description: "No autorizado" },
          409: { description: "Conflicto" }
        }
      }
    },

    "/api/productos/{id}/kardex": {
      get: {
        summary: "Kárdex del producto",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: { 200: { description: "OK" } }
      }
    },

    "/api/movimientos": {
      get: { summary: "Listar movimientos", responses: { 200: { description: "OK" } } },
      post: {
        summary: "Registrar movimiento (ENTRADA/SALIDA)",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/MovimientoInput" } }
          }
        },
        responses: {
          201: { description: "Creado" },
          401: { description: "No autorizado" },
          409: { description: "Stock insuficiente" }
        }
      }
    },

    "/api/movimientos/producto/{productoId}": {
      get: {
        summary: "Movimientos por producto",
        parameters: [
          { name: "productoId", in: "path", required: true, schema: { type: "integer" } }
        ],
        responses: { 200: { description: "OK" } }
      }
    }
  }
};

module.exports = { swaggerUi, swaggerSpec };
