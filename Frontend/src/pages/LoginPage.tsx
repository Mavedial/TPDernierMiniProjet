import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import axios from "axios";

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (err: unknown) {
            // typer correctement l'erreur
            if (axios.isAxiosError(err)) {
                // Erreur provenant d'axios : on peut lire response.data.message si existant
                alert(err.response?.data?.message || err.message || 'Erreur de connexion');
            } else if (err instanceof Error) {
                alert(err.message);
            } else {
                alert('Erreur de connexion');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Nom d'utilisateur:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom:  '1rem' }}>
                    <label>
                        Mot de passe:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                        />
                    </label>
                </div>
                <button type="submit" style={{ width: '100%', padding: '0.75rem', cursor: 'pointer' }}>
                    Se connecter
                </button>
            </form>
        </div>
    );
};