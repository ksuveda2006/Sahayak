import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user for development
  const mockUser = {
    uid: 'mock-user-123',
    email: 'teacher@sahayak.ai',
    displayName: 'Demo Teacher',
    photoURL: null,
    emailVerified: true
  };

  useEffect(() => {
    // For development, we'll use mock authentication
    // In production, uncomment the Firebase auth state listener
    
    // const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    //   if (firebaseUser) {
    //     const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    //     const userData = userDoc.exists() ? userDoc.data() : {};
    //     setUser({ ...firebaseUser, ...userData });
    //   } else {
    //     setUser(null);
    //   }
    //   setLoading(false);
    // });

    // Mock authentication for development
    setTimeout(() => {
      setUser(mockUser);
      setLoading(false);
    }, 1000);

    // return () => unsubscribe();
  }, []);

  const signup = async (email, password, displayName) => {
    try {
      setLoading(true);
      
      // Mock signup for development
      const newUser = {
        uid: `user-${Date.now()}`,
        email,
        displayName,
        photoURL: null,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        role: 'teacher',
        preferences: {
          language: 'English',
          subjects: [],
          grades: []
        }
      };

      // In production, use actual Firebase auth:
      // const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(firebaseUser, { displayName });
      // await setDoc(doc(db, 'users', firebaseUser.uid), {
      //   email,
      //   displayName,
      //   createdAt: new Date().toISOString(),
      //   role: 'teacher',
      //   preferences: {
      //     language: 'English',
      //     subjects: [],
      //     grades: []
      //   }
      // });

      setUser(newUser);
      toast.success('Account created successfully!');
      return newUser;
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Mock login for development
      if (email && password) {
        const loginUser = {
          ...mockUser,
          email,
          lastLoginAt: new Date().toISOString()
        };
        
        setUser(loginUser);
        toast.success('Signed in successfully!');
        return loginUser;
      } else {
        throw new Error('Please enter email and password');
      }

      // In production, use actual Firebase auth:
      // const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      // const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      // const userData = userDoc.exists() ? userDoc.data() : {};
      // const fullUser = { ...firebaseUser, ...userData };
      // setUser(fullUser);
      // toast.success('Signed in successfully!');
      // return fullUser;
    } catch (error) {
      toast.error(error.message || 'Failed to sign in');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Mock logout for development
      setUser(null);
      toast.success('Signed out successfully!');
      
      // In production, use actual Firebase auth:
      // await signOut(auth);
    } catch (error) {
      toast.error('Failed to sign out');
      throw error;
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        
        // In production, update Firebase:
        // await setDoc(doc(db, 'users', user.uid), updates, { merge: true });
        
        toast.success('Profile updated successfully!');
        return updatedUser;
      }
    } catch (error) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

