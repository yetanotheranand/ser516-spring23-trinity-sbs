package edu.asu.ser516.trinity.sbs.driver.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class TeamMember {
    private final int id;
    private final String name;
    private int capacity;

    @JsonCreator
    public TeamMember(@JsonProperty(required = true) int id,
                      @JsonProperty(required = true) String name,
                      @JsonProperty(required = true) int capacity) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    @Override
    public String toString() {
        return "TeamMember{"
                + "id=" + id
                + ", name='" + name + '\''
                + ", capacity=" + capacity
                + '}';
    }
}
