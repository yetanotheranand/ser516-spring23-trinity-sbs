package edu.asu.ser516.trinity.sbs.metrics.controller;

import edu.asu.ser516.trinity.sbs.metrics.model.ScrumboardData;
import java.util.ArrayList;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/scrumboard/v1")
public class ScrumboardController {
    @GetMapping("/data")
    public List<ScrumboardData> getAllUsers() {
        List<ScrumboardData> dataList = new ArrayList();

        ScrumboardData data1 = new ScrumboardData();
        data1.setDate("2023-03-02");
        data1.setNew(5);
        data1.setInProgress(3);
        data1.setReadyForTest(2);
        data1.setClosed(3);
        data1.setBlocked(0);
        dataList.add(data1);

        ScrumboardData data2 = new ScrumboardData();
        data2.setDate("2023-03-05");
        data2.setNew(3);
        data2.setInProgress(1);
        data2.setReadyForTest(2);
        data2.setClosed(2);
        data2.setBlocked(0);
        dataList.add(data2);

        ScrumboardData data3 = new ScrumboardData();
        data3.setDate("2023-03-07");
        data3.setNew(4);
        data3.setInProgress(0);
        data3.setReadyForTest(1);
        data3.setClosed(4);
        data3.setBlocked(0);
        dataList.add(data3);

        ScrumboardData data4 = new ScrumboardData();
        data4.setDate("2023-03-09");
        data4.setNew(0);
        data4.setInProgress(2);
        data4.setReadyForTest(2);
        data4.setClosed(1);
        data4.setBlocked(0);
        dataList.add(data4);

        ScrumboardData data5 = new ScrumboardData();
        data5.setDate("2023-03-11");
        data5.setNew(0);
        data5.setInProgress(0);
        data5.setReadyForTest(0);
        data5.setClosed(4);
        data5.setBlocked(0);
        dataList.add(data5);

        return dataList;
    }
}
