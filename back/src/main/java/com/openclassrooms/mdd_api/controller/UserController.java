package com.openclassrooms.mdd_api.controller;

import com.openclassrooms.mdd_api.dto.LoginResponseDto;
import com.openclassrooms.mdd_api.dto.UpdateUserDto;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.TopicRepository;
import com.openclassrooms.mdd_api.service.JwtService;
import com.openclassrooms.mdd_api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/me")
public class UserController {
    private final UserService userService;
    private final TopicRepository topicRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserController(UserService userService, TopicRepository topicRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userService = userService;
        this.topicRepository = topicRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @PostMapping("/topics")
    public void followTopic(@RequestParam String name) {
        userService.followTopic(name, topicRepository);
    }

    @DeleteMapping("/topics")
    public void unfollowTopic(@RequestParam String name) {
        userService.unfollowTopic(name, topicRepository);
    }

    @GetMapping("/topics")
    public List<String> getFollowedTopics() {
        return userService.getCurrentUser()
                .getFollowedTopics()
                .stream()
                .map(t -> t.getName())
                .toList();
    }

    @PutMapping
    public ResponseEntity<LoginResponseDto> updateMe(@RequestBody UpdateUserDto dto) {
        userService.updateCurrentUser(dto, passwordEncoder);
        User updatedUser = userService.getCurrentUser();
        LoginResponseDto loginResponse = new LoginResponseDto();
        loginResponse.setToken(jwtService.generateToken(updatedUser));
        return ResponseEntity.ok(loginResponse);
    }



}
