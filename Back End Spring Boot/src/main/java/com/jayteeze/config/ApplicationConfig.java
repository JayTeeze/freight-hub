package com.jayteeze.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages="com.jayteeze.repository")
@EntityScan(basePackages="com.jayteeze.entity")
public class ApplicationConfig {

}
