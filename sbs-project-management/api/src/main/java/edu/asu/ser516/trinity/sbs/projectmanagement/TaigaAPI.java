package edu.asu.ser516.trinity.sbs.projectmanagement;
import com.google.gson.Gson;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;
//import com.google.gson.Gson;

public class TaigaAPI {

    private static AuthResponse authResponse;
    public TaigaAPI() {
    }

    public static int connect(String username, String password) throws IOException {

        String type = "normal";
        String url = "https://api.taiga.io/api/v1/auth";
        HttpURLConnection con;
        String jsonInputString = "{\"username\": \"" + username + "\", \"password\": \"" + password + "\", \"type\": \"" + type + "\"}";
        URL obj = new URL(url);
        con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setDoOutput(true);

        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(jsonInputString);
        wr.flush();
        wr.close();
        int responseCode = con.getResponseCode();
        System.out.println("Response code: " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        String responseBody = response.toString();
        authResponse = new Gson().fromJson(responseBody, AuthResponse.class);
        if (authResponse.auth_token == null) {
            System.out.println("Error: Incorrect username and/or password supplied");
            System.exit(1);
        } else {
            System.out.println("auth_token is " + authResponse.auth_token);
        }
        System.out.println("Response body: " + response.toString());
        return responseCode;
    }

    public static void createProject() throws IOException {
        String url = "https://api.taiga.io/api/v1/projects";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Bearer " + authResponse.auth_token);

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter project title: ");
        String projTitle = scanner.nextLine();
        System.out.println("Enter project description: ");
        String projDesc = scanner.nextLine();
//        String jsonInputString = "{\"description\": \"" + projDesc + "\", \"name\": \"" + projTitle + "\"}";
        String jsonInputString = "{\"creation_template\": 1, \"description\": \""
                + projDesc + "\", \"is_backlog_activated\": false, \"is_issues_activated\": true, \"is_kanban_activated\": true," +
                " \"is_private\": false, \"is_wiki_activated\": true, \"name\": \""
                + projTitle + "\", \"total_milestones\": 3, \"total_story_points\": 20.0," +
                " \"videoconferences\": \"jitsi\", \"videoconferences_extra_data\": null}";
        con.setDoOutput(true);
        OutputStream os = con.getOutputStream();
        byte[] input = jsonInputString.getBytes("utf-8");
        os.write(input, 0, input.length);
        int responseCode = con.getResponseCode();
        System.out.println("Response code: " + responseCode);
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        System.out.println(response.toString());
    }

    public static void main(String[] args) throws IOException {
        System.out.println("Enter your username: ");
        Scanner scanner = new Scanner(System.in);
        String username = scanner.nextLine();
        System.out.println("Enter your password: ");
        String password = scanner.nextLine();
        connect(username, password);
        createProject();
    }
    private static class AuthResponse {
        String auth_token;
    }
}
