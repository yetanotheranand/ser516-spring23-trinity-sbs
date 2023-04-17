package edu.asu.ser516.trinity.sbs.metrics.model;

public class ScrumboardData {
    private String date;
    private int New;
    private int InProgress;

    private int ReadyForTest;

    private int Closed;

    private int Blocked;

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getNew() {
        return New;
    }

    public void setNew(int New) {
        this.New = New;
    }

    public int getInProgress() {
        return InProgress;
    }

    public void setInProgress(int inProgress) {
        InProgress = inProgress;
    }

    public int getReadyForTest() {
        return ReadyForTest;
    }

    public void setReadyForTest(int readyForTest) {
        ReadyForTest = readyForTest;
    }

    public int getClosed() {
        return Closed;
    }

    public void setClosed(int closed) {
        Closed = closed;
    }

    public int getBlocked() {
        return Blocked;
    }

    public void setBlocked(int blocked) {
        Blocked = blocked;
    }

}
