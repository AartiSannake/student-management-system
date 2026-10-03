package com.sms.controller;

import com.sms.entity.Marks;
import com.sms.repository.MarksRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
@RequiredArgsConstructor
public class MarksController {
    private final MarksRepository repo;

    @GetMapping("/student/{studentId}")
    public List<Marks> byStudent(@PathVariable Long studentId) { return repo.findByStudentId(studentId); }

    @PostMapping public Marks add(@RequestBody Marks m) { m.setId(null); return repo.save(m); }
    @PutMapping("/{id}") public Marks update(@PathVariable Long id, @RequestBody Marks m) { m.setId(id); return repo.save(m); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { repo.deleteById(id); }
}
