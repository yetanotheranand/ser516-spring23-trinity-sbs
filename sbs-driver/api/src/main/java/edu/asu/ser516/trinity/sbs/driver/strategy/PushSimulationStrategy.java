package edu.asu.ser516.trinity.sbs.driver.strategy;

import edu.asu.ser516.trinity.sbs.driver.model.Sprint;
import edu.asu.ser516.trinity.sbs.driver.model.Status;
import edu.asu.ser516.trinity.sbs.driver.model.StrategyType;
import edu.asu.ser516.trinity.sbs.driver.model.TeamMember;
import edu.asu.ser516.trinity.sbs.driver.model.UserStory;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service("push")
public class PushSimulationStrategy implements SimulationStrategy {
    @Override
    public void simulateDay(Sprint data, int day) {
        for (TeamMember member : data.getMembers()) {

        }
        int dailyCapacity = 0;
        while (dailyCapacity > 0) {
            Optional<UserStory> userStory = this.getStory(data.getUserStories());
            if (userStory.isPresent()) {
                dailyCapacity = userStory.get().doWork(dailyCapacity,
                        data.getStartAt().plusDays(day));
            } else {
                break;
            }
        }
    }

    private Optional<UserStory> getStory(List<UserStory> userStories) {
        return userStories.stream().filter(us -> us.getStatus() != Status.DONE).findFirst();
    }
}
