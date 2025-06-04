package com.openclassrooms.mdd_api.service;

import com.openclassrooms.mdd_api.model.UserDetailsImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import com.openclassrooms.mdd_api.model.User;
import com.openclassrooms.mdd_api.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        return userRepository.findByEmail(login)
                .or(() -> userRepository.findByName(login))
                .map(UserDetailsImpl::new)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé : " + login));
    }

    public UserDetails loadUserById(int id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        return new UserDetailsImpl(user);
    }
}
