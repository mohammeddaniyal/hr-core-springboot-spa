package com.thinking.machines.hr.service;

import com.thinking.machines.hr.dto.DesignationDTO;

import java.util.List;

public interface DesignationService {
    public DesignationDTO add(DesignationDTO designationDTO);
    public List<DesignationDTO> getAll();
    public DesignationDTO update(int code,DesignationDTO designationDTO);
    public void deleteByCode(int code);
    public DesignationDTO getByCode(int code);
}
