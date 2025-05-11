package com.Bits.StudentVacinationPortal.service;

import com.Bits.StudentVacinationPortal.dto.VaccinationDriveDTO;

import java.util.List;

public interface IVaccinationDriveService {

    VaccinationDriveDTO createVaccinationDrive(VaccinationDriveDTO vaccinationDriveDTO);

    public VaccinationDriveDTO getVaccinationDriveById(Long vaccinationDriveId);

    List<VaccinationDriveDTO> getAllVaccinationDrive();

    public VaccinationDriveDTO updateVaccinationDrive(Long vaccinationDriveId, VaccinationDriveDTO vaccinationDriveDTO);

    public void deleteVaccinationDrive(Long vaccinationDriveId);

    List<VaccinationDriveDTO> getVaccinationDriveWithClass(Long className);

    public List<VaccinationDriveDTO> getScheduledVaccinationDrives();

    public List<VaccinationDriveDTO> getOngoingVaccinationDrives();
}
