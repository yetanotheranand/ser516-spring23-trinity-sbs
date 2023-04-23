package edu.asu.ser516.trinity.sbs.metrics.controller;

import edu.asu.ser516.trinity.sbs.metrics.model.TaskInfo;
import edu.asu.ser516.trinity.sbs.metrics.service.ReadExcelService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * This class defines the API for retrieving excel data.
 */

@RestController
@RequestMapping("/readExcel")
public class ReadExcelController {
    /**
     * This method is used to retrieve excel data.
     *
     * @return  task info as list
     */

    @Autowired
    private ReadExcelService readExcelService;

    @GetMapping("/getSampleData")
    public List<TaskInfo> readExcelData() {

        return readExcelService.readSampleExcelData();

    }
}
