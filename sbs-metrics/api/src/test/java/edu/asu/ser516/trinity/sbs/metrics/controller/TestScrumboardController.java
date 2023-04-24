package edu.asu.ser516.trinity.sbs.metrics.controller;

import edu.asu.ser516.trinity.sbs.metrics.service.ReadExcelService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ScrumboardController.class)
public class TestScrumboardController {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getMetrics() throws Exception {

        this.mockMvc.perform(get("/scrumboard/v1/data"))
                .andExpect(status().isOk());

    }
}
