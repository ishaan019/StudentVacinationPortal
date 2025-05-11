package com.Bits.StudentVacinationPortal.mapper;

import com.Bits.StudentVacinationPortal.dto.StudentDTO;
import com.Bits.StudentVacinationPortal.model.Student;

public class StudentMapper {

    public static StudentDTO mapToStudentDto(Student student) {
        return new StudentDTO(
                student.getStudentId(),
                student.getFirstName(),
                student.getLastName(),
                student.getStudentClass(),
                student.getGender(),
                student.getDob(),
                student.getStudentEmail(),
                student.getStudentContactNumber(),
                student.getGuardianName(),
                student.getStatus()
        );
    }

    public static Student mapToStudent(StudentDTO studentDto) {
        return new Student(
                studentDto.getStudentId(),
                studentDto.getFirstName(),
                studentDto.getLastName(),
                studentDto.getStudentClass(),
                studentDto.getGender(),
                studentDto.getDob(),
                studentDto.getStudentEmail(),
                studentDto.getStudentContactNumber(),
                studentDto.getGuardianName(),
                studentDto.getStatus()
        );
    }
}
