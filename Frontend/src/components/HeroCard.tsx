import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Hero } from '../types/hero';
import { heroApi } from '../api/heroApi';

interface HeroCardProps {
    hero: Hero;
    canEdit?: boolean;
    onEdit?: (hero: Hero) => void;
    onDelete?: (hero: Hero) => void;
}

export const HeroCard = ({ hero, canEdit = false, onEdit, onDelete }: HeroCardProps) => {
    const navigate = useNavigate();

    const fileName = hero.slug ? `${hero.slug}.jpg` : '';
    const imageUrl = fileName ? `http://localhost:5000/uploads/md/${fileName}` : '/placeholder.jpg';
    const displayName = hero.name || hero.nom || 'Sans nom';

    const handleEditClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onEdit) {
            onEdit(hero);
            return;
        }
        // Route d'édition utilisée ailleurs dans le projet : /edit-hero/:id
        const idForRoute = hero.id ?? hero._id;
        navigate(`/edit-hero/${idForRoute}`);
    };

    const handleDeleteClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!confirm(`Supprimer "${displayName}" ? Cette action est irréversible.`)) return;

        if (onDelete) {
            onDelete(hero);
            return;
        }

        try {
            const idForApi = (hero.id ?? hero._id) as unknown as number;
            await heroApi.delete(idForApi);
            alert('Héros supprimé');
            // Si aucun callback parent fourni, on recharge la page (fallback)
            window.location.reload();
        } catch (err: unknown) {
            console.error('Erreur suppression:', err);
            alert('Erreur lors de la suppression du héros');
        }
    };

    return (
        <div className="hero-card" role="group" aria-label={`Carte ${displayName}`}>
            <img
                src={imageUrl}
                alt={displayName}
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg';
                }}
            />
            <h3>{displayName}</h3>
            <p style={{ color: '#333', fontSize: '.9rem' }}>
                <strong>Éditeur:</strong> {hero.biography?.publisher || hero.univers || 'Inconnu'}
            </p>

            <div className="hero-meta" style={{ display: 'flex', gap: '.5rem', alignItems: 'center', marginTop: 'auto' }}>
                <Link to={`/hero/${hero.id ?? hero._id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                    Voir détails →
                </Link>

                {canEdit && (
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: '.5rem' }}>
                        <button
                            onClick={handleEditClick}
                            style={{
                                padding: '0.35rem 0.6rem',
                                cursor: 'pointer',
                                borderRadius: 4,
                                border: '1px solid #007bff',
                                background: '#fff',
                                color: '#007bff',
                            }}
                            aria-label={`Modifier ${displayName}`}
                        >
                            Modifier
                        </button>
                        <button
                            onClick={handleDeleteClick}
                            style={{
                                padding: '0.35rem 0.6rem',
                                cursor: 'pointer',
                                borderRadius: 4,
                                border: '1px solid #dc3545',
                                background: '#dc3545',
                                color: '#fff',
                            }}
                            aria-label={`Supprimer ${displayName}`}
                        >
                            Supprimer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};