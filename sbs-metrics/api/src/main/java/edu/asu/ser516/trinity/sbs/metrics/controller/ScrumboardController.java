package edu.asu.ser516.trinity.sbs.metrics.controller;

import edu.asu.ser516.trinity.sbs.metrics.model.ScrumboardData;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class defines the API for managing sbs-metrics data.
 */
@RestController
@RequestMapping("/scrumboard/v1")
public class ScrumboardController {
    /**
     * This method is used to GET metrics associated with the simulation run.
     *
     * @return  metrics for each day of the simulation as a list
     */
    @GetMapping("/data")
    public List<ScrumboardData> getMetrics() {
        List<ScrumboardData> dataList = new ArrayList();

        ScrumboardData data1 = new ScrumboardData("2023-03-02", 5, 3, 2, 3, 0);
        dataList.add(data1);
        ScrumboardData data2 = new ScrumboardData("2023-03-05", 3, 1, 2, 2, 0);
        dataList.add(data2);
        ScrumboardData data3 = new ScrumboardData("2023-03-07", 4, 0, 1, 4, 0);
        dataList.add(data3);
        ScrumboardData data4 = new ScrumboardData("2023-03-09", 0, 2, 2, 1, 0);
        dataList.add(data4);
        ScrumboardData data5 = new ScrumboardData("2023-03-11", 0, 0, 0, 4, 0);
        dataList.add(data5);

        return dataList;
    }

    int numMembers = 5;
    int totalWorkingHours = 40;
    int totalStoryPoints = 20;
    int workCapacity = calculateWorkCapacity(numMembers, totalWorkingHours, totalStoryPoints);
        
    public int calculateWorkCapacity(int numMembers, int totalWorkingHours, int totalStoryPoints) {
        // Calculate work capacity of the team
        int workCapacity = (totalWorkingHours / numMembers) * totalStoryPoints;
        return workCapacity;
    }
}
