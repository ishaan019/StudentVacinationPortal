package com.Bits.StudentVacinationPortal.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vaccination_record")
public class VaccinationRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")//(PK)
    private Long recordId;

    @Column(name = "student_id")
    private String studentId;//(FK → Student.student_id)

    @Column(name = "drive_id")
    private String driveId;//(FK → VaccinationDrive.drive_id)

    @Column(name = "vaccine_id")
    private String vaccineId;//(FK → VaccinationDrive.drive_id)

    @Column(name = "vaccination_date")
    private String vaccinationDate;

    @Column(name = "status")
    private String status;//(Vaccinated / Not Vaccinated)

    private String vaccineName;
    private String studentName;
    private String studentClass;
    private String availableDoses;
}
