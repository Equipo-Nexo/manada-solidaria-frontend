export function isVetGuardActive(date = new Date()): boolean {
  const day = date.getDay(); // 0:domingo, 1:lunes, 2:martes, 3:miércoles, 4:jueves, 5:viernes, 6:sábado
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const timeInMinutes = hour * 60 + minutes;

  // Domingo: todo el día
  if (day === 0) {
    return true;
  }

  // Lunes: domingo continúa hasta las 08:30
  if (day === 1 && timeInMinutes < 8 * 60 + 30) {
    return true;
  }

  // Martes a viernes: la guardia nocturna continúa activa hasta las 08:00
  if (day >= 2 && day <= 5 && timeInMinutes < 8 * 60) {
    return true;
  }

  // Lunes a viernes: 13:00 a 16:00
  if (
    day >= 1 &&
    day <= 5 &&
    timeInMinutes >= 13 * 60 &&
    timeInMinutes < 16 * 60
  ) {
    return true;
  }

  // Lunes a viernes: 20:00 hasta medianoche
  if (day >= 1 && day <= 5 && timeInMinutes >= 20 * 60) {
    return true;
  }

  // Sábado: a partir de las 13:00
  if (day === 6 && timeInMinutes >= 13 * 60) {
    return true;
  }

  return false;
}
