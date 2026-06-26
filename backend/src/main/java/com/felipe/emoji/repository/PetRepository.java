package com.felipe.emoji.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.felipe.emoji.domain.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
    // 
}