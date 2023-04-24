package edu.asu.ser516.trinity.sbs.driver.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

/**
 * Represents a User Story entity which contains a title, description, story
 * points, business value, assigned tasks, and sprint reference. It can also
 * perform work and be compared based on business value.
 */
public class UserStory extends Entity {
    private PointTuple storyPoints;
    private int businessValue;
    private List<Task> tasks;
    private int sprintRef;

    /**
     * This constructor initializes a UserStory object with the provided parameters.
     *
     * @param id            the ID of the UserStory
     * @param title         the title of the UserStory
     * @param description   the description of the UserStory
     * @param createdAt     the date and time when the UserStory was created
     * @param assignedTo    the person assigned to complete the UserStory
     * @param priority      the priority level of the UserStory
     * @param storyPoints   the estimated story points for the UserStory
     * @param businessValue the business value of the UserStory
     * @param sprintRef     the reference ID of the sprint that the UserStory is assigned to
     */
    public UserStory(int id, String title, String description, LocalDateTime createdAt,
                     String assignedTo, int priority, int storyPoints, int businessValue,
                     int sprintRef) {
        super(id, title, description, createdAt, assignedTo, priority);
        this.storyPoints = new PointTuple(storyPoints);
        this.businessValue = businessValue;
        this.tasks = new ArrayList<>();
        this.sprintRef = sprintRef;
    }

    @JsonCreator
    public UserStory(@JsonProperty(required = true) int id,
                     @JsonProperty(required = true) String title,
                     @JsonProperty(required = true) String description,
                     @JsonProperty(required = true) LocalDateTime createdAt,
                     String assignedTo,
                     @JsonProperty(required = true) int priority,
                     @JsonProperty(required = true) int storyPoints,
                     @JsonProperty(required = true) int businessValue,
                     @JsonProperty(required = true) List<Task> tasks,
                     @JsonProperty(required = true) int sprintRef) {
        super(id, title, description, createdAt, assignedTo, priority);
        this.storyPoints = new PointTuple(storyPoints);
        this.businessValue = businessValue;
        this.tasks = tasks;
        this.sprintRef = sprintRef;
    }

    public static Comparator<UserStory> getComparatorByStrategyType(StrategyType strategyType) {
        switch (strategyType) {
            case PULL_BV -> {
                return Comparator.comparing(UserStory::getBusinessValue, Comparator.reverseOrder());
            }
            case PULL_SP -> {
                return Comparator.comparing(userStory -> userStory.getStoryPoints().getTotal());
            }
            default -> {
                return Comparator.comparing(UserStory::getPriority);
            }
        }
    }

    /**
     * Gets the business value of the UserStory.
     *
     * @return the business value of the UserStory
     */
    public int getBusinessValue() {
        return businessValue;
    }

    /**
     * Sets the business value of the UserStory.
     *
     * @param businessValue the new business value of the UserStory
     */
    public void setBusinessValue(int businessValue) {
        this.businessValue = businessValue;
    }

    /**
     * Gets the list of tasks assigned to the UserStory.
     *
     * @return the list of tasks assigned to the UserStory
     */
    public List<Task> getTasks() {
        return tasks;
    }

    /**
     * Sets the list of tasks assigned to the UserStory.
     *
     * @param tasks the new list of tasks assigned to the UserStory
     */
    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    /**
     * Adds a task to the list of tasks assigned to the UserStory.
     *
     * @param task the task to add
     */
    public void addTask(Task task) {
        this.tasks.add(task);
    }

    /**
     * Gets the reference ID of the sprint that the UserStory is assigned to.
     *
     * @return the reference ID of the sprint that the UserStory is assigned to
     */
    public int getSprintRef() {
        return sprintRef;
    }

    /**
     * Sets the reference ID of the sprint that the UserStory is assigned to.
     *
     * @param sprintRef the new reference ID of the sprint that the UserStory is assigned to
     */
    public void setSprintRef(int sprintRef) {
        this.sprintRef = sprintRef;
    }

    /**
     * Updates the status of the User Story to 'In Progress' and sets the start
     * date if the status was 'To Do'. Applies the specified number of points
     * to the User Story, updates the status to 'Done' and sets the finish
     * date if the remaining points are 0 or less.
     *
     * @param points the number of points to apply to the User Story
     * @param day    the date on which the work is being done
     * @return the number of leftover points, if any
     */
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

    public void reset() {
        this.setStartedAt(null);
        this.setFinishedAt(null);
        this.setStatus(Status.TODO);
        this.storyPoints = new PointTuple(this.getStoryPoints().getTotal());
        this.tasks.forEach(Task::reset);
    }

    @Override
    public String toString() {
        return "UserStory{" + "storyPoints=" + storyPoints.getDone() + "/" + storyPoints.getTotal() + ", bv=" + businessValue + ", id=" + id + ", title='" + title + '\'' + ", status=" + status + ", createdAt=" + createdAt + ", startedAt=" + startedAt + ", finishedAt=" + finishedAt + '}';
    }
}
