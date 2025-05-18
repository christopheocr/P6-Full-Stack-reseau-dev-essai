package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.repository.TopicRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService implements ITopicService {

    private TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    @Override
    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

}