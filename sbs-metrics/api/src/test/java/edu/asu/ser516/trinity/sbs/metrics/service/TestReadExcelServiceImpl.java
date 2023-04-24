package edu.asu.ser516.trinity.sbs.metrics.service;

import edu.asu.ser516.trinity.sbs.metrics.model.TaskInfo;
import edu.asu.ser516.trinity.sbs.metrics.service.impl.ReadExcelServiceImpl;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;


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

        assertThat(taskInfoList).isNotNull();

    }
}
