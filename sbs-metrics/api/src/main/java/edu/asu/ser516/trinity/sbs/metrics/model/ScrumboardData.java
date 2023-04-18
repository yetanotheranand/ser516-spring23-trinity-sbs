package edu.asu.ser516.trinity.sbs.metrics.model;

/**
 * This is a model for representing metrics for a single day.
 */
public class ScrumboardData {
    private String date;
    private int todo;
    private int inProgress;

    private int readyForTest;

    private int closed;

    private int blocked;

    /**
     * This is a constructor to initialize ScrumboardData.
     *
     * @param date date associated with the single day metrics
     * @param todo no of tasks in todo state
     * @param inProgress no of tasks in progress state
     * @param readyForTest no of tasks in ready for test state
     * @param closed no of tasks in closed state
     * @param blocked no of tasks in blocked state
     */
    public ScrumboardData(String date, int todo, int inProgress, int readyForTest, int closed,
                          int blocked) {
        this.date = date;
        this.todo = todo;
        this.inProgress = inProgress;
        this.readyForTest = readyForTest;
        this.closed = closed;
        this.blocked = blocked;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getTodo() {
        return todo;
    }

    public void setTodo(int todo) {
        this.todo = todo;
    }

    public int getInProgress() {
        return inProgress;
    }

    public void setInProgress(int inProgress) {
        this.inProgress = inProgress;
    }

    public int getReadyForTest() {
        return readyForTest;
    }

    public void setReadyForTest(int readyForTest) {
        this.readyForTest = readyForTest;
    }

    public int getClosed() {
        return closed;
    }

    public void setClosed(int closed) {
        this.closed = closed;
    }

    public int getBlocked() {
        return blocked;
    }

    public void setBlocked(int blocked) {
        this.blocked = blocked;
    }

}
