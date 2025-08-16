import { useState } from 'react';
import { uploadImage } from '../services/cloudinary.service'; 

export const useGarmentUpload = (onSuccess) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  // Esta función ahora solo maneja la subida del archivo
  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // 1. Recibimos el objeto de resultado del servicio
  const result = await uploadImage(file);

  // 2. Comprobamos si la subida tuvo éxito según nuestro propio objeto
  if (result.success) {
    setImageUrl(result.url); // Guardamos la URL real
    if (onSuccess) {
      onSuccess(result.url); // Pasamos solo la URL al componente
    }
  } else {
    // Si success es false, lanzamos un error con el mensaje del servicio
    throw new Error(result.error);
  }
    } catch (err) {
      console.error('Error al subir la imagen:', err);
      setError('No se pudo subir la imagen. Inténtalo de nuevo.');
    } finally {
      setUploading(false);
    }
  };

  // Esta función se encarga de obtener el archivo desde un link
  const handleLinkUpload = async (linkUrl) => {
    const trimmed = linkUrl.trim();
    if (!trimmed) return;

    setUploading(true);
    setError(null);

    try {
      const validUrl = new URL(trimmed); // Valida que la URL sea correcta
      const response = await fetch(validUrl.href); // Usamos fetch para descargar el contenido
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });

      // Reutilizamos la lógica de subida de archivo
      await handleFileUpload(file);

    } catch (err) {
      console.error('Error al subir la imagen desde link:', err);
      setError('El enlace no es válido o no se pudo acceder a la imagen.');
      setUploading(false); // Asegúrate de parar la carga en caso de error aquí
    }
    // 'finally' está en handleFileUpload, por lo que no es necesario aquí si la llamada es exitosa
  };

  return {
    uploading,
    error,
    imageUrl, // Devolvemos la URL por si es necesaria
    handleFileUpload,
    handleLinkUpload,
  };
};