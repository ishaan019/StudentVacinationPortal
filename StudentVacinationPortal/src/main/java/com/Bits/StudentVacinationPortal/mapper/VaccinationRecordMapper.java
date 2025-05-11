package com.Bits.StudentVacinationPortal.mapper;

import com.Bits.StudentVacinationPortal.dto.VaccinationRecordDTO;
import com.Bits.StudentVacinationPortal.model.VaccinationDrive;
import com.Bits.StudentVacinationPortal.model.VaccinationRecord;

public class VaccinationRecordMapper {

    public static VaccinationRecordDTO mapToVaccinationRecordDTO(VaccinationRecord vaccinationRecord) {
        return new VaccinationRecordDTO(
                vaccinationRecord.getRecordId(),
                vaccinationRecord.getStudentId(),
                vaccinationRecord.getDriveId(),
                vaccinationRecord.getVaccineId(),
                vaccinationRecord.getVaccinationDate(),
                vaccinationRecord.getStatus(),
                vaccinationRecord.getVaccineName(),
                vaccinationRecord.getStudentName(),
                vaccinationRecord.getStudentClass(),
                vaccinationRecord.getAvailableDoses()

        );
    }

    public static VaccinationRecord mapToVaccinationRecord(VaccinationRecordDTO vaccinationRecordDTO) {
        return new VaccinationRecord(
                vaccinationRecordDTO.getRecordId(),
                vaccinationRecordDTO.getStudentId(),
                vaccinationRecordDTO.getDriveId(),
                vaccinationRecordDTO.getVaccineId(),
                vaccinationRecordDTO.getVaccinationDate(),
                vaccinationRecordDTO.getStatus(),
                vaccinationRecordDTO.getVaccineName(),
                vaccinationRecordDTO.getStudentName(),
                vaccinationRecordDTO.getStudentClass(),
                vaccinationRecordDTO.getAvailableDoses()
        );
    }
}
