package com.med.roomy.controller;

import com.med.roomy.auth.AuthService;
import com.med.roomy.details.CustomUserDetails;
import com.med.roomy.dtos.LoginRequest;
import com.med.roomy.dtos.LoginResponse;
import com.med.roomy.dtos.SignupRequest;
import com.med.roomy.dtos.UserDto;
import com.med.roomy.services.JwtService;
import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest) {
        try {
            UserDto createdUser = authService.createUser(signupRequest);
            return new ResponseEntity<>(createdUser, HttpStatus.OK);
        } catch (EntityExistsException e) {
            return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e) {
            return new ResponseEntity<>("User not created, try again.", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        CustomUserDetails authenticated = authService.authenticate(loginRequest);
        String token = jwtService.generateToken(authenticated);
        LoginResponse loginResponse = LoginResponse.builder().token(token).expiresIn(jwtService.getExpirationTime()).build();
        return new ResponseEntity<>(loginResponse, HttpStatus.OK);
    }

}
