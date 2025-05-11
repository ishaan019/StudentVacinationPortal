package com.Bits.StudentVacinationPortal.service.impl;

import com.Bits.StudentVacinationPortal.dto.VaccinationDriveDTO;
import com.Bits.StudentVacinationPortal.exception.ResourceNotFoundException;
import com.Bits.StudentVacinationPortal.mapper.VaccinationDriveMapper;
import com.Bits.StudentVacinationPortal.model.VaccinationDrive;
import com.Bits.StudentVacinationPortal.repository.VaccinationDriveRepo;
import com.Bits.StudentVacinationPortal.service.IVaccinationDriveService;
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
public class VaccinationDriveServiceImpl implements IVaccinationDriveService {

    private VaccinationDriveRepo vaccinationDriveRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public VaccinationDriveDTO createVaccinationDrive(VaccinationDriveDTO vaccinationDriveDTO) {
        VaccinationDrive vaccinationDrive = VaccinationDriveMapper.mapToVaccinationDrive(vaccinationDriveDTO);
        VaccinationDrive savedVaccinationDrive = (VaccinationDrive) vaccinationDriveRepo.save(vaccinationDrive);
        return VaccinationDriveMapper.mapToVaccinationDriveDTO(savedVaccinationDrive);
    }

    @Override
    public VaccinationDriveDTO getVaccinationDriveById(Long vaccinationDriveId) {
        Optional<VaccinationDrive> vaccineDrive = Optional.ofNullable(vaccinationDriveRepo.findById(vaccinationDriveId).orElseThrow(() ->
                new ResourceNotFoundException("VaccinationDrive does not exist with VaccinationDriveId : " + vaccinationDriveId)));
        VaccinationDrive savedVaccinationDrive = vaccineDrive.get();
        return VaccinationDriveMapper.mapToVaccinationDriveDTO(savedVaccinationDrive);
    }

    @Override
    public List<VaccinationDriveDTO> getAllVaccinationDrive() {
//        logger.info("Start : Inside ClassSectionDaoImpl: listClassesAndSections() ");
//		String query = "select lc.class_id,lc.class_name,lc.teacher_id,ls.section_id,ls.section_name from lms_classes lc, lms_section ls where lc.class_id=ls.class_id";
        String query = "SELECT a.vaccination_drive_id, a.vaccine_id , a.applicable_classes, a.available_doses, a.start_date, a.end_date, a.vaccination_drive_status, b.vaccine_name FROM vaccinationPortal.vaccination_drive a join vaccinationPortal.vaccine b where a.vaccine_id = b.vaccine_id";
        List<VaccinationDriveDTO> listData = jdbcTemplate.query(query,new CustomerRowMapper());
//        logger.info("End : Inside ClassSectionDaoImpl: listClassesAndSections() ");

        return listData;

//        List<VaccinationDrive> vaccinationDrives = vaccinationDriveRepo.findByIds();
//        return vaccinationDrives.stream().map((vaccinationDrive) -> VaccinationDriveMapper.mapToVaccinationDriveDTO(vaccinationDrive)).
//                collect(Collectors.toList());
    }

