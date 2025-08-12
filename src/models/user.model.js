// src/models/user.model.js

/**
 * Clase que representa el modelo de datos para un Usuario.
 * Proporciona una estructura consistente para los objetos de usuario en toda la aplicación.
 */
export class User {
  constructor({ id, email, name, age, nickname, createdAt }) {
    this.id = id;
    this.email = email;
    this.name = name || ''; // Asigna un string vacío si el nombre es nulo o undefined
    this.age = age || null; // Asigna null si la edad es nula o undefined
    this.nickname = nickname || ''; // Asigna un string vacío si el apodo es nulo o undefined
    
    // Firestore devuelve 'createdAt' como un objeto Timestamp.
    // Lo convertimos a un objeto Date de JavaScript para que sea más fácil de usar.
    this.createdAt = createdAt && createdAt.toDate ? createdAt.toDate() : new Date();
  }

  /**
   * Método estático de fábrica para crear una instancia de User
   * a partir de un documento de Firestore.
   * Esto encapsula la lógica de "traducción" de Firestore a nuestro modelo.
   * @param {object} doc - El documento de Firestore (que tiene doc.id y doc.data()).
   * @returns {User} Una nueva instancia de la clase User.
   */
  static fromFirestore(doc) {
    const data = doc.data();
    return new User({
      id: doc.id,
      email: data.email,
      name: data.name,
      age: data.age,
      nickname: data.nickname,
      createdAt: data.createdAt,
    });
  }
}