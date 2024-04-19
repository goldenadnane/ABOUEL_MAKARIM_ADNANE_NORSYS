package com.norsys.fr.services.Impl;

import com.norsys.fr.entities.Users;
import com.norsys.fr.repositories.UsersRepository;
import com.norsys.fr.services.UsersService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsersServiceImpl implements UsersService {
    private final UsersRepository usersRepository;

    public UsersServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public void deleteUser(UUID id) {
        if (usersRepository.existsById(id)) {
            usersRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    @Override
    public void updateUser(UUID id, Users user) {
        Optional<Users> existingUserOptional = usersRepository.findById(id);
        if (existingUserOptional.isEmpty()) {
            throw new NoSuchElementException("User not found");
        }
        Users existingUser = existingUserOptional.get();
        existingUser.setUsername(user.getUsername());
        usersRepository.save(existingUser);
    }


    @Override
    public Users getUser(UUID id) {
        return usersRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public void saveUser(Users user) {
        if(usersRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("User already exists");
        }
        usersRepository.save(user);
    }

    @Override
    public Users getUserByUsername(String username) {
        return usersRepository.findByUsername(username);
    }

    public boolean isManager() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken) {
            JwtAuthenticationToken jwtAuthenticationToken = (JwtAuthenticationToken) authentication;
            return jwtAuthenticationToken.getToken().getClaimAsStringList("roles").contains("manager");
        } else {
            return false;
        }
    }

    public Users getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return (Users) authentication.getPrincipal();
        } else {
            return null;
        }
    }
}