    private class CustomerRowMapper implements RowMapper<VaccinationDriveDTO> {
        @Override
        public VaccinationDriveDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
//            logger.info("Start : Inside ClassSectionDaoImpl: CustomerRowMapper() ");
            VaccinationDriveDTO data = new VaccinationDriveDTO();
            data.setVaccinationDriveId(rs.getLong("vaccination_drive_id"));
            data.setVaccineId(rs.getString("vaccine_id"));
            data.setApplicableClasses(rs.getString("applicable_classes"));
            data.setAvailableDoses(rs.getString("available_doses"));
            data.setStartDate(rs.getString("start_date"));
            data.setEndDate(rs.getString("end_date"));
            data.setVaccinationDriveStatus(rs.getString("vaccination_drive_status"));
            data.setVaccineName(rs.getString("vaccine_name"));
//            logger.info("End : Inside ClassSectionDaoImpl: CustomerRowMapper() ");
            return data;
        }
    }

    @Override
    public VaccinationDriveDTO updateVaccinationDrive(Long vaccinationDriveId, VaccinationDriveDTO updatedVaccinationDriveDTO) {
        Optional<VaccinationDrive> vaccinationDrive = Optional.ofNullable(vaccinationDriveRepo.findById(vaccinationDriveId).orElseThrow(() ->
                new ResourceNotFoundException("VaccinationDrive does not exist with VaccinationDriveId : " + vaccinationDriveId)));
        VaccinationDrive vt = vaccinationDrive.get();

        vt.setVaccineId(updatedVaccinationDriveDTO.getVaccineId());
        vt.setStartDate(updatedVaccinationDriveDTO.getStartDate());
        vt.setEndDate(updatedVaccinationDriveDTO.getEndDate());
        vt.setAvailableDoses(updatedVaccinationDriveDTO.getAvailableDoses());
        vt.setApplicableClasses(updatedVaccinationDriveDTO.getApplicableClasses());
        vt.setVaccinationDriveStatus(updatedVaccinationDriveDTO.getVaccinationDriveStatus());


        VaccinationDrive updatedVaccinationDriveObj = vaccinationDriveRepo.save(vt);

        return VaccinationDriveMapper.mapToVaccinationDriveDTO(updatedVaccinationDriveObj);
    }

    @Override
    public void deleteVaccinationDrive(Long vaccinationDriveId) {
        Optional<VaccinationDrive> vaccinationDrive = Optional.ofNullable(vaccinationDriveRepo.findById(vaccinationDriveId).orElseThrow(() ->
                new ResourceNotFoundException("VaccinationDrive does not exist with VaccinationDriveId : " + vaccinationDriveId)));
        VaccinationDrive vt = vaccinationDrive.get();

        vaccinationDriveRepo.deleteById(vaccinationDriveId);
    }

    @Override
    public List<VaccinationDriveDTO> getVaccinationDriveWithClass(Long className) {
        String query = "SELECT a.vaccination_drive_id, a.vaccine_id, a.available_doses,b.vaccine_name FROM vaccinationPortal.vaccination_drive a \n" +
                "JOIN vaccinationPortal.vaccine b ON a.vaccine_id = b.vaccine_id \n" +
                "WHERE NOW() BETWEEN a.start_date AND a.end_date\n" +
                "AND FIND_IN_SET(?, a.applicable_classes) AND a.vaccination_drive_status = \"Ongoing\";";
        List<VaccinationDriveDTO> listData = jdbcTemplate.query(query, new Object[]{className.toString()}, new CustomerRowMapper1());
        return listData;
    }

    private class CustomerRowMapper1 implements RowMapper<VaccinationDriveDTO> {
        @Override
        public VaccinationDriveDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
            VaccinationDriveDTO data = new VaccinationDriveDTO();
            data.setVaccinationDriveId(rs.getLong("vaccination_drive_id"));
            data.setVaccineId(rs.getString("vaccine_id"));
            data.setVaccineName(rs.getString("vaccine_name"));
            data.setAvailableDoses(rs.getString("available_doses"));
            return data;
        }
    }

    @Override
    public List<VaccinationDriveDTO> getScheduledVaccinationDrives() {
        String query = "Select a.vaccination_drive_id, a.start_date, a.end_date, a.vaccine_id, a.applicable_classes, a.available_doses , b.vaccine_name \n" +
                "FROM vaccinationPortal.vaccination_drive A \n" +
                "JOIN vaccinationPortal.vaccine b ON a.vaccine_id = b.vaccine_id WHERE vaccination_drive_status = \"Scheduled\";";
        List<VaccinationDriveDTO> listData = jdbcTemplate.query(query, new Object[]{}, new CustomerRowMapper2());
        return listData;
    }

    @Override
    public List<VaccinationDriveDTO> getOngoingVaccinationDrives() {
        String query = "Select a.vaccination_drive_id, a.start_date, a.end_date, a.vaccine_id, a.applicable_classes, a.available_doses , b.vaccine_name \n" +
                "FROM vaccinationPortal.vaccination_drive A \n" +
                "JOIN vaccinationPortal.vaccine b ON a.vaccine_id = b.vaccine_id WHERE vaccination_drive_status = \"Ongoing\";";
        List<VaccinationDriveDTO> listData = jdbcTemplate.query(query, new Object[]{}, new CustomerRowMapper2());
        return listData;
    }

    private class CustomerRowMapper2 implements RowMapper<VaccinationDriveDTO> {
        @Override
        public VaccinationDriveDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
            VaccinationDriveDTO data = new VaccinationDriveDTO();
            data.setVaccinationDriveId(rs.getLong("vaccination_drive_id"));
            data.setStartDate(rs.getString("start_date"));
            data.setEndDate(rs.getString("end_date"));
            data.setApplicableClasses(rs.getString("applicable_classes"));
            data.setVaccineId(rs.getString("vaccine_id"));
            data.setVaccineName(rs.getString("vaccine_name"));
            data.setAvailableDoses(rs.getString("available_doses"));
            return data;
        }
    }
}
