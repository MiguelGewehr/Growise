package com.growise.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.growise.api.infra.security.TokenService;
import com.growise.api.model.user.AuthenticationDTO;
import com.growise.api.model.user.LoginResponseDTO;
import com.growise.api.model.user.RegisterDTO;
import com.growise.api.model.user.User;
import com.growise.api.repository.UserRepository;

import jakarta.validation.Valid;

import org.springframework.security.core.AuthenticationException;

@RestController
@RequestMapping("/auth")
@CrossOrigin("http://127.0.0.1:5500")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((User) auth.getPrincipal());
            var role = ((User) auth.getPrincipal()).getRole();
            var name = ((User) auth.getPrincipal()).getName();
            System.out.println("***role + nome:   " + role + " " + name);

            // Se chegou aqui, a autenticaç var role = auth.getDetails();ão foi bem-sucedida
            // Adicione lógica adicional conforme necessário

            return ResponseEntity.ok(new LoginResponseDTO(token, name, role.toString()));
        } catch (UsernameNotFoundException e) {
            // Lida com o caso em que o usuário não foi encontrado
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado");
        } catch (AuthenticationException e) {
            // Lida com outros tipos de exceções de autenticação
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais inválidas");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data) {
        if (this.userRepository.findByEmail(data.email()) != null)
            return ResponseEntity.badRequest().build();

        String encodedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.email(), encodedPassword, data.name(), data.cpf(), data.role());
        this.userRepository.save(newUser);
        return ResponseEntity.ok().build();

    }
}
