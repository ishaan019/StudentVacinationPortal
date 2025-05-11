package com.Bits.StudentVacinationPortal.service;

import com.Bits.StudentVacinationPortal.dto.VaccinationDriveDTO;
import com.Bits.StudentVacinationPortal.dto.VaccinationRecordDTO;

import java.util.List;

public interface IVaccinationRecordService {

    VaccinationRecordDTO createVaccinationRecord(VaccinationRecordDTO vaccinationRecordDTO);

    public VaccinationRecordDTO getVaccinationRecordById(Long vaccinationRecordId);

    List<VaccinationRecordDTO> getAllVaccinationRecord();

    public VaccinationRecordDTO updateVaccinationRecord(Long vaccinationRecordId, VaccinationRecordDTO vaccinationDriveDTO);

    public void deleteVaccinationRecord(Long vaccinationRecordId);
}
