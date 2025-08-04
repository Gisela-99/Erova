import { useState } from 'react';
import {uploadImageToCloudinary}  from '../../services/cloudinaryService';

const AddGarment = () => {
 const [imageUrl, setImageUrl] = useState(null);
 const [uploading, setUploading] = useState(false);

 const handleImageUpload = async (event) => {
   const file = event.target.files[0];
   if (!file) return;

   setUploading(true);

     try {
       const url = await uploadImageToCloudinary(file);
       setImageUrl(url);
       console.log('Imagen subida:', url);
     } catch (err) {
       console.error('Error al subir la imagen:', err);
     } finally {
       setUploading(false);
     }
   };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {uploading && <p>Subiendo imagen...</p>}
      {imageUrl && (
        <div>
          <p>Imagen subida:</p>
          <img src={imageUrl} alt="Subida" style={{ width: '300px' }} />
        </div>
      )} 
      <button>Añadir prenda</button>
    </div>
  );
};

export default AddGarment;
