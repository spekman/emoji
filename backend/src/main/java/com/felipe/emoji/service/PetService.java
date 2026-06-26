package com.felipe.emoji.service;

import com.felipe.emoji.domain.Pet;
import com.felipe.emoji.dto.PetResponseDTO;
import com.felipe.emoji.dto.PetStatusDTO;
import com.felipe.emoji.repository.PetRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    private PetResponseDTO convertToDTO(Pet pet) {
        return new PetResponseDTO(
                pet.getId(),
                pet.getName(),
                pet.getBaseEmoji(),
                pet.getEquippedAccessoryId(),
                new PetStatusDTO(
                        pet.getHunger(),
                        pet.getHappiness(),
                        pet.getEnergy(),
                        pet.getCleanliness()
                )
        );
    }

    public PetResponseDTO getPetById(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet não encontrado com o ID fornecido."));
        return convertToDTO(pet);
    }

    @Transactional
    public PetResponseDTO processarInteracao(Long petId, String acao) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet não encontrado."));

        if (acao.equalsIgnoreCase("sleeping")) {
            petRepository.save(pet);
            return convertToDTO(pet);
        }

        if (acao.equalsIgnoreCase("wakeup")) {
            pet.setEnergy(Math.min(pet.getEnergy() + 30, 100));
            petRepository.save(pet);
            return convertToDTO(pet);
        }

        switch (acao.toLowerCase()) {
            case "feeding":
                pet.setHunger(Math.min(pet.getHunger() + 20, 100));
                break;
            case "petting":
                pet.setHappiness(Math.min(pet.getHappiness() + 10, 100));
                break;
            case "showering":
                pet.setCleanliness(Math.min(pet.getCleanliness() + 10, 100));
                break;
            default:
                throw new IllegalArgumentException("Ação inválida: " + acao);
        }

        Pet petSalvo = petRepository.save(pet);
        return convertToDTO(petSalvo);
    }

    @Transactional
    public PetResponseDTO equiparAcessorio(Long petId, String accessoryId) {
        Pet pet = petRepository.findById(petId)
                .orElseThrow(() -> new RuntimeException("Pet não encontrado."));

        if (accessoryId == null || accessoryId.trim().isEmpty() || accessoryId.equalsIgnoreCase("undefined")) {
            pet.setEquippedAccessoryId(null);
        } else {
            pet.setEquippedAccessoryId(accessoryId);
        }

        Pet petSalvo = petRepository.save(pet);
        return convertToDTO(petSalvo);
    }

    @Scheduled(fixedRate = 10000)
    @Transactional
    public void decairStatusProgetivamente() {
        petRepository.findAll().forEach(pet -> {
            pet.setCleanliness(Math.max(pet.getCleanliness() - 5, 0));
            pet.setHunger(Math.max(pet.getHunger() - 10, 0));
            pet.setEnergy(Math.max(pet.getEnergy() - 10, 0));
            pet.setHappiness(Math.max(pet.getHappiness() - 10, 0));
            petRepository.save(pet);
        });
    }
}