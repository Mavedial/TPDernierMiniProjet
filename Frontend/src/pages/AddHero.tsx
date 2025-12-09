import { useNavigate } from 'react-router-dom';
import { heroApi } from '../api/heroApi';
import { HeroForm } from '../components/HeroForm';

export const AddHero = () => {
    const navigate = useNavigate();

    const handleSubmit = async (formData: FormData) => {
        try {
            await heroApi.create(formData);
            alert('Héros créé avec succès !');
            navigate('/');
        } catch (error) {
            console.error('Error creating hero:', error);
            alert('Erreur lors de la création du héros');
        }
    };

    return <HeroForm onSubmit={handleSubmit} />;
};