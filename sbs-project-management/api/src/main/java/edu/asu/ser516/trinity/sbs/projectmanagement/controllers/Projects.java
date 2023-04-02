/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;
import java.util.Map;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import org.json.JSONException;
import org.json.JSONObject;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/projects")
public class Projects {

    @Value("${TAIGA_BASE_URL}")
    private String TAIGA_BASE_URL;
    private static Logger logger = LoggerFactory.getLogger(Auth.class);

    @GetMapping("/")
    public ResponseEntity<String> getAllProjects(@RequestHeader("Authorization") String Token) throws MalformedURLException, IOException, InterruptedException, JSONException {

//        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "projects";

        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("%s", Token))
                .asJson();
        if (response.getStatus() == 200) {
            System.out.println(response.getStatus());
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn("User Login Failed");
            return ResponseEntity.status(401).body(response.getBody().toString());
        }

    }
    @PostMapping("/")
    public ResponseEntity<String> CreateProject(@RequestBody Map<String, Object> projectMap, @RequestHeader("Authorization") String Token) throws MalformedURLException, IOException, InterruptedException, JSONException {

//        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "projects";

        JSONObject j = new JSONObject();
        j.put("name", projectMap.get("name").toString());
        j.put("is_private", projectMap.get("is_private").toString());
        j.put("description", projectMap.get("description").toString());

        kong.unirest.HttpResponse<JsonNode> response = Unirest.post(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", Token))
                .contentType("application/json")
                .body(j.toString())
                .asJson();
        if (response.getStatus() == 201) {
            logger.info("Project Crestion Success");
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn("Project Creation Failed");
            return ResponseEntity.status(401).body(response.getBody().toString());
        }
    }
}
