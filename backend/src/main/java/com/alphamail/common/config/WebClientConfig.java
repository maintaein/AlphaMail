package com.alphamail.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean("ocrWebClient")
    public WebClient ocrWebClient() {
        return WebClient.builder()
                .baseUrl("https://alphamail.my:3000")
                .build();
    }

    @Bean("mcpWebClient")
    public WebClient mcpWebClient() {
        return WebClient.builder()
                .baseUrl("https://alphamail.my:8001")
                .build();
    }

    @Bean("ragWebClient")
    public WebClient ragWebClient() {
        return WebClient.builder()
                .baseUrl("http://alphamail.my:5000")
                .build();
    }
}
