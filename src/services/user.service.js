// src/services/user.service.js

import { 
    db, 
    doc, 
    getDoc, 
    getDocs, 
    collection, 
    updateDoc, 
    deleteDoc, 
    setDoc, 
    query 
  } from "../config/config.js";
  
  import { COLLECTIONS } from "../constants/firestore.constants.js";
  import { User } from "../models/user.model.js";

/**
 * Crea el documento de perfil para un nuevo usuario con un ID específico.
 * Este ID debe coincidir con el UID de Firebase Authentication.
 * @param {string} uid - El ID del usuario proporcionado por Firebase Auth.
 * @param {object} userData - El objeto con los datos del perfil (email, nombre, etc.).
 */
export const createUserProfile = async (uid, userData) => {
  const userRef = doc(db, COLLECTIONS.USERS, uid); // Crea una referencia con el ID específico
  await setDoc(userRef, {
    ...userData,
    createdAt: new Date() // El servicio se encarga de añadir el timestamp
  });
};

/**
 * Obtiene un único usuario por su ID y lo devuelve como una instancia del modelo User.
 * @param {string} id - El ID del documento del usuario.
 * @returns {User|null} Una instancia de User si se encuentra, o null si no existe.
 */
export const getUserById = async (id) => {
  if (!id) return null;
  const docRef = doc(db, COLLECTIONS.USERS, id);
  const docSnap = await getDoc(docRef);

  return docSnap.exists() ? User.fromFirestore(docSnap) : null;
};

/**
 * Obtiene todos los usuarios de la colección.
 * @returns {Array<User>} Un array de instancias del modelo User.
 */
export const getUsers = async () => {
  const colRef = collection(db, COLLECTIONS.USERS);
  const result = await getDocs(query(colRef));
  return result.docs.map(doc => User.fromFirestore(doc));
};

/**
 * Actualiza los datos de un usuario en Firestore.
 * @param {string} id - El ID del usuario a actualizar.
 * @param {object} newUserData - Un objeto con los campos a actualizar.
 */
export const updateUser = async (id, newUserData) => {
  const docRef = doc(db, COLLECTIONS.USERS, id);
  await updateDoc(docRef, newUserData);
};

/**
 * Elimina el documento de un usuario de Firestore.
 * @param {string} id - El ID del usuario a eliminar.
 */
export const deleteUser = async (id) => {
  const docRef = doc(db, COLLECTIONS.USERS, id);
  await deleteDoc(docRef);
};

/**
 * Actualiza los campos específicos del perfil corporal de un usuario.
 * Utiliza setDoc con merge para garantizar que no se sobrescriban otros datos del perfil.
 * @param {string} uid - El ID del usuario.
 * @param {object} bodyProfileData - Un objeto con { genero, tipoCuerpo, medidasReferencia }.
 */
export const updateUserBodyProfile = async (uid, bodyProfileData) => {
  if (!uid || !bodyProfileData) {
    throw new Error("El ID de usuario y los datos del perfil corporal son requeridos.");
  }
  
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  
  await setDoc(userRef, {
    ...bodyProfileData,
    bodyProfileUpdatedAt: new Date() // Usamos un campo específico para esta actualización
  }, { merge: true }); // 'merge: true' es crucial para no borrar otros datos del usuario
};