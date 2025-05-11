package com.Bits.StudentVacinationPortal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VaccinationDriveDTO {

    private Long vaccinationDriveId;//(PK)
    private String vaccineId;//(FK → Vaccine.vaccine_id)
    private String startDate;
    private String endDate;
    private String availableDoses;
    private String applicableClasses;//(e.g., Grade 5–7 as comma-separated values or a related table)
    private String vaccinationDriveStatus;//(Scheduled, Completed, Expired)

    private String vaccineName;

//    @OneToMany(mappedBy = "vaccination_id", cascade = CascadeType.ALL)
//    private Integer vaccinationId;

}
