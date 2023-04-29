package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class TaigaDeleteProject {

    private static final String API_ENDPOINT = "https://api.taiga.io/api/v1";
    private static final String AUTH_TOKEN = "your-auth-token";
    private static final RestTemplate restTemplate = new RestTemplate();
    private static final ObjectMapper mapper = new ObjectMapper();

    public static void main(String[] args) throws JsonProcessingException {
        SpringApplication.run(edu.asu.ser516.trinity.sbs.projectmanagement.controllers.TaigaDeleteProject.class, args);

        // Replace "project-id-to-delete" with the actual project ID you want to delete
        String projectIdToDelete = "project-id-to-delete";

        // Delete project
        String deleteProjectUrl = API_ENDPOINT + "/projects/" + projectIdToDelete;
        restTemplate.delete(deleteProjectUrl);

        // Get list of projects
        String getListOfProjectsUrl = API_ENDPOINT + "/projects?member=" + AUTH_TOKEN;
        String responseJson = restTemplate.getForObject(getListOfProjectsUrl, String.class);

        // Parse JSON response
        JsonNode responseNode = mapper.readTree(responseJson);
        JsonNode projectsNode = responseNode.get("objects");

        // Print list of projects
        for (JsonNode projectNode : projectsNode) {
            String projectId = projectNode.get("id").asText();
            String projectName = projectNode.get("name").asText();
            System.out.println("Project ID: " + projectId + ", Project Name: " + projectName);
        }
    }
}

