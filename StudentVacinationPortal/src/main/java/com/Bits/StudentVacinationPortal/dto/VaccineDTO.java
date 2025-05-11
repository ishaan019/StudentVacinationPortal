package com.Bits.StudentVacinationPortal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VaccineDTO {

    private Long vaccineId;// (PK)
    private String vaccineName;
    private String description;

}
