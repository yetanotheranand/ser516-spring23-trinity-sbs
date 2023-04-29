package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class TaigaEditProject {

    private static final String API_ENDPOINT = "https://api.taiga.io/api/v1";
    private static final String AUTH_TOKEN = "your-auth-token";
    private static final RestTemplate restTemplate = new RestTemplate();
    private static final ObjectMapper mapper = new ObjectMapper();

    @PostMapping("/projects")
    public ResponseEntity<JsonNode> createProject(@RequestBody JsonNode projectJson, HttpServletResponse response) throws JsonProcessingException {
        String projectName = projectJson.get("name").asText();
        String projectDescription = projectJson.get("description").asText();

        // Create project
        String createProjectUrl = API_ENDPOINT + "/projects";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + AUTH_TOKEN);

        String projectDetailsJson = "{\"name\": \"" + projectName + "\",\"description\": \"" + projectDescription + "\"}";
        HttpEntity<String> requestEntity = new HttpEntity<>(projectDetailsJson, headers);
        ResponseEntity<String> createProjectResponse = restTemplate.exchange(createProjectUrl, HttpMethod.POST, requestEntity, String.class);

        // Parse JSON response
        JsonNode responseNode = mapper.readTree(createProjectResponse.getBody());

        // Set response status and body
        response.setStatus(createProjectResponse.getStatusCode().value());
        return ResponseEntity.ok(responseNode);
    }

    public static void main(String[] args) {
        SpringApplication.run(edu.asu.ser516.trinity.sbs.projectmanagement.controllers.TaigaEditProject.class, args);
    }
}

