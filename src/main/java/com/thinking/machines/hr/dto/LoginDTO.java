package com.thinking.machines.hr.dto;

import java.util.Objects;

public class LoginDTO {
    private String username;
    private String password;

    public LoginDTO() {
        this.username = null;
        this.password = null;
    }

    public LoginDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object other)
    {
        if(this==other) return true;
        if(other==null || !(other instanceof LoginDTO)) return false;
        LoginDTO that=(LoginDTO) other;
        return Objects.equals(this.username,that.username);
    }
    @Override
    public int hashCode() {
        return Objects.hash(this.username);
    }
}
