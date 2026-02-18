package com.thinking.machines.hr.repository;

import com.thinking.machines.hr.entity.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdministratorRepository extends JpaRepository<Administrator,Integer> {
    public Administrator findByUsername(String username);
}
