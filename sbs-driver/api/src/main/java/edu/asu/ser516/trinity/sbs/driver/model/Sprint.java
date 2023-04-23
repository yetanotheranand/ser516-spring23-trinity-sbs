package edu.asu.ser516.trinity.sbs.driver.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Sprint {
    private int id;
    private String name;
    private LocalDateTime startAt;
    private LocalDateTime finishAt;
    private List<UserStory> userStories;
    private List<TeamMember> members;

    public Sprint(int id, String name, LocalDateTime startAt, LocalDateTime finishAt) {
        this.id = id;
        this.name = name;
        this.startAt = startAt;
        this.finishAt = finishAt;
        this.userStories = new ArrayList<>();
        this.members = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getStartAt() {
        return startAt;
    }

    public void setStartAt(LocalDateTime startAt) {
        this.startAt = startAt;
    }

    public LocalDateTime getFinishAt() {
        return finishAt;
    }

    public void setFinishAt(LocalDateTime finishAt) {
        this.finishAt = finishAt;
    }

    public List<UserStory> getUserStories() {
        return userStories;
    }

    public void addUserStory(UserStory userStory) {
        this.userStories.add(userStory);
    }

    public void setUserStories(List<UserStory> userStories) {
        this.userStories = userStories;
    }

    public List<TeamMember> getMembers() {
        return members;
    }

    public void addMember(TeamMember member) {
        this.members.add(member);
    }

    public void setMembers(List<TeamMember> members) {
        this.members = members;
    }

    public int getCapacity() {
        return this.members.stream().map(member -> member.getCapacity()).reduce(0, Integer::sum);
    }

    public int getTeamMembersCount() {
        return this.members.size();
    }

    @Override
    public String toString() {
        return "Sprint{"
                + "id=" + id
                + ", name='" + name + '\''
                + ", startAt=" + startAt
                + ", finishAt=" + finishAt
                + ", userStories=" + userStories
                + ", teamMembers=" + members
                + '}';
    }
}
