package com.Bits.StudentVacinationPortal.mapper;

import com.Bits.StudentVacinationPortal.dto.StudentDTO;
import com.Bits.StudentVacinationPortal.dto.VaccineDTO;
import com.Bits.StudentVacinationPortal.model.Student;
import com.Bits.StudentVacinationPortal.model.Vaccine;

public class VaccineMapper {

    public static VaccineDTO mapToVaccineDto(Vaccine vaccine) {
        return new VaccineDTO(
                vaccine.getVaccineId(),
                vaccine.getVaccineName(),
                vaccine.getDescription()
        );
    }

    public static Vaccine mapToVaccine(VaccineDTO vaccineDTO) {
        return new Vaccine(
                vaccineDTO.getVaccineId(),
                vaccineDTO.getVaccineName(),
                vaccineDTO.getDescription()
        );
    }
}
