import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Hero } from '../types/hero';
import { heroApi } from '../api/heroApi';
import { HeroForm } from '../components/HeroForm';

export const EditHero = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [hero, setHero] = useState<Hero | null>(null);

    useEffect(() => {
        if (id) fetchHero(Number(id));
    }, [id]);

    const fetchHero = async (heroId: number) => {
        try {
            const response = await heroApi.getById(heroId);
            setHero(response.data);
        } catch (error) {
            console.error('Error fetching hero:', error);
            navigate('/');
        }
    };

    const handleSubmit = async (formData: FormData) => {
        if (!hero?.id) return;
        try {
            await heroApi.update(hero.id, formData);
            alert('Héros mis à jour !');
            navigate(`/hero/${hero.id}`);
        } catch (error) {
            console.error('Error updating hero:', error);
            alert('Erreur lors de la mise à jour');
        }
    };

    if (!hero) return <p>Chargement...</p>;

    return <HeroForm hero={hero} onSubmit={handleSubmit} isEdit />;
};