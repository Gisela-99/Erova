import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../config/config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/config';

const AppContext = createContext();
export const useUserContext = () => useContext(AppContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore when auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        try {
          // Get user document from Firestore
          const userDoc = await getDoc(doc(db, 'users', authUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              uid: authUser.uid,
              email: authUser.email,
              name: userData.name || userData.nickname || authUser.displayName || '',
              ...userData
            });
          } else {
            // If no user document exists, create basic user object
            setUser({
              uid: authUser.uid,
              email: authUser.email,
              name: authUser.displayName || ''
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          // If there's an error, still set basic user info
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            name: authUser.displayName || ''
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AppContext.Provider>
  );
}

export default UserProvider;