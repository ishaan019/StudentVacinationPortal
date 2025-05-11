package com.Bits.StudentVacinationPortal.service;

import com.Bits.StudentVacinationPortal.dto.StudentDTO;
import com.Bits.StudentVacinationPortal.dto.VaccineDTO;

import java.util.List;

public interface IVaccineService {

    VaccineDTO createVaccine(VaccineDTO vaccine);

    public VaccineDTO getVaccineById(Long vaccineId);

    List<VaccineDTO> getAllVaccine();

    public VaccineDTO updateVaccine(Long vaccineId, VaccineDTO vaccine);

    public void deleteVaccine(Long vaccineId);
}
