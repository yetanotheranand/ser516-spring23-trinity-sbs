package edu.asu.ser516.trinity.sbs.metrics.model;

public class ScrumboardData {
    private String date;
    private int todo;
    private int inProgress;

    private int readyForTest;

    private int closed;

    private int blocked;

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
