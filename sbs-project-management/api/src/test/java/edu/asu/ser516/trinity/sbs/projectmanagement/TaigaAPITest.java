package edu.asu.ser516.trinity.sbs.projectmanagement;

import org.eclipse.jetty.server.Server;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedConstruction;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TaigaAPITest {
    private TaigaAPI taigaAPI;
    @BeforeEach
    void setUp() {
        this.taigaAPI = new TaigaAPI();
    }

    @Test
    void connectionTest() throws Exception {
        int responseCode = taigaAPI.connect("ser516proj2","ser516proj2gmail");
        assertEquals(responseCode, 200);
    }

}
