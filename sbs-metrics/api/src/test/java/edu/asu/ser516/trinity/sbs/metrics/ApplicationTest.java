package edu.asu.ser516.trinity.sbs.metrics;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureMockMvc
class ApplicationTest {

    private Application application;

    @BeforeEach
    void setUp() {
        this.application = new Application();
    }
}
