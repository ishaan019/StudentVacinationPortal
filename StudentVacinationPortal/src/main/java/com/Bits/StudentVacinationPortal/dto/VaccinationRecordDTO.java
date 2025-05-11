package com.Bits.StudentVacinationPortal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationRecordDTO {

    private Long recordId;
    private String studentId;//(FK → Student.student_id)
    private String driveId;//(FK → VaccinationDrive.drive_id)
    private String vaccineId;//(FK → VaccinationDrive.drive_id)
    private String vaccinationDate;
    private String status;//(Vaccinated / Not Vaccinated)

    private String vaccineName;
    private String studentName;
    private String studentClass;
    private String availableDoses;
}
