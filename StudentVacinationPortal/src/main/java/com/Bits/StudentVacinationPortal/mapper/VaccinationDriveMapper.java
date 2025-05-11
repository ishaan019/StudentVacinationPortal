package com.Bits.StudentVacinationPortal.mapper;

import com.Bits.StudentVacinationPortal.dto.VaccinationDriveDTO;
import com.Bits.StudentVacinationPortal.model.VaccinationDrive;

public class VaccinationDriveMapper {

    public static VaccinationDriveDTO mapToVaccinationDriveDTO(VaccinationDrive vaccinationDrive) {
        return new VaccinationDriveDTO(
                vaccinationDrive.getVaccinationDriveId(),
                vaccinationDrive.getVaccineId(),
                vaccinationDrive.getStartDate(),
                vaccinationDrive.getEndDate(),
                vaccinationDrive.getAvailableDoses(),
                vaccinationDrive.getApplicableClasses(),
                vaccinationDrive.getVaccinationDriveStatus(),
                vaccinationDrive.getVaccineName()
        );
    }

    public static VaccinationDrive mapToVaccinationDrive(VaccinationDriveDTO vaccinationDriveDTO) {
        return new VaccinationDrive(
                vaccinationDriveDTO.getVaccinationDriveId(),
                vaccinationDriveDTO.getVaccineId(),
                vaccinationDriveDTO.getStartDate(),
                vaccinationDriveDTO.getEndDate(),
                vaccinationDriveDTO.getAvailableDoses(),
                vaccinationDriveDTO.getApplicableClasses(),
                vaccinationDriveDTO.getVaccinationDriveStatus(),
                vaccinationDriveDTO.getVaccineName()
        );
    }
}
