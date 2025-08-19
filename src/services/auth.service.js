// src/services/auth.service.js

import { 
    auth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup, 
    deleteUser
  } from "../config/config.js"; 
  
  import { createUserProfile, getUserById } from "./user.service.js";

/**
 * Registra un nuevo usuario en Firebase Authentication y crea su perfil en Firestore.
 * @param {object} userData - Objeto con { email, password, name, age, nickname }.
 * @returns {object} Un objeto indicando el éxito o fracaso: { success: boolean, userId?: string, error?: string }.
 */
export const signUp = async ({ email, password, name, birthdate, nickname }) => {
  let userCredential; // La definimos aquí para poder usarla en el catch

  try {
    // 1. Crear el usuario en Authentication.
    userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2. Crear el perfil en Firestore.
    const userProfileData = { email, name, birthdate, nickname };
    await createUserProfile(user.uid, userProfileData);

    // 3. Si todo tiene éxito, devolvemos el resultado.
    return { success: true, userId: user.uid };

  } catch (err) {
    console.error("Error detallado en el registro:", err);

    // --- LÓGICA DE REVERSIÓN (ROLLBACK) ---
    // Si el usuario se creó en Auth (paso 1) pero falló Firestore (paso 2),
    // debemos eliminar el usuario de Auth para evitar datos inconsistentes.
    if (userCredential && userCredential.user) {
      try {
        await deleteUser(userCredential.user);
        console.log("Usuario de Auth eliminado por fallo en creación de perfil.");
      } catch (deleteError) {
        console.error("Error crítico: no se pudo eliminar el usuario huérfano de Auth:", deleteError);
        return { success: false, error: 'auth/cleanup-failed' };
      }
    }

    // Devolvemos el código de error original para que la UI sepa qué pasó.
    if (err.code) {
      return { success: false, error: err.code };
    }
    
    // Si el error no tiene .code (viene de Firestore), devolvemos nuestro código personalizado.
    return { success: false, error: 'auth/profile-creation-failed' };
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