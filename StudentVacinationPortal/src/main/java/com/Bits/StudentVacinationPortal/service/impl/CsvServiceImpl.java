package com.Bits.StudentVacinationPortal.service.impl;

import com.Bits.StudentVacinationPortal.model.Student;
import com.Bits.StudentVacinationPortal.repository.StudentRepo;
import com.Bits.StudentVacinationPortal.service.ICsvService;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CsvServiceImpl implements ICsvService {

    @Autowired
    private StudentRepo studentRepository;

    public void saveCSVData(MultipartFile file) throws Exception {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            List<Student> students = new CsvToBeanBuilder<Student>(reader)
                    .withType(Student.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build()
                    .parse();
            studentRepository.saveAll(students);
        }
    }
}
