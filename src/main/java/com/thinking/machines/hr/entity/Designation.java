package com.thinking.machines.hr.entity;

import com.thinking.machines.hr.dto.DesignationDTO;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name="designation")
public class Designation {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Integer code;

    @Column(name="title", nullable=false, unique=true)
    String title;
    public Designation()
    {
        code=0;
        title="";
    }
    public void setCode(Integer code)
    {
        this.code=code;
    }
    public void setTitle(String title)
    {
        this.title=title;
    }
    public Integer getCode()
    {
        return this.code;
    }
    public String getTitle() {
        return this.title;
    }
    @Override
    public boolean equals(Object other)
    {
        if(!(other instanceof Designation)) return false;
        Designation d=(Designation)other;
        return Objects.equals(this.code,d.code);
    }
    @Override
    public int hashCode()
    {
        return this.code;
    }

}
