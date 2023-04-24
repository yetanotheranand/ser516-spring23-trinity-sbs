package edu.asu.ser516.trinity.sbs.driver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * The main class for starting a Spring Boot application.
 */
@SpringBootApplication
public class Application {

    /**
     * Main method to start the Spring Boot application.
     *
     * @param args command-line arguments passed to the application
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    /**
     * Returns a WebMvcConfigurer object that configures cross-origin resource
     * sharing (CORS) for the application.
     *
     * @return a WebMvcConfigurer object that allows requests from
     * localhost to access all endpoints
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:8080");
            }
        };
    }
}
