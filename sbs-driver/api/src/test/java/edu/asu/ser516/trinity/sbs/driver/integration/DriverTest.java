package edu.asu.ser516.trinity.sbs.driver.integration;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class DriverTest {

    @BeforeEach
    public void setup() {
        RestAssured.baseURI = "http://localhost:8080";
    }

    @Test
    public void testGetHelloWorld() {
        Response response = RestAssured.get("/");
        String responseBody = response.getBody().asString();
        assertEquals(200, response.getStatusCode());
        assertTrue(responseBody.contains("<h1>Hello World from Metrics " +
                "API</h1>"));
    }
}
