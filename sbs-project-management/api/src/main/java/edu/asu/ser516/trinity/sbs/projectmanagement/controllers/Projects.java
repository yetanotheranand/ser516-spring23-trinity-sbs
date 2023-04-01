/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/projects")
public class Projects {
    
    @Value("${TAIGA_BASE_URL}")
    private String TAIGA_BASE_URL;
    private static Logger logger = LoggerFactory.getLogger(Auth.class);

    @GetMapping("/")
    public String getAllProjects(){
        String url = TAIGA_BASE_URL + "projects";
        HttpClient client = HttpClient.newHttpClient();
//        var values = new HashMap<String, String>() {
//            {
//                put("username", username);
//                put("password", password);
//                put("type", "normal");
//            }
//        };

//        var objectMapper = new ObjectMapper();
//        String requestBody = objectMapper
//                .writeValueAsString(values);
        // HttpRequest request = HttpRequest.newBuilder()
        //         .uri(URI.create(url))
        //         .headers("Content-Type", "application/json")
        //         .headers("Authorization: Bearer ${AUTH_TOKEN}")
        //         .build();
        
        // HttpResponse<String> response = client.send(request,
        //         HttpResponse.BodyHandlers.ofString());
        // if (response.statusCode() == 200) {
        //     logger.info("User Login Success");
        //     return ResponseEntity.ok().body(response.body());
        // } else {
        //     logger.warn("User Login Failed");
        //     return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
        // }
        return "Projects";
    }
}
