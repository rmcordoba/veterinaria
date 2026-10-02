// Notification service
// Handles notifications: email, SMS, console logs

export const notificationService = {
  notifyTurnoConfirmado: (turnoId: string, ownerEmail: string) => {
    console.log(`[NOTIFY-EMAIL] Turno ${turnoId} confirmado para ${ownerEmail}`);
  },

  notifyTurnoRechazado: (turnoId: string, ownerEmail: string, motivo?: string) => {
    console.log(`[NOTIFY-EMAIL] Turno ${turnoId} rechazado para ${ownerEmail}. Motivo: ${motivo || 'N/A'}`);
  },

  notifyVacunaRecordatorio: (mascotaNombre: string, ownerEmail: string, tipoVacuna: string) => {
    console.log(`[NOTIFY-EMAIL] Recordatorio de vacuna (${tipoVacuna}) para ${mascotaNombre} (${ownerEmail})`);
  },
};
