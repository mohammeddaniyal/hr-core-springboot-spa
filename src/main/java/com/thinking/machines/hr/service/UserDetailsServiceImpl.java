package com.thinking.machines.hr.service;

import com.thinking.machines.hr.entity.Administrator;
import com.thinking.machines.hr.repository.AdministratorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private AdministratorRepository administratorRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Administrator administrator = administratorRepository.findByUsername(username);
        if(administrator!=null)
        {
            UserDetails userDetails= User.builder()
                    .username(administrator.getUsername())
                    .password(administrator.getPassword())
                    .authorities(administrator.getRole())
                    .build();
            return userDetails;
        }
        throw new UsernameNotFoundException("User not found with username: "+username);
    }
}
