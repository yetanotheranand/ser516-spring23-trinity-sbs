package edu.asu.ser516.trinity.sbs.projectmanagement;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import kong.unirest.Unirest;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class ApplicationTests {

    @Autowired
    private MockMvc mockMvc;
    @Value("${TAIGA_BASE_URL}")
    private String taigaBaseUrl;
    @Value("${TAIGA_DEMO_USER}")
    private String user;
    @Value("${TAIGA_DEMO_PASSWORD}")
    private String pass;
    private String token;

    public ApplicationTests() throws JSONException {
        Unirest.config().verifySsl(false);

    }

    @Test
    public void testAuthTest() throws Exception {
        this.mockMvc.perform(get("/auth/")).andExpect(status().isOk());

    }

    @Test
    public void LoginFail() throws Exception {
        JSONObject j = new JSONObject();
        j.put("username", "user");
        j.put("password", "user");
        this.mockMvc.perform(
                        post("/auth/").content(j.toString()).contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void LoginSuccess() throws Exception {
        JSONObject j = new JSONObject();
        j.put("username", user);
        j.put("password", pass);
        this.mockMvc.perform(
                        post("/auth/").content(j.toString()).contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void getProjects() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/projects").header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

    }

    private String getAuthToken(String username,
                                String password) throws IOException, InterruptedException, JSONException {
        String url = taigaBaseUrl;
        HttpClient client = HttpClient.newHttpClient();
        JSONObject j = new JSONObject();
        j.put("username", username);
        j.put("password", password);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .POST(HttpRequest.BodyPublishers.ofString(j.toString()))
                .headers("Content-Type", "application/json")
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200) {
            JSONObject obj = new JSONObject(response.body());
            return obj.getString("auth_token");
        } else {
            return null;
        }
    }

    @Test
    public void createProject() throws Exception {
        JSONObject j = new JSONObject();
        j.put("name", "test");
        j.put("description", "test");
        j.put("is_private", "false");
        String token = getAuthToken(user, pass);
        this.mockMvc.perform(get("/projects").header("Authorization",
                        "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

}
