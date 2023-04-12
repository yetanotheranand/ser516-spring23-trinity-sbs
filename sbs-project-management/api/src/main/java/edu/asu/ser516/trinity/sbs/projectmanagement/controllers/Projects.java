package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import java.io.IOException;
import java.util.Map;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Class to handle project related operation.
 */
@RestController
@RequestMapping("/projects")
public class Projects {

    private static final Logger logger = LoggerFactory.getLogger(Projects.class);
    private static String TAIGA_BASE_URL;

    @Value("${TAIGA_BASE_URL}")
    public void setTaigaBaseUrl(String url) {
        TAIGA_BASE_URL = url;
    }

    /**
     * GET All Projects API.
     *
     * @param allParams form containing requesst project details
     * @return response from Taiga API
     * @throws JSONException error parsing the json request and response
     */
    @GetMapping("")
    public ResponseEntity<String> getAllProjects(
            @RequestParam(defaultValue = "{}") Map<String, String> allParams,
            @RequestHeader("Authorization") String token)
            throws JSONException {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "projects";
        String params = allParams.toString().replace("{", "").replace("}", "").replace(", ", "&");
        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(
                url + "?" + params)
                .header("accept", "application/json")
                .header("Authorization", String.format(token))
                .asJson();
        System.out.println(url + "?" + params);
        
        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            return ResponseEntity.status(401).body(response.getBody().toString());
        }

    }

    /**
     * POST Create Project API.
     *
     * @param projectMap form containing name of the project to be created
     * @param token      auth token for Taiga API
     * @return response from Taiga API for project creation
     * @throws JSONException error parsing the json request and response
     */
    @PostMapping("")
    public ResponseEntity<String> createProject(@RequestBody Map<String, Object> projectMap,
            @RequestHeader("Authorization") String token)
            throws JSONException {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "projects";

        JSONObject j = new JSONObject();
        j.put("name", projectMap.get("name").toString());
        j.put("is_private", projectMap.get("is_private").toString());
        j.put("description", projectMap.get("description").toString());

        kong.unirest.HttpResponse<JsonNode> response = Unirest.post(url)
                .header("accept", "application/json")
                .header("Authorization", String.format(token))
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
