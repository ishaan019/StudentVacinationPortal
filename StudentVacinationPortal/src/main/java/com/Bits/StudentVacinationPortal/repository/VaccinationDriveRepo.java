package com.Bits.StudentVacinationPortal.repository;

import com.Bits.StudentVacinationPortal.model.VaccinationDrive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccinationDriveRepo extends JpaRepository<VaccinationDrive, Long> {

//    @Query("SELECT a.vaccination_drive_id, a.vaccine_id , a.applicable_classes, a.available_doses, a.start_date, a.end_date, a.vaccination_drive_status, b.vaccine_name FROM vaccinationPortal.vaccination_drive a join vaccinationPortal.vaccine b where a.vaccine_id = b.vaccine_id")
//    List<VaccinationDrive> findByIds();

}
