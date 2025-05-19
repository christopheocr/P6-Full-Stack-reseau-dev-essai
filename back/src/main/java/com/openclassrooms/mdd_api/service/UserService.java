package com.openclassrooms.mdd_api.service;



import com.openclassrooms.mdd_api.dto.UserInfoDto;
import com.openclassrooms.mdd_api.exception.UserNotFoundException;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.model.UserDetailsImpl;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Optional;

@Service
public class UserService {

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
}
