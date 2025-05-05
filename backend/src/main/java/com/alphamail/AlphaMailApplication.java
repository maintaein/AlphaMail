package com.alphamail;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class AlphaMailApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlphaMailApplication.class, args);
	}

}
