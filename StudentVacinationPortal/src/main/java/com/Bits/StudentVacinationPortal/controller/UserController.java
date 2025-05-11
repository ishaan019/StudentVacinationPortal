package com.Bits.StudentVacinationPortal.controller;

import com.Bits.StudentVacinationPortal.constant.ApplicationResource;
import com.Bits.StudentVacinationPortal.dto.UserDTO;
import com.Bits.StudentVacinationPortal.exception.BadCredentials;
import com.Bits.StudentVacinationPortal.service.IUserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/")
public class UserController {

    @Autowired
    private IUserService userService;

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody UserDTO userDTO) throws BadCredentials {
        try {
            UserDTO user = userService.signIn(userDTO);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (BadCredentials e) {
            return new ResponseEntity<>(ApplicationResource.ERROR_MESSAGE_BAD_CREDENTIALS, HttpStatus.BAD_REQUEST);
        }
    }
}
