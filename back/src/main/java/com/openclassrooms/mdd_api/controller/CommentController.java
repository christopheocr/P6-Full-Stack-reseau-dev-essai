package com.openclassrooms.mdd_api.controller;

import com.openclassrooms.mdd_api.dto.CommentRequestDto;
import com.openclassrooms.mdd_api.dto.CommentResponseDto;
import com.openclassrooms.mdd_api.service.ICommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final ICommentService commentService;

    public CommentController(ICommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public CommentResponseDto createComment(@RequestBody CommentRequestDto dto) {
        return commentService.createComment(dto);
    }

    @GetMapping("/{postId}")
    public List<CommentResponseDto> getComments(@PathVariable Long postId) {
        return commentService.getCommentsForPost(postId);
    }
}
