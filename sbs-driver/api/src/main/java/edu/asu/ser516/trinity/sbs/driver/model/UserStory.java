package edu.asu.ser516.trinity.sbs.driver.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class UserStory extends Entity {
    private PointTuple storyPoints;
    private int businessValue;
    private List<Task> tasks;
    private int sprintRef;

    public UserStory(int id, String title, String description, LocalDateTime createdAt,
                     String assignedTo, int priority, int storyPoints, int businessValue,
                     int sprintRef) {
        super(id, title, description, createdAt, assignedTo, priority);
        this.storyPoints = new PointTuple(storyPoints);
        this.businessValue = businessValue;
        this.tasks = new ArrayList<>();
        this.sprintRef = sprintRef;
    }

    public int getBusinessValue() {
        return businessValue;
    }

    public void setBusinessValue(int businessValue) {
        this.businessValue = businessValue;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public void addTask(Task task) {
        this.tasks.add(task);
    }

    public int getSprintRef() {
        return sprintRef;
    }

    public void setSprintRef(int sprintRef) {
        this.sprintRef = sprintRef;
    }

    public int doWork(int points, LocalDateTime day) {
        if (this.status == Status.TODO) {
            this.setStatus(Status.INPROGRESS);
            this.setStartedAt(day);
        }

        int leftover = 0;
        int pointsToApply;

        if (points >= this.getStoryPoints().getRemaining()) {
            pointsToApply = this.getStoryPoints().getRemaining();
            this.getStoryPoints().apply(pointsToApply);
            leftover = points - pointsToApply;
            this.setStatus(Status.DONE);
            this.setFinishedAt(day);
        } else {
            this.getStoryPoints().apply(points);
        }

        return leftover;
    }

    public PointTuple getStoryPoints() {
        return storyPoints;
    }

    public void setStoryPoints(PointTuple storyPoints) {
        this.storyPoints = storyPoints;
    }

    public static Comparator<UserStory> getBusinessValueComparator() {
        return Comparator.comparing(userStory -> userStory.getBusinessValue(),
                Comparator.reverseOrder());
    }

    public static Comparator<UserStory> getStoryPointsComparator() {
        return Comparator.comparing(userStory -> userStory.getStoryPoints().getTotal(),
                Comparator.reverseOrder());
    }

    @Override
    public String toString() {
        return "UserStory{"
                + "storyPoints=" + storyPoints.getDone() + "/" + storyPoints.getTotal()
                + ", bv=" + businessValue
                + ", id=" + id
                + ", title='" + title + '\''
                + ", status=" + status
                + ", createdAt=" + createdAt
                + ", startedAt=" + startedAt
                + ", finishedAt=" + finishedAt + '}';
    }
}
