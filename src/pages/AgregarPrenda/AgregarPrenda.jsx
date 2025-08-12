import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../../services/cloudinary.service';
import { addGarmentToUser } from '../../services/garment.service';
import ClasificarPrenda from '../ClasificarPrendas/ClasificarPrendas';
import './AgregarPrenda.styles.css';

const AgregarPrenda = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const url = await uploadImage(file);
      setImageUrl(url);
      setStep(3); // Ir a pantalla "Prenda agregada"
    } catch (err) {
      console.error('Error al subir la imagen:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleLinkSubmit = async () => {
    const trimmed = linkUrl.trim();
    if (!trimmed) return;

    try {
      const validUrl = new URL(trimmed);

      if (window.location.protocol === 'https:' && validUrl.protocol === 'http:') {
        alert('El enlace debe usar HTTPS para mostrarse correctamente.');
        return;
      }

      setUploading(true);

      const response = await fetch(validUrl.href);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: blob.type });

      const url = await uploadImage(file);
      setImageUrl(url);
      setStep(3); // Ir a pantalla "Prenda agregada"
    } catch (err) {
      console.error('Error al subir la imagen desde link:', err);
      alert('No se pudo subir la imagen.');
    } finally {
      setUploading(false);
    }
  };

  const handleContinuarClasificacion = async () => {
    try {
      // Guardamos en Firestore aquí, cuando el usuario decide clasificar
      await addGarmentToUser({
        imageUrl,
        tipo: '',
        color: '',
        etiquetas: [],
        medidas: {}
      });
      setStep(4); // Ir a pantalla de clasificación
    } catch (err) {
      console.error('Error al guardar prenda:', err);
    }
  };

  return (
    <div className="onboarding-container">
      {step === 1 && (
        <div className="step step-1">
          <h2>¡Añade tus prendas!</h2>
          <p>Recuerda tomar fotos claras para que podamos detectar de qué prenda se trata</p>
          <div className="upload-box" onClick={() => setStep(1.5)}>
            <span className="plus-icon">+</span>
          </div>
          <button className="secondary-btn" onClick={() => navigate('/')}>
            Ahora no
          </button>
        </div>
      )}

      {step === 1.5 && (
        <div className="step step-select dark-bg">
          <button
            className="square-btn"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="icon">📷</span>
            <span className="label">Añade una foto</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />

          <div className="link-section">
            <input
              type="url"
              placeholder="Pega el link de la prenda"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
            />
            <button onClick={handleLinkSubmit}>Añadir link</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="step step-3">
          <h2>Prenda agregada!</h2>
          <p>¡Has agregado tu prenda correctamente!</p>
          <div className="preview-box">
            {imageUrl && <img src={imageUrl} alt="Prenda" />}
          </div>
          <button className="primary-btn" onClick={handleContinuarClasificacion}>
            Continuar
          </button>
          <button className="secondary-btn" onClick={() => navigate('/')}>
            Volver a inicio
          </button>
        </div>
      )}

      {uploading && <p>Subiendo imagen...</p>}

      {step === 4 && (
        <ClasificarPrenda
          imageUrl={imageUrl}
          onSave={() => {
            navigate('/');
          }}
        />
      )}
    </div>
  );
};

export default AgregarPrenda;
