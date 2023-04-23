package edu.asu.ser516.trinity.sbs.metrics.model;

public class MetricsData {
    private int storyPoints;
    private int storiesCompleted;

    private int businessValue;

    private int focusFactor;
    private int wip;
    private int storiesTargeted;
    private int workCapacity;
    private int workVelocity;

    public MetricsData(int storyPoints, int storiesCompleted, int businessValue, int focusFactor, int wip, int storiesTargeted, int workCapacity, int workVelocity) {
        this.storyPoints = storyPoints;
        this.storiesCompleted = storiesCompleted;
        this.businessValue = businessValue;
        this.focusFactor = focusFactor;
        this.wip = wip;
        this.storiesTargeted = storiesTargeted;
        this.workCapacity = workCapacity;
        this.workVelocity = workVelocity;
    }




}
