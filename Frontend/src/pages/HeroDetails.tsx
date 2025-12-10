import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Hero } from '../types/hero';
import { heroApi } from '../api/heroApi';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

export const HeroDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();
    const [hero, setHero] = useState<Hero | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const num = Number(id);
            if (Number.isInteger(num)) {
                void fetchHero(num);
            } else {
                // id non numérique : redirection ou affichage
                setLoading(false);
                navigate('/');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchHero = async (heroId: number) => {
        try {
            setLoading(true);
            const response = await heroApi.getById(heroId);
            setHero(response.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.message ?? 'Erreur lors de la récupération du héros';
                console.error('Error fetching hero (axios):', msg);
                alert(msg);
            } else if (err instanceof Error) {
                console.error('Error fetching hero:', err.message);
                alert(err.message);
            } else {
                console.error('Unknown error fetching hero', err);
                alert('Erreur lors de la récupération du héros');
            }
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-hero/${hero?.id}`);
    };

    const handleDelete = async () => {
        if (!hero?.id || !window.confirm('Êtes-vous sûr de vouloir supprimer ce héros ?')) return;
        try {
            await heroApi.delete(hero.id);
            alert('Héros supprimé');
            navigate('/');
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.message ?? 'Erreur lors de la suppression';
                console.error('Delete error (axios):', msg);
                alert(msg);
            } else if (err instanceof Error) {
                console.error('Delete error:', err.message);
                alert(err.message);
            } else {
                console.error('Unknown delete error', err);
                alert('Erreur lors de la suppression');
            }
        }
    };

    if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Chargement...</p>;
    if (!hero) return <p>Héros non trouvé</p>;

    const canEdit = isAuthenticated && (user?.role === 'admin' || user?.role === 'editor');
    const fileName = hero.slug ?  `${hero.slug}.jpg` : '';
    const imageUrl = fileName ? `http://localhost:5000/uploads/md/${fileName}` : '/placeholder.jpg';

    // Fonctions utilitaires sûres pour extraire des champs potentiellement manquants
    const getOccupation = (): string => {
        return hero?.work?.occupation ?? 'N/A';
    };

    const getBase = (): string => {
        return hero?.work?.base ?? 'N/A';
    };

    const getGroupAffiliation = (): string => {
        return hero?.connections?.groupAffiliation ?? 'N/A';
    };

    const getRelatives = (): string => {
        return hero?.connections?.relatives ?? 'N/A';
    };

    return (
        <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '1rem' }}>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <img
                    src={imageUrl}
                    alt={hero.name}
                    style={{ width: '300px', height: '400px', objectFit: 'cover', borderRadius: '8px' }}
                    onError={(e) => {
                        e.currentTarget.src = '/placeholder.jpg';
                    }}
                />
                <div style={{ flex: 1 }}>
                    <h1>{hero.name || hero.nom}</h1>
                    <p><strong>Nom complet:</strong> {hero.biography?.fullName || 'N/A'}</p>
                    <p><strong>Alias:</strong> {hero.biography?.aliases?.join(', ') || 'N/A'}</p>
                    <p><strong>Éditeur:</strong> {hero.biography?.publisher || 'N/A'}</p>
                    <p><strong>Alignement:</strong> {hero.biography?.alignment || 'N/A'}</p>
                    <p><strong>Première apparition:</strong> {hero.biography?.firstAppearance || 'N/A'}</p>

                    {canEdit && (
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                            <button onClick={handleEdit} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
                                Modifier
                            </button>
                            <button
                                onClick={handleDelete}
                                style={{ padding: '0.5rem 1rem', background: '#dc3545', color: '#fff', cursor: 'pointer' }}
                            >
                                Supprimer
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h2>Statistiques</h2>
                <ul>
                    <li>Intelligence: {hero.powerstats?.intelligence ?? 'N/A'}</li>
                    <li>Force: {hero.powerstats?.strength ?? 'N/A'}</li>
                    <li>Vitesse: {hero.powerstats?.speed ?? 'N/A'}</li>
                    <li>Durabilité: {hero.powerstats?.durability ?? 'N/A'}</li>
                    <li>Pouvoir: {hero.powerstats?.power ?? 'N/A'}</li>
                    <li>Combat: {hero.powerstats?.combat ?? 'N/A'}</li>
                </ul>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h2>Apparence</h2>
                <p><strong>Genre:</strong> {hero.appearance?.gender || 'N/A'}</p>
                <p><strong>Race:</strong> {hero.appearance?.race || 'N/A'}</p>
                <p><strong>Taille:</strong> {hero.appearance?.height?.join(' / ') || 'N/A'}</p>
                <p><strong>Poids:</strong> {hero.appearance?.weight?.join(' / ') || 'N/A'}</p>
                <p><strong>Yeux:</strong> {hero.appearance?.eyeColor || 'N/A'}</p>
                <p><strong>Cheveux:</strong> {hero.appearance?.hairColor || 'N/A'}</p>
            </div>

            { (hero.work && (hero.work.occupation || hero.work.base)) && (
                <div style={{ marginTop: '2rem' }}>
                    <h2>Travail</h2>
                    <p><strong>Occupation:</strong> {getOccupation()}</p>
                    <p><strong>Base:</strong> {getBase()}</p>
                </div>
            )}

            { (hero.connections && (hero.connections.groupAffiliation || hero.connections.relatives)) && (
                <div style={{ marginTop: '2rem' }}>
                    <h2>Connexions</h2>
                    <p><strong>Groupe:</strong> {getGroupAffiliation()}</p>
                    <p><strong>Famille:</strong> {getRelatives()}</p>
                </div>
            )}
        </div>
    );
};