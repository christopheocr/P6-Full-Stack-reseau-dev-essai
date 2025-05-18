package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.repository.PostRepository;

public class PostService implements IPostService{
    private PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }
}
