package com.sms.repository;

import com.sms.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentIdOrderByDateDesc(Long studentId);
    void deleteByStudentId(Long studentId);
}
