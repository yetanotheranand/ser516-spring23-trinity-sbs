package edu.asu.ser516.trinity.sbs.driver.strategy;

import edu.asu.ser516.trinity.sbs.driver.model.StrategyType;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class SimulationStrategyFactory {

    private final Map<String, SimulationStrategy> simulationStrategyMap;

    public SimulationStrategyFactory(Map<String, SimulationStrategy> simulationStrategyMap) {
        this.simulationStrategyMap = simulationStrategyMap;
    }

    public SimulationStrategy getSimulationStrategy(StrategyType strategyType) {
        String type = switch (strategyType) {
            case PUSH -> "push";
            case PULL_BV, PULL_SP -> "pull";
            case DNC -> "dnc";
        };
        SimulationStrategy strategy = simulationStrategyMap.get(type);
        if (null == strategy) {
            throw new RuntimeException("Simulation strategy not supported");
        }
        return strategy;
    }
}
