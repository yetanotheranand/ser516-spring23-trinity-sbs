package edu.asu.ser516.trinity.sbs.metrics.model;

import lombok.Data;

/**
 * This is a model for representing tasks info for excel data.
 */
@Data
public class TaskInfo {

    public String toDo;
    public String inProgress;
    public String review;
    public String blocked;
    public String needsInfo;
    public String done;

}
