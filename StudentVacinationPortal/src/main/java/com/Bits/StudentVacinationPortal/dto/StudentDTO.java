package com.Bits.StudentVacinationPortal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {

    private Long studentId;
    private String firstName;
    private String lastName;
    private String studentClass;
    private String gender;
    private String dob;
    private String studentEmail;
    private String studentContactNumber;
    private String guardianName;
    private String status;

}
