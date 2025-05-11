package com.Bits.StudentVacinationPortal.service.impl;

import com.Bits.StudentVacinationPortal.dto.UserDTO;
import com.Bits.StudentVacinationPortal.exception.BadCredentials;
import com.Bits.StudentVacinationPortal.mapper.UserMapper;
import com.Bits.StudentVacinationPortal.model.User;
import com.Bits.StudentVacinationPortal.repository.UserRepo;
import com.Bits.StudentVacinationPortal.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements IUserService {

    private UserRepo userRepo;

    @Override
    public UserDTO signIn(UserDTO userDto) throws BadCredentials {
        Optional<User> existingUser = userRepo.findByUserEmail(userDto.getUserEmail());
        if (existingUser.isEmpty()) {
            throw new BadCredentials("User does not exists: " + userDto.getUserEmail());
        }

        User user = existingUser.get();
        if (!user.getUserPassword().equals(userDto.getUserPassword())) {
            throw new BadCredentials("Password does not match");
        }
        return UserMapper.mapToUserDto(user);
    }
}
