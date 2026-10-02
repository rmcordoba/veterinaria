# Supuestos Resueltos - Proyecto Veterinaria Tucumán

## Índice de Supuestos

| # | Supuesto | Estado | Implicaciones |
|---|----------|--------|--------------|
| 1 | No hay auto-registración | ✅ CONFIRMADO | Solo login. Recepción crea dueños. |
| 2 | Notificaciones iniciales en consola | ✅ CONFIRMADO | Luego se integran email/SMS en Etapa 7 |
| 3 | PostgreSQL local en Docker | ✅ CONFIRMADO | Desarrollo aislado, producción en RDS/similar |
| 4 | Sin paginación inicial | ✅ CONFIRMADO | Agregar cuando dataset > 500 registros |
| 5 | Horarios fijos por veterinario | ✅ CONFIRMADO | Ej: 9-13, 14-18 lunes a viernes |
| 6 | Un veterinario por turno | ✅ CONFIRMADO | No turnos compartidos o grupo |
| 7 | Sin moneda/precios en MVP | ✅ CONFIRMADO | Fuera de alcance inicial |
| 8 | Sin pagos online | ✅ CONFIRMADO | Pago offline, facturación futura |
| 9 | No hay auto-registración de veterinarios | ✅ IMPLÍCITO | Solo recepción/admin crean usuarios |

---

## Detalle de Cada Supuesto

### 1️⃣ SUPUESTO: No hay auto-registración (línea 42)

**Decisión**: ✅ CONFIRMADO

**Justificación**:
- Control sobre quién accede a datos sensibles de mascotas
- Recepción valida identidad de dueños
- Evita cuentas spam/duplicadas

**Implicaciones**:
- Dueño NO puede crear cuenta por sí mismo
- Recepción crea usuario + envía credentials por email/SMS
- Flujo: Dueño llama → recepción lo registra → recibe password temporal
- Pantalla de login existe, pantalla de sign-up NO existe

**Implementación**:
```
POST /api/auth/register  [SOLO para recepción con autenticación]
POST /api/auth/login     [Para todos]
```

---

### 2️⃣ SUPUESTO: Notificaciones iniciales en consola (línea 476)

**Decisión**: ✅ CONFIRMADO  
**Etapa de cambio**: Etapa 7 (refinamientos)

**Justificación**:
- Validar flujo sin dependencias externas
- Facilita testing local
- Reducir complejidad inicial

**Implicaciones - Etapa 1-6**:
- Notificaciones se loguean en consola del servidor
- Ejemplo: `[NOTIFY] Turno confirmado para Firulais - dueño: juan@mail.com`
- No hay integración con email/SMS aún

**Implicaciones - Etapa 7**:
- Integrar SendGrid (email) o Twilio (SMS)
- Cambiar función `notifyTurnoConfirmado()` para usar API real
- Mantener log en consola para auditoría

**Implementación**:
```typescript
// Etapa 1-6: consola
function notifyTurnoConfirmado(turnoId: UUID) {
  console.log(`[NOTIFY-EMAIL] Turno ${turnoId} confirmado`);
}

// Etapa 7: SendGrid
async function notifyTurnoConfirmado(turnoId: UUID) {
  await sendgrid.send({to: owner.email, subject: "Turno confirmado"});
  console.log(`[NOTIFY-EMAIL] Turno ${turnoId} confirmado`);
}
```

---

### 3️⃣ SUPUESTO: PostgreSQL local en Docker (línea 513)

**Decisión**: ✅ CONFIRMADO

**Justificación**:
- Desarrollo idéntico a producción
- Aislamiento de datos
- Fácil limpiar/resetear

**Implicaciones**:
- **Dev**: PostgreSQL en Docker Compose
- **Prod**: PostgreSQL en RDS / Supabase / similar
- `.env.local`: apunta a `postgres://localhost:5432/veterinaria`
- `.env.production`: apunta a RDS/managed service

