package edu.asu.ser516.trinity.sbs.metrics.service.impl;

import edu.asu.ser516.trinity.sbs.metrics.model.TaskInfo;
import edu.asu.ser516.trinity.sbs.metrics.service.ReadExcelService;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ReadExcelServiceImpl implements ReadExcelService {
    @Override
    public List<TaskInfo> readSampleExcelData() {

        List<TaskInfo> resp = new ArrayList<>();

        try {
            String fileLocation = "/Users/bablu/Downloads/CFD_Diagram_sample.xlsx";
            FileInputStream file = new FileInputStream(new File(fileLocation));
            XSSFWorkbook workbook = new XSSFWorkbook(file);
            XSSFSheet sheet = workbook.getSheetAt(0);

            DataFormatter dataFormatter = new DataFormatter();

            for(int i=1;i<sheet.getPhysicalNumberOfRows() ;i++) {
                TaskInfo taskInfo = new TaskInfo();

                XSSFRow row = sheet.getRow(i);

                if(row != null) {
                    System.out.println("Row= "+row);
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

