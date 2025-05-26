package com.openclassrooms.mdd_api.repository;

import com.openclassrooms.mdd_api.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    Optional<Topic> findByName(String name);
    List<Topic> findAllByNameIn(List<String> names);
}
