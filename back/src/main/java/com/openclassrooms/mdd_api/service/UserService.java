package com.openclassrooms.mdd_api.service;



import com.openclassrooms.mdd_api.dto.UserInfoDto;
import com.openclassrooms.mdd_api.exception.UserNotFoundException;
import com.openclassrooms.mdd_api.model.Topic;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.model.UserDetailsImpl;
import com.openclassrooms.mdd_api.repository.TopicRepository;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetailsImpl)) {
            throw new IllegalStateException("Utilisateur non authentifié");
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getUser();
    }

    public UserInfoDto convertToUserInfoDto(User user) {
        return Optional.ofNullable(user)
                .map(u -> {
                    UserInfoDto userDto = new UserInfoDto();
                    userDto.setId(u.getId());
                    userDto.setName(u.getName());
                    userDto.setEmail(u.getEmail());
                    return userDto;
                })
                .orElseThrow(() -> new UserNotFoundException("User cannot be null"));
    }

    public void followTopic(String topicName, TopicRepository topicRepository) {
        User user = getCurrentUser();
        Topic topic = topicRepository.findByName(topicName)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found"));

        if (!user.getFollowedTopics().contains(topic)) {
            user.getFollowedTopics().add(topic);
            userRepository.save(user);
        }
    }

    public void unfollowTopic(String topicName, TopicRepository topicRepository) {
        User user = getCurrentUser();
        user.getFollowedTopics().removeIf(t -> t.getName().equalsIgnoreCase(topicName));
        userRepository.save(user);
    }

}
