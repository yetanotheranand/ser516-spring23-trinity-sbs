package edu.asu.ser516.trinity.sbs.metrics.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * This is a model for representing metrics for a single day.
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScrumboardData {
    private String date;
    private int todo;
    private int inProgress;

    private int readyForTest;

    private int closed;

    private int blocked;

}
