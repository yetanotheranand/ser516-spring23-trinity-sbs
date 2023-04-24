package edu.asu.ser516.trinity.sbs.driver;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.asu.ser516.trinity.sbs.driver.model.ModeType;
import edu.asu.ser516.trinity.sbs.driver.model.SimulationData;
import edu.asu.ser516.trinity.sbs.driver.model.Sprint;
import edu.asu.ser516.trinity.sbs.driver.model.StrategyType;
import edu.asu.ser516.trinity.sbs.driver.model.UserStory;
import edu.asu.ser516.trinity.sbs.driver.strategy.SimulationStrategy;
import edu.asu.ser516.trinity.sbs.driver.strategy.SimulationStrategyFactory;
import jakarta.annotation.PostConstruct;
import java.time.temporal.ChronoUnit;
import java.util.AbstractMap.SimpleEntry;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

/**
 * This class serves as the main controller for the application, handling HTTP
 * requests and responses. It contains methods annotated with various HTTP verbs
 * (e.g., @GetMapping, @PostMapping) that map to specific request URLs.
 */
@RestController
@RequestMapping("/api/v1/simulate")
public class Controller {

    private static final Logger LOGGER = LoggerFactory.getLogger(Controller.class);
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @Autowired
    SimulationStrategyFactory strategyFactory;

    @Autowired
    SimpleCache<String, SimulationData> cache;

    @Autowired
    ObjectMapper objectMapper;

    /**
     * Initializes the controller by adding a shutdown hook to gracefully
     * shutdown the ExecutorService when the application is stopped
     */
    @PostConstruct
    public void init() {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            cache.clear();
            executor.shutdown();
            try {
                executor.awaitTermination(1, TimeUnit.SECONDS);
            } catch (InterruptedException e) {
                LOGGER.error(e.getMessage());
            }
        }));
    }

    @PostMapping(value = "/", consumes = "application/json", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public String create(@RequestBody SimulationData data) {
        String uniqueId = UUID.randomUUID().toString();
        cache.put(uniqueId, data);
        return uniqueId;
    }

    @GetMapping(value = "/{id}")
    public SimulationData get(@PathVariable String id) {
        SimulationData data = cache.getIfPresent(id);
        if (data == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Scrumboard data expired");
        }
        return data;
    }

    /**
     * Handles HTTP GET requests to simulate a scrum setup
     *
     * @return the name of the view to display the simulation results
     */
    @GetMapping("/{id}/stream")
    public SseEmitter stream(
            @PathVariable(required = true) String id,
            @RequestParam(defaultValue = "AUTO") ModeType mode,
            @RequestParam(defaultValue = "PULL_BV") StrategyType strategy) {

        SimulationData data = cache.getIfPresent(id);
        if (data == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Scrumboard data expired");
        }

        data.setMode(mode);
        data.setStrategy(strategy);
        Comparator<UserStory> usComparator = UserStory.getComparatorByStrategyType(
                data.getStrategy());
        data.getSprints().forEach(sprint -> {
            List<UserStory> userStories = sprint.getUserStories();
            userStories.sort(usComparator);
            sprint.setUserStories(userStories);
        });

        SseEmitter sseEmitter = new SseEmitter(5 * 60 * 1000L);
        sseEmitter.onCompletion(() -> LOGGER.info("SseEmitter is completed"));
        sseEmitter.onTimeout(() -> LOGGER.warn("SseEmitter is timed out"));
        sseEmitter.onError((ex) -> LOGGER.error("SseEmitter got error:", ex.getMessage()));

        SimulationStrategy simulationStrategy = strategyFactory.getSimulationStrategy(
                data.getStrategy());

        executor.execute(() -> {
            for (Sprint sprint : data.getSprints()) {
                int days = (int) sprint.getStartAt().until(sprint.getFinishAt(), ChronoUnit.DAYS);
                int capacity = sprint.getCapacity();
                for (int day = 1; day <= days; day++) {
                    try {
                        simulationStrategy.simulateDay(sprint, day);
                        sseEmitter.send(Map.ofEntries(
                                new SimpleEntry<String, Integer>("sprint", sprint.getId()),
                                new SimpleEntry<String, Integer>("day", day),
                                new SimpleEntry<String, SimulationData>("data", data)
                        ));
                        sleep(1, sseEmitter);
                    } catch (Exception e) {
                        LOGGER.error(e.getMessage());
                        sseEmitter.completeWithError(e);
                    }

                }
            }
            sseEmitter.complete();
        });
        return sseEmitter;
    }

    @PutMapping(value = "/{id}")
    public String update(@PathVariable String id, @RequestBody SimulationData data) {
        if (cache.getIfPresent(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Scrumboard simulation "
                    + "data has expired");
        }
        cache.put(id, data);
        return id;
    }

    @PatchMapping(value = "/{id}")
    public void reset(@PathVariable String id) {
        SimulationData data = cache.getIfPresent(id);
        if (data == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Scrumboard data expired");
        }
        data.getSprints().forEach(Sprint::reset);
        cache.put(id, data);
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable String id) {
        cache.remove(id);
    }

    private void sleep(int seconds, SseEmitter sseEmitter) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            LOGGER.error(e.getMessage());
            sseEmitter.completeWithError(e);
        }
    }
}
