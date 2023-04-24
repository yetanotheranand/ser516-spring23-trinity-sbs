package edu.asu.ser516.trinity.sbs.driver.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;

public class Task extends Entity {

    private int userStoryRef;

    @JsonCreator
    public Task(@JsonProperty(required = true) int id,
                @JsonProperty(required = true) String title,
                @JsonProperty(required = true) String description,
                @JsonProperty(required = true) LocalDateTime createdAt,
                String assignedTo,
                @JsonProperty(required = true) int priority,
                @JsonProperty(required = true) int userStoryRef) {
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
