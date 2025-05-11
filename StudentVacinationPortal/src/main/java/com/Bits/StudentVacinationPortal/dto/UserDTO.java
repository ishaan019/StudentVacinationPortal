package com.Bits.StudentVacinationPortal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    private Long userId;//(PK)
    private String userEmail;
    private String userPassword;
}
