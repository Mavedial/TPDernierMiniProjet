import { useState, type FormEvent } from 'react';
import type { Hero } from '../types/hero';

interface HeroFormProps {
    hero?:  Hero;
    onSubmit:  (formData: FormData) => Promise<void>;
    isEdit?: boolean;
}

export const HeroForm = ({ hero, onSubmit, isEdit = false }: HeroFormProps) => {
    const [nom, setNom] = useState(hero?.name || '');
    const [alias, setAlias] = useState(hero?.slug || '');
    const [univers, setUnivers] = useState(hero?.univers || 'Autre');
    const [description, setDescription] = useState(hero?.description || '');
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('alias', alias);
        formData.append('univers', univers);
        if (description) formData.append('description', description);
        if (image) formData.append('image', image);

        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem' }}>
            <h2>{isEdit ? 'Modifier le héros' : 'Ajouter un héros'}</h2>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Nom:
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        required
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Alias:
                    <input
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Univers:
                    <select
                        value={univers}
                        onChange={(e) => setUnivers(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    >
                        <option value="Marvel">Marvel</option>
                        <option value="DC">DC</option>
                        <option value="Autre">Autre</option>
                    </select>
                </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <label>
                    Image:
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                    />
                </label>
            </div>

            <button type="submit" style={{ padding:  '0.75rem 1.5rem', cursor: 'pointer' }}>
                {isEdit ? 'Mettre à jour' : 'Créer'}
            </button>
        </form>
    );
};