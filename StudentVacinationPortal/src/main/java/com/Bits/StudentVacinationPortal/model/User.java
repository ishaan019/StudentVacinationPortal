package com.Bits.StudentVacinationPortal.model;

/*
user_id (PK)

username

password (simulated/hardcoded)

role (e.g., ADMIN)
*/

import com.opencsv.bean.CsvBindByName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;//(PK)

    @Column(name = "email", nullable = false, unique = true)
    private String userEmail;

    @Column(name = "user_password", nullable = false)
    private String userPassword;
}
