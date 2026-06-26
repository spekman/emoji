package com.felipe.emoji.dto;

public record LoginResponseDTO(
    String token,
    String username,
    Long petId,
    String petName,
    String petBaseEmoji
) {}