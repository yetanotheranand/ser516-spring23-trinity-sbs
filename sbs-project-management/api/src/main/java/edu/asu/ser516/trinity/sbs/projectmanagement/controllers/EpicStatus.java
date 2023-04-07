/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import java.util.Map;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.UnirestException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * API to handle epic statuses.
 */
@RestController
@RequestMapping("/epic-statuses")
public class EpicStatus {
    private static final Logger logger = LoggerFactory.getLogger(EpicStatus.class);
    @Value("${TAIGA_BASE_URL}")
    private String taigaBaseUrl;

    /**
     * GET: Get epic status of all the epics.
     *
     * @param token bearer token
     * @return success or failure response of get epics
     * @throws UnirestException exception while fetching data from upstream
     */
    @GetMapping("")
    public ResponseEntity<String> getAllEpicStatuses(
            @RequestHeader("Authorization") String token) throws UnirestException {
        String url = taigaBaseUrl + "epic-statuses";
        HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", token))
                .asJson();

        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());
        } else {
            logger.warn("Unauthenticated Request");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * GET: Get epic status.
     *
     * @param epicId id of the epic
     * @param token bearer token
     * @return success or failure response of get epic
     * @throws UnirestException exception while fetching data from upstream
     */
    @GetMapping("/{epicId}")
    public ResponseEntity<String> getEpicStatus(@PathVariable Long epicId,
                                                @RequestHeader("Authorization") String token)
            throws UnirestException {
        String url = taigaBaseUrl + "epic-statuses/" + epicId;
        HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", token))
                .asJson();

        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());
        } else {
            logger.warn("Unauthenticated Request");

            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * POST: Create epic status.
     *
     * @param epicStatusMap epic status map
     * @param token bearer token
     * @return success or failure response of create epic
     * @throws UnirestException exception while fetching data from upstream
     */
    @PostMapping("")
    public ResponseEntity<String> createEpicStatus(
            @RequestBody Map<String, Object> epicStatusMap,
            @RequestHeader("Authorization") String token)
            throws UnirestException {
        String url = taigaBaseUrl + "epic-statuses";
        JSONObject body = new JSONObject(epicStatusMap);

        System.out.println(body);
        HttpResponse<JsonNode> response = Unirest.post(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", token))
                .header("Content-Type", "application/json")
                .body(body.toString())
                .asJson();

        if (response.getStatus() == 201) {
            logger.info("Epic status creation success");
            return ResponseEntity.ok(response.getBody().toString());
        } else {
            logger.warn("Epic status creation failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * PUT: Edit epic status.
     *
     * @param epicId id of the epic
     * @param epicStatusMap epic status map
     * @param token bearer token
     * @return success or failure response of epic edit
     * @throws UnirestException exception while fetching data from upstream
     */
    @PutMapping("/{epicId}")
    public ResponseEntity<String> editEpicStatusByPut(
            @PathVariable Long epicId,
            @RequestBody Map<String, Object> epicStatusMap,
            @RequestHeader("Authorization") String token)
            throws UnirestException {
        String url = taigaBaseUrl + "epic-statuses/" + epicId;
        JSONObject body = new JSONObject(epicStatusMap);

        System.out.println(body);
        HttpResponse<JsonNode> response = Unirest.put(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", token))
                .header("Content-Type", "application/json")
                .body(body.toString())
                .asJson();
        if (response.getStatus() == 200) {
            logger.info("Epic status creation success");
            return ResponseEntity.ok(response.getBody().toString());
        } else {
            logger.warn("Epic status creation failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * PATCH: Edit epic status.
     *
     * @param epicId id of the epic
     * @param epicStatusMap epic status map
     * @param token bearer token
     * @return success or failure response of epic edit
     * @throws UnirestException exception while fetching data from upstream
     */
    @PatchMapping("/{epicId}")
    public ResponseEntity<String> editEpicStatusByPatch(
            @PathVariable Long epicId,
            @RequestBody Map<String, Object> epicStatusMap,
            @RequestHeader("Authorization") String token)
            throws UnirestException {
        String url = taigaBaseUrl + "epic-statuses/" + epicId;
        JSONObject body = new JSONObject(epicStatusMap);

        System.out.println(body);
        HttpResponse<JsonNode> response = Unirest.put(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", token))
                .header("Content-Type", "application/json")
                .body(body.toString())
                .asJson();

        if (response.getStatus() == 200) {
            logger.info("Epic status creation success");
            return ResponseEntity.ok(response.getBody().toString());
        } else {
            logger.warn("Epic status creation failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * Delete epic by id.
     *
     * @param epicId id of the epic
     * @param token bearer token
     * @return success or failure response of the deletion
     * @throws UnirestException exception while fetching data from upstream
     */
    @DeleteMapping("/{epicId}")
    public ResponseEntity<String> deleteEpicStatusById(
            @PathVariable Long epicId,
            @RequestHeader("Authorization") String token)
            throws UnirestException {
        String url = taigaBaseUrl + "epic-statuses/" + epicId + "?moveTo=empty";
        HttpResponse<JsonNode> response = Unirest.delete(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", token))
                .header("Content-Type", "application/json")
                .asJson();
        System.out.println(response.getBody().toString());
        System.out.println(response.getStatus());
        if (response.getStatus() == 204) {
            logger.info("Epic Deletion success");
            return ResponseEntity.ok(response.getBody().toString());
        } else {
            logger.warn("Epic Deletion failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }
}

