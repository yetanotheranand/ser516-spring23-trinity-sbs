/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.asu.ser516.trinity.sbs.projectmanagement.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
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

@RestController
@RequestMapping("/epics")
public class Epic {

    @Value("${TAIGA_BASE_URL}")
    private String TAIGA_BASE_URL;
    private static Logger logger = LoggerFactory.getLogger(Epic.class);

    @GetMapping("")
    public ResponseEntity<String> getAllEpics(@RequestHeader("Authorization") String Token) throws MalformedURLException, IOException, InterruptedException, JSONException {

//        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "epics";
        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", Token))
                .asJson();
        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }

    }

    @PostMapping("")
    public ResponseEntity<String> CreateEpic(@RequestBody Map<String, Object> epicMap, @RequestHeader("Authorization") String Token) throws MalformedURLException, IOException, InterruptedException, JSONException {

//        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "epics";
        JSONObject body = new JSONObject(epicMap);

        kong.unirest.HttpResponse<JsonNode> response = Unirest.post(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", Token))
                .contentType("application/json")
                .body(body.toString())
                .asJson();
        if (response.getStatus() == 201) {
            logger.info("Epic Creation Success");
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn("Epic Creation Failed");
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString() );
        }
    }
    
    @GetMapping("/{epic_id}")
    public ResponseEntity<String> getEpic(@PathVariable int epic_id,@RequestHeader("Authorization") String Token) throws MalformedURLException, IOException, InterruptedException, JSONException {

//        // Set the API endpoint URL
        String url = TAIGA_BASE_URL + "epics/"+epic_id;
        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", Token))
                .asJson();
        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            logger.warn(response.getBody().toString());
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }
    
    @GetMapping("/by_ref")
    public ResponseEntity<String> getEpicByRef(@RequestParam(defaultValue = "") Map<String,String> allParams,@RequestHeader("Authorization") String Token) throws MalformedURLException, IOException, InterruptedException, JSONException {

//        // Set the API endpoint URL
        String params = allParams.toString().replace("{", "").replace("}","").replace(", ","&");
        String url = TAIGA_BASE_URL + "epics/by_ref?"+params;
        System.out.println(url);
        kong.unirest.HttpResponse<JsonNode> response = Unirest.get(url)
                .header("accept", "application/json")
                .header("Authorization", String.format("Bearer %s", Token))
                .asJson();
        if (response.getStatus() == 200) {
            return ResponseEntity.ok(response.getBody().toString());

        } else {
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());
        }
    }

}
