package com.openclassrooms.mdd_api.controller;

import com.openclassrooms.mdd_api.dto.PostRequestDto;
import com.openclassrooms.mdd_api.dto.PostResponseDto;
import com.openclassrooms.mdd_api.model.Post;
import com.openclassrooms.mdd_api.service.IPostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {
    private final IPostService postService;

    public PostController(IPostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public PostResponseDto createPost(@RequestBody PostRequestDto dto) {
        return postService.createPost(dto);
    }

    /*
    @GetMapping
    public List<PostResponseDto> getPostsByTopics(
            @RequestParam List<String> topics,
            @RequestParam(defaultValue = "desc") String sort
    ) {
        return postService.getPostsByTopics(topics, sort);
    }
     */

    @GetMapping("/followed")
    public List<PostResponseDto> getPostsFromFollowedTopics() {
        return postService.getPostsForCurrentUser();
    }




}
