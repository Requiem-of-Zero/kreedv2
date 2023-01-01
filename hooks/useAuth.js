import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../src/config/firebase";

const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);
  const router = useRouter();

  // This persists the user to be logged in or logged out
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Logged In
        setUser(user);
        setLoading(false);
      } else {
        // Logged Out
        setUser(user);
        setLoading(true);
        router.push("/login");
      }

      setInitialLoad(false);
    });
  }, [auth]);

  const signUp = async (email, password) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        setUser(userCred.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const signIn = async (email, password) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        setUser(userCred.user);
        router.push("/");
        setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Memoizes the value for optimization
  const memoedVal = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      loading,
      logout,
      error,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memoedVal}>
      {!initialLoad && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
