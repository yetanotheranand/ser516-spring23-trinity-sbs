package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import java.util.Map;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import org.json.JSONException;
//import org.json.JSONObject;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
//import java.util.Map;
//import org.springframework.web.bind.annotation.*;

/**
 * The UserStory class is a REST controller that handles HTTP requests.
 * It provides methods for retrieving all user stories for a specific project using the
 * Taiga API.
 */
@RestController
public class UserStory {

    private static final Logger logger = LoggerFactory.getLogger(UserStory.class);
    private static String TAIGA_BASE_URL;

    /**
     * Sets the Taiga base URL from the application properties file.
     *
     * @param url the Taiga base URL
     */
    @Value("${TAIGA_BASE_URL}")
    public void setTaigaBaseUrl(String url) {
        TAIGA_BASE_URL = url;
    }

    /**
     * Retrieves all user stories for a specific project using the Taiga API.
     *
     * @param projectId the ID of the project
     * @param token     the authorization token for accessing the API
     * @return a ResponseEntity containing the JSON response from the API
     * @throws JSONException if there is an error parsing the JSON response
     */
    @GetMapping("/userstories")
    public ResponseEntity<String> getAllUserStories(
            @RequestParam(name = "projectid", required = false) String projectId,
            @RequestHeader("Authorization") String token) throws JSONException {

        String url = TAIGA_BASE_URL + "userstories?project=" + projectId;
        HttpResponse<JsonNode> response = Unirest.get(url)
                .header("Accept", "application/json")
                .header("Authorization", token)
                .asJson();

        if (response.getStatus() == HttpStatus.OK.value()) {
            return ResponseEntity.ok(response.getBody().toString());
        } else {
            return ResponseEntity.status(response.getStatus())
                    .body(response.getBody().toString());
        }
    }

    /**
     * Retrieves user story by id using the Taiga API.
     *
     * @param usid the ID of the userstory
     * @param token the authorization token for accessing the API
     * @return a ResponseEntity containing the JSON response from the API
     * @throws JSONException if there is an error parsing the JSON response
     */
    @GetMapping("/userstories/{usid}")
    public ResponseEntity<String> getUserStoryById(
            @PathVariable int usid,
            @RequestHeader("Authorization") String token) throws JSONException {

        String url = TAIGA_BASE_URL + "userstories/" + usid;
        HttpResponse<JsonNode> response = Unirest.get(url)
                .header("Accept", "application/json")
                .header("Authorization", token)
                .asJson();

        if (response.getStatus() == HttpStatus.OK.value()) {
            return ResponseEntity.ok(response.getBody().toString());
        } else {
            return ResponseEntity.status(response.getStatus())
                    .body(response.getBody().toString());
        }
    }

    /**
     * POST Create User Story API.
     *
     * @param userStoryData Parameter which contains the id of the project
     * @param token      auth token for Taiga API
     * @return response from Taiga API for project creation
     * @throws JSONException error parsing the json request and response
     */
    @PostMapping("/userstories")
    public ResponseEntity<String> createUserStory(
            @RequestParam(name = "projectid") String projectId,
            @RequestBody Map<String, Object> userStoryData,
            @RequestHeader("Authorization") String token) throws JSONException {

        logger.info(String.valueOf(userStoryData));
        JSONObject j = new JSONObject();
        j.put("description", userStoryData.get("description").toString());
        j.put("project", Integer.parseInt(userStoryData.get("project").toString()));
        j.put("subject", userStoryData.get("subject").toString());
        String url = TAIGA_BASE_URL + "userstories?project=" + projectId;
        kong.unirest.HttpResponse<JsonNode> response = Unirest.post(url)
                .header("accept", "application/json")
                .header("Authorization", String.format(token))
                .contentType("application/json")
                .body(j.toString())
                .asJson();
        
        if (response.getStatus() == 201) {
            logger.info("User Story Creation Success");
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn("User story Creation Failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }
}