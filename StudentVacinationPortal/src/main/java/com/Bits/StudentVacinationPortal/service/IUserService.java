package com.Bits.StudentVacinationPortal.service;

import com.Bits.StudentVacinationPortal.dto.UserDTO;
import com.Bits.StudentVacinationPortal.exception.BadCredentials;

public interface IUserService {

    public UserDTO signIn(UserDTO userDto) throws BadCredentials;

}
