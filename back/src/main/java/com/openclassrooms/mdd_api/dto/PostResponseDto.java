package com.openclassrooms.mdd_api.dto;

import java.time.LocalDateTime;

public class PostResponseDto {
    public Long id;
    public String title;
    public String content;
    public String topicName;
    public String authorName;
    public LocalDateTime createdAt;

    public PostResponseDto(Long id, String title, String content, String topicName, String authorName, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.topicName = topicName;
        this.authorName = authorName;
        this.createdAt = createdAt;
    }
}
