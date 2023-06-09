package edu.asu.ser516.trinity.sbs.driver.strategy;

import edu.asu.ser516.trinity.sbs.driver.model.Sprint;
import edu.asu.ser516.trinity.sbs.driver.model.Status;
import edu.asu.ser516.trinity.sbs.driver.model.Task;
import edu.asu.ser516.trinity.sbs.driver.model.TeamMember;
import edu.asu.ser516.trinity.sbs.driver.model.UserStory;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service("pull")
public class PullSimulationStrategy implements SimulationStrategy {
    @Override
    public void simulateDay(Sprint data, int day) {
        for (TeamMember member : data.getMembers()) {
            int memberCapacity = member.getCapacity();
            while (memberCapacity > 0) {
                Optional<UserStory> userStory = this.getStory(data.getUserStories());
                if (userStory.isPresent()) {
                    userStory.get().setAssignedTo(member.getName());
                    memberCapacity = userStory.get()
                            .doWork(memberCapacity, data.getStartAt().plusDays(day));
                } else {
                    break;
                }
            }
        }
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
