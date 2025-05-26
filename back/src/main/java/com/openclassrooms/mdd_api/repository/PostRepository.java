package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Post;
import com.openclassrooms.mdd_api.model.Topic;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByTopicIn(List<Topic> topics, Sort sort);

}

