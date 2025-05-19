package com.openclassrooms.mdd_api.controller;


import com.openclassrooms.mdd_api.dto.LoginResponseDto;
import com.openclassrooms.mdd_api.dto.LoginUserDto;
import com.openclassrooms.mdd_api.dto.RegisterUserDto;
import com.openclassrooms.mdd_api.dto.UserInfoDto;
import com.openclassrooms.mdd_api.exception.UserRegistrationException;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.service.AuthenticationService;
import com.openclassrooms.mdd_api.service.JwtService;
import com.openclassrooms.mdd_api.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    private final UserService userService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, UserService userService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userService = userService;
    }


    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        if (registeredUser == null || registeredUser.getId() == null) {
            throw new UserRegistrationException("User registration failed");
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateTokenFromUser(authenticatedUser); // méthode qu’on crée juste après
        LoginResponseDto loginResponse = new LoginResponseDto();
        loginResponse.setToken(jwtToken);
        return ResponseEntity.ok(loginResponse);
    }


    @GetMapping("/me")
    public ResponseEntity<UserInfoDto> authenticatedUser() {
        User currentUser = userService.getCurrentUser();
        UserInfoDto userDto = userService.convertToUserInfoDto(currentUser);
        return ResponseEntity.ok(userDto);
    }
}
