# Veterinaria Tucumán - Especificación del Proyecto

## 1. Resumen y Alcance

**Objetivo**: Plataforma web de turnos online y gestión de fichas clínicas para una veterinaria de Tucumán.

**Usuarios**: Dueños de mascotas, veterinarios, recepcionistas.

**Plataforma**: Web responsive (prioridad móvil), accesible desde celular.

### Entra en MVP

- Reserva de turnos online (seleccionar profesional, fecha, hora)
- Confirmación/rechazo/reprogramación de turnos por veterinarios
- Ficha clínica de cada mascota (historia médica)
- Recordatorios automáticos de vacunas (email/SMS)
- Panel de administración para recepción y veterinarios
- Notificaciones de cambios de turnos

### NO entra en MVP

- Teleconsultas
- Venta de productos/farmacia
- Integraciones con laboratorios
- Pagos online
- Chat en tiempo real
- Reportes avanzados
- App nativa (solo web responsive)

---

## 2. Usuarios, Roles y Permisos

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Dueño** | Propietario de mascota(s) | Ver/crear turnos propios, ver ficha de sus mascotas, recibir notificaciones |
| **Veterinario** | Profesional atendedor | Ver/confirmar/rechazar/reprogramar turnos asignados, editar fichas de sus pacientes, definir recordatorios de vacunas |
| **Recepción** | Administrador de turnos | Ver todos los turnos, crear/modificar/cancelar turnos, ver todas las fichas, gestionar veterinarios y mascotas |

### Acceso sin autenticación

[SUPUESTO] No se requiere registración; solo login. [SUPUESTO] Recepción hace el registro inicial de dueños.

---

## 3. Historias de Usuario y Criterios de Aceptación

### 3.1 Turnos - Dueño

**HU-1**: Como dueño, quiero reservar un turno online para mi mascota.

- Criterios de aceptación:
  - Ver lista de veterinarios disponibles
  - Seleccionar profesional, fecha y horario disponible
  - Seleccionar mascota (si tengo varias)
  - Reserva queda pendiente de confirmación
  - Recibo email/SMS de confirmación pendiente
- Prueba: dueño completa reserva, aparece en panel del veterinario como "pendiente"

**HU-2**: Como dueño, quiero reprogramar un turno.

- Criterios de aceptación:
  - Turno debe estar confirmado
  - Puedo cambiar fecha/hora
  - Recibo notificación del cambio
  - Veterinario recibe notificación
- Prueba: cambio turno del 25/9 al 26/9, ambos reciben notificación

**HU-3**: Como dueño, quiero cancelar un turno.

- Criterios de aceptación:
  - Turno debe estar pendiente o confirmado (no realizado)
  - Recibo confirmación de cancelación
  - Veterinario recibe notificación
- Prueba: cancelo turno, veterinario ve "cancelado"

### 3.2 Turnos - Veterinario

**HU-4**: Como veterinario, quiero ver mis turnos del día.

- Criterios de aceptación:
  - Ver lista de turnos ordenada por hora
  - Ver estado (pendiente, confirmado, completado, cancelado)
  - Ver nombre mascota, dueño, tipo de consulta
- Prueba: acceso a panel, veo turnos ordenados por hora

**HU-5**: Como veterinario, quiero confirmar o rechazar un turno.

- Criterios de aceptación:
  - Turno pendiente muestra botones confirmar/rechazar
  - Al confirmar, dueño recibe notificación
  - Al rechazar, puedo agregar motivo (opcional)
- Prueba: confirmo turno, dueño recibe notificación inmediata

### 3.3 Turnos - Recepción

**HU-6**: Como recepcionista, quiero crear un turno en nombre del dueño.

- Criterios de aceptación:
  - Buscar/crear dueño
  - Seleccionar mascota
  - Asignar veterinario, fecha, hora
  - Turno queda confirmado directamente
- Prueba: creo turno, aparece confirmado sin paso de dueño

**HU-7**: Como recepcionista, quiero gestionar todos los turnos.

- Criterios de aceptación:
  - Ver todos los turnos (filtrable por veterinario, mascota, estado, fecha)
  - Modificar o cancelar cualquier turno
  - Ver historial de cambios
- Prueba: busco turnos del 25/9, veo todos los del sistema

### 3.4 Fichas Clínicas

**HU-8**: Como dueño, quiero ver la ficha clínica de mi mascota.

- Criterios de aceptación:
  - Ver datos básicos (nombre, raza, edad, sexo)
  - Ver historial médico (consultas pasadas, diagnósticos)
  - Ver vacunas y próximas dosis
- Prueba: accedo a ficha de mi mascota, veo última consulta del 15/9

