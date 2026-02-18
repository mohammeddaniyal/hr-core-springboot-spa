package com.thinking.machines.hr.entity;

import com.thinking.machines.hr.dto.LoginDTO;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="administrator_secure")
public class Administrator {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(name="username", nullable = false, unique = true, length=50)
    private String username;

    @Column(name="password", nullable = false, unique = true, length=70)
    private String password;

    @Column(name="role", nullable = false, length=20)
    String role;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public boolean equals(Object other)
    {
        if(this==other) return true;
        if(other==null || !(other instanceof LoginDTO)) return false;
        Administrator that=(Administrator) other;
        return Objects.equals(this.id,that.id);
    }
    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

}
