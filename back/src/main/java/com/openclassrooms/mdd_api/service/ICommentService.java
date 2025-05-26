package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.dto.CommentRequestDto;
import com.openclassrooms.mdd_api.dto.CommentResponseDto;

import java.util.List;

public interface ICommentService {
    CommentResponseDto createComment(CommentRequestDto dto);
    List<CommentResponseDto> getCommentsForPost(Long postId);
}
