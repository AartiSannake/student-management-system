package com.sms.controller;

import com.sms.entity.Attendance;
import com.sms.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceRepository repo;

    @GetMapping("/student/{studentId}")
    public List<Attendance> byStudent(@PathVariable Long studentId) {
        return repo.findByStudentIdOrderByDateDesc(studentId);
    }

    @PostMapping public Attendance add(@RequestBody Attendance a) { a.setId(null); return repo.save(a); }
    @PutMapping("/{id}") public Attendance update(@PathVariable Long id, @RequestBody Attendance a) { a.setId(id); return repo.save(a); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { repo.deleteById(id); }
}
