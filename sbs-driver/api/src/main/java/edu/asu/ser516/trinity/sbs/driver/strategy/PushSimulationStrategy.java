package edu.asu.ser516.trinity.sbs.driver.strategy;

import edu.asu.ser516.trinity.sbs.driver.model.Sprint;
import edu.asu.ser516.trinity.sbs.driver.model.Status;
import edu.asu.ser516.trinity.sbs.driver.model.TeamMember;
import edu.asu.ser516.trinity.sbs.driver.model.UserStory;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.springframework.stereotype.Service;

@Service("push")
public class PushSimulationStrategy implements SimulationStrategy {
    @Override
    public void simulateDay(Sprint data, int day) {
        for (TeamMember member : data.getMembers()) {
            int memberCapacity = member.getCapacity();
            while (memberCapacity > 0) {
                Optional<UserStory> userStory = this.getStory(member.getName(),
                        data.getUserStories());
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

    private Optional<UserStory> getStory(String name, List<UserStory> userStories) {
        Optional<UserStory> userStory = userStories.stream()
                .filter(us -> us.getStatus() == Status.TODO && Objects.isNull(us.getAssignedTo()))
                .findFirst();
        if (userStory.isEmpty()) {
            userStory = userStories.stream()
                    .filter(us -> us.getStatus() == Status.INPROGRESS && name.equals(
                            us.getAssignedTo()))
                    .findFirst();
            if (userStory.isEmpty()) {
                userStory = userStories.stream()
                        .filter(us -> us.getStatus() == Status.INPROGRESS)
                        .findFirst();
            }
        }
        return userStory;
    }
}
