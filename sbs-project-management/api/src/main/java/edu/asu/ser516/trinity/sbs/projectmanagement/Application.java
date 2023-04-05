package edu.asu.ser516.trinity.sbs.projectmanagement;

import kong.unirest.Unirest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@SpringBootApplication
public class Application {

	public static void main(String[] args) {
            Unirest.config().verifySsl(false);
         SpringApplication.run(Application.class, args);
	}
        
}
