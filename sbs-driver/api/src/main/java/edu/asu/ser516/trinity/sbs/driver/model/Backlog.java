package edu.asu.ser516.trinity.sbs.driver.model;

import java.util.List;

public class Backlog {
    List<UserStory> userStories;

    public List<UserStory> getUserStories() {
        return userStories;
    }

    public void setUserStories(List<UserStory> userStories) {
        this.userStories = userStories;
    }
}
