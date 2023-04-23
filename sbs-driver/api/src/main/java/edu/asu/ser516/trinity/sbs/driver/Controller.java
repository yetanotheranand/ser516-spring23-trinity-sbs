package edu.asu.ser516.trinity.sbs.driver;

import edu.asu.ser516.trinity.sbs.driver.model.ModeType;
import edu.asu.ser516.trinity.sbs.driver.model.SimulationData;
import edu.asu.ser516.trinity.sbs.driver.model.Sprint;
import edu.asu.ser516.trinity.sbs.driver.model.StrategyType;
import edu.asu.ser516.trinity.sbs.driver.model.Task;
import edu.asu.ser516.trinity.sbs.driver.model.TeamMember;
import edu.asu.ser516.trinity.sbs.driver.model.UserStory;
import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
public class Controller {

    private static final Logger LOGGER = LoggerFactory.getLogger(Controller.class);
    private final ExecutorService executor = Executors.newSingleThreadExecutor();

    @Autowired
    SimulationService simulationService;

    /**
     * Method to ...
     */
    @PostConstruct
    public void init() {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            executor.shutdown();
            try {
                executor.awaitTermination(1, TimeUnit.SECONDS);
            } catch (InterruptedException e) {
                LOGGER.error(e.getMessage());
            }
        }));
    }

    /**
     * @return
     */
    @GetMapping("/simulate")
    public SseEmitter streamScrumSimulation(
            @RequestParam(defaultValue = "AUTO") ModeType mode,
            @RequestParam(defaultValue = "PULL_BV") StrategyType strategy) {
        Task task = new Task(1, "TG-1", "Task 1", LocalDateTime.now(), "AG", 1, 1);
        UserStory us1 = new UserStory(1, "US-1", "Desc 1", LocalDateTime.now(), "AG", 1, 5,
                2, 1);
        us1.addTask(task);
        UserStory us2 = new UserStory(2, "US-2", "Desc 2", LocalDateTime.now(), "AG", 1, 13,
                4, 1);
        us2.addTask(task);
        UserStory us3 = new UserStory(3, "US-3", "Desc 3", LocalDateTime.now(), "AG", 1, 8,
                3, 1);
        us3.addTask(task);
        UserStory us4 = new UserStory(4, "US-4", "Desc 4", LocalDateTime.now(), "AG", 1, 21,
                8, 1);
        us4.addTask(task);

        Sprint sprint1 = new Sprint(1, "Sprint 1", LocalDateTime.now(),
                LocalDateTime.now().plusDays(7));
        List<TeamMember> membersSprint1 = new ArrayList<>();
        membersSprint1.add(new TeamMember(1, "A", 4));
        membersSprint1.add(new TeamMember(2, "B", 8));
        sprint1.setMembers(membersSprint1);
        Sprint sprint2 = new Sprint(2, "Sprint 2", LocalDateTime.now().plusDays(8),
                LocalDateTime.now().plusDays(15));
        sprint1.addUserStory(us1);
        sprint1.addUserStory(us2);
        sprint2.addUserStory(us3);
        sprint2.addUserStory(us4);
        List<TeamMember> membersSprint2 = new ArrayList<>();
        membersSprint2.add(new TeamMember(1, "A", 8));
        sprint2.setMembers(membersSprint2);
        SimulationData data = new SimulationData();
        data.addSprint(sprint1);
        data.addSprint(sprint2);

        data.setMode(mode);
        data.setStrategy(strategy);

        Comparator<UserStory> usComparator = UserStory.getComparatorByStrategyType(data.getStrategy());
        data.getSprints().forEach(sprint -> {
            List<UserStory> userStories = sprint.getUserStories();
            userStories.sort(usComparator);
            sprint.setUserStories(userStories);
        });

        SseEmitter sseEmitter = new SseEmitter(5 * 60 * 1000L);
        sseEmitter.onCompletion(() -> LOGGER.info("SseEmitter is completed"));
        sseEmitter.onTimeout(() -> LOGGER.warn("SseEmitter is timed out"));
        sseEmitter.onError((ex) -> LOGGER.error("SseEmitter got error:", ex.getMessage()));

        executor.execute(() -> {
            for (Sprint sprint : data.getSprints()) {
                int days = (int) sprint.getStartAt().until(sprint.getFinishAt(), ChronoUnit.DAYS);
                int capacity = sprint.getCapacity();
                for (int day = 1; day <= days; day++) {
                    try {
                        simulationService.doSimulateSprint(sprint, capacity, day);
                        sseEmitter.send("Sprint: " + sprint.getId() + " Day: " + day + "\n" + data);
                        sleep(5, sseEmitter);
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

    private void sleep(int seconds, SseEmitter sseEmitter) {
        try {
            Thread.sleep(seconds * 1000L);
        } catch (InterruptedException e) {
            LOGGER.error(e.getMessage());
            sseEmitter.completeWithError(e);
        }
    }
}
