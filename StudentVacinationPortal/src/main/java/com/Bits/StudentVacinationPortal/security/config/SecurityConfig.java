//package com.Bits.StudentVacinationPortal.security.config;
//
//
//import lombok.AllArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//
//@Configuration
//@EnableWebSecurity
//@AllArgsConstructor
//public class SecurityConfig  {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http.csrf(csrf -> csrf.disable()) // disable CSRF for REST APIs
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers().permitAll() // public endpoints
//                        .anyRequest().authenticated() // everything else needs auth
//                )
//                .httpBasic(); // use HTTP Basic for simplicity
//
//        return http.build();
//    }
//
//}