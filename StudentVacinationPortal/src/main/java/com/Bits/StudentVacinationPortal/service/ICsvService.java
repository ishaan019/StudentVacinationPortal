package com.Bits.StudentVacinationPortal.service;

import org.springframework.web.multipart.MultipartFile;

public interface ICsvService {

    public void saveCSVData(MultipartFile file) throws Exception;
}
