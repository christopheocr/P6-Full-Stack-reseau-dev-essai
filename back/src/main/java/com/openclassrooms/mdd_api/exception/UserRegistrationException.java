package com.openclassrooms.mdd_api.exception;

public class UserRegistrationException extends RuntimeException{
    public UserRegistrationException(String message) {
        super(message);
    }
}
