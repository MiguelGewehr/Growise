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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

import org.springframework.security.core.AuthenticationException;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @Operation(description = "Recebe os dados de login e senha para a autenticacão do usuário; Retorna um token JWT, o nome do usuário e seu grupo de permissões.")
    @ApiResponses(value ={
        @ApiResponse(responseCode = "200",description = "Usuário encontrado"),
        @ApiResponse(responseCode = "401",description = "Usuário não encontrado ou credenciais inválidas")
        
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) {
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((User) auth.getPrincipal());
            var role = ((User) auth.getPrincipal()).getRole();
            var name = ((User) auth.getPrincipal()).getName();
            // System.out.println("***role + nome: " + role + " " + name);

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

    @Operation(description = "Recebe os dados para cadastrar um novo usuário.")
    @ApiResponses(value ={
        @ApiResponse(responseCode = "200", description = "Usuário cadastrado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Não foi possível processar o cadastro devido a um erro na requisição recebida")

    })
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
