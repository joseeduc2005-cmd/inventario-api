INVENTARIO API – GESTIÓN DE RESTAURANTE
========================================

API REST estructurada en capas (Entidad → Servicio → Controlador) desarrollada con Node.js, Express, Sequelize y JWT.
Permite gestionar la información de clientes, mesas y reservas dentro de un restaurante, aplicando autenticación con tokens y validaciones avanzadas.

----------------------------------------------------
CARACTERÍSTICAS PRINCIPALES
----------------------------------------------------
- Arquitectura en capas (modelo profesional)
- Autenticación JWT
- Documentación automática con Swagger UI
- Validación de datos con Zod
- Control de solapamiento de reservas (una mesa no puede tener dos reservas en el mismo horario)
- Persistencia con SQLite (Sequelize ORM)
- Endpoints REST CRUD completos

----------------------------------------------------
INSTALACIÓN Y EJECUCIÓN
----------------------------------------------------
1. Clona el repositorio:
   git clone https://github.com/joseeduc2005-cmd/inventario-api.git
   cd inventario-api

2. Instala las dependencias:
   npm install

3. Ejecuta en modo desarrollo:
   npm run dev

4. Accede a Swagger:
   http://localhost:3000/api-docs

----------------------------------------------------
ESTRUCTURA DEL PROYECTO
----------------------------------------------------
src/
├── config/         → Configuración de la base de datos (Sequelize + SQLite)
├── entities/       → Modelos (Cliente, Mesa, Reserva)
├── services/       → Lógica de negocio y validaciones adicionales
├── controllers/    → Controladores que gestionan las peticiones HTTP
├── routes/         → Rutas API (organizadas por recurso)
├── middlewares/    → Validación de datos y autenticación JWT
├── docs/           → Documentación Swagger
└── app.js          → Configuración principal del servidor Express

----------------------------------------------------
AUTENTICACIÓN
----------------------------------------------------
Para acceder a los endpoints protegidos:

1. Autentícate con:
   POST /api/auth/login

   {
     "username": "admin",
     "password": "admin123"
   }

2. Copia el token JWT recibido.

3. En Swagger, haz clic en "Authorize" e ingrésalo así:
   Bearer <tu_token>

----------------------------------------------------
ENDPOINTS PRINCIPALES
----------------------------------------------------
| Método | Ruta                        | Descripción                       | Protección |
|---------|-----------------------------|-----------------------------------|-------------|
| POST    | /api/auth/login             | Obtener token JWT                 | No requiere |
| GET     | /api/clientes               | Listar clientes                   | No requiere |
| POST    | /api/clientes               | Crear cliente                     | Requiere JWT |
| GET     | /api/mesas                  | Listar mesas                      | No requiere |
| POST    | /api/mesas                  | Crear mesa                        | Requiere JWT |
| GET     | /api/reservas               | Listar reservas                   | No requiere |
| POST    | /api/reservas               | Crear reserva                     | Requiere JWT |
| PATCH   | /api/reservas/{id}/cancelar | Cancelar reserva                  | Requiere JWT |

----------------------------------------------------
EJEMPLO DE RESERVA VÁLIDA
----------------------------------------------------
{
  "clienteId": 1,
  "mesaId": 1,
  "inicio": "2025-10-17T19:00:00.000Z",
  "fin": "2025-10-17T20:00:00.000Z",
  "estado": "PENDIENTE",
  "notas": "Cumpleaños familiar"
}

----------------------------------------------------
TECNOLOGÍAS UTILIZADAS
----------------------------------------------------
- Node.js + Express
- SQLite / Sequelize
- Zod para validaciones
- JWT para autenticación
- Swagger UI para documentación
- Nodemon para desarrollo continuo

----------------------------------------------------
AUTOR
----------------------------------------------------
José Cordero  
Universidad Católica de Cuenca (UCACUE)  
Cuenca, Ecuador  

Repositorio: https://github.com/joseeduc2005-cmd/inventario-api
