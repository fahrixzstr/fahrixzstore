import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, googleProvider } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, setDoc, serverTimestamp } from 'firebase/firestore';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: string;
  balance?: number;
  referralCode?: string;
  phoneNumber?: string;
}

interface CartItem {
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
  category: string;
}

interface AppState {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  loading: boolean;
  loginAttempts: number;
  lockoutUntil: number | null;
  cart: CartItem[];
  theme: 'dark' | 'light';
  language: string;
  kimmyMenuOpen: boolean;
  aiChatOpen: boolean;
  toast: { message: string; type: 'success' | 'error' | 'warning' | 'info' } | null;
  logoClickCount: number;
  lastLogoClickTime: number;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (val: boolean) => void;
  setIsAdmin: (val: boolean) => void;
  setLoading: (val: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setLanguage: (lang: string) => void;
  toggleKimmyMenu: () => void;
  setKimmyMenuOpen: (val: boolean) => void;
  toggleAiChat: () => void;
  setAiChatOpen: (val: boolean) => void;
  showToast: (message: string, type: 'success' | 'error' | 'warning' | 'info') => void;
  clearToast: () => void;
  incrementLogoClick: () => void;
  resetLogoClicks: () => void;
  setLockout: (until: number) => void;
  setLoginAttempts: (count: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isAdmin: false,
      loading: true,
      loginAttempts: 0,
      lockoutUntil: null,
      cart: [],
      theme: 'dark',
      language: 'id',
      kimmyMenuOpen: false,
      aiChatOpen: false,
      toast: null,
      logoClickCount: 0,
      lastLogoClickTime: 0,

      setUser: (user) => set({ user }),
      setIsLoggedIn: (val) => set({ isLoggedIn: val }),
      setIsAdmin: (val) => set({ isAdmin: val }),
      setLoading: (val) => set({ loading: val }),

      login: async (email, password) => {
        const state = get();
        if (state.lockoutUntil && Date.now() < state.lockoutUntil) {
          throw new Error(`Akun terkunci. Coba lagi dalam ${Math.ceil((state.lockoutUntil - Date.now()) / 60000)} menit.`);
        }
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          const userDoc = await getDoc(doc(db, 'users', result.user.uid));
          const userData = userDoc.data();
          if (userData?.role === 'admin' || userData?.role === 'super_admin') {
            set({ isAdmin: true });
          }
          set({ loginAttempts: 0, lockoutUntil: null });
        } catch (err: any) {
          const newAttempts = state.loginAttempts + 1;
          set({ loginAttempts: newAttempts });
          if (newAttempts >= 3) {
            set({ lockoutUntil: Date.now() + 15 * 60 * 1000 });
            throw new Error('3x login gagal. Akun terkunci 15 menit.');
          }
          throw err;
        }
      },

      register: async (email, password, name) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', result.user.uid), {
          uid: result.user.uid,
          email,
          displayName: name,
          role: 'user',
          balance: 0,
          referralCode: `FXZ-${Date.now().toString(36).toUpperCase()}`,
          joinDate: new Date().toISOString(),
          createdAt: serverTimestamp(),
        });
      },

      googleLogin: async () => {
        const result = await signInWithPopup(auth, googleProvider);
        const userDoc = await getDoc(doc(db, 'users', result.user.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', result.user.uid), {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            role: 'user',
            balance: 0,
            referralCode: `FXZ-${Date.now().toString(36).toUpperCase()}`,
            joinDate: new Date().toISOString(),
            createdAt: serverTimestamp(),
          });
        }
      },

      logout: async () => {
        await signOut(auth);
        set({ user: null, isLoggedIn: false, isAdmin: false, cart: [] });
      },

      addToCart: (item) => {
        const { cart } = get();
        const existing = cart.find((c) => c.productId === item.productId);
        if (existing) {
          set({ cart: cart.map((c) => c.productId === item.productId ? { ...c, quantity: c.quantity + item.quantity } : c) });
        } else {
          set({ cart: [...cart, item] });
        }
      },
      removeFromCart: (productId) => set({ cart: get().cart.filter((c) => c.productId !== productId) }),
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) { get().removeFromCart(productId); return; }
        set({ cart: get().cart.map((c) => c.productId === productId ? { ...c, quantity } : c) });
      },
      clearCart: () => set({ cart: [] }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      toggleKimmyMenu: () => set((s) => ({ kimmyMenuOpen: !s.kimmyMenuOpen })),
      setKimmyMenuOpen: (val) => set({ kimmyMenuOpen: val }),
      toggleAiChat: () => set((s) => ({ aiChatOpen: !s.aiChatOpen })),
      setAiChatOpen: (val) => set({ aiChatOpen: val }),
      showToast: (message, type) => {
        set({ toast: { message, type } });
        setTimeout(() => set({ toast: null }), 3000);
      },
      clearToast: () => set({ toast: null }),
      incrementLogoClick: () => {
        const state = get();
        const now = Date.now();
        if (now - state.lastLogoClickTime > 1500) {
          set({ logoClickCount: 1, lastLogoClickTime: now });
        } else {
          set({ logoClickCount: state.logoClickCount + 1, lastLogoClickTime: now });
        }
      },
      resetLogoClicks: () => set({ logoClickCount: 0, lastLogoClickTime: 0 }),
      setLockout: (until) => set({ lockoutUntil: until }),
      setLoginAttempts: (count) => set({ loginAttempts: count }),
    }),
    {
      name: 'fahrixz-store',
      partialize: (state) => ({ cart: state.cart, theme: state.theme, language: state.language }),
    }
  )
);

export const initAuth = () => {
  const { setUser, setIsLoggedIn, setIsAdmin, setLoading } = useStore.getState();
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      const userData = userDoc.data();
      const user: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || userData?.displayName,
        photoURL: firebaseUser.photoURL || userData?.photoURL,
        role: userData?.role || 'user',
        balance: userData?.balance || 0,
        referralCode: userData?.referralCode,
        phoneNumber: userData?.phoneNumber,
      };
      setUser(user);
      setIsLoggedIn(true);
      setIsAdmin(user.role === 'admin' || user.role === 'super_admin');
      onSnapshot(doc(db, 'wallets', firebaseUser.uid), (snap) => {
        if (snap.exists()) {
          setUser({ ...user, balance: snap.data().balance || 0 });
        }
      });
    } else {
      setUser(null);
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
    setLoading(false);
  });
};
