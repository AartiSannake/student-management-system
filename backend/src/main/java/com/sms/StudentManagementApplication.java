package com.sms;

import com.sms.entity.Role;
import com.sms.entity.User;
import com.sms.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class StudentManagementApplication {
    public static void main(String[] args) {
        SpringApplication.run(StudentManagementApplication.class, args);
    }

    // Creates default admin on first run: admin / admin123
    @Bean
    CommandLineRunner seed(UserRepository users, PasswordEncoder enc) {
        return args -> {
            if (!users.existsByUsername("admin")) {
                users.save(new User(null, "admin", enc.encode("admin123"), Role.ADMIN));
            }
        };
    }
}
