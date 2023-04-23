package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import java.util.Map;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONException;
import kong.unirest.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;




/**
 * Class to handle task related operation.
 */
@RestController
@RequestMapping("/tasks")
public class Tasks {

    private static final Logger logger = LoggerFactory.getLogger(Projects.class);

    private static String TAIGA_BASE_URL;

    @Value("${TAIGA_BASE_URL}")
    public void setTaigaBaseUrl(String url) {
        TAIGA_BASE_URL = url;
    }

    /**
     * GET All Tasks API.
     *
     * @param allParams form containing requesst task details
     * @return response from Taiga API
     * @throws JSONException error parsing the json request and response
     */
    @GetMapping("")
    public ResponseEntity<String> getAllTasks(
            @RequestParam(defaultValue = "{}") Map<String, String> allParams,
            @RequestHeader("Authorization") String token)
            throws JSONException {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "tasks";
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
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }

    }

    /**
     * GET task API.
     *
     * @param allParams form containing requesst task details
     * @return response from Taiga API
     * @throws JSONException error parsing the json request and response
     */
    @GetMapping("{taskId}")
    public ResponseEntity<String> getTaskById(
            @PathVariable int taskId,
            @RequestHeader("Authorization") String token)
            throws JSONException {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "tasks/" + taskId;
        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(
                url)
                .header("accept", "application/json")
                .header("Authorization", String.format(token))
                .asJson();        
        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * POST Create task API.
     *
     * @param taskMap form containing name of the task to be created
     * @param token auth token for Taiga API
     * @return response from Taiga API for task creation
     * @throws JSONException error parsing the json request and response
     */
    @PostMapping("")
    public ResponseEntity<String> createTask(@RequestBody Map<String, Object> taskMap,
            @RequestHeader("Authorization") String token)
            throws JSONException {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "tasks";
        JSONObject body = new JSONObject(taskMap);
        kong.unirest.HttpResponse<JsonNode> response = Unirest.post(url)
                .header("accept", "application/json")
                .header("Authorization", String.format(token))
                .contentType("application/json")
                .body(body.toString())
                .asJson();
        System.out.println(response.getStatus());
        if (response.getStatus() == 201) {
            logger.info("task Creation Success");
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn("task Creation Failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * Get tasks by its reference.
     *
     * @param allParams tasks result filter params
     * @param token bearer token
     * @return response of get taskss by reference
     * @throws JSONException exception while parsing request
     */
    @GetMapping("/by_ref")
    public ResponseEntity<String> getTasksByRef(
            @RequestParam(defaultValue = "") Map<String, String> allParams,
            @RequestHeader("Authorization") String token) throws JSONException {

        String params = allParams
                .toString()
                .replace("{", "").replace("}", "")
                .replace(", ", "&");
        String url = TAIGA_BASE_URL + "tasks/by_ref?" + params;
        System.out.println(url);
        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format(token))
                .asJson();
        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * PUT Updatetasks API.
     *
     * @param tasksId   id of the tasks to update
     * @param tasksData tasks data containing name and description
     * @param token    bearer token
     * @return response of update tasks
     * @throws JSONException error parsing the json request and response
     */
    @PatchMapping("/{tasksId}")
    public ResponseEntity<String> updatetasks(@PathVariable int tasksId,
                                             @RequestBody Map<String, Object> tasksData,
                                             @RequestHeader("Authorization") String token)
            throws JSONException {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "tasks/" + tasksId;
        JSONObject body = new JSONObject(tasksData);
        kong.unirest.HttpResponse<JsonNode> response = Unirest.patch(url)
                .header("accept", "application/json")
                .header("Authorization", String.format(token))
                .contentType("application/json")
                .body(body.toString())
                .asJson();
        if (response.getStatus() == 200) {
            logger.info("tasks Update Success");
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn("tasks Update Failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * Deletes an tasks by its ID.
     *
     * @param tasksId the ID of the tasks to be deleted
     * @param token the authorization token
     * @return success or failure response of the deletion
     *
     */
    @DeleteMapping("/{tasksId}")
    public ResponseEntity<String> deletetasks(@PathVariable int tasksId,
                                             @RequestHeader("Authorization") String token) {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "tasks/" + tasksId;
        kong.unirest.HttpResponse<JsonNode> response = Unirest.delete(url)
                .header("accept", "application/json")
                .header("Authorization", String.format(token))
                .asJson();
        if (response.getStatus() == 204) {
            logger.info("tasks Delete Success");
            return ResponseEntity.ok().build();

        } else {
            logger.warn("tasks Delete Failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }


}

