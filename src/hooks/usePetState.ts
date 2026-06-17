import { Message, Pet } from '@/types';
import { useEffect, useState } from 'react';
import { iconNames } from 'react-native-ico-noto-emojis';

/*
    - o hook encapsula o estado local do pet e as mensagens associadas.
    - mantém `pet` e `messages` em memória por enquanto já que não tem backend. 
        o hook vai depois mapear respostas e atualizações vindas da API.
    - `pettingHover` é uma atualização leve e imediata do estado para feedback
        visual, sem gerar mensagens. já `handleInteraction` representa ações do
        utilizador que geram mensagens e atualizam status, mantendo a lógica agrupada
        para facilitar testes e possivel extração para um serviço.
*/

export function usePetState(initialPet?: Pet) {
    const [pet, setPet] = useState<Pet>(initialPet ?? {
        id: '1',
        name: 'teste',
        baseEmoji: '🙄',
        currentEmoji: 'neutral-face',
        status: { hunger: 50, happiness: 40, energy: 80, cleanliness: 60 }
    });

    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'oiii tudo bem?...', sender: 'pet', timestamp: '19:00' }
    ]);

    const [isSleeping, setIsSleeping] = useState(false);
    const [lastEmojiBeforeSleep, setLastEmojiBeforeSleep] = useState<iconNames>('neutral-face');

    useEffect(() => {
        const interval = setInterval(() => {
            setPet(prev => ({
                ...prev,
                status: { 
                    ...prev.status, 
                    cleanliness: Math.max(prev.status.cleanliness - 2, 0) 
                }
            }));
        }, 30000); 

        return () => clearInterval(interval);
    }, []);

    const petMessage = (newStatus: typeof pet.status) => {
        let response = "hummm então tá...";
        if (newStatus.hunger < 30) response = "TO COM FOMEEEEEEEE. Cadê a comida?";
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
        setPet(prev => {
            const happiness = Math.min(prev.status.happiness + 2, 100);
            const newEmoji = happiness > 80 ? 'smiling-face-with-smiling-eyes' : 'smiling-face';
            return {
                ...prev,
                status: { ...prev.status, happiness },
                currentEmoji: newEmoji,
            };
        });
    };

    const handleInteraction = (type: 'petting' | 'feeding') => {
        let updateStatus = { ...pet.status };
        let newEmoji: iconNames = 'neutral-face';

        if (type === 'petting') {
            updateStatus.happiness = Math.min(updateStatus.happiness + 10, 100);
            newEmoji = updateStatus.happiness > 80 ? 'smiling-face-with-smiling-eyes' : 'smiling-face';
            const msgUser: Message = {
                id: `u-${Date.now()}`,
                text: '👋',
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, msgUser]);
        }

        if (type === 'feeding') {
            updateStatus.hunger = Math.max(updateStatus.hunger + 20, 0);
            newEmoji = updateStatus.hunger > 80 ? 'face-savoring-food' : 'smiling-face';
            const msgUser: Message = {
                id: `u-${Date.now()}`,
                text: '🍕',
                sender: 'user',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, msgUser]);
        }

        setPet(prev => ({ ...prev, status: updateStatus, currentEmoji: newEmoji }));
        setTimeout(() => petMessage(updateStatus), 1500);
    };

    const handleCleanPoo = () => {
        setPet(prev => {
            const cleanliness = Math.min(prev.status.cleanliness + 10, 100);
            return {
                ...prev,
                status: { ...prev.status, cleanliness }
            };
        });
    };

    const handleSleep = () => {
        setLastEmojiBeforeSleep(pet.currentEmoji);
        setPet(prev => ({
            ...prev,
            currentEmoji: 'sleeping-face'
        }));
        setIsSleeping(true);
    };

    const handleWakeUp = () => {
        setPet(prev => ({
            ...prev,
            currentEmoji: lastEmojiBeforeSleep,
            status: { ...prev.status, energy: Math.min(prev.status.energy + 30, 100) }
        }));
        setIsSleeping(false);

        const wakeMsg: Message = {
            id: Date.now().toString(),
            text: '😴 *acorda* que sono bom!',
            sender: 'pet',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, wakeMsg]);
    };

    return { pet, messages, handleInteraction, pettingHover, handleCleanPoo, isSleeping, handleSleep, handleWakeUp };
}
