package edu.asu.ser516.trinity.sbs.driver;

import edu.asu.ser516.trinity.sbs.driver.model.Sprint;
import edu.asu.ser516.trinity.sbs.driver.model.Status;
import edu.asu.ser516.trinity.sbs.driver.model.Task;
import edu.asu.ser516.trinity.sbs.driver.model.UserStory;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service
public class SimulationService {
    public Sprint doSimulateSprint(Sprint data, int dailyCapacity, int days) {
        while (dailyCapacity > 0) {
            Optional<UserStory> userStory = this.getStory(data.getUserStories());
            if (userStory.isPresent()) {
                dailyCapacity = userStory.get().doWork(dailyCapacity,
                        data.getStartAt().plusDays(days));
            } else {
                break;
            }
        }
        return data;
    }

    private Optional<UserStory> getStory(List<UserStory> userStories) {
        return userStories.stream().filter(us -> us.getStatus() != Status.DONE).findFirst();
    }

    private Task getTask(UserStory userStory) {
        return userStory.getTasks()
                .stream()
                .filter(task -> task.getStatus() != Status.DONE)
                .findFirst()
                .get();
    }
}
