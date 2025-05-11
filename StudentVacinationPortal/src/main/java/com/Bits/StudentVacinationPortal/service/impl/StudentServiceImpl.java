package com.Bits.StudentVacinationPortal.service.impl;

import com.Bits.StudentVacinationPortal.dto.StudentDTO;
import com.Bits.StudentVacinationPortal.dto.VaccinationRecordDTO;
import com.Bits.StudentVacinationPortal.exception.DuplicateEmailException;
import com.Bits.StudentVacinationPortal.exception.ResourceNotFoundException;
import com.Bits.StudentVacinationPortal.mapper.StudentMapper;
import com.Bits.StudentVacinationPortal.model.Student;
import com.Bits.StudentVacinationPortal.repository.StudentRepo;
import com.Bits.StudentVacinationPortal.service.IStudentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class StudentServiceImpl implements IStudentService {

    private StudentRepo studentRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public StudentDTO createStudent(StudentDTO studentDto) {
        Optional<Student> existingStudent = studentRepo.findByStudentEmail(studentDto.getStudentEmail());
        if (existingStudent.isPresent()) {
            throw new DuplicateEmailException("Email already exists: " + studentDto.getStudentEmail());
        }
        Student student = StudentMapper.mapToStudent(studentDto);
        student.setStatus("Pending");
        Student savedStudent = (Student) studentRepo.save(student);
        return StudentMapper.mapToStudentDto(savedStudent);
    }

    @Override
    public StudentDTO getStudentById(Long studentId) {
        Optional<Student> student = Optional.ofNullable(studentRepo.findById(studentId).orElseThrow(() ->
                new ResourceNotFoundException("Student does not exist with studentId : " + studentId)));
        Student st = student.get();
        return StudentMapper.mapToStudentDto(st);
    }

    @Override
    public List<StudentDTO> getAllStudent() {
        List<Student> students = studentRepo.findAll();
        return students.stream().map((student) -> StudentMapper.mapToStudentDto(student)).
                collect(Collectors.toList());
    }

    @Override
    public StudentDTO updateStudent(Long studentId, StudentDTO updatedStudent) {
        Optional<Student> student = Optional.ofNullable(studentRepo.findById(studentId).orElseThrow(() ->
                new ResourceNotFoundException("Student does not exist with studentId : " + studentId)));
        Student st = student.get();

        st.setFirstName(updatedStudent.getFirstName());
        st.setLastName(updatedStudent.getLastName());
        st.setStudentClass(updatedStudent.getStudentClass());
        st.setGender(updatedStudent.getGender());
        st.setDob(updatedStudent.getDob());
        st.setStudentEmail(updatedStudent.getStudentEmail());
        st.setStudentContactNumber(updatedStudent.getStudentContactNumber());
        st.setGuardianName(updatedStudent.getGuardianName());

        Student updatedStudentObj = studentRepo.save(st);

        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    @Override
    public void deleteStudent(Long studentId) {
        Optional<Student> student = Optional.ofNullable(studentRepo.findById(studentId).orElseThrow(() ->
                new ResourceNotFoundException("Student does not exist with studentId : " + studentId)));
        Student st = student.get();

        studentRepo.deleteById(studentId);
    }

    @Override
    public List<StudentDTO> getStudentNamesList(String className) {
        String query = "SELECT student_id, first_name, last_name, status FROM students WHERE student_class = ?";
        List<StudentDTO> listData = jdbcTemplate.query(query, new Object[]{className}, new CustomerRowMapper());
        return listData;
    }

    @Override
    public List<StudentDTO> getAllVaccinatedStudent() {
        String query = "SELECT student_id, first_name, last_name, status FROM students WHERE status = ?";
        List<StudentDTO> listData = jdbcTemplate.query(query, new Object[]{"Vaccinated"}, new CustomerRowMapper());
        return listData;
    }

    private class CustomerRowMapper implements RowMapper<StudentDTO> {
        @Override
        public StudentDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
            StudentDTO data = new StudentDTO();
            data.setStudentId(rs.getLong("student_id"));
            data.setFirstName(rs.getString("first_name"));
            data.setLastName(rs.getString("last_name"));
            data.setStatus(rs.getString("status"));
            return data;
        }
    }
}
