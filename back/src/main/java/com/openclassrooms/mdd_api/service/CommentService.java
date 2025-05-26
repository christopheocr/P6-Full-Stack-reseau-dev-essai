package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.dto.CommentRequestDto;
import com.openclassrooms.mdd_api.dto.CommentResponseDto;
import com.openclassrooms.mdd_api.model.Comment;
import com.openclassrooms.mdd_api.model.Post;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.CommentRepository;
import com.openclassrooms.mdd_api.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentService implements ICommentService{
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserService userService;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userService = userService;
    }

    @Override
    public CommentResponseDto createComment(CommentRequestDto dto) {
        Post post = postRepository.findById(dto.postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        User author = userService.getCurrentUser();

        Comment comment = new Comment();
        comment.setPost(post);
        comment.setAuthor(author);
        comment.setContent(dto.content);
        comment.setCreatedAt(LocalDateTime.now());

        commentRepository.save(comment);

        return new CommentResponseDto(comment.getId(), comment.getContent(), author.getName(), comment.getCreatedAt());
    }

    @Override
    public List<CommentResponseDto> getCommentsForPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        return commentRepository.findAllByPost(post)
                .stream()
                .map(c -> new CommentResponseDto(c.getId(), c.getContent(), c.getAuthor().getName(), c.getCreatedAt()))
                .toList();
    }
}
