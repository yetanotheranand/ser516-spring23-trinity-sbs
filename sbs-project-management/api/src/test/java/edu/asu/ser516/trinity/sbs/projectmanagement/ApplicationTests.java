package edu.asu.ser516.trinity.sbs.projectmanagement;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

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
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import edu.asu.ser516.trinity.sbs.projectmanagement.controllers.Tasks;


@SpringBootTest
@AutoConfigureMockMvc
public class ApplicationTests {

    @Autowired
    private MockMvc mockMvc;
    @Value("${TAIGA_BASE_URL}")
    private String taigaBaseUrl;
    @Value("${TAIGA_DEMO_USER}")
    private String user;
    @Value("${TAIGA_DEMO_USERID}")
    private String userId;
    @Value("${TAIGA_DEMO_PASSWORD}")
    private String pass;
    @Value("${TAIGA_DEMO_PROJID}")
    private String projectId;
    @Value("${TAIGA_DEMO_EPICJID}")
    private int epicId;
    @Value("${TAIGA_DEMO_PROJNAME}")
    private String projectName;
    @Value("${TAIGA_DEMO_PROJSLUG}")
    private String projectSlug;
    @Value("${TAIGA_DEMO_EPICNAME}")
    private String epicName;
    @Value("${TAIGA_DEMO_EPICSTATUSNAME}")
    private String epicStatusName;
    @Value("${TAIGA_DEMO_EPICSTATUSID}")
    private int epicStatusId;
    @Value("${TAIGA_DEMO_TASKID}")
    private int taskId;


    public ApplicationTests() throws JSONException {
        Unirest.config().verifySsl(false);

    }

    @Test
    public void testAuthTest() throws Exception {
        this.mockMvc.perform(get("/auth")).andExpect(status().isOk());

    }

    @Test
    public void loginFail() throws Exception {
        JSONObject j = new JSONObject();
        j.put("username", "user");
        j.put("password", "user");
        this.mockMvc.perform(
                        post("/auth")
                                .content(j.toString())
                                .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void loginSuccess() throws Exception {
        JSONObject j = new JSONObject();
        j.put("username", user);
        j.put("password", pass);
        this.mockMvc.perform(
                        post("/auth").content(j.toString())
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void getProjects() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/projects")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
    
    @Test
    public void getProjectById() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/projects/" + projectId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void getProjectBySlug() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/projects/by_slug/" + projectSlug)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void createProject() throws Exception {
        JSONObject j = new JSONObject();
        j.put("name", projectName);
        j.put("description", "test");
        j.put("is_private", "false");
        String token = getAuthToken(user, pass);
        this.mockMvc.perform(post("/projects").header("Authorization",
                        "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON).content(j.toString()))
                .andExpect(status().isOk());

    }

    @Test
    public void likeProject() throws Exception {
        String token = getAuthToken(user, pass);
        this.mockMvc.perform(post("/projects/" + projectId + "/like")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void unLikeProject() throws Exception {
        String token = getAuthToken(user, pass);
        this.mockMvc.perform(post("/projects/" + projectId + "/unlike")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void getEpics() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/epics")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void getEpicById() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/epics/" + epicId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void getEpicByRef() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/epics/by_ref?ref=6&project=" + projectId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void createEpic() throws Exception {
        JSONObject j = new JSONObject();
        j.put("assigned_to", userId);
        j.put("clientRequirement", true);
        j.put("color", "");
        j.put("description", "Testing");
        j.put("project", projectId);
        j.put("subject", epicName);

        String token = getAuthToken(user, pass);
        this.mockMvc.perform(post("/epics").header("Authorization",
                        "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON).content(j.toString()))
                .andExpect(status().isOk());
    }

    @Test
    public void getEpicStatuses() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/epic-statuses")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void getEpicStatus() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/epic-statuses/" + epicStatusId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void createEpicStatus() throws Exception {
        JSONObject j = new JSONObject();
        j.put("is_closed", true);
        j.put("clientRequirement", true);
        j.put("color", "#AAAAAA");
        j.put("name", epicStatusName);
        j.put("project", projectId);
        j.put("order", 8);
        String token = getAuthToken(user, pass);
        this.mockMvc.perform(post("/epic-statuses")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON).content(j.toString()))
                .andExpect(status().is(400));
    }

    @Test
    public void putEpicStatus() throws Exception {
        JSONObject j = new JSONObject();
        j.put("is_closed", true);
        j.put("clientRequirement", true);
        j.put("color", "#AAAAAA");
        j.put("name", epicStatusName);
        j.put("project", projectId);
        j.put("order", 8);
        String token = getAuthToken(user, pass);
        this.mockMvc.perform(put("/epic-statuses/" + epicStatusId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON).content(j.toString()))
                .andExpect(status().isForbidden());
    }

    @Test
    public void patchEpicStatus() throws Exception {
        JSONObject j = new JSONObject();
        j.put("name", epicName);
        j.put("project", projectId);
        j.put("order", 8);
        String token = getAuthToken(user, pass);
        this.mockMvc.perform(patch("/epic-statuses/" + epicStatusId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON).content(j.toString()))
                .andExpect(status().isForbidden());
    }

    @Test
    public void deleteEpicStatus() throws Exception {
        String token = getAuthToken(user, pass);
        this.mockMvc.perform(delete("/epic-statuses/" + epicStatusId + 1)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
    
    @Test
    public void getUsers() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/users?project=" + projectId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void getTasks() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/tasks")
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void getTaskById() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/tasks/" + taskId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

    }

    @Test
    public void getTaskByRef() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/task/by_ref?ref=2&project=" + projectId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

    }

    @Test
    public void createTask() throws Exception {
        JSONObject j = new JSONObject();
        j.put("assigned_to", userId);
        j.put("description", "Testing");
        j.put("project", projectId);
        j.put("subject", "demo task");

        String token = getAuthToken(user, pass);
        this.mockMvc.perform(post("/tasks").header("Authorization",
                        "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON).content(j.toString()))
                .andExpect(status().isOk());
    }

    @Test
    public void patchTask() throws Exception {
        JSONObject j = new JSONObject();
        String token = getAuthToken(user, pass);
        j.put("description", "Testing");
        j.put("version",3);
        
        this.mockMvc.perform(patch("/tasks/" + taskId)
                .header("Authorization", "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON).content(j.toString()))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void getUserStories() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/userstories")
                        .header("Authorization", "Bearer " + token)
                        .param("projectid", projectId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void getUserStoriesById() throws Exception {
        String token = getAuthToken(user, pass);

        this.mockMvc.perform(get("/userstories/4562067")
                        .header("Authorization", "Bearer " + token)
                        .param("projectid", projectId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    private String getAuthToken(String username,
                                String password) throws IOException,
                                InterruptedException, JSONException {
        String url = taigaBaseUrl+"auth";
        HttpClient client = HttpClient.newHttpClient();
        JSONObject j = new JSONObject();
        j.put("username", username);
        j.put("password", password);
        j.put("type", "normal");
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
            return response.body().toString();
        }
    }

    




}