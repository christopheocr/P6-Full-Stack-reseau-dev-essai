package com.openclassrooms.mdd_api.controller;

import com.openclassrooms.mdd_api.repository.TopicRepository;
import com.openclassrooms.mdd_api.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/me")
public class UserController {
    private final UserService userService;
    private final TopicRepository topicRepository;

    public UserController(UserService userService, TopicRepository topicRepository) {
        this.userService = userService;
        this.topicRepository = topicRepository;
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

}
