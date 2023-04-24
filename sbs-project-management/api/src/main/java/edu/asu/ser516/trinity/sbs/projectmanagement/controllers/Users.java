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
import org.springframework.web.bind.annotation.RestController;

/**
 * Class to handle Users.
 */
@RestController
@RequestMapping("/users")
public class Users {

    private static final Logger logger = LoggerFactory.getLogger(Epic.class);
    private static String taigaBaseURL;

    @Value("${TAIGA_BASE_URL}")
    public static void setTaigaBaseUrl(String url) {
        taigaBaseURL = url;
    }

    /**
     * Get users API.
     *
     * @return status code 200 on success and 401 on failure
     * @throws JSONException error parsing the json request and response
     * @header containing the token
     */
    @GetMapping("")
    public ResponseEntity<String> getusers(
            @RequestParam(defaultValue = "") Map<String, String> allParams,
            @RequestHeader("Authorization") String token) throws JSONException {
        String params = allParams
                .toString()
                .replace("{", "").replace("}", "")
                .replace(", ", "&");
        // Set the API endpoint URL
        String url = taigaBaseURL + "users?" + params;
        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format(token))
                .asJson();
        logger.info(url);
        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }

    }

}
