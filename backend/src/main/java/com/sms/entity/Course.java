package com.sms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @ManyToOne
    private Department department;
}
