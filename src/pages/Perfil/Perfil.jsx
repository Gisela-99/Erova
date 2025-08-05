import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../providers/UserProvider';
import { logout } from '../../services/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/config';
import { 
  FiEdit2, 
  FiMail, 
  FiCalendar, 
  FiUser, 
  FiSettings, 
  FiMoon, 
  FiBell, 
  FiLock, 
  FiHelpCircle, 
  FiLogOut,
  FiChevronRight,
  FiCheck
} from 'react-icons/fi';
import './Perfil.styles.css';

const Perfil = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    nickname: '',
    email: user?.email || '',
    joinDate: user?.metadata?.creationTime || new Date().toISOString(),
  });
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    privateAccount: false
  });

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(prev => ({
              ...prev,
              nickname: data.nickname || '',
              email: data.email || user.email || '',
              joinDate: data.createdAt?.toDate()?.toISOString() || prev.joinDate
            }));
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    
    try {
      // Update in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        nickname: userData.nickname,
        updatedAt: new Date().toISOString()
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const formatJoinDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="perfil-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {userData.nickname ? userData.nickname.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2>{userData.nickname || 'Usuario'}</h2>
        {userData.email && <p className="user-email">{userData.email}</p>}
        <p className="join-date">
          <FiCalendar className="icon" /> 
          Se unió el {formatJoinDate(userData.joinDate)}
        </p>
      </div>
      
      <div className="profile-content">
        <div className="profile-section">
          <div className="section-header">
            <h3><FiUser className="section-icon" /> Información personal</h3>
            {!isEditing ? (
              <button 
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                <FiEdit2 size={16} /> Editar
              </button>
            ) : (
              <button 
                className="save-button"
                onClick={handleSave}
              >
                <FiCheck size={16} /> Guardar
              </button>
            )}
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <label>Tu apodo</label>
              {isEditing ? (
                <input
                  type="text"
                  name="nickname"
                  value={userData.nickname}
                  onChange={handleInputChange}
                  className="editable-input"
                  placeholder="Elige un apodo"
                  maxLength="20"
                />
              ) : (
                <p>{userData.nickname || 'No has establecido un apodo'}</p>
              )}
            </div>
            
            <div className="info-item">
              <label>Correo electrónico</label>
              <div className="email-display">
                <FiMail className="icon" />
                <p>{userData.email}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <div className="section-header">
            <h3><FiSettings className="section-icon" /> Configuración</h3>
          </div>
          
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-info">
                <FiMoon className="setting-icon" />
                <div>
                  <h4>Modo oscuro</h4>
                  <p>Activa el tema oscuro para una mejor experiencia nocturna</p>
                </div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.darkMode}
                  onChange={() => handleSettingToggle('darkMode')}
                />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <FiBell className="setting-icon" />
                <div>
                  <h4>Notificaciones</h4>
                  <p>Recibe alertas sobre tu actividad</p>
                </div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.notifications}
                  onChange={() => handleSettingToggle('notifications')}
                />
                <span className="slider round"></span>
              </label>
            </div>
            
            <div className="setting-item">
              <div className="setting-info">
                <FiLock className="setting-icon" />
                <div>
                  <h4>Cuenta privada</h4>
                  <p>Haz que tu perfil solo sea visible para ti</p>
                </div>
              </div>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={settings.privateAccount}
                  onChange={() => handleSettingToggle('privateAccount')}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="profile-section">
          <div className="section-header">
            <h3><FiHelpCircle className="section-icon" /> Ayuda y soporte</h3>
          </div>
          
          <div className="help-links">
            <button className="help-link">
              <span>Centro de ayuda</span>
              <FiChevronRight />
            </button>
            <button className="help-link">
              <span>Política de privacidad</span>
              <FiChevronRight />
            </button>
            <button className="help-link">
              <span>Términos de servicio</span>
              <FiChevronRight />
            </button>
            <button className="help-link">
              <span>Reportar un problema</span>
              <FiChevronRight />
            </button>
          </div>
        </div>
        
        <div className="profile-actions">
          <button 
            className="logout-button"
            onClick={handleLogout}
          >
            <FiLogOut className="button-icon" /> Cerrar sesión
          </button>
          
          <p className="app-version">Versión 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
