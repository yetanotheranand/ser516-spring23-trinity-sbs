package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Class to handle Epics.
 */
@RequestMapping("/epics")
public class Epic {

    private static final Logger logger = LoggerFactory.getLogger(Epic.class);
    private static String TAIGA_BASE_URL;

    @Value("${TAIGA_BASE_URL}")
    public void setTaigaBaseUrl(String url) {
        TAIGA_BASE_URL = url;
    }

    /**
     * Get AllEpics API.
     *
     * @return status code 200 on success and 401 on failure
     * @throws JSONException error parsing the json request and response
     * @header containing the token
     */
    @GetMapping("")
    public ResponseEntity<String> getAllEpics(
            @RequestHeader("Authorization") String token) throws JSONException {

//        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "epics";
        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format( token))
                .asJson();
        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }

    }

    /**
     * POST CreateEpic API.
     * @header containing the token
     * @body userMap epic data
     * @return status code 201 on success and 401 on failure
     * @throws JSONException error parsing the json request and response
     * @header containing the token
     * @body userMap epic data containing name and description
     */
    @PostMapping("")
    public ResponseEntity<String> createEpic(
            @RequestBody Map<String, Object> epicMap,
            @RequestHeader("Authorization") String token)
            throws JSONException {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "epics";
        JSONObject body = new JSONObject(epicMap);

        kong.unirest.HttpResponse<JsonNode> response = Unirest.post(url)
                .header("accept", "application/json")
                .header("Authorization", String.format( token))
                .contentType("application/json")
                .body(body.toString())
                .asJson();
        if (response.getStatus() == 201) {
            logger.info("Epic Creation Success");
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn("Epic Creation Failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * Get EpicById API.
     *
     * @param epicId id of the epic
     * @return status code 201 on success and 401 on failure
     * @throws JSONException error parsing the json request and response
     * @header containing the token
     */
    @GetMapping("/{epic_id}")
    public ResponseEntity<String> getEpicById(@PathVariable int epicId,
                                              @RequestHeader("Authorization") String token)
            throws JSONException {

        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "epics/" + epicId;
        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format( token))
                .asJson();
        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn(response.getBody().toString());
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

    /**
     * Get epic by its reference.
     *
     * @param allParams epic result filter params
     * @param token bearer token
     * @return response of get epics by reference
     * @throws JSONException exception while parsing request
     */
    @GetMapping("/by_ref")
    public ResponseEntity<String> getEpicByRef(
            @RequestParam(defaultValue = "") Map<String, String> allParams,
            @RequestHeader("Authorization") String token) throws JSONException {

        String params = allParams
                .toString()
                .replace("{", "").replace("}", "")
                .replace(", ", "&");
        String url = TAIGA_BASE_URL + "epics/by_ref?" + params;
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

}
