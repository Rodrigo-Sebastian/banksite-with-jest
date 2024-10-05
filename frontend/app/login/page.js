// app/login/page.js
"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Skicka POST-förfrågan till backend för att logga in
      const response = await axios.post('http://localhost:3001/sessions', { username, password });
      const { otp } = response.data;

      // Spara OTP i sessionStorage eller localStorage
      sessionStorage.setItem('otp', otp);

      // Navigera till dashboard-sidan efter lyckad inloggning
      router.push('/dashboard');
    } catch (error) {
      setMessage('Felaktiga inloggningsuppgifter. Försök igen.');
    }
  };

  return (
    <div>
      <h1>Logga in</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Användarnamn</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Logga in</button>
      </form>
      {message && <p>{message}</p>}
      <p>Ingen användare? <a href="/signup">Registrera dig här</a></p>
    </div>
  );
}


/*
"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Definiera din API-URL här
const API_URL = 'http://ec2-13-60-45-252.eu-north-1.compute.amazonaws.com:3001';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Skicka POST-förfrågan till backend för att logga in
      const response = await axios.post(`${API_URL}/sessions`, { username, password });
      const { otp } = response.data;

      // Spara OTP i sessionStorage
      sessionStorage.setItem('otp', otp);

      // Navigera till dashboard-sidan efter lyckad inloggning
      router.push('/dashboard');
    } catch (error) {
      setMessage('Felaktiga inloggningsuppgifter. Försök igen.');
    }
  };

  return (
    <div>
      <h1>Logga in</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Användarnamn</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Lösenord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Logga in</button>
      </form>
      {message && <p>{message}</p>}
      <p>Ingen användare? <a href="/signup">Registrera dig här</a></p>
    </div>
  );
}
*/