**HU-9**: Como veterinario, quiero registrar/editar la ficha de mi paciente.

- Criterios de aceptación:
  - Editar datos básicos
  - Agregar registro de consulta (diagnóstico, tratamiento, notas)
  - Registrar vacuna administrada
  - Guardar cambios
- Prueba: registro consulta del 22/9, dueño ve actualización

**HU-10**: Como recepción, quiero gestionar fichas de mascotas.

- Criterios de aceptación:
  - Crear nueva mascota (nombre, raza, edad, sexo, dueño)
  - Editar datos básicos
  - Ver fichas de cualquier mascota
- Prueba: creo mascota "Firulais", aparece en lista

### 3.5 Recordatorios de Vacunas

**HU-11**: Como veterinario, quiero establecer recordatorios de vacuna para mis pacientes.

- Criterios de aceptación:
  - Al editar ficha, puedo marcar próxima vacuna
  - Definir tipo de vacuna y fecha sugerida
  - Sistema enviará recordatorio 7 días antes
- Prueba: defino próxima vacuna para 15/10, dueño recibe email el 8/10

**HU-12**: Como dueño, quiero recibir recordatorios de vacunas de mi mascota.

- Criterios de aceptación:
  - Recibir email/SMS 7 días antes de vencimiento
  - Email incluye tipo de vacuna y fecha
  - Puedo aceptar/posponer en el email
- Prueba: recibo email de recordatorio el día correcto

### 3.6 Panel de Administración

**HU-13**: Como recepcionista, quiero ver dashboard del sistema.

- Criterios de aceptación:
  - Turnos de hoy (total, confirmados, pendientes)
  - Lista de veterinarios disponibles
  - Últimas mascotas registradas
  - Botones de acceso rápido a funciones
- Prueba: accedo a dashboard, veo 8 turnos hoy, 3 pendientes

**HU-14**: Como veterinario, quiero ver mis métricas.

- Criterios de aceptación:
  - Turnos completados esta semana
  - Mascotas atendidas
  - Próximos turnos (próximas 24h)
- Prueba: veo 5 turnos completados esta semana

---

## 4. Modelo de Datos

### 4.1 Tablas

| Tabla | Propósito |
|-------|-----------|
| `users` | Dueños, veterinarios, recepcionistas |
| `mascotas` | Datos de mascotas |
| `fichas_clinicas` | Historial médico de mascota |
| `consultas` | Registros individuales de consultas |
| `turnos` | Reservas de turnos |
| `vacunas` | Historial de vacunas administradas |
| `recordatorios` | Configuración de recordatorios (próximas vacunas) |

### 4.2 Schema

#### users
```
id: UUID PK
email: VARCHAR UNIQUE
password_hash: VARCHAR
nombre: VARCHAR
telefono: VARCHAR
rol: ENUM (dueño, veterinario, recepcion)
activo: BOOLEAN DEFAULT true
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

#### mascotas
```
id: UUID PK
owner_id: UUID FK -> users(id)
nombre: VARCHAR
raza: VARCHAR
edad_years: INT
sexo: ENUM (macho, hembra)
microchip: VARCHAR UNIQUE NULLABLE
notas: TEXT
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

#### fichas_clinicas
```
id: UUID PK
mascota_id: UUID FK -> mascotas(id)
veterinario_id: UUID FK -> users(id)
peso_kg: DECIMAL NULLABLE
altura_cm: INT NULLABLE
observaciones: TEXT
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

#### consultas
```
id: UUID PK
ficha_id: UUID FK -> fichas_clinicas(id)
veterinario_id: UUID FK -> users(id)
turno_id: UUID FK -> turnos(id) NULLABLE
fecha: TIMESTAMP
diagnostico: TEXT
tratamiento: TEXT
notas: TEXT
created_at: TIMESTAMP
```

#### turnos
```
id: UUID PK
mascota_id: UUID FK -> mascotas(id)
veterinario_id: UUID FK -> users(id)
owner_id: UUID FK -> users(id)
fecha_hora: TIMESTAMP
estado: ENUM (pendiente, confirmado, completado, cancelado)
razon_rechazo: TEXT NULLABLE
created_by: UUID FK -> users(id)
created_at: TIMESTAMP
updated_at: TIMESTAMP
```

#### vacunas
```
id: UUID PK
mascota_id: UUID FK -> mascotas(id)
veterinario_id: UUID FK -> users(id)
tipo: VARCHAR (ej: Séxtuple, Rabia, etc)
fecha_aplicacion: TIMESTAMP
proxima_dosis_sugerida: DATE NULLABLE
created_at: TIMESTAMP
```

#### recordatorios
```
id: UUID PK
mascota_id: UUID FK -> mascotas(id)
owner_id: UUID FK -> users(id)
tipo: ENUM (vacuna, consulta)
referencia_id: UUID (vacuna_id o turno_id)
fecha_programada: DATE
enviado: BOOLEAN DEFAULT false
fecha_envio: TIMESTAMP NULLABLE
created_at: TIMESTAMP
```

---

## 5. Pantallas y Navegación

### 5.1 Estructura General

```
/
├── (auth)
│   ├── login
│   └── forgot-password
├── (app)
│   ├── dueño
│   │   ├── mis-turnos
│   │   ├── mis-mascotas
│   │   ├── mascota/[id]
│   │   └── perfil
│   ├── veterinario
│   │   ├── dashboard
│   │   ├── mis-turnos
│   │   ├── pacientes
│   │   ├── mascota/[id]
│   │   └── perfil
│   └── recepcion
│       ├── dashboard
│       ├── turnos
│       ├── mascotas
│       ├── dueños
│       └── veterinarios
└── admin
    └── (solo para dev/testing)
