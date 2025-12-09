import { useState, useEffect } from 'react';
import type { Hero } from '../types/hero';
import { heroApi } from '../api/heroApi';
import { HeroCard } from '../components/HeroCard';
import { SearchBar } from '../components/SearchBar';
import axios from 'axios';

export const Dashboard = () => {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        research: '',
        univers: '',
        ordre: '',
    });

    useEffect(() => {
        void fetchHeroes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const fetchHeroes = async () => {
        try {
            setLoading(true);
            const params: { [k: string]: string } = {};
            if (filters.research) params.research = filters.research;
            if (filters.univers) params.univers = filters.univers;
            if (filters.ordre) params.ordre = filters.ordre;

            const response = await heroApi.getAll(params);
            setHeroes(response.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const msg = err.response?.data?.message ?? 'Erreur lors de la récupération des héros';
                console.error('fetchHeroes error (axios):', msg);
            } else if (err instanceof Error) {
                console.error('fetchHeroes error:', err.message);
            } else {
                console.error('Unknown fetchHeroes error', err);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query: string) => {
        setFilters({ ...filters, research: query });
    };

    const handleFilterUnivers = (univers: string) => {
        setFilters({ ...filters, univers });
    };

    const handleSort = (ordre: string) => {
        setFilters({ ...filters, ordre });
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} onFilterUnivers={handleFilterUnivers} onSort={handleSort} />
            {loading ? (
                <p style={{ textAlign: 'center' }}>Chargement...</p>
            ) : heroes.length === 0 ? (
                <p style={{ textAlign: 'center', padding: '2rem' }}>Aucun héros trouvé.</p>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1rem',
                        padding: '1rem',
                    }}
                >
                    {heroes.map((hero) => (
                        <HeroCard key={String(hero._id ?? hero.id)} hero={hero} />
                    ))}
                </div>
            )}
        </div>
    );
};