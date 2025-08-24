import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

function ProtectedLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userRef = doc(db, 'users', authUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists()) {
            setUser({ id: authUser.uid, ...userSnap.data() });
          } else {
            const newUser = {
              id: authUser.uid,
              coins: 0,
              energy: 100,
              level: 1,
            };
            await setDoc(userRef, newUser);
            setUser(newUser);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        // Jika tidak ada pengguna, arahkan kembali ke halaman login
        setUser(null);
        navigate('/'); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Memuat...</div>;
  }

  // Jika setelah loading selesai tapi tidak ada user, redirect sudah ditangani di atas.
  // Kita hanya perlu render Outlet jika ada user.
  return user ? (
    <div className="app">
      <main className="p-4">
        <Outlet context={{ user, setUser }} />
      </main>
      <nav className="fixed bottom-0 w-full bg-gray-200 p-4">
        {/* Navigasi Anda di sini */}
      </nav>
    </div>
  ) : null; // Tampilkan null sementara redirect terjadi
}

export default ProtectedLayout;
