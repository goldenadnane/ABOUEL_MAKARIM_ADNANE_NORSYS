package com.norsys.fr.services;

import com.norsys.fr.entities.Users;

import java.util.List;
import java.util.UUID;

public interface UsersService {
    void deleteUser(UUID id);
    void updateUser(UUID id, Users user);
    Users getUser(UUID id);
    List<Users> getAllUsers();
    void saveUser(Users user);
    Users getUserByUsername(String username);
}
