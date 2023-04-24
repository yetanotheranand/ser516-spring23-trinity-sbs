package edu.asu.ser516.trinity.sbs.driver.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;
import org.springframework.lang.NonNull;

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

    @JsonCreator
    public SimulationData(@JsonProperty(required = true) List<Sprint> sprints) {
        this(sprints, StrategyType.PULL_BV, ModeType.AUTO);
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
