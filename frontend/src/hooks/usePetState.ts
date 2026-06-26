import { API_URL, useAuth } from '@/context/AuthContext';
import { Message, Pet } from '@/types';
import { getEmoji } from '@/utils/petRules';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { iconNames } from 'react-native-ico-noto-emojis';

export function usePetState(initialPet?: Pet) {
    const { authData } = useAuth();
    const petId = authData?.petId;

    const [pet, setPet] = useState<Pet>(initialPet ?? {
        id: '1',
        name: 'teste',
        baseEmoji: '🙄',
        currentEmoji: 'neutral-face',
        status: { hunger: 50, happiness: 40, energy: 80, cleanliness: 60 },
    });

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'oiii tudo bem?...', sender: 'pet', timestamp: '19:00' }
    ]);

    const [isSleeping, setIsSleeping] = useState(false);
    const [interactionEmojiOverride, setInteractionEmojiOverride] = useState<iconNames | null>(null);

    function updatePetFromApi(db: any) {
        setPet(prev => ({
            ...prev,
            id: String(db.id),
            name: db.name,
            baseEmoji: db.baseEmoji,
            equippedAccessoryId: db.equippedAccessoryId ?? undefined,
            status: {
                hunger: db.status.hunger,
                happiness: db.status.happiness,
                energy: db.status.energy,
                cleanliness: db.status.cleanliness
            }
        }));
    }

    useEffect(() => {
        if (!petId) return;
        axios.get(`${API_URL}/api/pets/${petId}`)
            .then(res => updatePetFromApi(res.data))
            .catch(err => console.error("Erro ao carregar pet do servidor:", err));
    }, [petId]);

    useEffect(() => {
        if (!petId) return;

        const interval = setInterval(() => {
            axios.get(`${API_URL}/api/pets/${petId}`)
                .then(res => updatePetFromApi(res.data)).catch(() => { });
        }, 10000);

        return () => clearInterval(interval);
    }, [petId]);

    const equipAccessory = async (accessoryId: iconNames | undefined) => {
        setPet(prev => ({ ...prev, equippedAccessoryId: accessoryId }));

        if (!petId) return;

        try {
            const valorAcessorio = accessoryId || 'undefined';

            const response = await axios.put(`${API_URL}/api/pets/${petId}/equipar`, null, {
                params: { accessoryId: valorAcessorio }
            });

            const db = response.data;
            setPet(prev => ({
                ...prev,
                equippedAccessoryId: db.equippedAccessoryId === 'undefined' ? undefined : db.equippedAccessoryId,
                status: {
                    hunger: db.status.hunger,
                    happiness: db.status.happiness,
                    energy: db.status.energy,
                    cleanliness: db.status.cleanliness
                }
            }));

        } catch (err) {
            console.error("Erro ao salvar acessório no servidor:", err);
        }
    };

    const petMessage = (newStatus: typeof pet.status) => {
        let response = "hummm então tá...";
        if (newStatus.hunger < 30) response = "TÔ COM FOMEEEEEEEE. Cadê a comida?";
        if (newStatus.happiness < 30) response = "que tristeza...";

        const novaMsg: Message = {
            id: Date.now().toString(),
            text: response,
            sender: 'pet',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, novaMsg]);
    };

    const pettingHover = () => {
        setPet(prev => ({
            ...prev,
            status: { ...prev.status, happiness: Math.min(prev.status.happiness + 1, 100) }
        }));
        if (!isSleeping) {
            setInteractionEmojiOverride('smiling-face');
        }
    };

    const handleInteraction = async (type: 'petting' | 'feeding') => {
        if (isSleeping) return;

        let updateStatus = { ...pet.status };

        if (type === 'petting') {
            updateStatus.happiness = Math.min(updateStatus.happiness + 10, 100);
            setInteractionEmojiOverride('smiling-face-with-smiling-eyes');

            setMessages(prev => [...prev, {
                id: `u-${Date.now()}`,
                text: '👋',
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);

            if (petId) axios.put(`${API_URL}/api/pets/${petId}/interagir`, null, { params: { acao: 'petting' } }).catch(() => { });
        }

        if (type === 'feeding') {
            updateStatus.hunger = Math.min(updateStatus.hunger + 20, 100);
            setInteractionEmojiOverride('face-savoring-food');

            setMessages(prev => [...prev, {
                id: `u-${Date.now()}`,
                text: '🍕',
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);

            if (petId) axios.put(`${API_URL}/api/pets/${petId}/interagir`, null, { params: { acao: 'feeding' } }).catch(() => { });
        }

        setPet(prev => ({ ...prev, status: updateStatus }));

        setTimeout(() => setInteractionEmojiOverride(null), 1500);
        setTimeout(() => petMessage(updateStatus), 1500);
    };

    const handleCleanPoo = () => {
        setPet(prev => ({
            ...prev,
            status: { ...prev.status, cleanliness: Math.min(prev.status.cleanliness + 10, 100) }
        }));

        if (petId) axios.put(`${API_URL}/api/pets/${petId}/interagir`, null, { params: { acao: 'showering' } }).catch(() => { });
    };

    const handleSleep = () => {
        setIsSleeping(true);
        setInteractionEmojiOverride(null);
        if (petId) axios.put(`${API_URL}/api/pets/${petId}/interagir`, null, { params: { acao: 'sleeping' } }).catch(() => { });
    };

    const handleWakeUp = () => {
        setIsSleeping(false);
        setPet(prev => ({
            ...prev,
            status: { ...prev.status, energy: Math.min(prev.status.energy + 30, 100) }
        }));

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: '😴 *acorda* que sono bom!',
            sender: 'pet',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

        if (petId) axios.put(`${API_URL}/api/pets/${petId}/interagir`, null, { params: { acao: 'wakeup' } }).catch(() => { });
    };

    const computedEmoji = interactionEmojiOverride || getEmoji(pet.status, isSleeping);


    return {
        pet: { ...pet, currentEmoji: computedEmoji }, equipAccessory,
        messages, handleInteraction, pettingHover, handleCleanPoo,
        isSleeping, handleSleep, handleWakeUp
    };
}