package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;


import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import org.json.JSONException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserStory {

    private static String TAIGA_BASE_URL;

    @Value("${TAIGA_BASE_URL}")
    public void setTaigaBaseUrl(String url) {
        TAIGA_BASE_URL = url;
    }

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
}
