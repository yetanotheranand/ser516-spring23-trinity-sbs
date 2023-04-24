package edu.asu.ser516.trinity.sbs.metrics.modal;

import edu.asu.ser516.trinity.sbs.metrics.model.ScrumboardData;
import edu.asu.ser516.trinity.sbs.metrics.model.TaskInfo;
import org.junit.jupiter.api.Test;
import org.springframework.util.Assert;

public class TestTaskInfo {

    @Test
    public void testNullTaskInfo()  {
        TaskInfo taskInfo = new TaskInfo();
        taskInfo.setToDo("task 1");
        Assert.notNull(taskInfo, "taskInfo is not null");

    }
}
