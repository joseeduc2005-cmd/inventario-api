const { z } = require("zod");

const categoriaSchema = z.object({
  nombre: z.string().min(2),
  descripcion: z.string().max(255).optional().or(z.literal("")),
});

const productoSchema = z.object({
  sku: z.string().min(2),
  nombre: z.string().min(2),
  precio: z.number().nonnegative(),
  categoriaId: z.number().int().positive(),
});

const movimientoSchema = z.object({
  productoId: z.number().int().positive(),
  tipo: z.enum(["ENTRADA", "SALIDA"]),
  cantidad: z.number().int().positive(),
  nota: z.string().max(255).optional().or(z.literal("")),
});

module.exports = { categoriaSchema, productoSchema, movimientoSchema };
