package com.Bits.StudentVacinationPortal.service;

import com.Bits.StudentVacinationPortal.dto.SVPResponseDTO;
import com.Bits.StudentVacinationPortal.dto.StudentDTO;

import java.util.List;

public interface IStudentService {

    StudentDTO createStudent(StudentDTO student);

    public StudentDTO getStudentById(Long studentId);

    List<StudentDTO> getAllStudent();

    public StudentDTO updateStudent(Long studentId, StudentDTO student);

    public void deleteStudent(Long studentId);

    List<StudentDTO> getStudentNamesList(String className);

    List<StudentDTO> getAllVaccinatedStudent();
//    public SVPResponseDTO listStudent();
//
//    public SVPResponseDTO getStudent(String id);
//
//    public SVPResponseDTO deleteStudent(String id);
//
//    public SVPResponseDTO updateStudent(StudentDTO student);
//
//    public SVPResponseDTO updateStudentStatus(StudentDTO student);
}
