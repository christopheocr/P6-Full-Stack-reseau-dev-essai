package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.dto.PostRequestDto;
import com.openclassrooms.mdd_api.dto.PostResponseDto;
import com.openclassrooms.mdd_api.model.Post;

import java.util.List;

public interface IPostService {
    PostResponseDto createPost(PostRequestDto dto);

    List<PostResponseDto> getPostsByTopics(List<String> topicNames, String sortDirection);

    List<PostResponseDto> getPostsForCurrentUser();
}
