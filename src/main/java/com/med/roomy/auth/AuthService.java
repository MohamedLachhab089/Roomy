package com.med.roomy.auth;

import com.med.roomy.details.CustomUserDetails;
import com.med.roomy.dtos.LoginRequest;
import com.med.roomy.dtos.SignupRequest;
import com.med.roomy.dtos.UserDto;

public interface AuthService {
    UserDto createUser(SignupRequest signupRequest);
    CustomUserDetails authenticate(LoginRequest loginRequest);
}
