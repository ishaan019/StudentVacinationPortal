package com.Bits.StudentVacinationPortal.controller;

import com.Bits.StudentVacinationPortal.dto.StudentDTO;
import com.Bits.StudentVacinationPortal.dto.VaccinationDriveDTO;
import com.Bits.StudentVacinationPortal.service.IStudentService;
import com.Bits.StudentVacinationPortal.service.IVaccinationDriveService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/vaccination-drive")
public class VaccinationDriveController {

    @Autowired
    private IVaccinationDriveService vaccinationDriveService;

    @PostMapping("/create-vaccination-drive")
    public ResponseEntity<VaccinationDriveDTO> createVaccinationDrive(@RequestBody VaccinationDriveDTO vaccinationDriveDTO) {
        System.out.println("Inside createStudent");
        VaccinationDriveDTO savedVaccinationDriveDTO = vaccinationDriveService.createVaccinationDrive(vaccinationDriveDTO);
        return new ResponseEntity<>(savedVaccinationDriveDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{vaccinationDriveId}")
    public ResponseEntity<VaccinationDriveDTO> getVaccinationDriveById(@PathVariable("vaccinationDriveId") Long vaccinationDriveId) {
        final VaccinationDriveDTO vaccinationDriveDTO = vaccinationDriveService.getVaccinationDriveById(vaccinationDriveId);
        return ResponseEntity.ok(vaccinationDriveDTO);
    }

    @GetMapping
    public ResponseEntity<List<VaccinationDriveDTO>> getAllVaccinationDrive() {
        final List<VaccinationDriveDTO> vaccinationDriveDTOList = vaccinationDriveService.getAllVaccinationDrive();
        return ResponseEntity.ok(vaccinationDriveDTOList);
    }

    @PutMapping("{id}")
    public ResponseEntity<VaccinationDriveDTO> updateVaccinationDrive(@PathVariable("id") Long vaccinationDriveId, @RequestBody VaccinationDriveDTO vaccinationDriveDTO) {
        final VaccinationDriveDTO updatedVaccinationDrive = vaccinationDriveService.updateVaccinationDrive(vaccinationDriveId, vaccinationDriveDTO);
        return ResponseEntity.ok(updatedVaccinationDrive);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVaccinationDrive(@PathVariable("id") Long vaccinationDriveId) {
        vaccinationDriveService.deleteVaccinationDrive(vaccinationDriveId);
        return ResponseEntity.ok("Vaccination Drive deleted successfully.");
    }

    @GetMapping("getVaccinationDriveWithClass/{className}")
    public ResponseEntity<List<VaccinationDriveDTO>> getVaccinationDriveWithClass(@PathVariable("className") Long className) {
        final List<VaccinationDriveDTO> vaccinationDriveDTO = vaccinationDriveService.getVaccinationDriveWithClass(className);
        return ResponseEntity.ok(vaccinationDriveDTO);
    }

    @GetMapping("getScheduledVaccinationDrives")
    public ResponseEntity<List<VaccinationDriveDTO>> getScheduledVaccinationDrives() {
        final List<VaccinationDriveDTO> vaccinationDriveDTO = vaccinationDriveService.getScheduledVaccinationDrives();
        return ResponseEntity.ok(vaccinationDriveDTO);
    }

    @GetMapping("getOngoingVaccinationDrives")
    public ResponseEntity<List<VaccinationDriveDTO>> getOngoingVaccinationDrives() {
        final List<VaccinationDriveDTO> vaccinationDriveDTO = vaccinationDriveService.getOngoingVaccinationDrives();
        return ResponseEntity.ok(vaccinationDriveDTO);
    }
}
