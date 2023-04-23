package edu.asu.ser516.trinity.sbs.metrics.model;


/**
 * This is a model for representing metrics data.
 */

public class MetricsData {
    private int storyPoints;
    private int storiesCompleted;

    private int businessValue;

    private int focusFactor;
    private int wip;
    private int storiesTargeted;
    private int workCapacity;
    private int workVelocity;

    /**
     * metrics data constructor.
     *
     * @param storyPoints storyPoints
     * @param storiesCompleted storiesCompleted
     * @param businessValue businessValue
     * @param wip wip
     * @param storiesTargeted storiesTargeted
     * @param workCapacity workCapacity
     * @param workVelocity workVelocity
     */
    public MetricsData(int storyPoints, int storiesCompleted, int businessValue, int wip,
                       int storiesTargeted, int workCapacity, int workVelocity) {
        this.storyPoints = storyPoints;
        this.storiesCompleted = storiesCompleted;
        this.businessValue = businessValue;
        this.wip = wip;
        this.storiesTargeted = storiesTargeted;
        this.workCapacity = workCapacity;
        this.workVelocity = workVelocity;
    }

    public int getStoryPoints() {
        return storyPoints;
    }

    public void setStoryPoints(int storyPoints) {
        this.storyPoints = storyPoints;
    }

    public int getStoriesCompleted() {
        return storiesCompleted;
    }

    public void setStoriesCompleted(int storiesCompleted) {
        this.storiesCompleted = storiesCompleted;
    }

    public int getBusinessValue() {
        return businessValue;
    }

    public void setBusinessValue(int businessValue) {
        this.businessValue = businessValue;
    }

    public int getFocusFactor() {
        return focusFactor;
    }

    public void setFocusFactor(int focusFactor) {
        this.focusFactor = focusFactor;
    }

    public int getWip() {
        return wip;
    }

    public void setWip(int wip) {
        this.wip = wip;
    }

    public int getStoriesTargeted() {
        return storiesTargeted;
    }

    public void setStoriesTargeted(int storiesTargeted) {
        this.storiesTargeted = storiesTargeted;
    }

    public int getWorkCapacity() {
        return workCapacity;
    }

    public void setWorkCapacity(int workCapacity) {
        this.workCapacity = workCapacity;
    }

    public int getWorkVelocity() {
        return workVelocity;
    }

    public void setWorkVelocity(int workVelocity) {
        this.workVelocity = workVelocity;
    }
}
