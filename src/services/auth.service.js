// src/services/auth.service.js

import { 
    auth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup 
  } from "../config/config.js"; // Asegúrate de que la ruta sea "./config.js" si está en la misma carpeta
  
  import { createUserProfile, getUserById } from "./user.service.js";

/**
 * Registra un nuevo usuario en Firebase Authentication y crea su perfil en Firestore.
 * @param {object} userData - Objeto con { email, password, name, age, nickname }.
 * @returns {object} Un objeto indicando el éxito o fracaso: { success: boolean, userId?: string, error?: string }.
 */
export const signUp = async ({ email, password, name, age, nickname }) => {
  try {
    // 1. Crear el usuario en el servicio de Autenticación de Firebase.
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Preparar los datos del perfil para guardarlos en Firestore.
    const userProfileData = { email, name, age, nickname };
    
    // 3. Llamar a nuestro servicio de usuarios para crear el documento del perfil.
    await createUserProfile(user.uid, userProfileData);

    return { success: true, userId: user.uid };
  } catch (err) {
    console.error("Error en el registro:", err.code);
    return { success: false, error: err.code };
  }
};

/**
 * Inicia sesión de un usuario con email y contraseña.
 * @param {string} email 
 * @param {string} password 
 * @returns {object} Un objeto indicando el éxito o fracaso.
 */
export const signIn = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, userId: result.user.uid };
  } catch (err) {
    console.error("Error en el inicio de sesión:", err.code);
    return { success: false, error: err.code };
  }
};

/**
 * Inicia sesión o registra a un usuario usando su cuenta de Google.
 * Si el usuario es nuevo, crea su perfil en Firestore.
 * @returns {object} Un objeto indicando el éxito o fracaso.
 */

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Variable para saber si el usuario es nuevo
    let isNewUser = false; 

    const userProfile = await getUserById(user.uid);

    if (!userProfile) {
      // Marcamos que es un usuario nuevo
      isNewUser = true; 
      const userProfileData = { email: user.email, name: user.displayName };
      await createUserProfile(user.uid, userProfileData);
    }

    // ¡SOLUCIÓN! Devolvemos el objeto `user` completo y el flag `isNewUser`.
    return { 
      success: true, 
      user: { uid: user.uid, email: user.email, displayName: user.displayName },
      isNewUser: isNewUser 
    };
  } catch (err) {
    console.error("Error en el login con Google:", err.code);
    return { success: false, error: err.code };
  }
};

/**
 * Cierra la sesión del usuario actual.
 */
export const logout = () => signOut(auth);

/**
 * Obtiene el ID del usuario actualmente autenticado.
 * @returns {string|null} El UID del usuario o null si no hay nadie logueado.
 */
export const getCurrentUserId = () => auth.currentUser?.uid;