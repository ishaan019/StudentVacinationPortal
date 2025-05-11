package com.Bits.StudentVacinationPortal.mapper;

import com.Bits.StudentVacinationPortal.dto.StudentDTO;
import com.Bits.StudentVacinationPortal.dto.UserDTO;
import com.Bits.StudentVacinationPortal.model.Student;
import com.Bits.StudentVacinationPortal.model.User;

public class UserMapper {

    public static UserDTO mapToUserDto(User user) {
        return new UserDTO(
                user.getUserId(),
                user.getUserEmail(),
                user.getUserPassword()
        );
    }

    public static User MapToUser(UserDTO userDTO) {
        return new User(
                userDTO.getUserId(),
                userDTO.getUserEmail(),
                userDTO.getUserPassword()
        );
    }
}
