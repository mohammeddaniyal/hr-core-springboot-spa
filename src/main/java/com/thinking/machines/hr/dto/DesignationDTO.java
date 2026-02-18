package com.thinking.machines.hr.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

public class DesignationDTO
{
    // This tells Spring : " To ignore this field when request comes and send only it in Response"
    //@com.fasterxml.jackson.annotation.JsonProperty(access=com.fasterxml.jackson.annotation.JsonProperty.Access.READ_ONLY)
    private Integer code;

    @NotBlank(message = "Designation Title is required")
    @Size(min=2, max=35, message = "Designation Title must be between 2 and 35 characters")
    private String title;
    public DesignationDTO()
    {
        code=null;
        title="";
    }
    public DesignationDTO(Integer code,String title)
    {
        this.code=code;
        this.title=title;
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
        if(this==other) return true;
        if(other==null || !(other instanceof DesignationDTO)) return false;
        DesignationDTO d=(DesignationDTO)other;
        return Objects.equals(d.code,this.code);
    }
    @Override
    public int hashCode()
    {
        return Objects.hash(this.code);
    }
}