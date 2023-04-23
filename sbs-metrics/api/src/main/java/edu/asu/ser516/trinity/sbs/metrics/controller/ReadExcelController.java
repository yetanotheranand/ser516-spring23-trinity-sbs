package edu.asu.ser516.trinity.sbs.metrics.controller;

import edu.asu.ser516.trinity.sbs.metrics.model.TaskInfo;
import edu.asu.ser516.trinity.sbs.metrics.service.ReadExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/readExcel")
public class ReadExcelController {

    @Autowired
    private ReadExcelService readExcelService;

    @GetMapping("/getSampleData")
    public List<TaskInfo> readExcelData() {

        return readExcelService.readSampleExcelData();

    }
}
