package edu.asu.ser516.trinity.sbs.metrics.service;

import edu.asu.ser516.trinity.sbs.metrics.model.TaskInfo;
import java.util.List;

public interface ReadExcelService {

    List<TaskInfo> readSampleExcelData();
}
