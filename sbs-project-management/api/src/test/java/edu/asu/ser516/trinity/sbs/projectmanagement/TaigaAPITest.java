package edu.asu.ser516.trinity.sbs.projectmanagement;

import org.eclipse.jetty.server.Server;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedConstruction;

import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TaigaAPITest {
    private TaigaAPI taigaAPI;
    @BeforeEach
    void setUp() {
        this.taigaAPI = new TaigaAPI();
    }

    @Test
    void createProjTest() throws Exception {
        String url = "https://api.taiga.io/api/v1/projects";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        TaigaAPI.createProject("Project Title Sample", "Project Description Sample.");
        assertEquals(200, con.getResponseCode());
    }

}
