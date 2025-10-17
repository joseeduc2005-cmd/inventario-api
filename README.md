#  Inventario API – Gestión de Restaurante

API REST estructurada en capas (**Entidad → Servicio → Controlador**) desarrollada con **Node.js**, **Express**, **Sequelize** y **JWT**.  
Permite gestionar la información de **clientes, mesas y reservas** dentro de un restaurante, aplicando autenticación con tokens y validaciones avanzadas.

---

##  Características principales

- Arquitectura en capas (modelo profesional)
- Autenticación JWT
- Documentación automática con **Swagger UI**
- Validación de datos con **Zod**
- Control de solapamiento de reservas (una mesa no puede tener dos reservas en el mismo horario)
- Persistencia con **SQLite (Sequelize ORM)**
- Endpoints REST CRUD completos

---

##  Instalación y ejecución

1️ Clona el repositorio:

```bash
git clone https://github.com/joseeduc2005-cmd/inventario-api.git
cd inventario-api
