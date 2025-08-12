import { collection, doc, addDoc } from './config';
import { db } from './config';
import { getCurrentUserId } from './auth';

export const addPrendaToUser = async (prendaObj) => {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('Usuario no autenticado');

  const prendasRef = collection(doc(db, 'users', userId), 'prendas');
  const result = await addDoc(prendasRef, prendaObj);
  return result.id;
};
