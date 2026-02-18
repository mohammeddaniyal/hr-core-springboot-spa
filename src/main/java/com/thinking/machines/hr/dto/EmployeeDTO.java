package com.thinking.machines.hr.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;

import java.math.*;
import java.time.LocalDate;
import java.util.Objects;

public class EmployeeDTO
{
    //@JsonProperty(access= JsonProperty.Access.READ_ONLY)
    private String employeeId;

    @NotBlank(message="Name is required")
    @Size(min=2, max=50, message="Name must be between 2 and 5- characters")
    private String name;

    @NotNull(message="Designation Code is required")
    @Min(value=1, message="Designation Code must be valid")
    private Integer designationCode;

    private String designation;

    @NotNull(message="Date of Birth is required")
    @Past(message="Date of Birth must be in the past")
    private LocalDate dateOfBirth;

    @NotNull(message="Gender is required")
    @Pattern(regexp = "^[MF]$", message="Gender must be 'M' or 'F'")
    private String gender;

    @NotNull(message = "Nationality status is required")
    private Boolean isIndian;

    @NotNull(message = "Basic Salary is required")
    @Min(value=1000, message = "Salary must be atleast 1000")
    private BigDecimal basicSalary;

    @NotBlank(message="PAN Number is required")
    @Size(min=10, max=10, message="PAN Number must be exactly 10 charaters")
    private String panNumber;

    @NotBlank(message="Aadhar Card Number is required")
    @Size(min=12, max=12, message="Aadhar Card Number must be exactly 12 charaters")
    private String aadharCardNumber;
    public EmployeeDTO()
    {
        this.employeeId=null;
        this.name=null;
        this.designationCode=null;
        this.designation=null;
        this.dateOfBirth=null;
        this.gender=null;
        this.isIndian=false;
        this.basicSalary=null;
        this.panNumber=null;
        this.aadharCardNumber=null;
    }
    public void setEmployeeId(java.lang.String employeeId)
    {
        this.employeeId=employeeId;
    }
    public java.lang.String getEmployeeId()
    {
        return this.employeeId;
    }
    public void setName(java.lang.String name)
    {
        this.name=name;
    }
    public java.lang.String getName()
    {
        return this.name;
    }
    public void setDesignationCode(Integer designationCode)
    {
        this.designationCode=designationCode;
    }
    public Integer getDesignationCode()
    {
        return this.designationCode;
    }
    public void setDesignation(java.lang.String designation)
    {
        this.designation=designation;
    }
    public java.lang.String getDesignation()
    {
        return this.designation;
    }
    public void setDateOfBirth(LocalDate dateOfBirth)
    {
        this.dateOfBirth=dateOfBirth;
    }
    public LocalDate getDateOfBirth()
    {
        return this.dateOfBirth;
    }
    public void setGender(String gender)
    {
        this.gender=gender;
    }
    public String getGender()
    {
        return this.gender;
    }
    public void setIsIndian(Boolean isIndian)
    {
        this.isIndian=isIndian;
    }
    public Boolean getIsIndian()
    {
        return this.isIndian;
    }
    public void setBasicSalary(java.math.BigDecimal basicSalary)
    {
        this.basicSalary=basicSalary;
    }
    public java.math.BigDecimal getBasicSalary()
    {
        return this.basicSalary;
    }
    public void setPanNumber(java.lang.String panNumber)
    {
        this.panNumber=panNumber;
    }
    public java.lang.String getPanNumber()
    {
        return this.panNumber;
    }
    public void setAadharCardNumber(java.lang.String aadharCardNumber)
    {
        this.aadharCardNumber=aadharCardNumber;
    }
    public java.lang.String getAadharCardNumber()
    {
        return this.aadharCardNumber;
    }
    @Override
    public boolean equals(Object other)
    {
        if(this==other) return true;
        if( other==null || ! (other instanceof EmployeeDTO)) return false;
        EmployeeDTO employeeDTO=(EmployeeDTO) other;
        return Objects.equals(this.employeeId,employeeDTO.employeeId);
    }
    @Override
    public int hashCode()
    {
        return Objects.hash(employeeId);
    }
}
