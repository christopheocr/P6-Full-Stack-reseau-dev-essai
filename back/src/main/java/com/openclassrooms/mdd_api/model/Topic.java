package com.openclassrooms.mdd_api.model;


import jakarta.persistence.*;

@Entity
@Table(name = "topics")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private Long id;

    @Column(nullable = false)
    private String name;


    private String description;

    public Topic() {
    }

    public Topic(String topicName) {
        this.name = topicName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
