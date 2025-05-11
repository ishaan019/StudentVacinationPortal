package com.Bits.StudentVacinationPortal.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vaccine")
public class Vaccine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vaccine_id")
    private Long vaccineId;// (PK)

    @Column(name = "vaccine_name")
    private String vaccineName;

    @Column(name = "description")
    private String description;

}
