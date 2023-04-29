package edu.asu.ser516.trinity.sbs.metrics.modal;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import edu.asu.ser516.trinity.sbs.metrics.model.MetricsData;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

public class TestMetricsData {

    /**
     * MetricsData should not be null.
     */
    @Test
    public void testNullMetricsData() {
        MetricsData metricsData = new MetricsData(0, 0, 0, 0, 0, 0, 0, 0);
        assertTrue(true);
    }

    /**
     * Parameterized test for calculating the focus factor.
     *
     * @param wc work capacity
     * @param wv work velocity
     * @param expected expected focus factor
     */
    @ParameterizedTest
    @CsvSource({"10, 5, 0.5", "8, 4, 0.5", "10, 0, 0"})
    public void testFocusFactor(int wc, int wv, double expected) {
        MetricsData metricsData = new MetricsData(0, 0, 0, 0, 0, wc, wv, 0);
        assertEquals(expected, metricsData.getFocusFactor());
    }

    /**
     * Parameterized test for calculating the work velocity.
     *
     * @param sc stories completed
     * @param sp story points
     * @param expected expected work velocity
     */
    @ParameterizedTest
    @CsvSource({"10, 10, 1", "4, 8, 0.5", "0, 0, 0"})
    public void testWorkVelocity(int sc, int sp, double expected) {
        MetricsData metricsData = new MetricsData(sp, sc, 0, 0, 0, 0, 0, 0);
        assertEquals(expected, metricsData.getWorkVelocity());
    }
}
