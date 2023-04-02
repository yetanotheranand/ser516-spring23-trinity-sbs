/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URI;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import kong.unirest.HttpResponse;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import kong.unirest.JsonNode;
import kong.unirest.JsonResponse;
import kong.unirest.Unirest;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Component
@RestController
@RequestMapping("/auth")
public class Auth {

    @Value("${TAIGA_BASE_URL}")
    private String TAIGA_BASE_URL;
    private static Logger logger = LoggerFactory.getLogger(Auth.class);

    @GetMapping("/")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok().body("Auth Working");
    }

    @PostMapping("/")
    public ResponseEntity<String> login(@RequestBody Map<String, Object> userMap) throws MalformedURLException, IOException, InterruptedException, JSONException {

        String username = userMap.get("username").toString();
        String password = userMap.get("password").toString();

//        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "auth";
        JSONObject j = new JSONObject();
        j.put("username", username);
        j.put("password", password);
        j.put("type", "normal");

        HttpResponse<JsonNode> response = Unirest.post(url)
                .header("accept", "application/json")
                .contentType("application/json")
                .body(j.toString())
                .asJson();
        if (response.getStatus() == 200) {
            logger.info("User Login Success");
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn("User Login Failed");
            return ResponseEntity.status(401).body(response.getBody().toString());
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<String> refresh(@RequestParam String refreshToken) throws MalformedURLException, IOException, InterruptedException, JSONException {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "auth/refresh";
        JSONObject j = new JSONObject();
        j.put("refresh", String.format("%s", refreshToken));
        HttpResponse<JsonNode> response = Unirest.post(url)
                .header("accept", "application/json")
                .contentType("application/json")
                .body(j.toString())
                .asJson();
        if (response.getStatus() == 200) {
            logger.info("Refresh Token Created");
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn("User Login Failed");
            return ResponseEntity.status(401).body(response.getBody().toString());
        }
    }
}
