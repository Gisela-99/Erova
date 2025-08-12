// src/services/garment.service.js

import { 
    db, 
    collection, 
    doc, 
    addDoc, 
    getDocs, 
    deleteDoc 
  } from "../config/config.js";
  
  import { COLLECTIONS } from "../constants/firestore.constants.js";
  import { Garment } from "../models/garment.model.js";
  import { getCurrentUserId } from "./auth.service.js";

/**
 * Añade una nueva prenda a la subcolección del usuario autenticado.
 * @param {object} garmentData - Objeto con los datos de la prenda (ej: { name, type, color, imageUrl }).
 * @returns {string} El ID del nuevo documento de prenda creado.
 */
export const addGarmentToUser = async (garmentData) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('Usuario no autenticado. No se puede añadir la prenda.');

  const garmentCollectionRef = collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.GARMENTS);
  
  const newGarmentData = {
    ...garmentData,
    createdAt: new Date()
  };

  const docRef = await addDoc(garmentCollectionRef, newGarmentData);
  return docRef.id;
};

/**
 * Obtiene todas las prendas del usuario autenticado.
 * @returns {Array<Garment>} Un array de instancias del modelo Garment.
 */
export const getUserGarments = async () => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('Usuario no autenticado. No se pueden obtener las prendas.');

  const garmentCollectionRef = collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.GARMENTS);
  const querySnapshot = await getDocs(garmentCollectionRef);
  
  return querySnapshot.docs.map(doc => Garment.fromFirestore(doc));
};

/**
 * Elimina una prenda específica del usuario autenticado.
 * @param {string} garmentId - El ID del documento de la prenda a eliminar.
 */
export const deleteUserGarment = async (garmentId) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('Usuario no autenticado. No se puede eliminar la prenda.');

  const garmentDocRef = doc(db, COLLECTIONS.USERS, userId, COLLECTIONS.GARMENTS, garmentId);
  await deleteDoc(garmentDocRef);
};