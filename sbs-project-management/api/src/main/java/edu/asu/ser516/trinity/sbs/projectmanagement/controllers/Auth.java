package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import java.io.IOException;
import java.util.Map;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class to handle authentication with Taiga API.
 */
@Component
@RestController
@RequestMapping("/auth")
public class Auth {

    private static final Logger logger = LoggerFactory.getLogger(Auth.class);

    private static String TAIGA_BASE_URL;

    @Value("${TAIGA_BASE_URL}")
    public void setTaigaBaseUrl(String url) {
        TAIGA_BASE_URL = url;
    }

    @GetMapping("")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok().body("Auth Working");
    }

    /**
     * POST Login API.
     *
     * @param userMap authentication data containing username and password
     * @return status code 200 on success and 401 on failure
     * @throws JSONException error parsing the json request and response
     */
    @PostMapping("")
    public ResponseEntity<String> login(
            @RequestBody Map<String, Object> userMap) throws JSONException {

        String username = userMap.get("username").toString();
        String password = userMap.get("password").toString();

        // Set the API endpoint URL
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
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * POST Refresh Token API.
     *
     * @param refreshToken refresh token
     * @return status code 200 on success and 401 on failure
     * @throws JSONException error parsing the json request and response
     */
    @PostMapping("/refresh")
    public ResponseEntity<String> refresh(
            @RequestParam String refreshToken) throws JSONException {

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
