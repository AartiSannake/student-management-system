package com.sms.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class Attendance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    private Student student;
    private LocalDate date;
    private boolean present;
}
