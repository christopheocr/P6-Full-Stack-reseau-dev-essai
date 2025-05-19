package com.openclassrooms.mdd_api.dto;

public class RegisterUserDto extends BaseUserDto{
    private String name;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
