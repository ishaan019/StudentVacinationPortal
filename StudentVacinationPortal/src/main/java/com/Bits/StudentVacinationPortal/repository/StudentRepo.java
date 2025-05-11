package com.Bits.StudentVacinationPortal.repository;

import com.Bits.StudentVacinationPortal.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepo extends JpaRepository<Student, Long> {
    Optional<Student> findByStudentEmail(String studentEmail);

}
