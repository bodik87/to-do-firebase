import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, googleAuthProvider } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      ({ user }) => {
        setUser(user);
        setDoc(doc(db, "users", user.uid), { uid: user.uid, email });
        setDoc(doc(db, "usersDocs", user.uid), {});
      }
    );
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // const loginWithGoogle = async () => {
  //   return await signInWithPopup(auth, googleAuthProvider).then(({ user }) => {
  //     setUser(user);
  //     setDoc(doc(db, "users", user.uid), { uid: user.uid });
  //     setDoc(doc(db, "usersDocs", user.uid), {});
  //   });
  // };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
