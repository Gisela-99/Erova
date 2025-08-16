// Contenido para src/utils/bodyTypeCalculator.js

// La función necesita los datos de los tipos de cuerpo para funcionar
import { bodyTypes } from '../data/dataBody'; // ¡Ajusta la ruta si es necesario!

export const calculateBodyType = (medidas) => {
  const { genero, busto, cintura, cadera } = medidas;

  const bustoNum = parseFloat(busto);
  const cinturaNum = parseFloat(cintura);
  const caderaNum = parseFloat(cadera);

  if (!bustoNum || !cinturaNum || !caderaNum) {
    return "Introduce todas las medidas correctamente";
  }

  // Buscar coincidencia exacta por rangos
  const matchPorRangos = bodyTypes[genero]?.find(bt => // Se añade '?' por seguridad
    bustoNum >= bt.busto[0] && bustoNum <= bt.busto[1] &&
    cinturaNum >= bt.cintura[0] && cinturaNum <= bt.cintura[1] &&
    caderaNum >= bt.cadera[0] && caderaNum <= bt.cadera[1]
  );

  if (matchPorRangos) {
    return `Tu tipo de cuerpo es: ${matchPorRangos.tipo}`;
  }

  // Si no hay match exacto, usar proporciones
  const cinturaBustoRatio = cinturaNum / bustoNum;
  let tipo = "No determinado";

  if (Math.abs(bustoNum - caderaNum) <= 5 && cinturaBustoRatio < 0.75) {
    tipo = "Reloj de arena";
  } else if (bustoNum > caderaNum && cinturaNum > caderaNum) {
    tipo = "Triángulo invertido";
  } else if (caderaNum > bustoNum && cinturaNum > bustoNum) {
    tipo = "Pera";
  } else if (Math.abs(bustoNum - caderaNum) <= 5 && cinturaBustoRatio >= 0.75) {
    tipo = "Rectángulo";
  } else if (cinturaNum >= bustoNum && cinturaNum >= caderaNum) {
    tipo = "Manzana";
  } else if (cinturaNum > bustoNum && cinturaNum > caderaNum && bustoNum < caderaNum) {
    tipo = "Diamante";
  } else if (cinturaNum > bustoNum && bustoNum > caderaNum) {
    tipo = "Redondo";
  }

  return `Tu tipo de cuerpo (estimado) es: ${tipo}`;
};