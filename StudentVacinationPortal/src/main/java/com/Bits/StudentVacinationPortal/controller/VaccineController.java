package com.Bits.StudentVacinationPortal.controller;

import com.Bits.StudentVacinationPortal.dto.VaccineDTO;
import com.Bits.StudentVacinationPortal.service.IVaccineService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/vaccines")
public class VaccineController {

    @Autowired
    private IVaccineService vaccineService;

    @PostMapping("/createVaccine")
    public ResponseEntity<VaccineDTO> createVaccine(@RequestBody VaccineDTO vaccineDTO) {
        System.out.println("Inside createStudent");
        VaccineDTO savedVaccine = vaccineService.createVaccine(vaccineDTO);
        return new ResponseEntity<>(savedVaccine, HttpStatus.CREATED);
    }

    @GetMapping("/{vaccineId}")
    public ResponseEntity<VaccineDTO> getVaccineById(@PathVariable("vaccineId") Long vaccineId) {
        final VaccineDTO vaccineDTO = vaccineService.getVaccineById(vaccineId);
        return ResponseEntity.ok(vaccineDTO);
    }

    @GetMapping
    public ResponseEntity<List<VaccineDTO>> getAllVaccine() {
        final List<VaccineDTO> vaccineDTO = vaccineService.getAllVaccine();
        return ResponseEntity.ok(vaccineDTO);
    }

    @PutMapping("{id}")
    public ResponseEntity<VaccineDTO> updateVaccine(@PathVariable("id") Long vaccineId, @RequestBody VaccineDTO updatedVaccineDTO) {
        final VaccineDTO vaccineDTO = vaccineService.updateVaccine(vaccineId, updatedVaccineDTO);
        return ResponseEntity.ok(vaccineDTO);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteVaccine(@PathVariable("id") Long vaccineId) {
        vaccineService.deleteVaccine(vaccineId);
        return ResponseEntity.ok("Vaccine deleted successfully.");
    }
}
