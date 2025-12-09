import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav style={{ padding: '1rem', background: '#333', color: '#fff' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
                    SuperHero Manager
                </Link>
                {isAuthenticated ?  (
                    <>
                        <Link to="/" style={{ color: '#fff' }}>Dashboard</Link>
                        <Link to="/add-hero" style={{ color: '#fff' }}>Ajouter un héros</Link>
                        {user?. role === 'admin' && (
                            <Link to="/admin" style={{ color: '#fff' }}>Admin</Link>
                        )}
                        <span style={{ marginLeft: 'auto' }}>
              {user?.username} ({user?.role})
            </span>
                        <button onClick={logout} style={{ cursor: 'pointer', padding: '0.5rem 1rem' }}>
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={{ color: '#fff', marginLeft: 'auto' }}>Connexion</Link>
                )}
            </div>
        </nav>
    );
};