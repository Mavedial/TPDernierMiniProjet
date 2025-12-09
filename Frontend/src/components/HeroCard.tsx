import { Link } from 'react-router-dom';
import type { Hero } from '../types/hero';


interface HeroCardProps {
    hero: Hero;
}

export const HeroCard = ({ hero }: HeroCardProps) => {
    const imagePath = hero.images?.md ?? hero.images?.lg ?? hero.images?.sm ?? '';
    const imageUrl = imagePath ?`/uploads/${imagePath}` : '/placeholder.jpg';

    const displayName = hero.name || hero.nom || 'Sans nom';

    return (
        <div className="hero-card">
            <img
                src={imageUrl}
                alt={displayName}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg'; }}
            />
            <h3>{displayName}</h3>
            <p style={{ color: '#333', fontSize: '.9rem' }}>
                <strong>Éditeur:</strong> {hero.biography?.publisher || hero.univers || 'Inconnu'}
            </p>
            <p style={{ color: '#666', fontSize: '.85rem' }}>
                <strong>Alignement:</strong> {hero.biography?.alignment || 'N/A'}
            </p>
            <div className="hero-meta">
                <Link to={`/hero/${hero.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                    Voir détails →
                </Link>
            </div>
        </div>
    );
};