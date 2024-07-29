package com.growise.api.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.ActiveProfiles;

import com.growise.api.model.user.User;
import com.growise.api.model.user.UserRole;

import jakarta.persistence.EntityManager;

@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryTest {

    @Autowired
    EntityManager entityManager;
    @Autowired
    UserRepository userRepository;

    @Test
    void findByEmail() {

        User user = createUser();
        
        UserDetails userDetais = this.userRepository.findByEmail("exemplo@email.com.br");

    }

    User createUser() {

        User user = new User("exemplo@email.com.br", "password123", "aurea", "123.456.789-00", UserRole.ADMIN);
        this.entityManager.persist(user);
        return user;
    }

}