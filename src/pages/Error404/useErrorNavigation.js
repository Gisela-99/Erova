import { useNavigate } from 'react-router-dom';

export function useErrorNavigation() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return { goToHome };
}