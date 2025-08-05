import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import './CrearOutfit.styles.css';

const CrearOutfit = () => {
  const navigate = useNavigate();
  const [outfitName, setOutfitName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showItemSelector, setShowItemSelector] = useState(false);

  // This would come from your actual items data
  const availableItems = [
    { id: 1, name: 'Camiseta blanca', category: 'top' },
    { id: 2, name: 'Pantalón vaquero', category: 'bottom' },
    { id: 3, name: 'Zapatillas deportivas', category: 'shoes' },
    { id: 4, name: 'Chaqueta vaquera', category: 'outerwear' },
    { id: 5, name: 'Gorra negra', category: 'accessory' },
  ];

  const addItemToOutfit = (item) => {
    if (!selectedItems.some(selected => selected.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
    setShowItemSelector(false);
  };

  const removeItem = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const saveOutfit = () => {
    // Save outfit logic here
    console.log('Guardando outfit:', { name: outfitName, items: selectedItems });
    // Navigate back after saving
    navigate('/');
  };

  return (
    <div className="crear-outfit-container">
      <header className="page-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Volver atrás"
        >
          <FaArrowLeft />
        </button>
        <h1>Crear Outfit</h1>
      </header>
      
      <main className="page-content">
        <div className="form-group">
          <label htmlFor="outfit-name">Nombre del outfit</label>
          <input
            type="text"
            id="outfit-name"
            className="form-control"
            placeholder="Ej: Look casual de verano"
            value={outfitName}
            onChange={(e) => setOutfitName(e.target.value)}
          />
        </div>
        
        <div className="outfit-preview">
          <div className="outfit-mannequin">
            {selectedItems.length === 0 ? (
              <div className="empty-outfit">
                <div className="empty-icon">👕</div>
                <p>Tu outfit está vacío</p>
                <small>Agrega prendas para crear tu look</small>
              </div>
            ) : (
              <div className="selected-items">
                {selectedItems.map(item => (
                  <div key={item.id} className="selected-item">
                    <span>{item.name}</span>
                    <button 
                      className="remove-item"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Quitar ${item.name}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <button 
              className="add-item-button"
              onClick={() => setShowItemSelector(!showItemSelector)}
            >
              <FaPlus /> Agregar prenda
            </button>
            
            {showItemSelector && (
              <div className="item-selector">
                <div className="item-selector-header">
                  <h3>Selecciona una prenda</h3>
                  <button 
                    className="close-selector"
                    onClick={() => setShowItemSelector(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="item-list">
                  {availableItems.map(item => (
                    <div 
                      key={item.id} 
                      className="item-option"
                      onClick={() => addItemToOutfit(item)}
                    >
                      {item.name}
                      <span className="item-category">{item.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="form-group">
          <label>Notas</label>
          <textarea 
            className="form-control" 
            rows="3" 
            placeholder="Añade alguna nota sobre este outfit..."
          ></textarea>
        </div>
        
        <button 
          className="save-button"
          disabled={!outfitName || selectedItems.length === 0}
          onClick={saveOutfit}
        >
          Guardar Outfit
        </button>
      </main>
    </div>
  );
};

export default CrearOutfit;
