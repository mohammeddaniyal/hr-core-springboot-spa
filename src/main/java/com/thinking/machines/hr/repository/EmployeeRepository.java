package com.thinking.machines.hr.repository;

import com.thinking.machines.hr.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {
    public boolean existsByPanNumber(String panNumber);
    public boolean existsByAadharCardNumber(String aadharCardNumber);
    public boolean existsByDesignationCode(Integer  designationCode);
}
