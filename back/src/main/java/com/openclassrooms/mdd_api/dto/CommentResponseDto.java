package com.openclassrooms.mdd_api.dto;

import java.time.LocalDateTime;

public class CommentResponseDto {
    public Long id;
    public String content;
    public String authorName;
    public LocalDateTime createdAt;

    public CommentResponseDto(Long id, String content, String authorName, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.authorName = authorName;
        this.createdAt = createdAt;
    }
}
