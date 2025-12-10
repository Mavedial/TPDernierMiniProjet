import { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <div style={{ padding: '1rem', background: '#f5f5f5', marginBottom: '1rem' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Rechercher un héros..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ flex: 1, padding: '0.5rem' }}
                />
                <button type="submit" style={{ padding:  '0.5rem 1rem' }}>
                    Rechercher
                </button>
            </form>
        </div>
    );
};