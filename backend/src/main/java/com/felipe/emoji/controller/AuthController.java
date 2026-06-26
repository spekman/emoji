package com.felipe.emoji.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.felipe.emoji.domain.Pet;
import com.felipe.emoji.domain.User;
import com.felipe.emoji.dto.LoginRequestDTO;
import com.felipe.emoji.dto.LoginResponseDTO;
import com.felipe.emoji.dto.RegisterRequestDTO;
import com.felipe.emoji.repository.UserRepository;
import com.felipe.emoji.service.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, 
                          TokenService tokenService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterRequestDTO body) {
        if (this.userRepository.findByUsername(body.username()).isPresent()) {
            return ResponseEntity.badRequest().body("O nome de usuário já está sendo usado.");
        }

        User newUser = new User();
        newUser.setUsername(body.username());
        newUser.setPassword(passwordEncoder.encode(body.password()));

        Pet newPet = new Pet();
        newPet.setName(body.petName());
        newPet.setBaseEmoji(body.petBaseEmoji());
        newPet.setHunger(50);
        newPet.setHappiness(40);
        newPet.setEnergy(80);
        newPet.setCleanliness(60);
        newPet.setUser(newUser); 

        newUser.setPet(newPet); 

        this.userRepository.save(newUser);

        return ResponseEntity.ok("Usuário e Pet criados com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid LoginRequestDTO body) {
        UsernamePasswordAuthenticationToken authToken = 
                new UsernamePasswordAuthenticationToken(body.username(), body.password());
        
        Authentication auth = this.authenticationManager.authenticate(authToken);
        User user = (User) auth.getPrincipal();

        String token = this.tokenService.generateToken(user);

        LoginResponseDTO response = new LoginResponseDTO(
                token,
                user.getUsername(),
                user.getPet().getId(),
                user.getPet().getName(),
                user.getPet().getBaseEmoji()
        );

        return ResponseEntity.ok(response);
    }
}