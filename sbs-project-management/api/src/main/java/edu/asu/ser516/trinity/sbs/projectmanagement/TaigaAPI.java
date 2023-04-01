package edu.asu.ser516.trinity.sbs.projectmanagement;
import com.google.gson.Gson;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Scanner;
//import com.google.gson.Gson;

public class TaigaAPI {

    static String authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgwMzgxMDA3LCJqdGkiOiJiNTExNDk2MTdkNDA0MmY3OTNlNDE2Y2Q4ZDEyN2ZkMiIsInVzZXJfaWQiOjU1OTY1NX0.jfbx_iWWV5q5cx5e1E3MWZbuPsxJpaUvc3gM6utBp-Q";
    public TaigaAPI() {
    }

    public static void createProject(String projTitle, String projDesc) throws IOException {
        String url = "https://api.taiga.io/api/v1/projects";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");
        con.setRequestProperty("Authorization", "Bearer " + authToken);

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
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter project title: ");
        String projTitle = scanner.nextLine();
        System.out.println("Enter project description: ");
        String projDesc = scanner.nextLine();
        createProject(projTitle, projDesc);
    }
}
