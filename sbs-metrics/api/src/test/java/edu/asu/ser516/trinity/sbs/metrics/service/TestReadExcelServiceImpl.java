package edu.asu.ser516.trinity.sbs.metrics.service;

import edu.asu.ser516.trinity.sbs.metrics.model.TaskInfo;
import edu.asu.ser516.trinity.sbs.metrics.service.impl.ReadExcelServiceImpl;
import java.util.List;
import org.assertj.core.api.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;


/**
 * ReadExcelServiceImpl testing.
 */

@ExtendWith(MockitoExtension.class)
public class TestReadExcelServiceImpl {

    @InjectMocks
    private ReadExcelServiceImpl readExcelService;


    /**
     * readExcelData testing.
     */
    @Test
    public void readExcelData() throws Exception {

        List<TaskInfo> taskInfoList = readExcelService.readSampleExcelData();

        Assertions.assertThat(taskInfoList).isNotNull();

    }
}
