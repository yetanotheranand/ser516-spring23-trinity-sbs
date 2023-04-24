package edu.asu.ser516.trinity.sbs.metrics.controller;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.*;
import org.springframework.test.web.servlet.result.*;


/**
 * ScrumboardController testing.
 */

@WebMvcTest(controllers = ScrumboardController.class)
public class TestScrumboardController {

    @Autowired
    private MockMvc mockMvc;


    /**
     * getMetrics should be called successful.
     */

    @Test
    public void getMetrics() throws Exception {

        this.mockMvc.perform(MockMvcRequestBuilders.get("/scrumboard/v1/data"))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }
}
