package com.felipe.emoji.dto;

public record PetResponseDTO(
        Long id,
        String name,
        String baseEmoji,
        String equippedAccessoryId,
        PetStatusDTO status
) {}

