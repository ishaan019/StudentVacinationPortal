package com.Bits.StudentVacinationPortal.repository;

import com.Bits.StudentVacinationPortal.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VaccineRepo extends JpaRepository<Vaccine, Long> {
}
