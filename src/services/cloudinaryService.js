import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  // formData.append('folder', 'nombre-de-carpeta'); // Opcional

  try {
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const res = await axios.post(url, formData);
    return res.data.secure_url;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw error;
  }
};
