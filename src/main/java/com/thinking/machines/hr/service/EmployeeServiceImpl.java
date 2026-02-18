package com.thinking.machines.hr.service;

import com.thinking.machines.hr.dto.EmployeeDTO;
import com.thinking.machines.hr.entity.Designation;
import com.thinking.machines.hr.entity.Employee;
import com.thinking.machines.hr.exception.ResourceNotFoundException;
import com.thinking.machines.hr.exception.BusinessException;
import com.thinking.machines.hr.repository.DesignationRepository;
import com.thinking.machines.hr.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DesignationRepository designationRepository;

    @Override
    public EmployeeDTO add(EmployeeDTO employeeDTO) {

        Map<String,String> errors = new HashMap<String,String>();

        if(employeeRepository.existsByPanNumber(employeeDTO.getPanNumber()))
        {
            errors.put("panNumber","PAN Number exists");
        }
        if(employeeRepository.existsByAadharCardNumber(employeeDTO.getAadharCardNumber()))
        {
            errors.put("aadharCardNumber","Aadhar Card Number exists");
        }

        Designation designation=designationRepository.findById(employeeDTO.getDesignationCode())
                .orElse(null);
        if(designation==null)
        {
            errors.put("designationCode","Designation code not found");
        }
        if(!errors.isEmpty())
        {
            throw new BusinessException(errors);
        }

        Employee employee = new Employee();
        copyDTOtoEntity(employeeDTO,employee,designation);

        Employee savedEmployee=employeeRepository.save(employee);

        return toDTO(savedEmployee);
    }

    @Override
    @Transactional(readOnly=true)
    public EmployeeDTO getByEmployeeId(String employeeId) {
        Integer id=Integer.parseInt(employeeId.substring(1));
        Employee employee=employeeRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with id "+employeeId+" not found"));
        return toDTO(employee);
    }

    @Override
    public List<EmployeeDTO> getAll() {
        List<Employee> employees=employeeRepository.findAll();
        List<EmployeeDTO> employeeDTOList=new ArrayList<>();
        for(Employee e:employees)
        {
            employeeDTOList.add(toDTO(e));
        }
        return employeeDTOList;
    }

    @Override
    public EmployeeDTO update(EmployeeDTO employeeDTO)
    {
      Integer employeeId=Integer.parseInt(employeeDTO.getEmployeeId().substring(1));

      Employee existingEmployee=employeeRepository.findById(employeeId)
              .orElseThrow(()->new ResourceNotFoundException("Employee not found with ID : "+employeeDTO.getEmployeeId()));

      Map<String,String> errors=new  HashMap<>();

      Designation designation=existingEmployee.getDesignation();

        designation = designationRepository.findById(employeeDTO.getDesignationCode())
                  .orElse(null);

        if(designation==null)
        {
            errors.put("designationCode","Designation code not found");
        }

      String newPanNumber=employeeDTO.getPanNumber();
      String oldPanNumber= existingEmployee.getPanNumber();

      if(!newPanNumber.equalsIgnoreCase(oldPanNumber))
      {
          if(employeeRepository.existsByPanNumber(employeeDTO.getPanNumber()))
          {
              errors.put("panNumber","PAN Number exists");
          }
      }

      String newAadharCardNumber= employeeDTO.getAadharCardNumber();
      String oldAadharCardNumber=existingEmployee.getAadharCardNumber();

      if(! newAadharCardNumber.equalsIgnoreCase(oldAadharCardNumber))
      {
          if(employeeRepository.existsByAadharCardNumber(employeeDTO.getAadharCardNumber()))
          {
              errors.put("aadharCardNumber","Aadhar Card Number exists");
          }
      }
      if(!errors.isEmpty())
      {
          throw new BusinessException(errors);
      }

      copyDTOtoEntity(employeeDTO,existingEmployee,designation);
      Employee updatedEmployee=employeeRepository.save(existingEmployee);

      return toDTO(updatedEmployee);
    }

    @Override
    public void delete(String employeeId) {
      Integer id=Integer.parseInt(employeeId.substring(1));
      if(! employeeRepository.existsById(id))
      {
          throw new ResourceNotFoundException("Employee not found with ID : "+employeeId);
      }
      employeeRepository.deleteById(id);
    }
    private void copyDTOtoEntity(EmployeeDTO  employeeDTO,Employee entity, Designation designation) {
        entity.setName(employeeDTO.getName());
        entity.setDesignation(designation);
        entity.setGender(employeeDTO.getGender());
        entity.setBasicSalary(employeeDTO.getBasicSalary());
        entity.setIsIndian(employeeDTO.getIsIndian());
        entity.setDateOfBirth(employeeDTO.getDateOfBirth());
        entity.setPanNumber(employeeDTO.getPanNumber());
        entity.setAadharCardNumber(employeeDTO.getAadharCardNumber());
    }
    private EmployeeDTO toDTO(Employee entity) {
        EmployeeDTO employeeDTO=new EmployeeDTO();
        employeeDTO.setEmployeeId("A"+entity.getEmployeeId());
        employeeDTO.setName(entity.getName());
        employeeDTO.setDesignationCode(entity.getDesignation().getCode());
        employeeDTO.setDesignation(entity.getDesignation().getTitle());
        employeeDTO.setBasicSalary(entity.getBasicSalary());
        employeeDTO.setIsIndian(entity.getIsIndian());
        employeeDTO.setGender(entity.getGender());
        employeeDTO.setDateOfBirth(entity.getDateOfBirth());
        employeeDTO.setPanNumber(entity.getPanNumber());
        employeeDTO.setAadharCardNumber(entity.getAadharCardNumber());
        return employeeDTO;
    }
}
