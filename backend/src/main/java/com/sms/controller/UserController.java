package com.sms.controller;

import com.sms.entity.User;
import com.sms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Admin creates teacher/admin accounts here
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRepository users;
    private final PasswordEncoder encoder;

    @GetMapping
    public List<User> all() { return users.findAll(); }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody User u) {
        if (users.existsByUsername(u.getUsername()))
            return ResponseEntity.badRequest().body("Username already exists");
        u.setId(null);
        u.setPassword(encoder.encode(u.getPassword()));
        return ResponseEntity.ok(users.save(u));
    }
}
