package com.growise.api.model.user;

public enum UserRole{

    ADMIN("adimin"),
    USER("user");

    private String role;

    UserRole(String role){
        this.role = role;
    }

    public String getRole(){
        return this.role;
    }


}