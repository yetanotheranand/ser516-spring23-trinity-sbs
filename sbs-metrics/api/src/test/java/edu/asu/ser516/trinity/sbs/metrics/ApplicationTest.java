package edu.asu.ser516.trinity.sbs.metrics;

import org.eclipse.jetty.server.Server;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedConstruction;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mockConstruction;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;

class ApplicationTest {

    private Application application;

    @BeforeEach
    void setUp() {
        this.application = new Application();
    }

    @Test
    void main() throws Exception {
        try (MockedConstruction<Server> serverMockedConstruction = mockConstruction(Server.class,
                (mock, context) -> {
                    assertEquals(8080, context.arguments().get(0));
                    doNothing().when(mock).start();
                    doNothing().when(mock).join();
                }
        )) {
            Application.main(new String[]{});
            Server mockedServer = serverMockedConstruction.constructed().get(0);

            verify(mockedServer).setHandler(any(Application.class));
            verify(mockedServer).start();
            verify(mockedServer).join();
            verifyNoMoreInteractions(mockedServer);
        }
    }
}
