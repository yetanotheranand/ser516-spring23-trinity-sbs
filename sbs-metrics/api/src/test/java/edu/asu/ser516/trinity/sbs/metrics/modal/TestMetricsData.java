package edu.asu.ser516.trinity.sbs.metrics.modal;

import edu.asu.ser516.trinity.sbs.metrics.model.MetricsData;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

/**
 * MetricsData testing case.
 */
public class TestMetricsData {

    /**
     * MetricsData should not be null.
     */
    @Test
    public void testNullMetricsData() {

        MetricsData metricsData = new MetricsData(1, 1, 1, 1, 1, 1, 1, 1);
        Assertions.assertThat(metricsData).isNotNull();
    }
}
