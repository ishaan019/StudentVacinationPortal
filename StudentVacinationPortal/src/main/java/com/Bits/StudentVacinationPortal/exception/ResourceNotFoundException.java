package com.Bits.StudentVacinationPortal.exception;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String s) {
        super(s);
    }
}
