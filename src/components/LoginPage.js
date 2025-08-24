import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function LoginPage() {
  const navigate = useNavigate();

  // Cek jika pengguna sudah login, langsung arahkan ke aplikasi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/app'); // Arahkan ke dashboard jika sudah login
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Setelah login berhasil, useEffect di atas akan mengarahkan pengguna
    } catch (error) {
      console.error("Error selama login:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Selamat Datang di Altime</h1>
      <p>Silakan login untuk memulai.</p>
      <button 
        onClick={handleLogin} 
        style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: '4px' }}
      >
        Login dengan Google
      </button>
    </div>
  );
}

export default LoginPage;
