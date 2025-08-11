import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, doc, setDoc, db , getDoc} from "./config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"

export const signUp = async ({ email, password, name, age, nickname }) => {
  try {
    console.log('------Registro-', email, password)
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // sendEmailVerification(userCredential.user);
    const user = userCredential.user;
    console.log(33333333, user)
    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, {
      email,
      name,
      age,
      nickname,
      createdAt: new Date()
    });
    console.log(11111111111111)
    return user.uid;
  } catch (err) {
    return err.code;
  }
}

export const signIn = async (email, password) => {
  try {
    console.log('------Iniciar Sesión--', email, password)
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user.uid;
  } catch (err) {
    console.log('Ha habido un error:', err);
    return err.code;
  }
}

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    console.log('------Iniciar Sesión con Google--')
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    const isNewUser = !userDoc.exists();

    if (isNewUser) {
      await setDoc(userDocRef, {
        email: user.email,
        name: user.displayName || '',
        createdAt: new Date(),
      });
    }

    return { user, isNewUser };
  } catch (err) {
    console.error('Error en loginWithGoogle:', err);
    throw err; 
  }
};



export const getCurrentUserId = async () => await auth.currentUser?.uid;
export const logout = async () => await signOut(auth);