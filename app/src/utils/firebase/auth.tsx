import { createContext, Context, useContext, useState, useEffect } from "react";
import firebase from "./firebaseClient";
import nookies from "nookies";
import Router from "next/router";
import {
  createUserWithGoogle,
  createUser,
} from "../../services-back/admin/userService";

interface Auth {
  uid: string;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  token: string | null;
}

interface AuthContext {
  auth: Auth | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signIn: (email, password) => Promise<void>;
  createUserWithEmailAndPassword: (email, password) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email) => Promise<void>;
  sendSignInLinkToEmail: (email) => Promise<void>;
}

const authContext: Context<AuthContext> = createContext<AuthContext>({
  auth: null,
  loading: true,
  signInWithGoogle: async () => {},
  signIn: async (email, password) => {},
  createUserWithEmailAndPassword: async (email, password) => {},
  signOut: async () => {},
  resetPassword: async (email) => {},
  sendSignInLinkToEmail: async (email) => {},
});

const formatAuthState = (user: firebase.User): Auth => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  photoUrl: user.photoURL,
  token: null,
});

function useProvideAuth() {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  /**
   * Callback function used for firebase.auth.onAuthStateChanged().
   * Takes the user object returned and formats it for my state.
   * We fetch the idToken and append it to my auth state and store it.
   */
  const handleAuthChange = async (authState: firebase.User | null) => {
    if (typeof window !== "undefined") {
      (window as any).nookies = nookies;
    }
    return firebase.auth().onIdTokenChanged(async (authState) => {
      console.log(`token changed!`);
      if (!authState) {
        console.log(`no token found...`);
        setAuth(null);
        nookies.destroy(null, "token");
        nookies.set(null, "token", "", { path: "/" });
        return;
      }
      console.log(`updating token...`);
      const formattedAuth = formatAuthState(authState);
      formattedAuth.token = await authState.getIdToken();
      setAuth(formattedAuth);
      nookies.destroy(null, "token");
      nookies.set(null, "token", formattedAuth.token, { path: "/" });
    });
  };

  /**
   * Callback function used for response from firebase OAuth.
   * Store user object returned in firestore.
   * @param firebase User Credential
   */
  const signedIn = async (response: firebase.auth.UserCredential) => {
    if (!response.user) {
      throw new Error("No User");
    }
  };

  /**
   * Callback for when firebase signOut.
   * Sets auth state to null and loading to true.
   */
  const clear = () => {
    setAuth(null);
    setLoading(true);
  };

  /**
   * Triggers firebase Oauth for twitter and calls signIn when successful.
   * sets loading to true.
   */
  const signInWithGoogle = () => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        var user = result.user;
        if (user.email === "ndimitri.ngoutouga1@gmail.com") {
          createUserWithGoogle(user.uid, user).then(() => {
            Router.push("/admin");
          });
        } else {
          createUserWithGoogle(user.uid, user).then(() => {
            Router.push("/");
          });
        }
      });
  };
  const signIn = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(signedIn)
      .then(() => {
        Router.push("/");
      });
  };
  const resetPassword = (email) => {
    setLoading(true);
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Router.push("/email-send");
      });
  };
  const sendSignInLinkToEmail = (email) => {
    setLoading(true);
    const actionCodeSettings = {
      handleCodeInApp: true,
      // URL must be whitelisted in the Firebase Console.
      url: "http://localhost:3000/confirm-password/",
    };
    return firebase
      .auth()
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
      });
  };
  const createUserWithEmailAndPassword = (email, password) => {
    setLoading(true);
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        signIn(email, password);
      });
  };

  /**
   * Calls firebase signOut and with clear callback to reset state.
   */
  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(clear)
      .then(() => {
        Router.push("/login");
      });
  };

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`);
      const user = firebase.auth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  /**
   * Watches for state change for firebase auth and calls the handleAuthChange callback
   * on every change.
   */
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthChange);
    return () => unsubscribe();
  }, []);

  // returns state values and callbacks for signIn and signOut.
  return {
    auth,
    loading,
    signInWithGoogle,
    signIn,
    signOut,
    resetPassword,
    sendSignInLinkToEmail,
    createUserWithEmailAndPassword,
  };
}

export function AuthProvider({ children }: any) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);
