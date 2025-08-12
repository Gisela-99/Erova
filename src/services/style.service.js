// src/services/style.service.js

import { 
    db, 
    collection, 
    doc, 
    addDoc, 
    getDocs, 
    deleteDoc 
  } from "../config/config.js";
  
  import { COLLECTIONS } from "../constants/firestore.constants.js";
  import { Style } from "../models/style.model.js";
  import { getCurrentUserId } from "./auth.service.js";
/**
 * Añade un nuevo estilo a la subcolección del usuario autenticado.
 * @param {object} styleData - Objeto con los datos del estilo (ej: { name, description }).
 * @returns {string} El ID del nuevo documento de estilo creado.
 */
export const addStyleToUser = async (styleData) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('Usuario no autenticado. No se puede añadir el estilo.');

  const styleCollectionRef = collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.STYLES);
  
  const newStyleData = {
    ...styleData,
    createdAt: new Date()
  };

  const docRef = await addDoc(styleCollectionRef, newStyleData);
  return docRef.id;
};

/**
 * Obtiene todos los estilos del usuario autenticado.
 * @returns {Array<Style>} Un array de instancias del modelo Style.
 */
export const getUserStyles = async () => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('Usuario no autenticado. No se pueden obtener los estilos.');

  const styleCollectionRef = collection(db, COLLECTIONS.USERS, userId, COLLECTIONS.STYLES);
  const querySnapshot = await getDocs(styleCollectionRef);
  
  return querySnapshot.docs.map(doc => Style.fromFirestore(doc));
};

/**
 * Elimina un estilo específico del usuario autenticado.
 * @param {string} styleId - El ID del documento del estilo a eliminar.
 */
export const deleteUserStyle = async (styleId) => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('Usuario no autenticado. No se puede eliminar el estilo.');

  const styleDocRef = doc(db, COLLECTIONS.USERS, userId, COLLECTIONS.STYLES, styleId);
  await deleteDoc(styleDocRef);
};