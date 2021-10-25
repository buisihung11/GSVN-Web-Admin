import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// @types
import { ActionMap, AuthState, AuthUser, FirebaseContextType } from '../@types/authentication';
//
import { firebaseConfig } from '../config';
import { setSession } from '@/utils/jwt';
import studentApi from '@/api/student';
import tutorApi from '@/api/tutor';
import { getUserInfo, setUserInfo } from '@/utils/utils';
import { TTutor } from '@/type/tutor';
import { TStudent } from '@/type/student';
import { notification } from 'antd';

// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const storage = firebase.storage();

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: true,
  user: null,
};

enum Types {
  Initial = 'INITIALISE',
  UpdateUser = 'UPDATE_USER',
}

type FirebaseAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: AuthUser;
  };
  [Types.UpdateUser]: {
    user: AuthUser;
  };
};

type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user, isInitialized } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized,
      user,
    };
  }
  if (action.type === Types.UpdateUser) {
    const { user } = action.payload;
    return {
      ...state,
      user,
    };
  }

  return state;
};

const AuthContext = createContext<FirebaseContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<
    firebase.firestore.DocumentData | TTutor | TStudent | undefined
  >();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const CLAIM_KEY = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
          const tokenRes = await user.getIdTokenResult();
          console.log('tokenRes🍔', tokenRes);

          const idToken = await user.getIdToken();
          setSession(idToken);

          const role = tokenRes.claims[CLAIM_KEY];
          const userId = tokenRes.claims['user-id'];

          console.log(`role`, role);
          // let userInfo: TTutor | TStudent | string | null = getUserInfo();
          // if (!userInfo) {
          //   userInfo = {
          //     displayName = 'Admin',
          //     role,
          //   };
          // }
          // console.log('userInfo 🧒', userInfo);
          // setProfile(userInfo as TTutor | TStudent);

          const currentUser: AuthUser = {
            id: userId,
            uid: user.uid,
            role,
            emailVerified: user.emailVerified,
            email: user.email,
            photoURL: user.photoURL,
            displayName: user.displayName /* ||  (userInfo as TTutor | TStudent)?.fullName */,
          };
          setUserInfo(currentUser);

          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: true, user: currentUser, isInitialized: false },
          });
        } else {
          setSession(null);
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, user: null, isInitialized: false },
          });
        }
      }),
    [dispatch],
  );

  const login = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const register = (email: string, password: string, fullName: string) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection('users')
          .doc(res.user?.uid)
          .set({
            uid: res.user?.uid,
            email,
            displayName: `${fullName}`,
          });
      });

  const logout = async () => {
    await firebase.auth().signOut();
    setSession(null);
    setUserInfo(null);
  };

  const resetPassword = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const auth = { ...state.user };

  const updateProfile = async () => {
    await firebase.auth().currentUser?.reload();
    const token = await firebase.auth().currentUser?.getIdToken(true);
    if (token) {
      setSession(token);
    }
  };

  const sendEmailVerify = (authSettings: firebase.auth.ActionCodeSettings | null | undefined) => {
    const user = firebase.auth().currentUser;
    console.log(`authSettings`, authSettings);
    if (user !== null) {
      return user
        .sendEmailVerification(authSettings)
        .then(() => {
          console.log(`success`);
          notification.success({ message: 'Đã gửi email xác nhận' });
        })
        .catch((err) => {
          console.log(`err`, err);
          notification.error({ message: err.message });
        });
    }
    throw new Error('Not useer has logged in');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          email: auth.email,
          photoURL: auth.photoURL || profile?.avatar,
          displayName: auth.displayName || profile?.fullName,
          phoneNumber: auth.phoneNumber || profile?.phone || '',
          country: profile?.teachCity || '',
          address: profile?.address || '',
          city: profile?.city || '',
          about: profile?.about || '',
          ...state.user,
        },
        login,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword,
        updateProfile,
        sendEmailVerify,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, storage };