**Configuración recomendada**:
```dockerfile
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: veterinaria
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
volumes:
  postgres_data:
```

**Comando de inicio**:
```bash
docker compose up -d
npx prisma migrate dev
```

---

### 4️⃣ SUPUESTO: Sin paginación inicial (línea 515)

**Decisión**: ✅ CONFIRMADO  
**Trigger de cambio**: Dataset > ~500 registros

**Justificación**:
- Complejidad innecesaria al inicio
- MVP enfocado en flujos, no en escala

**Implicaciones**:
- Listar todos los turnos/mascotas en una sola página
- Filtros sí (por fecha, estado), pero sin paginación
- **Si** dataset crece → agregar offset/limit en Etapa 6+

**Indicadores para cambiar**:
- Recepción reporta lentitud
- Query tarda > 2 segundos
- Base de datos > 1M registros

**Implementación futura**:
```typescript
// Cuando sea necesario
const [page, setPage] = useState(0);
const { data: turnos } = useTurnos({ limit: 50, offset: page * 50 });
```

---

### 5️⃣ SUPUESTO: Horarios fijos por veterinario (línea 516)

**Decisión**: ✅ CONFIRMADO

**Justificación**:
- Modelo predecible para clínica pequeña
- Evita lógica compleja de disponibilidad
- Usuario no puede "pedir un horario extraño"

**Implicaciones**:
- Cada veterinario tiene horario fijo (ej: Lun-Vie 9-13, 14-18)
- Duración de turno: 30 min fijo
- No hay excepciones iniciales (vacaciones, ausencias)

**Horarios iniciales (seed)**:
```typescript
const veterinarioHorarios = {
  "dr-martinez": { dias: [1,2,3,4,5], inicio: 9, fin: 13, fin2: 18 },  // Lun-Vie, 9-13 y 14-18
  "dra-lopez":   { dias: [1,2,3,4,5], inicio: 9, fin: 13, fin2: 18 },
  "dr-garcia":   { dias: [2,3,4,5], inicio: 10, fin: 14, fin2: 17 },   // Mar-Vie
}
```

**Schema**:
```sql
CREATE TABLE veterinario_horarios (
  id UUID PK,
  veterinario_id UUID FK -> users(id),
  dia_semana INT (0=Dom, 1=Lun, ...),
  hora_inicio INT,
  hora_fin INT,
  duracion_minutos INT DEFAULT 30
);
```

**Futuro (Etapa 7+)**:
- Tabla `ausencias` para gestionar vacaciones
- Excepciones por día (cerrado, horario reducido)

---

### 6️⃣ SUPUESTO: Un veterinario por turno (línea 517)

**Decisión**: ✅ CONFIRMADO

**Justificación**:
- Clínica pequeña, modelo simple
- Responsabilidad clara
- Evita sincronización entre múltiples veterinarios

**Implicaciones**:
- `turnos.veterinario_id` es NOT NULL, único por turno
- No hay "agendar con cualquier veterinario disponible"
- Dueño elige específicamente a veterinario

**Flujo de reserva**:
1. Dueño elige veterinario
2. Sistema muestra próximos 14 días disponibles
3. Dueño elige fecha y hora disponible
4. Turno se asigna a ese veterinario específico

**No está permitido**:
- ❌ "Necesito un turno ASAP" (sin elegir veterinario)
- ❌ Transferir turno entre veterinarios automáticamente
- ❌ Turnos con múltiples veterinarios

---

### 7️⃣ SUPUESTO: Sin moneda/precios en MVP (línea 518)

**Decisión**: ✅ CONFIRMADO  
**Revisar**: Etapa 8+

**Justificación**:
- MVP enfocado en reserva + gestión clínica
- Precios y facturación son features complejas
- Puede agregarse sin refactorizar datos

