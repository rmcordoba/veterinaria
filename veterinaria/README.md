# Veterinaria Tucumán

Plataforma web de turnos online y gestión de fichas clínicas para una veterinaria de Tucumán.

## Stack

- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript
- **Base de datos**: PostgreSQL
- **ORM**: Prisma
- **Estilos**: Tailwind CSS
- **Autenticación**: NextAuth.js o JWT personalizado
- **Deploy**: Vercel

## Requisitos

- Node.js 18+
- npm o yarn
- PostgreSQL (Docker recomendado)

## Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   ```bash
   cp .env.local.example .env.local
   ```

4. Ejecutar base de datos (con Docker):
   ```bash
   docker compose up -d
   ```

5. Ejecutar migraciones:
   ```bash
   npx prisma migrate dev
   ```

6. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

El sitio estará disponible en http://localhost:3000

## Estructura del Proyecto

Ver `/docs/PROYECTO.md` para documentación completa.

## Desarrollo

- **Etapa 1**: Setup & Auth
- **Etapa 2**: Gestión de Mascotas
- **Etapa 3**: Turnos - Flujo Completo
- **Etapa 4**: Fichas Clínicas
- **Etapa 5**: Vacunas y Recordatorios
- **Etapa 6**: Panel de Recepción
- **Etapa 7**: Refinamientos y Deploy

Consulta `/docs/PROYECTO.md` para el plan detallado.

## Convenciones de Código

- **TypeScript strict mode** obligatorio
- **Nombres de funciones**: camelCase
- **Componentes React**: PascalCase
- **Archivos de utilidad**: snake_case
- **Variables de ambiente**: UPPERCASE_WITH_UNDERSCORES
