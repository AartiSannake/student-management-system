package com.sms.controller;

import com.sms.entity.Role;
import com.sms.entity.Student;
import com.sms.entity.User;
import com.sms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
    private final StudentRepository students;
    private final UserRepository users;
    private final AttendanceRepository attendance;
    private final MarksRepository marks;
    private final PasswordEncoder encoder;

    @GetMapping
    public List<Student> all(@RequestParam(required = false) String q) {
        if (q == null || q.isBlank()) return students.findAll();
        return students.findByNameContainingIgnoreCaseOrRollNoContainingIgnoreCase(q, q);
    }

    @GetMapping("/me")
    public ResponseEntity<Student> me(Principal p) {
        return students.findByEmail(p.getName()).map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> one(@PathVariable Long id) {
        return students.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Creates the student AND a login (username = email, password = roll no)
    @PostMapping
    @Transactional
    public ResponseEntity<?> create(@RequestBody Student s) {
        if (users.existsByUsername(s.getEmail()))
            return ResponseEntity.badRequest().body("Email already registered");
        s.setId(null);
        Student saved = students.save(s);
        users.save(new User(null, s.getEmail(), encoder.encode(s.getRollNo()), Role.STUDENT));
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Student s) {
        return students.findById(id).map(old -> {
            s.setId(id);
            s.setEmail(old.getEmail()); // login id stays fixed
            return ResponseEntity.ok((Object) students.save(s));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return students.findById(id).map(s -> {
            attendance.deleteByStudentId(id);
            marks.deleteByStudentId(id);
            users.deleteByUsername(s.getEmail());
            students.deleteById(id);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
