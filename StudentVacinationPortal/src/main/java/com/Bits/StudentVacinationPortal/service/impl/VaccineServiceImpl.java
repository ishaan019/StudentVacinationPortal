package com.Bits.StudentVacinationPortal.service.impl;

import com.Bits.StudentVacinationPortal.dto.VaccineDTO;
import com.Bits.StudentVacinationPortal.exception.ResourceNotFoundException;
import com.Bits.StudentVacinationPortal.mapper.VaccineMapper;
import com.Bits.StudentVacinationPortal.model.Vaccine;
import com.Bits.StudentVacinationPortal.repository.VaccineRepo;
import com.Bits.StudentVacinationPortal.service.IVaccineService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class VaccineServiceImpl implements IVaccineService {

    private VaccineRepo vaccineRepo;

    @Override
    public VaccineDTO createVaccine(VaccineDTO vaccineDTO) {
        Vaccine vaccine = VaccineMapper.mapToVaccine(vaccineDTO);
        Vaccine savedVaccine= (Vaccine) vaccineRepo.save(vaccine);
        return VaccineMapper.mapToVaccineDto(savedVaccine);
    }

    @Override
    public VaccineDTO getVaccineById(Long vaccineId) {
        Optional<Vaccine> vaccine = Optional.ofNullable(vaccineRepo.findById(vaccineId).orElseThrow(() ->
                new ResourceNotFoundException("Vaccine does not exist with vaccineId : " + vaccineId)));
        Vaccine savedVaccine = vaccine.get();
        return VaccineMapper.mapToVaccineDto(savedVaccine);
    }

    @Override
    public List<VaccineDTO> getAllVaccine() {
        List<Vaccine> vaccines = vaccineRepo.findAll();
        return vaccines.stream().map((vaccine) -> VaccineMapper.mapToVaccineDto(vaccine)).
                collect(Collectors.toList());
    }

    @Override
    public VaccineDTO updateVaccine(Long vaccineId, VaccineDTO updatedVaccineDTO) {
        Optional<Vaccine> vaccine = Optional.ofNullable(vaccineRepo.findById(vaccineId).orElseThrow(() ->
                new ResourceNotFoundException("Vaccine does not exist with vaccineId : " + vaccineId)));
        Vaccine vt = vaccine.get();

        vt.setVaccineName(updatedVaccineDTO.getVaccineName());
        vt.setDescription(updatedVaccineDTO.getDescription());

        Vaccine updatedVaccineObj = vaccineRepo.save(vt);

        return VaccineMapper.mapToVaccineDto(updatedVaccineObj);
    }

    @Override
    public void deleteVaccine(Long vaccineId) {
        Optional<Vaccine> vaccine = Optional.ofNullable(vaccineRepo.findById(vaccineId).orElseThrow(() ->
                new ResourceNotFoundException("Vaccine does not exist with vaccineId : " + vaccineId)));
        Vaccine vt = vaccine.get();

        vaccineRepo.deleteById(vaccineId);
    }
}
