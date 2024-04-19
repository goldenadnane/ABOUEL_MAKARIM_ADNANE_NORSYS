package com.norsys.fr.repositories;

import com.norsys.fr.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UsersRepository extends JpaRepository<Users, UUID> {
    Users findByUsername(String username);
}
