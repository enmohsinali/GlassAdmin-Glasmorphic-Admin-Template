/**
 * Charts Module - ApexCharts & Chart.js Integration
 * Handles all chart configurations and initializations
 */

import ApexCharts from 'apexcharts';
import { Chart, registerables } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables);

/**
 * Default ApexCharts configuration for glassmorphic theme
 */
const apexDefaultConfig = {
  theme: {
    mode: 'dark',
    palette: 'palette1',
  },
  chart: {
    background: 'transparent',
    foreColor: '#f9fafb',
    fontFamily: 'Inter, sans-serif',
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
  },
  grid: {
    borderColor: 'rgba(113, 119, 144, 0.25)',
    strokeDashArray: 4,
  },
  tooltip: {
    theme: 'dark',
    style: {
      fontSize: '12px',
      fontFamily: 'Inter, sans-serif',
    },
  },
  dataLabels: {
    enabled: false,
  },
};

/**
 * Chart Templates
 */
export const ChartTemplates = {
  /**
   * Line Chart - For trends and time series
   */
  lineChart(elementId, data, options = {}) {
    const config = {
      ...apexDefaultConfig,
      series: data.series,
      chart: {
        ...apexDefaultConfig.chart,
        type: 'line',
        height: options.height || 350,
        zoom: {
          enabled: false,
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      xaxis: {
        categories: data.categories,
        labels: {
          style: {
            colors: '#999ba5',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#999ba5',
          },
        },
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      colors: options.colors || ['#3a6df0', '#3bf083', '#ff5c5c'],
      ...options,
    };

    return new ApexCharts(document.querySelector(elementId), config);
  },

  /**
   * Area Chart - For cumulative data
   */
  areaChart(elementId, data, options = {}) {
    const config = {
      ...apexDefaultConfig,
      series: data.series,
      chart: {
        ...apexDefaultConfig.chart,
        type: 'area',
        height: options.height || 350,
      },
      xaxis: {
        categories: data.categories,
        labels: {
          style: {
            colors: '#999ba5',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#999ba5',
          },
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.2,
          stops: [0, 90, 100],
        },
      },
      colors: options.colors || ['#3a6df0', '#3bf083'],
      ...options,
    };

    return new ApexCharts(document.querySelector(elementId), config);
  },

  /**
   * Bar Chart - For comparisons
   */
  barChart(elementId, data, options = {}) {
    const config = {
      ...apexDefaultConfig,
      series: data.series,
      chart: {
        ...apexDefaultConfig.chart,
        type: 'bar',
        height: options.height || 350,
      },
      plotOptions: {
        bar: {
          horizontal: options.horizontal || false,
          borderRadius: 8,
          dataLabels: {
            position: 'top',
          },
        },
      },
      xaxis: {
        categories: data.categories,
        labels: {
          style: {
            colors: '#999ba5',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#999ba5',
          },
        },
      },
      colors: options.colors || ['#3a6df0', '#3bf083', '#ff5c5c', '#ffce45'],
      ...options,
    };

    return new ApexCharts(document.querySelector(elementId), config);
  },

  /**
   * Donut/Pie Chart - For proportions
   */
  donutChart(elementId, data, options = {}) {
    const config = {
      ...apexDefaultConfig,
      series: data.series,
      chart: {
        ...apexDefaultConfig.chart,
        type: 'donut',
        height: options.height || 350,
      },
      labels: data.labels,
      colors: options.colors || ['#3a6df0', '#3bf083', '#ff5c5c', '#ffce45', '#c75deb'],
      legend: {
        position: 'bottom',
        labels: {
          colors: '#999ba5',
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total',
                color: '#f9fafb',
              },
            },
          },
        },
      },
      ...options,
    };

    return new ApexCharts(document.querySelector(elementId), config);
  },

  /**
   * Radial Bar - For progress/percentage
   */
  radialChart(elementId, data, options = {}) {
    const config = {
      ...apexDefaultConfig,
      series: data.series,
      chart: {
        ...apexDefaultConfig.chart,
        type: 'radialBar',
        height: options.height || 300,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%',
          },
          dataLabels: {
            name: {
              fontSize: '16px',
              color: '#f9fafb',
            },
            value: {
              fontSize: '24px',
              color: '#f9fafb',
              formatter: function(val) {
                return val + '%';
              },
            },
          },
        },
      },
      labels: data.labels,
      colors: options.colors || ['#3a6df0'],
      ...options,
    };

    return new ApexCharts(document.querySelector(elementId), config);
  },

  /**
   * Sparkline - Small inline chart
   */
  sparkline(elementId, data, options = {}) {
    const config = {
      series: [{
        data: data,
      }],
      chart: {
        type: 'line',
        width: options.width || 100,
        height: options.height || 35,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      colors: options.colors || ['#3a6df0'],
      tooltip: {
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function() {
              return '';
            },
          },
        },
        marker: {
          show: false,
        },
      },
    };

    return new ApexCharts(document.querySelector(elementId), config);
  },
};

/**
 * Chart.js Default Configuration
 */
const chartJsDefaultConfig = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#f9fafb',
        font: {
          family: 'Inter, sans-serif',
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(22, 25, 37, 0.9)',
      titleColor: '#f9fafb',
      bodyColor: '#f9fafb',
      borderColor: 'rgba(113, 119, 144, 0.25)',
      borderWidth: 1,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(113, 119, 144, 0.15)',
      },
      ticks: {
        color: '#999ba5',
      },
    },
    y: {
      grid: {
        color: 'rgba(113, 119, 144, 0.15)',
      },
      ticks: {
        color: '#999ba5',
      },
    },
  },
};

/**
 * Chart.js Templates
 */
export const ChartJSTemplates = {
  createLineChart(canvas, data, options = {}) {
    return new Chart(canvas, {
      type: 'line',
      data: data,
      options: {
        ...chartJsDefaultConfig,
        ...options,
      },
    });
  },

  createBarChart(canvas, data, options = {}) {
    return new Chart(canvas, {
      type: 'bar',
      data: data,
      options: {
        ...chartJsDefaultConfig,
        ...options,
      },
    });
  },

  createDoughnutChart(canvas, data, options = {}) {
    return new Chart(canvas, {
      type: 'doughnut',
      data: data,
      options: {
        ...chartJsDefaultConfig,
        ...options,
      },
    });
  },
};

/**
 * Update charts theme when theme changes
 */
export function updateChartsTheme(theme) {
  const isDark = theme === 'dark';

  // Update ApexCharts theme
  ApexCharts.exec('*', 'updateOptions', {
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    chart: {
      foreColor: isDark ? '#f9fafb' : '#333333',
    },
  });
}

export { ApexCharts, Chart };
