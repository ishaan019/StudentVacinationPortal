package com.Bits.StudentVacinationPortal.service.impl;

import com.Bits.StudentVacinationPortal.dto.VaccinationDriveDTO;
import com.Bits.StudentVacinationPortal.dto.VaccinationRecordDTO;
import com.Bits.StudentVacinationPortal.exception.ResourceNotFoundException;
import com.Bits.StudentVacinationPortal.mapper.VaccinationDriveMapper;
import com.Bits.StudentVacinationPortal.mapper.VaccinationRecordMapper;
import com.Bits.StudentVacinationPortal.model.Student;
import com.Bits.StudentVacinationPortal.model.VaccinationDrive;
import com.Bits.StudentVacinationPortal.model.VaccinationRecord;
import com.Bits.StudentVacinationPortal.repository.StudentRepo;
import com.Bits.StudentVacinationPortal.repository.VaccinationDriveRepo;
import com.Bits.StudentVacinationPortal.repository.VaccinationRecordRepo;
import com.Bits.StudentVacinationPortal.service.IVaccinationRecordService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class VaccinationRecordServiceImpl implements IVaccinationRecordService {

    private VaccinationRecordRepo vaccinationRecordRepo;

    private StudentRepo studentRepo;

    private VaccinationDriveRepo vaccinationDriveRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public VaccinationRecordDTO createVaccinationRecord(VaccinationRecordDTO vaccinationRecordDTO) {
        VaccinationRecord vaccinationRecord = VaccinationRecordMapper.mapToVaccinationRecord(vaccinationRecordDTO);
        VaccinationRecord savedVaccinationRecord = (VaccinationRecord) vaccinationRecordRepo.save(vaccinationRecord);

        Long studentId = Long.parseLong(vaccinationRecordDTO.getStudentId());
        Optional<Student> student = Optional.ofNullable(studentRepo.findById(studentId).orElseThrow(() ->
                new ResourceNotFoundException("Student does not exist with studentId : " + studentId)));
        Student st = student.get();

        st.setStatus("Vaccinated");
        Student updatedStudentObj = studentRepo.save(st);

        Optional<VaccinationDrive> vaccinationDrive = Optional.ofNullable(vaccinationDriveRepo.findById(Long.parseLong(vaccinationRecordDTO.getDriveId())).orElseThrow(() ->
                new ResourceNotFoundException("VaccinationDrive does not exist with VaccinationDriveId : " + Long.parseLong(vaccinationRecordDTO.getDriveId()))));
        VaccinationDrive vt = vaccinationDrive.get();

        Long availableDoses = Long.parseLong(vt.getAvailableDoses());
        availableDoses = availableDoses - 1;
        vt.setAvailableDoses(availableDoses.toString());

        VaccinationDrive updatedVaccinationDriveObj = vaccinationDriveRepo.save(vt);

        return VaccinationRecordMapper.mapToVaccinationRecordDTO(savedVaccinationRecord);
    }

    @Override
    public VaccinationRecordDTO getVaccinationRecordById(Long vaccinationRecordId) {
        Optional<VaccinationRecord> vaccinationRecord = Optional.ofNullable(vaccinationRecordRepo.findById(vaccinationRecordId).orElseThrow(() ->
                new ResourceNotFoundException("VaccinationRecord does not exist with VaccinationRecordId : " + vaccinationRecordId)));
        VaccinationRecord savedVaccinationRecord = vaccinationRecord.get();
        return VaccinationRecordMapper.mapToVaccinationRecordDTO(savedVaccinationRecord);
    }

    //TODO
    @Override
    public List<VaccinationRecordDTO> getAllVaccinationRecord() {
        String query = "SELECT a.record_id, a.drive_id, a.status, a.student_id, a.vaccination_date,  a.vaccine_id, b.available_doses, c.vaccine_name, d.first_name, d.last_name,d.student_class \n" +
                "FROM vaccinationPortal.vaccination_record a INNER JOIN vaccinationPortal.vaccination_drive b ON a.drive_id = b.vaccination_drive_id\n" +
                "INNER JOIN vaccinationPortal.vaccine c ON a.vaccine_id = c.vaccine_id\n" +
                "INNER JOIN vaccinationPortal.students d ON a.student_id = d.student_id;";
        List<VaccinationRecordDTO> listData = jdbcTemplate.query(query, new VaccinationRecordServiceImpl.CustomerRowMapper());
        return listData;
    }

    @Override
    public VaccinationRecordDTO updateVaccinationRecord(Long vaccinationRecordId, VaccinationRecordDTO updatedVaccinationRecordTO) {
        Optional<VaccinationRecord> vaccinationRecord = Optional.ofNullable(vaccinationRecordRepo.findById(vaccinationRecordId).orElseThrow(() ->
                new ResourceNotFoundException("VaccinationRecord does not exist with VaccinationRecordId : " + vaccinationRecordId)));
        VaccinationRecord vt = vaccinationRecord.get();

        vt.setRecordId(updatedVaccinationRecordTO.getRecordId());
        vt.setStudentId(updatedVaccinationRecordTO.getStudentId());
        vt.setDriveId(updatedVaccinationRecordTO.getDriveId());
        vt.setVaccineId(updatedVaccinationRecordTO.getVaccineId());
        vt.setVaccinationDate(updatedVaccinationRecordTO.getVaccinationDate());
        vt.setStatus(updatedVaccinationRecordTO.getStatus());

        VaccinationRecord updatedVaccinationRecordObj = vaccinationRecordRepo.save(vt);

        return VaccinationRecordMapper.mapToVaccinationRecordDTO(updatedVaccinationRecordObj);
    }

    @Override
    public void deleteVaccinationRecord(Long vaccinationRecordId) {
        Optional<VaccinationRecord> vaccinationRecord = Optional.ofNullable(vaccinationRecordRepo.findById(vaccinationRecordId).orElseThrow(() ->
                new ResourceNotFoundException("VaccinationRecord does not exist with VaccinationRecordId : " + vaccinationRecordId)));
        VaccinationRecord vt = vaccinationRecord.get();

        vaccinationRecordRepo.deleteById(vaccinationRecordId);

        Long studentId = Long.parseLong(vt.getStudentId());
        Optional<Student> student = Optional.ofNullable(studentRepo.findById(studentId).orElseThrow(() ->
                new ResourceNotFoundException("Student does not exist with studentId : " + studentId)));
        Student st = student.get();

        st.setStatus("Pending");
        Student updatedStudentObj = studentRepo.save(st);
    }

    private class CustomerRowMapper implements RowMapper<VaccinationRecordDTO> {
        @Override
        public VaccinationRecordDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
            VaccinationRecordDTO data = new VaccinationRecordDTO();
            data.setRecordId(rs.getLong("record_id"));
            data.setDriveId(rs.getString("drive_id"));
            data.setStatus(rs.getString("status"));
            data.setStudentId(rs.getString("student_id"));
            data.setVaccinationDate(rs.getString("vaccination_date"));
            data.setVaccineId(rs.getString("vaccine_id"));
            data.setVaccineName(rs.getString("vaccine_name"));
            data.setStudentName(rs.getString("first_name") + " " + rs.getString("last_name"));
            data.setStudentClass(rs.getString("student_class"));
            data.setAvailableDoses((rs.getString("available_doses")));
            return data;
        }
    }

}
