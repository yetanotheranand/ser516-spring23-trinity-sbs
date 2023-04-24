package edu.asu.ser516.trinity.sbs.metrics.controller;


import edu.asu.ser516.trinity.sbs.metrics.service.ReadExcelService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

/**
 * ReadExcelController testing.
 */

@WebMvcTest(controllers = ReadExcelController.class)
public class TestReadExcelController {


    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReadExcelService readExcelService;

    /**
     * readExcelData should be called successful.
     */

    @Test
    public void readExcelData() throws Exception {

        this.mockMvc.perform(MockMvcRequestBuilders.get("/readExcel/getSampleData"))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }
}
