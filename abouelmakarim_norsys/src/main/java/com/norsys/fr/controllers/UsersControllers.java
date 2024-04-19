package com.norsys.fr.controllers;

import com.norsys.fr.entities.Users;
import com.norsys.fr.services.Impl.UsersServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UsersControllers {
    private final UsersServiceImpl usersServiceImpl;

    public UsersControllers(UsersServiceImpl usersServiceImpl) {
        this.usersServiceImpl = usersServiceImpl;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(usersServiceImpl.getAllUsers());
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody Users request) {
        try {
            usersServiceImpl.saveUser(request);
            return ResponseEntity.ok("User saved successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(409).body("Failed to add user: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Users> getUser(@PathVariable("id") UUID id) {
        try {
            return ResponseEntity.ok(usersServiceImpl.getUser(id));
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable("id") UUID id, @RequestBody Users request) {
        try {
            usersServiceImpl.updateUser(id, request);
            return ResponseEntity.ok("User updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Failed to update user: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") UUID id) {
        try {
            usersServiceImpl.deleteUser(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body("Failed to delete user: " + e.getMessage());
        }
    }
}
