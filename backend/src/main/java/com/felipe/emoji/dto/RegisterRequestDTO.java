package com.felipe.emoji.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequestDTO(
    @NotBlank(message = "O nome de usuário não pode estar vazio")
    @Size(min = 3, max = 20, message = "O usuário deve ter entre 3 e 20 caracteres")
    String username,

    @NotBlank(message = "A senha não pode estar vazia")
    @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
    String password,

    @NotBlank(message = "O nome do pet não pode estar vazio")
    String petName,

    @NotBlank(message = "O emoji base do pet não pode estar vazio")
    String petBaseEmoji
) {}