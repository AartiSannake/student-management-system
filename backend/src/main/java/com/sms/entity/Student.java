package com.sms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class Student {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(unique = true, nullable = false)
    private String email;     // also the login username
    @Column(unique = true, nullable = false)
    private String rollNo;    // also the initial password
    @ManyToOne
    private Department department;
    @ManyToOne
    private Course course;
}
