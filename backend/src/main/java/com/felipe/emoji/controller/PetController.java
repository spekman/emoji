package com.felipe.emoji.controller;

import com.felipe.emoji.dto.PetResponseDTO;
import com.felipe.emoji.service.PetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetResponseDTO> getPet(@PathVariable Long id) {
        return ResponseEntity.ok(petService.getPetById(id));
    }

    @PutMapping("/{id}/interagir")
    public ResponseEntity<PetResponseDTO> interagir(@PathVariable Long id, @RequestParam String acao) {
        return ResponseEntity.ok(petService.processarInteracao(id, acao));
    }

    @PutMapping("/{id}/equipar")
    public ResponseEntity<PetResponseDTO> equiparAcessorio(@PathVariable Long id, @RequestParam(required = false) String accessoryId) {
        return ResponseEntity.ok(petService.equiparAcessorio(id, accessoryId));
    }
}