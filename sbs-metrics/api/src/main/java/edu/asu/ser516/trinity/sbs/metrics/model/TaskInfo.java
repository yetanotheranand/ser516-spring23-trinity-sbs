package edu.asu.ser516.trinity.sbs.metrics.model;

import lombok.Data;

@Data
public class TaskInfo {

    public String toDo;
    public String inProgress;
    public String review;
    public String blocked;
    public String needsInfo;
    public String done;

}
