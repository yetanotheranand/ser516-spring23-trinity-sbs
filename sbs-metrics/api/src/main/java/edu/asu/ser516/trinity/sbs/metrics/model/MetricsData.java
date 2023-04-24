package edu.asu.ser516.trinity.sbs.metrics.model;


/**
 * This is a model for representing metrics data.
 */

public class MetricsData {
    private int storyPoints;
    private int storiesCompleted;
    private int businessValue;
    private int wip;
    private int storiesTargeted;
    private int workCapacity;
    private int workVelocity;

    private int focusFactor;

    /**
     * This is a constructor to initialize MetricsData.
     *
     * @param sp storyPoints
     * @param wc workCapacity
     * @param wv workVelocity
     * @param sc storiesCompleted
     * @param bv businessValue
     * @param wip wip
     * @param st storiesTargeted
     * @param ff focusFactor
     */


    public MetricsData(int sp, int sc, int bv, int wip, int st, int wc, int wv, int ff) {
        this.storyPoints = sp;
        this.storiesCompleted = sc;
        this.businessValue = bv;
        this.wip = wip;
        this.storiesTargeted = st;
        this.workCapacity = wc;
        this.workVelocity = wv;
        ff = wv/wc;
        this.focusFactor = ff;
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
