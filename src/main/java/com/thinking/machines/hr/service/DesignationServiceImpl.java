package com.thinking.machines.hr.service;

import com.thinking.machines.hr.dto.DesignationDTO;
import com.thinking.machines.hr.entity.Designation;
import com.thinking.machines.hr.exception.DataConflictException;
import com.thinking.machines.hr.exception.ResourceNotFoundException;
import com.thinking.machines.hr.repository.DesignationRepository;
import com.thinking.machines.hr.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DesignationServiceImpl implements DesignationService {
    @Autowired
    private DesignationRepository  designationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public DesignationDTO add(DesignationDTO designationDTO)
    {
        boolean exists=designationRepository.existsByTitle(designationDTO.getTitle());
        if(exists) throw new DataConflictException("Designation "+designationDTO.getTitle()+" already exists");
        Designation designation=new Designation();
        designation.setTitle(designationDTO.getTitle());
        Designation savedEntity=designationRepository.save(designation);
        return new DesignationDTO(savedEntity.getCode(),savedEntity.getTitle());
    }
    @Override
    public List<DesignationDTO> getAll()
    {
        List<Designation> designations=designationRepository.findAll();
        DesignationDTO designationDTO;
        List<DesignationDTO> designationDTOList=new ArrayList<>();
        for(Designation designation:designations)
        {
            designationDTO=new DesignationDTO();
            designationDTO.setTitle(designation.getTitle());
            designationDTO.setCode(designation.getCode());
            designationDTOList.add(designationDTO);
        }
        return designationDTOList;
    }
    @Override
    public DesignationDTO update(int code,DesignationDTO designatioDTO)
    {
        Designation existingEntity=designationRepository.findById(code)
                .orElseThrow(()->new ResourceNotFoundException("Invalid Designation Code : "+code));

        if(designationRepository.existsByTitleAndCodeNot(designatioDTO.getTitle(),code))
        {
            throw new DataConflictException("Designation "+designatioDTO.getTitle()+" exists");
        }
        existingEntity.setTitle(designatioDTO.getTitle());
        Designation savedEntity=designationRepository.save(existingEntity);
        return new DesignationDTO(savedEntity.getCode(),savedEntity.getTitle());
    }
    @Override
    public void deleteByCode(int code)
    {
        if(! designationRepository.existsById(code))
        {
            throw new ResourceNotFoundException("Invalid Designation Code : "+code);
        }
        if(employeeRepository.existsByDesignationCode(code))
        {
            throw new DataConflictException("Cannot delete Designation. It is currently assigned to employees");
        }
        designationRepository.deleteById(code);
    }
    @Override
    public DesignationDTO getByCode(int code)
    {
        Designation entity=designationRepository.findById(code)
                .orElseThrow(()->new ResourceNotFoundException("Invalid Designation Code : "+code));
        return new DesignationDTO(entity.getCode(),entity.getTitle());
    }
}