```

### 5.2 Pantallas Clave

#### Dueño

| Pantalla | Componentes |
|----------|-------------|
| **Mis Turnos** | Lista de turnos (próximos, pasados), botones reprogramar/cancelar |
| **Mis Mascotas** | Tarjetas de mascotas, acceso a ficha clínica |
| **Mascota [id]** | Datos, historial, vacunas, próximas vacunas |
| **Nuevo Turno** | Seleccionar veterinario → fecha → hora → confirmar |
| **Perfil** | Editar email, teléfono, nombre |

#### Veterinario

| Pantalla | Componentes |
|----------|-------------|
| **Dashboard** | Resumen hoy, turnos próximas 24h, métricas |
| **Mis Turnos** | Calendario/lista, filtrar por estado |
| **Mascota [id]** | Ficha completa, agregar consulta, registrar vacuna |
| **Pacientes** | Lista de mascotas atendidas |

#### Recepción

| Pantalla | Componentes |
|----------|-------------|
| **Dashboard** | Resumen general, turnos del día, veterinarios |
| **Turnos** | Tabla de todos los turnos, crear, editar, cancelar |
| **Mascotas** | Tabla de mascotas, crear, buscar |
| **Dueños** | Tabla de dueños, crear, editar |
| **Veterinarios** | Tabla de veterinarios, activos/inactivos |

---

## 6. Estructura de Carpetas y Convenciones

```
veterinaria/
├── docs/
│   └── PROYECTO.md (este archivo)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── forgot-password/
│   │   ├── (app)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx (redirect a rol)
│   │   │   ├── dueno/
│   │   │   ├── veterinario/
│   │   │   └── recepcion/
│   │   └── layout.tsx (root)
│   ├── components/
│   │   ├── auth/
│   │   ├── turno/
│   │   ├── mascota/
│   │   ├── ficha/
│   │   └── common/
│   ├── lib/
│   │   ├── db.ts (conexión PostgreSQL)
│   │   ├── auth.ts (sesiones/JWT)
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts (tipos globales)
│   └── services/
│       ├── turnoService.ts
│       ├── mascotaService.ts
│       └── notificationService.ts
├── public/
├── prisma/
│   └── schema.prisma
├── .env.local (secretos)
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── README.md
```

### Convenciones de Código

- **TypeScript strict mode** obligatorio
- **Nombres de funciones**: camelCase, verbos claros (createTurno, fetchVeterinarios)
- **Componentes React**: PascalCase, funcionales con hooks
- **Archivos de utilidad**: snake_case (turno_service.ts)
- **Variables de ambiente**: UPPERCASE_WITH_UNDERSCORES
- **Imports ordenados**: React → librerías → tipos → componentes → utils
- **Props interface**: `interface [ComponentName]Props`
- **Estilos**: Tailwind (sin CSS custom)

---

## 7. Plan por Etapas

### Etapa 1: Setup & Auth (Verificable: login funciona)

- [x] Crear proyecto Next.js con TypeScript
- [ ] Instalar dependencias (Prisma, PostgreSQL, Tailwind, etc)
- [ ] Conectar base de datos PostgreSQL
- [ ] Implementar autenticación (email/password)
- [ ] Crear tabla `users` con seed de 3 usuarios (dueño, vet, recepcion)
- [ ] Páginas de login y forgot-password
- [ ] Middleware de autorización por rol

**Criterio de aceptación**: Usuario puede hacer login con email/password, accede a dashboard según rol.

---

### Etapa 2: Gestión de Mascotas (Verificable: crear/ver ficha mascota)

- [ ] Crear tablas `mascotas` y `fichas_clinicas`
- [ ] Pantalla "Mis Mascotas" para dueño
- [ ] Pantalla "Mascota [id]" con datos y historia
- [ ] Panel de recepción: crear mascota, ver todas
- [ ] Editar datos básicos de mascota
- [ ] Relacionar mascota con dueño

**Criterio de aceptación**: Dueño ve sus mascotas, recepción crea mascota nueva, datos persisten.

---

### Etapa 3: Turnos - Flujo Completo (Verificable: turno de pendiente a confirmado)

- [ ] Crear tabla `turnos`
- [ ] Pantalla "Nuevo Turno": dueño selecciona vet → fecha → hora
- [ ] Listar horarios disponibles (validar ausencias del veterinario)
- [ ] Dashboard veterinario: ver turnos pendientes
- [ ] Confirmar/rechazar turno (veterinario)
- [ ] Notificaciones básicas (simuladas, log en consola)
- [ ] Pantalla "Mis Turnos" para dueño
- [ ] Reprogramar turno
- [ ] Cancelar turno

**Criterio de aceptación**: 
1. Dueño crea turno → veterinario ve pendiente
2. Veterinario confirma → dueño ve confirmado
3. Dueño puede reprogramar o cancelar

---

### Etapa 4: Fichas Clínicas (Verificable: agregar consulta, ver en ficha)

- [ ] Crear tabla `consultas`
- [ ] Pantalla: agregar consulta (veterinario)
- [ ] Campos: diagnóstico, tratamiento, notas
- [ ] Relacionar consulta con turno (opcional, pero recomendado)
- [ ] Historial de consultas en ficha (visible para dueño + vet)
- [ ] Editar datos de ficha (peso, altura, observaciones)

**Criterio de aceptación**: Veterinario registra consulta post-turno, dueño ve actualización en ficha.

---

### Etapa 5: Vacunas y Recordatorios (Verificable: recordatorio enviado)

- [ ] Crear tablas `vacunas` y `recordatorios`
- [ ] Veterinario registra vacuna administrada
- [ ] Veterinario define próxima dosis sugerida
- [ ] Job programado (cron) que busca recordatorios a enviar
- [ ] [SUPUESTO] Notificaciones por consola primero, luego email/SMS
- [ ] Dueño recibe recordatorio 7 días antes

**Criterio de aceptación**: Vacuna programada para 15/10, dueño recibe notificación el 8/10.

---

### Etapa 6: Panel de Recepción (Verificable: dashboard muestra resumen)

- [ ] Dashboard: turnos hoy (total, pendientes, confirmados)
- [ ] Lista completa de turnos (con filtros: vet, estado, fecha)
- [ ] Crear turno en nombre del dueño
- [ ] Ver todas las mascotas
- [ ] Ver todos los dueños
- [ ] Gestionar veterinarios (activos/inactivos)

**Criterio de aceptación**: Recepcionista ve dashboard, puede crear turno, filtrar turnos.

---

### Etapa 7: Refinamientos y Deploy (Verificable: app en producción)

- [ ] Testing: pruebas de flujos críticos
- [ ] Notificaciones reales (email con SendGrid/similar)
- [ ] Optimizar queries N+1
- [ ] Documentar API
- [ ] Deploy a hosting (Vercel)
- [ ] Configurar variables de ambiente en prod
- [ ] Seed de datos de prueba
- [ ] Manual de usuario

**Criterio de aceptación**: Sitio está en vivo, todos los flujos funcionan en producción.

---

## 8. Notas de Implementación

- [SUPUESTO] Base de datos local en desarrollo (PostgreSQL en Docker)
- [SUPUESTO] Notificaciones simuladas en consola hasta Etapa 7
- [SUPUESTO] Sin paginación inicial, agregar si dataset crece
- [SUPUESTO] Horarios fijos por veterinario (ej: 9-13, 14-18), sin disponibilidad dinámica por turno
- [SUPUESTO] Un solo veterinario por turno (no turnos compartidos)
- [SUPUESTO] Moneda/precios fuera de MVP
- [SUPUESTO] Sin sistema de pagos online

---

## 9. Stack Confirmado

| Componente | Tecnología |
|-----------|-----------|
| Framework | Next.js 14+ (App Router) |
| Lenguaje | TypeScript |
| Base de datos | PostgreSQL |
| ORM | Prisma |
| Estilos | Tailwind CSS |
| UI Components | Shadcn/ui (opcional pero recomendado) |
| Autenticación | NextAuth.js o JWT personalizado |
| Deploy | Vercel |

---

**Documento creado**: 2026-09-25  
**Estado**: Listo para iniciar Etapa 1
