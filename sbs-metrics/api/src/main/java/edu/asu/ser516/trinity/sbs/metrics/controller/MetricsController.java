package edu.asu.ser516.trinity.sbs.metrics.controller;
import edu.asu.ser516.trinity.sbs.metrics.model.MetricsData;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class defines the API for managing sbs-metrics.
 */
@RestController
@RequestMapping("/metrics")
public class MetricsController {

    @GetMapping("/data")
    public List<MetricsData> getMetrics() {
        List<MetricsData> dataList = new ArrayList();

        MetricsData data1 = new MetricsData(20, 5, 3, 2, 3, 11, 2,12);
        dataList.add(data1);

        return dataList;
    }


}
