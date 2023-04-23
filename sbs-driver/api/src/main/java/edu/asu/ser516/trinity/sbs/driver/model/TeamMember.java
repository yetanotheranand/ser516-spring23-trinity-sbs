package edu.asu.ser516.trinity.sbs.driver.model;

public class TeamMember {
    private int id;
    private String name;
    private int capacity;

    public TeamMember(int id, String name, int capacity) {
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
