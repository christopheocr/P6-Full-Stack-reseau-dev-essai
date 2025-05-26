package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.dto.PostRequestDto;
import com.openclassrooms.mdd_api.dto.PostResponseDto;
import com.openclassrooms.mdd_api.model.Post;
import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.PostRepository;
import com.openclassrooms.mdd_api.repository.TopicRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class PostService implements IPostService{
    private final PostRepository postRepository;
    private final TopicRepository topicRepository;

    private final UserService userService;

    public PostService(PostRepository postRepository, TopicRepository topicRepository, UserService userService) {
        this.postRepository = postRepository;
        this.topicRepository = topicRepository;
        this.userService = userService;
    }


    @Override
    public PostResponseDto createPost(PostRequestDto dto) {
        Topic topic = topicRepository.findByName(dto.topicName)
                .orElseGet(() -> topicRepository.save(new Topic(dto.topicName)));

        Post post = new Post();
        post.setTitle(dto.title);
        post.setContent(dto.content);
        post.setTopic(topic);
        post.setAuthor(userService.getCurrentUser());
        post.setCreatedAt(LocalDateTime.now());

        return mapToDto(postRepository.save(post));
    }



    @Override
    public List<PostResponseDto> getPostsByTopics(List<String> topicNames, String sortDirection) {
        List<String> cleaned = topicNames.stream().map(String::trim).toList();
        List<Topic> topics = topicRepository.findAllByNameIn(cleaned);

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection.trim()), "createdAt");


        return postRepository.findAllByTopicIn(topics, sort)
                .stream()
                .map(this::mapToDto)
                .toList();
    }


    @Override
    public List<PostResponseDto> getPostsForCurrentUser() {
        User user = userService.getCurrentUser();
        List<Topic> topics = user.getFollowedTopics();

        return postRepository.findAllByTopicIn(topics, Sort.by("createdAt").descending())
                .stream()
                .map(this::mapToDto)
                .toList();
    }






    private PostResponseDto mapToDto(Post post) {
        return new PostResponseDto(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getTopic().getName(),
                post.getAuthor().getName(),
                post.getCreatedAt()
        );
    }

}
