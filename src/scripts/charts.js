import ApexCharts from 'apexcharts';
import selectorEngin from './dom/selectorEngine';

var productSelesChrtOption = {
  series: [
    {
      name: 'تعداد فروش',
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 30, 29, 46],
    },
  ],

  chart: {
    height: 400,
    width: '100%',
    type: 'line',
    zoom: {
      enabled: false,
    },
    fontFamily: 'IRANSans',
    toolbar: {
      show: false,
    },
    redrawOnWindowResize: true,
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {},
  legend: {
    show: false,
  },

  stroke: {
    curve: 'smooth',
    width: 6,
  },
  title: {
    text: 'نمودار فروش محصول',
    align: 'center',
  },
  responsive: [
    {
      breakpoint: undefined,
      options: {},
    },
  ],
  grid: {
    show: false,
  },
  xaxis: {
    hideOverlappingLabels: false,

    categories: [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'ابان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
  },
};

const productSaleChartEl = selectorEngin.findOne('#product-sales-chart');
if (productSaleChartEl != null || productSaleChartEl != undefined) {
  var productSalesChart = new ApexCharts(
    productSaleChartEl,
    productSelesChrtOption
  );
  productSalesChart.render();
}

var satisfactionChartOptions = {
  chart: {
    height: 380,
    type: 'radialBar',
    fontFamily: 'IRANSans',
    redrawOnParentResize: true,
    redrawOnWindowResize: true,
  },
  colors: ['#198754'],
  title: {
    text: 'میزان رضایت مشتری ',
    align: 'center',
  },
  plotOptions: {
    radialBar: {
      hollow: {
        margin: 0,
        size: '70%',
        background: '#293450',
      },
      track: {
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          blur: 4,
          opacity: 0.15,
        },
      },
      dataLabels: {
        name: {
          offsetY: -10,
          color: '#fff',
          fontSize: '13px',
        },
        value: {
          color: '#fff',
          fontSize: '30px',
          show: true,
        },
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      gradientToColors: ['#20c997'],
      stops: [0, 100],
    },
  },
  stroke: {
    lineCap: 'round',
  },
  series: [70],
  labels: ['راضی'],
};

const satisfactionChartEl = selectorEngin.findOne('#satisfactionChart');
if (satisfactionChartEl != null || satisfactionChartEl != undefined) {
  var satisfactionChart = new ApexCharts(
    satisfactionChartEl,
    satisfactionChartOptions
  );

  satisfactionChart.render();
}
