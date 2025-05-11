package com.Bits.StudentVacinationPortal.controller;

import com.Bits.StudentVacinationPortal.constant.ApplicationResource;
import com.Bits.StudentVacinationPortal.dto.StudentDTO;
import com.Bits.StudentVacinationPortal.service.ICsvService;
import com.Bits.StudentVacinationPortal.service.IStudentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private IStudentService studentService;

    @Autowired
    private ICsvService csvService;

    @PostMapping("/createStudent")
    public ResponseEntity<?> createStudent(@RequestBody StudentDTO studentDTO) {
        System.out.println("Inside createStudent");
        try {
            StudentDTO savedStudent = studentService.createStudent(studentDTO);
            return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(ApplicationResource.ERROR_MESSAGE_EMAIL_EXIST, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable("studentId") Long studentId) {
        final StudentDTO studentDTO = studentService.getStudentById(studentId);
        return ResponseEntity.ok(studentDTO);
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudent() {
        final List<StudentDTO> studentDTO = studentService.getAllStudent();
        return ResponseEntity.ok(studentDTO);
    }

    @PutMapping("{id}")
    public ResponseEntity<StudentDTO> updateStudent(@PathVariable("id") Long studentId, @RequestBody StudentDTO updatedStudent) {
        final StudentDTO studentDTO = studentService.updateStudent(studentId, updatedStudent);
        return ResponseEntity.ok(studentDTO);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") Long studentId) {
        studentService.deleteStudent(studentId);
        return ResponseEntity.ok("Student deleted successfully.");
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadCSV(@RequestParam("file") MultipartFile file) {
        try {
            csvService.saveCSVData(file);
            return ResponseEntity.ok("CSV imported successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed: " + e.getMessage());
        }
    }

    @GetMapping("/getStudentNamesList/{className}")
    public ResponseEntity<List<StudentDTO>> getStudentNamesList(@PathVariable("className") Long className) {
        final List<StudentDTO> studentDTO = studentService.getStudentNamesList(className.toString());
        return ResponseEntity.ok(studentDTO);
    }

    @GetMapping("/getAllVaccinatedStudent")
    public ResponseEntity<List<StudentDTO>> getAllVaccinatedStudent() {
        final List<StudentDTO> studentDTO = studentService.getAllVaccinatedStudent();
        return ResponseEntity.ok(studentDTO);
    }
}
