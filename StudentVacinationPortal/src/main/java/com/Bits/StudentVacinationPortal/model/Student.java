package com.Bits.StudentVacinationPortal.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.opencsv.bean.CsvBindByName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

/*
student_id (PK)

name

class

gender

date_of_birth

guardian_name

contact_number
*/

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "students")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Long studentId;//(PK)

    @Column(name = "first_name")
    @CsvBindByName
    private String firstName;

    @Column(name = "last_name")
    @CsvBindByName
    private String lastName;

    @Column(name = "student_class")
    @CsvBindByName
    private String studentClass;

    @Column(name = "gender")
    @CsvBindByName
    private String gender;

    @Column(name = "dob")
    @CsvBindByName
    private String dob;

    @Column(name = "email", nullable = false, unique = true)
    @CsvBindByName
    private String studentEmail;

    @Column(name = "contact")
    @CsvBindByName
    private String studentContactNumber;

    @Column(name = "guardian_name")
    @CsvBindByName
    private String guardianName;

    @Column(name = "status")
    @CsvBindByName
    private String status;

//    public Student(String firstName, String lastName, String studentClass, String gender, String dob, String studentEmail, String studentContactNumber, String guardianName, String status) {
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.studentClass = studentClass;
//        this.gender = gender;
//        this.dob = dob;
//        this.studentEmail = studentEmail;
//        this.studentContactNumber = studentContactNumber;
//        this.guardianName = guardianName;
//        this.status = status;
//    }

    //    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
//    private StudentAddress studentAddress;
//
//    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
//    private StudentAdmission studentAdmission;
//
//    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
//    private StudentParents studentParents;
//
//    @OneToOne(mappedBy = "student", cascade = CascadeType.ALL)
//    private User users;
//
//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "lms_student_classes", joinColumns = @JoinColumn(name = "student_id", nullable = true),
//            inverseJoinColumns = @JoinColumn(name = "class_id"))
//    private Set<Classes> classes;
//
//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "lms_student_section", joinColumns = @JoinColumn(name = "student_id", nullable = true),
//            inverseJoinColumns = @JoinColumn(name = "section_id"))
//    private Set<Sections> sections;
}