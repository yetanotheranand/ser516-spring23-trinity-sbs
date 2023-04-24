package edu.asu.ser516.trinity.sbs.driver.strategy;

import edu.asu.ser516.trinity.sbs.driver.model.Sprint;

public interface SimulationStrategy {
    void simulateDay(Sprint data, int day);
}
