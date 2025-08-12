// src/services/cloudinary.service.js

import axios from 'axios';
import { cloudinaryConfig } from '../config/cloudinary.config.js';

/**
 * Sube un archivo de imagen a Cloudinary.
 * @param {File} file - El archivo a subir.
 * @returns {object} Un objeto con el resultado: { success: boolean, url?: string, error?: string }.
 */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  // Si quisieras añadir una carpeta, lo harías aquí:
  // formData.append('folder', 'nombre-de-carpeta');

  try {
    const response = await axios.post(cloudinaryConfig.apiUrl, formData);
    
    if (response.data && response.data.secure_url) {
      return { success: true, url: response.data.secure_url };
    } else {
      // Esto maneja casos raros donde la subida es exitosa (código 200) pero no devuelve una URL.
      throw new Error('La respuesta de Cloudinary no contenía una URL segura.');
    }
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error.response?.data || error.message);
    
    // Devolvemos un objeto de error estructurado, igual que en el auth.service
    return { 
      success: false, 
      error: error.response?.data?.error?.message || 'Error de red o de configuración.'
    };
  }
};