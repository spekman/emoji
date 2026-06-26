package com.felipe.emoji;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EmojiApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmojiApplication.class, args);
	}

}
