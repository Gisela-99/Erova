// src/config/cloudinary.config.js

const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

if (!cloudName || !uploadPreset) {
  throw new Error("Las variables de entorno de Cloudinary (VITE_CLOUD_NAME, VITE_UPLOAD_PRESET) no están configuradas.");
}

export const cloudinaryConfig = {
  cloudName,
  uploadPreset,
  apiUrl: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
};