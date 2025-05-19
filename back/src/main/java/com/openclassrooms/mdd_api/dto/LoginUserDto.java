package com.openclassrooms.mdd_api.dto;

public class LoginUserDto{
    private String login; // email OU nom
    private String password;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }


    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }
}
