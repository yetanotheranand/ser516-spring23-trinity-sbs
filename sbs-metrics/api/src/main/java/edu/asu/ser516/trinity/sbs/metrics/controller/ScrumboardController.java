package edu.asu.ser516.trinity.sbs.metrics.controller;

import edu.asu.ser516.trinity.sbs.metrics.model.ScrumboardData;
;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class defines the API for managing sbs-metrics.
 */
@RestController
@RequestMapping("/scrumboard/v1")
public class ScrumboardController {

    @Autowired
    ScrumboardService scrumboardService;
    /**
     * This method is used to GET metrics associated with the simulation run.
     *
     * @return  metrics for each day of the simulation as a list
     */
    @GetMapping("/data")
    public List<ScrumboardData> getMetrics() {
        List<ScrumboardData> dataList = scrumboardService.getScrumboardDataList();
        return dataList;
    }
}
