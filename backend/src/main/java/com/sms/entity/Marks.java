package com.sms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class Marks {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = false)
    private Student student;
    private String subject;
    private int score;
    private int maxScore;
}
