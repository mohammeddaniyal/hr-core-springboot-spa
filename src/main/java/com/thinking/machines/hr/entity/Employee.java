package com.thinking.machines.hr.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name="employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer employeeId;

    @Column(name="name", nullable = false, length=50)
    private String name;

    @Column(name="date_of_birth",  nullable = false)
    private LocalDate dateOfBirth;

    @Column(name="gender",  length=1, nullable = false)
    private String gender;

    @Column(name="isIndian", nullable = false)
    private Boolean isIndian;

    @Column(name="basic_salary", precision =  10, scale = 2)
    private BigDecimal basicSalary;

    @Column(name="pan_number", unique = true,  nullable = false, length=15)
    private String panNumber;

    @Column(name="aadhar_card_number", unique = true, nullable = false, length=15)
    private String aadharCardNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="designation_code", nullable = false)
    private Designation designation;

    public Integer getEmployeeId() { return employeeId; }
    public void setEmployeeId(Integer employeeId) { this.employeeId = employeeId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public LocalDate getDateOfBirth() { return dateOfBirth; }
    public void setDateOfBirth(LocalDate dateOfBirth) { this.dateOfBirth = dateOfBirth; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Boolean getIsIndian() { return isIndian; }
    public void setIsIndian(Boolean isIndian) { this.isIndian = isIndian; }

    public BigDecimal getBasicSalary() { return basicSalary; }
    public void setBasicSalary(BigDecimal basicSalary) { this.basicSalary = basicSalary; }

    public String getPanNumber() { return panNumber; }
    public void setPanNumber(String panNumber) { this.panNumber = panNumber; }

    public String getAadharCardNumber() { return aadharCardNumber; }
    public void setAadharCardNumber(String aadharCardNumber) { this.aadharCardNumber = aadharCardNumber; }


    public Designation getDesignation() { return designation; }
    public void setDesignation(Designation designation) { this.designation = designation; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(employeeId, employee.employeeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(employeeId);
    }
}