**Implicaciones**:
- NO hay tabla `precios`, `servicios`, `facturas`
- NO hay campos de monto en `turnos`
- Pago manual, offline (efectivo/transferencia)

**Futuro (Etapa 8+)**:
```sql
CREATE TABLE servicios (
  id UUID PK,
  nombre VARCHAR (ej: "Consulta general"),
  precio_ars DECIMAL,
  duracion_minutos INT
);

ALTER TABLE turnos ADD servicio_id UUID FK;
```

---

### 8️⃣ SUPUESTO: Sin sistema de pagos online (línea 519)

**Decisión**: ✅ CONFIRMADO  
**Revisar**: Etapa 8+

**Justificación**:
- Veterinaria pequeña, pago en efectivo/transferencia
- Compliance: requiere AFIP, SAT, etc.
- Fuera de MVP

**Implicaciones**:
- NO integrar Stripe, MercadoPago, PayPal
- NO hay confirmación de pago en el flujo
- Recepción marca turno como "pagado" manualmente

**Futuro**:
- Si cliente lo pide, integrar MercadoPago
- Requeriría: API, webhook, auditoría, cumplimiento fiscal

---

### 9️⃣ SUPUESTO IMPLÍCITO: Sin auto-registración de veterinarios

**Decisión**: ✅ IMPLÍCITO (no explicitado, pero deducible)

**Justificación**:
- Aún más sensible que dueños
- Requiere verificación de cédula/título
- Solo gerencia/admin crean veterinarios

**Implicaciones**:
- No hay pantalla de "quiero registrarme como veterinario"
- Recepción/admin usa panel para crear usuario tipo "veterinario"
- Requiere al menos 1 admin inicial (seed)

**Flujo**:
1. Admin crea usuario con rol=veterinario
2. Email con password temporal
3. Veterinario hace login y cambia contraseña

---

## Matriz de Decisiones

| Supuesto | MVP | Etapa 1 | Etapa 7 | Etapa 8+ | Riesgo |
|----------|-----|---------|---------|----------|--------|
| No auto-registración | SÍ | ✅ | ✅ | ✅ | Bajo |
| Notificaciones consola | SÍ | ✅ | ❌→Email | ✅ | Bajo |
| PostgreSQL Docker | SÍ | ✅ | ✅ | RDS | Bajo |
| Sin paginación | SÍ | ✅ | ✅ | Agregar | Medio |
| Horarios fijos | SÍ | ✅ | ✅ | +excepciones | Bajo |
| 1 vet/turno | SÍ | ✅ | ✅ | ✅ | Bajo |
| Sin precios | SÍ | - | - | ✅ Agregar | Medio |
| Sin pagos online | SÍ | - | - | ✅ Considerar | Bajo |
| Sin auto-reg vet | SÍ | ✅ | ✅ | ✅ | Bajo |

---

## Pasos de Implementación Inmediatos

### Etapa 1:
- [ ] Eliminar ruta `/auth/register` (solo `/auth/login`)
- [ ] Crear endpoint `/api/admin/users/create` para recepción
- [ ] Tabla `users` sin campo `password_reset_token` (fuera de MVP)
- [ ] Seed: 1 admin + 1 recepcionista + 2 veterinarios + 3 dueños

### Etapa 3:
- [ ] Tabla `veterinario_horarios` con datos de prueba
- [ ] Función `getHorariosDisponibles(veterinario_id, fecha)` que busque horarios

### Etapa 5:
- [ ] `notifyTurnoConfirmado()` usa `console.log()`
- [ ] Documentar cómo cambiar a SendGrid en Etapa 7

### Etapa 7:
- [ ] Integrar SendGrid
- [ ] Integrar Twilio (SMS)
- [ ] Reemplazar `console.log()` por API real

---

## Referencias

- Documento principal: `/docs/PROYECTO.md`
- Stack: Next.js + TypeScript + PostgreSQL + Prisma
- Estado: Listo para iniciar Etapa 1 ✅
