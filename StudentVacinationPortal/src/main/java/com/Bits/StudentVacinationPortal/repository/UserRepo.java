package com.Bits.StudentVacinationPortal.repository;

import com.Bits.StudentVacinationPortal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByUserEmail(String email);
}
