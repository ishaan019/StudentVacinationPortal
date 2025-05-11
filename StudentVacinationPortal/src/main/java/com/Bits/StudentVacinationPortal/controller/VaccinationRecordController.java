package com.Bits.StudentVacinationPortal.controller;

import com.Bits.StudentVacinationPortal.dto.StudentDTO;
import com.Bits.StudentVacinationPortal.dto.VaccinationDriveDTO;
import com.Bits.StudentVacinationPortal.dto.VaccinationRecordDTO;
import com.Bits.StudentVacinationPortal.service.IVaccinationRecordService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/vaccination-record")
public class VaccinationRecordController {

    @Autowired
    private IVaccinationRecordService vaccinationRecordService;

    @PostMapping("/create-vaccination-record")
    public ResponseEntity<VaccinationRecordDTO> createVaccinationRecord(@RequestBody VaccinationRecordDTO vaccinationRecordDTO) {
        System.out.println("Inside createVaccinationRecord");
        VaccinationRecordDTO savedVaccinationRecordDTO = vaccinationRecordService.createVaccinationRecord(vaccinationRecordDTO);
        return new ResponseEntity<>(savedVaccinationRecordDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{vaccinationRecordId}")
    public ResponseEntity<VaccinationRecordDTO> getVaccinationRecordById(@PathVariable("vaccinationRecordId") Long vaccinationRecordId) {
        final VaccinationRecordDTO vaccinationRecordDTO = vaccinationRecordService.getVaccinationRecordById(vaccinationRecordId);
        return ResponseEntity.ok(vaccinationRecordDTO);
    }

    @GetMapping
    public ResponseEntity<List<VaccinationRecordDTO>> getAllVaccinationRecord() {
        final List<VaccinationRecordDTO> vaccinationRecordDTOList = vaccinationRecordService.getAllVaccinationRecord();
        return ResponseEntity.ok(vaccinationRecordDTOList);
    }

    @PutMapping("{id}")
    public ResponseEntity<VaccinationRecordDTO> updateVaccinationRecord(@PathVariable("id") Long vaccinationRecordId, @RequestBody VaccinationRecordDTO vaccinationRecordDTO) {
        final VaccinationRecordDTO updatedVaccinationRecord = vaccinationRecordService.updateVaccinationRecord(vaccinationRecordId, vaccinationRecordDTO);
        return ResponseEntity.ok(updatedVaccinationRecord);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVaccinationRecord(@PathVariable("id") Long vaccinationRecordId) {
        vaccinationRecordService.deleteVaccinationRecord(vaccinationRecordId);
        return ResponseEntity.ok("Vaccination record deleted successfully.");
    }
}
