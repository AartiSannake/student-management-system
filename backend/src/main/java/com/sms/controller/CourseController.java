package com.sms.controller;

import com.sms.entity.Course;
import com.sms.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseRepository repo;

    @GetMapping public List<Course> all() { return repo.findAll(); }
    @PostMapping public Course create(@RequestBody Course c) { c.setId(null); return repo.save(c); }
    @PutMapping("/{id}") public Course update(@PathVariable Long id, @RequestBody Course c) { c.setId(id); return repo.save(c); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { repo.deleteById(id); }
}
