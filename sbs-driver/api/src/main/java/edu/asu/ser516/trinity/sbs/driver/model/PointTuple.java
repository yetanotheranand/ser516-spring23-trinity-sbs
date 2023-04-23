package edu.asu.ser516.trinity.sbs.driver.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public class PointTuple {
    private final int total;
    private int remaining;
    private int done;

    @JsonCreator
    public PointTuple(int total) {
        this.total = total;
        this.remaining = total;
        this.done = 0;
    }

    public int getTotal() {
        return total;
    }

    public int getRemaining() {
        return remaining;
    }

    public void setRemaining(int remaining) {
        this.remaining = remaining;
    }

    public int getDone() {
        return done;
    }

    public void setDone(int done) {
        this.done = done;
    }

    public void apply(int points) {
        if (points > this.remaining) {
            throw new IllegalArgumentException("Cannot apply more points than remaining points.");
        }
        this.done += points;
        this.remaining -= points;
    }
}
