package com.thinking.machines.hr.controller;

import com.thinking.machines.hr.dto.EmployeeDTO;
import com.thinking.machines.hr.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService)
    {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<EmployeeDTO> createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        try {
            System.out.println(employeeDTO);
            EmployeeDTO createdEmployee = employeeService.add(employeeDTO);
            return new ResponseEntity<>(createdEmployee, HttpStatus.CREATED);
        }catch(Exception e){
            e.printStackTrace(); // THIS is what you need
            throw e;
        }
    }
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees()
    {
        List<EmployeeDTO> employees=employeeService.getAll();
        return ResponseEntity.ok(employees);
    }
    @GetMapping("/{employeeId}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable String employeeId)
    {
        EmployeeDTO employee=employeeService.getByEmployeeId(employeeId);
        return ResponseEntity.ok(employee);
    }
    @PutMapping
    public ResponseEntity<EmployeeDTO> updateEmployee(@Valid @RequestBody EmployeeDTO employeeDTO) {
        EmployeeDTO updatedEmployee=employeeService.update(employeeDTO);
        return ResponseEntity.ok(updatedEmployee);
    }
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable String employeeId) {
        employeeService.delete(employeeId);
        return ResponseEntity.noContent().build();
    }
}
