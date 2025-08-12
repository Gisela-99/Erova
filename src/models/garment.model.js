// src/models/garment.model.js

/**
 * Modelo de datos para una Prenda.
 */
export class Garment {
    constructor({ id, name, type, color, imageUrl, createdAt }) {
      this.id = id;
      this.name = name || '';
      this.type = type || 'unknown'; // ej: 'camisa', 'pantalón'
      this.color = color || '';
      this.imageUrl = imageUrl || '';
      this.createdAt = createdAt && createdAt.toDate ? createdAt.toDate() : new Date();
    }
  
    static fromFirestore(doc) {
      const data = doc.data();
      return new Garment({
        id: doc.id,
        name: data.name,
        type: data.type,
        color: data.color,
        imageUrl: data.imageUrl,
        createdAt: data.createdAt,
      });
    }
  }