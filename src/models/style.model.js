// src/models/style.model.js

/**
 * Modelo de datos para un Estilo.
 */
export class Style {
    constructor({ id, name, description, createdAt }) {
      this.id = id;
      this.name = name || '';
      this.description = description || '';
      this.createdAt = createdAt && createdAt.toDate ? createdAt.toDate() : new Date();
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Style({
        id: doc.id,
        name: data.name,
        description: data.description,
        createdAt: data.createdAt,
      });
    }
  }