package edu.asu.ser516.trinity.sbs.metrics.service.impl;

import edu.asu.ser516.trinity.sbs.metrics.model.TaskInfo;
import edu.asu.ser516.trinity.sbs.metrics.service.ReadExcelService;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

/**
 * Service Implementation of reading excel data.
 */
@Service
public class ReadExcelServiceImpl implements ReadExcelService {
    @Override
    public List<TaskInfo> readSampleExcelData() {

        List<TaskInfo> resp = new ArrayList<>();

        try {
            ClassLoader classloader = Thread.currentThread().getContextClassLoader();
            InputStream is = classloader.getResourceAsStream("CFD_Diagram_sample.xlsx");
            XSSFWorkbook workbook = new XSSFWorkbook(is);
            XSSFSheet sheet = workbook.getSheetAt(0);

            DataFormatter dataFormatter = new DataFormatter();

            for (int i = 1; i < sheet.getPhysicalNumberOfRows(); i++) {
                TaskInfo taskInfo = new TaskInfo();

                XSSFRow row = sheet.getRow(i);

                if (row != null) {
                    taskInfo.setToDo(dataFormatter.formatCellValue(row.getCell(0)));
                    taskInfo.setInProgress(dataFormatter.formatCellValue(row.getCell(1)));
                    taskInfo.setReview(dataFormatter.formatCellValue(row.getCell(2)));
                    taskInfo.setBlocked(dataFormatter.formatCellValue(row.getCell(3)));
                    taskInfo.setNeedsInfo(dataFormatter.formatCellValue(row.getCell(4)));
                    taskInfo.setDone(dataFormatter.formatCellValue(row.getCell(5)));
                    resp.add(taskInfo);
                }
            }

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return resp;

    }

}

