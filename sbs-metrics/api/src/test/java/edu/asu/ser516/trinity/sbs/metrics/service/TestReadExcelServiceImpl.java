package edu.asu.ser516.trinity.sbs.metrics.service;

import edu.asu.ser516.trinity.sbs.metrics.model.TaskInfo;
import edu.asu.ser516.trinity.sbs.metrics.service.impl.ReadExcelServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@ExtendWith(MockitoExtension.class)
public class TestReadExcelServiceImpl {

    @InjectMocks
    private ReadExcelServiceImpl readExcelService;

    @Test
    public void readExcelData() throws Exception {

        List<TaskInfo> taskInfoList = readExcelService.readSampleExcelData();

        assertThat(taskInfoList).isNotNull();

    }
}
