package com.Bits.StudentVacinationPortal.model;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "vaccination_drive")
public class VaccinationDrive {

//    @Transient
//    private List<String> applicableClasses;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vaccination_drive_id")
    private Long vaccinationDriveId;//(PK)

    @Column(name = "vaccine_id")
    private String vaccineId;//(FK → Vaccine.vaccine_id)

    @Column(name = "start_date")
    private String startDate;

    @Column(name = "end_date")
    private String endDate;

    @Column(name = "available_doses")
    private String availableDoses;

    @Column(name = "applicable_classes")
    private String applicableClasses;//(e.g., Grade 5–7 as comma-separated values or a related table)

    @Column(name = "vaccination_drive_status")
    private String vaccinationDriveStatus;//(Scheduled, Completed, Expired)

    private String vaccineName;

    public VaccinationDrive(Long vaccinationDriveId, String vaccineId, String startDate, String endDate, String availableDoses, String applicableClasses, String vaccinationDriveStatus) {
        this.vaccinationDriveId=vaccinationDriveId;
        this.vaccineId=vaccineId;
        this.startDate=startDate;
        this.endDate=endDate;
        this.availableDoses=availableDoses;
        this.applicableClasses=applicableClasses;
        this.vaccinationDriveStatus=vaccinationDriveStatus;
    }

//    // Convert from List to comma-separated string before saving
//    public void setApplicableClasses(List<String> classes) {
//        this.applicableClasses = classes;
//        this.applicableClassesStr = String.join(",", classes);
//    }
//
//    public List<String> getApplicableClasses() {
//        return applicableClassesStr != null ? Arrays.asList(applicableClassesStr.split(",")) : new ArrayList<>();
//    }

//    public VaccinationDrive(Long vaccinationDriveId, String vaccineId, String startDate,
//                            String endDate, String availableDoses, List<String> applicableClasses,
//                            String vaccinationDriveStatus) {
//        this.vaccinationDriveId = vaccinationDriveId;
//        this.vaccineId = vaccineId;
//        this.startDate = startDate;
//        this.endDate = endDate;
//        this.availableDoses = availableDoses;
//        this.applicableClasses = applicableClasses;
//        this.vaccinationDriveStatus = vaccinationDriveStatus;
//    }
//    @OneToMany(mappedBy = "vaccination_id", cascade = CascadeType.ALL)
//    private Integer vaccinationId;

}
