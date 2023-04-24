package edu.asu.ser516.trinity.sbs.driver.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.time.LocalDateTime;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = UserStory.class, name = "us"),
        @JsonSubTypes.Type(value = Task.class, name = "task")
})
public abstract class Entity implements Comparable<Entity> {
    protected int id;
    protected String title;
    protected String description;
    protected Status status;
    protected LocalDateTime createdAt;
    protected LocalDateTime startedAt;
    protected LocalDateTime finishedAt;
    protected String assignedTo;
    protected int priority;

    public Entity(int id, String title, String description, LocalDateTime createdAt,
                  String assignedTo, int priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = Status.TODO;
        this.createdAt = createdAt;
        this.assignedTo = assignedTo;
        this.priority = priority;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }

    public LocalDateTime getFinishedAt() {
        return finishedAt;
    }

    public void setFinishedAt(LocalDateTime finishedAt) {
        this.finishedAt = finishedAt;
    }

    public String getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(String assignedTo) {
        this.assignedTo = assignedTo;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    @Override
    public int compareTo(Entity o) {
        return this.priority - o.getPriority();
    }
}
