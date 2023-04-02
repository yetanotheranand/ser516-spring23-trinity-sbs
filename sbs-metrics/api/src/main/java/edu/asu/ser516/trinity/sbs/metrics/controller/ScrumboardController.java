package edu.asu.ser516.trinity.sbs.metrics.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.asu.ser516.trinity.sbs.metrics.model.ScrumboardData;



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


		return dataList;
	}
}
