package edu.asu.ser516.trinity.sbs.driver.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import java.time.LocalDateTime;

public class Task extends Entity {

    private int userStoryRef;

    @JsonCreator
    public Task(int id, String title, String description, LocalDateTime createdAt,
                String assignedTo, int priority, int userStoryRef) {
        super(id, title, description, createdAt, assignedTo, priority);
        this.userStoryRef = userStoryRef;
    }

    public int getUserStoryRef() {
        return userStoryRef;
    }

    public void setUserStoryRef(int userStoryRef) {
        this.userStoryRef = userStoryRef;
    }

    public void reset() {
        this.setStartedAt(null);
        this.setFinishedAt(null);
        this.setStatus(Status.TODO);
    }
}
