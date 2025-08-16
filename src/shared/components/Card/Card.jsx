// Contenido para: src/shared/components/Card/Card.jsx

import './Card.style.css';

const Card = ({ id, title, imageUrl, isSelected, onClick }) => {
  const cardClassName = `card ${isSelected ? 'selected' : ''}`;

  return (
    // Usamos el `id` para el `onClick` para ser más robustos que con el `title`
    <div
      className={cardClassName}
      onClick={() => onClick(id)}
    >
      <div className="card-image-container">
        {imageUrl && <img src={imageUrl} alt={title} />}
      </div>
      <div className="card-title">{title}</div>
    </div>
  );
};

export default Card;