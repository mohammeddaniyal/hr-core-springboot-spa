package com.thinking.machines.hr.controller;

import com.thinking.machines.hr.dto.DesignationDTO;
import com.thinking.machines.hr.service.DesignationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designations")
@CrossOrigin(origins = "*")
public class DesignationController {
    @Autowired
    private DesignationService designationService;
    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<DesignationDTO> addDesignation(@Valid @RequestBody DesignationDTO dto)
    {
        DesignationDTO designationDTO = designationService.add(dto);
        return new ResponseEntity<>(designationDTO, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<List<DesignationDTO>> getDesignations()
    {
        List<DesignationDTO> designationDTOS = designationService.getAll();
        return new ResponseEntity<>(designationDTOS, HttpStatus.OK);
    }

    @PutMapping("/{code}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<DesignationDTO> editDesignation(
            @PathVariable int code,
            @Valid @RequestBody DesignationDTO dto)
    {
        DesignationDTO designationDTO = designationService.update(code,dto);
        return ResponseEntity.ok(designationDTO);

    }

    @DeleteMapping("/{code}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Void> deleteDesignation(@PathVariable int code)
    {
        designationService.deleteByCode(code);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{code}")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<DesignationDTO>  getDesignationByCode(@PathVariable int code)
    {
        DesignationDTO  designationDTO = designationService.getByCode(code);
        return ResponseEntity.ok(designationDTO);
    }
}
