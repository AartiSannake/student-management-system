package com.sms.controller;

import com.sms.entity.User;
import com.sms.repository.UserRepository;
import com.sms.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository users;
    private final PasswordEncoder encoder;
    private final JwtUtil jwt;

    public record LoginRequest(String username, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        User u = users.findByUsername(req.username()).orElse(null);
        if (u == null || !encoder.matches(req.password(), u.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
        return ResponseEntity.ok(Map.of(
                "token", jwt.generate(u.getUsername(), u.getRole().name()),
                "username", u.getUsername(),
                "role", u.getRole().name()));
    }
}
