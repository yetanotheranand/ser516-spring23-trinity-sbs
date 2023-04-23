package edu.asu.ser516.trinity.sbs.driver.model;

import java.util.ArrayList;
import java.util.List;

public class SimulationData {
    private List<Sprint> sprints;
    private StrategyType strategy;
    private ModeType mode;

    public SimulationData(List<Sprint> sprints, StrategyType strategy,
                          ModeType mode) {
        this.sprints = sprints;
        this.strategy = strategy;
        this.mode = mode;
    }

    public SimulationData(List<Sprint> sprints) {
        this(sprints, StrategyType.PULL_SP, ModeType.AUTO);
    }

    public SimulationData() {
        this(new ArrayList<>());
    }

    public List<Sprint> getSprints() {
        return sprints;
    }

    public void addSprint(Sprint sprint) {
        this.sprints.add(sprint);
    }

    public void setSprints(List<Sprint> sprints) {
        this.sprints = sprints;
    }

    public StrategyType getStrategy() {
        return strategy;
    }

    public void setStrategy(StrategyType strategy) {
        this.strategy = strategy;
    }

    public ModeType getMode() {
        return mode;
    }

    public void setMode(ModeType mode) {
        this.mode = mode;
    }

    @Override
    public String toString() {
        return "SimulationData{"
                + "sprints=" + sprints
                + ", strategy=" + strategy
                + ", mode=" + mode
                + '}';
    }
}
