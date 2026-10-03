package com.sms.controller;

import com.sms.entity.Department;
import com.sms.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {
    private final DepartmentRepository repo;

    @GetMapping public List<Department> all() { return repo.findAll(); }
    @PostMapping public Department create(@RequestBody Department d) { d.setId(null); return repo.save(d); }
    @PutMapping("/{id}") public Department update(@PathVariable Long id, @RequestBody Department d) { d.setId(id); return repo.save(d); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { repo.deleteById(id); }
}
