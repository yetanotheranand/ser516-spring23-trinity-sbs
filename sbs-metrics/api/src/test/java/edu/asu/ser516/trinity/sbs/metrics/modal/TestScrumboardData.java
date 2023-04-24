package edu.asu.ser516.trinity.sbs.metrics.modal;

import edu.asu.ser516.trinity.sbs.metrics.model.ScrumboardData;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.util.Assert;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
public class TestScrumboardData {


    @Test
    public void testNullScrumboardData()  {
        ScrumboardData scrumboardData = new ScrumboardData();
        scrumboardData.setTodo(1);
        Assert.notNull(scrumboardData, "scrumboardData is not null");

    }
}
