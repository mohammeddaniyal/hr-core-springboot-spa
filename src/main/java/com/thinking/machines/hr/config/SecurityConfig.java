package com.thinking.machines.hr.config;

import com.thinking.machines.hr.service.UserDetailsServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {


    private final UserDetailsServiceImpl userDetailsService;

    public SecurityConfig(UserDetailsServiceImpl userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
    {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth->auth
                        // public endpoints
                        .requestMatchers("/login","/css/**","/js/**").permitAll()
                        // read access (GET)
                        .requestMatchers(HttpMethod.GET,"/api/employees/**","/api/designations/**").hasAnyAuthority("ADMIN","USER")
                        // write access (POST,PUT,DELETE)
                        .requestMatchers(HttpMethod.POST,"/api/employees/**","/api/designations/**").hasAnyAuthority("ADMIN")
                        .requestMatchers(HttpMethod.PUT,"/api/employees/**","/api/designations/**").hasAnyAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE,"/api/employees/**","/api/designations/**").hasAnyAuthority("ADMIN")
                        // any other request must be atleast logged in
                        .anyRequest().authenticated()
                )
                .formLogin(form->form
                        .defaultSuccessUrl("/",true)
                        .permitAll())
                .logout(logout -> logout
                        .logoutUrl("/logout") // The URL  JS fetch() is calling[from router.js (window.logout)]
                        .invalidateHttpSession(true) // Destroys the server session
                        .deleteCookies("JSESSIONID") // Deletes the browser's auth cookie
                        .logoutSuccessHandler((request, response, authentication) -> {
                            // Since this is an SPA REST call, just returning 200 OK instead of a full HTML page
                            response.setStatus(HttpServletResponse.SC_OK);
                        })
                );
return http.build();

    }




}
