import React from 'react';
import ApexCharts from "react-apexcharts";

// import './YourCssFileName.css';

export default function UserPowerChart({data}) {

  return (
    <div style={{ 'paddingBottom': "2rem"}}>
      <ApexCharts 
          type="bar" 
          height='400px'
          series={ [
              { 
                name: "이번주 매출",
                data: data?.map((e) => e.sale),
              },
          ]} 
          
          options={{    
              chart : {
                  height: '200px',
                  // width: "500px",                    
              }, 
              plotOptions: {
                bar: {
                  borderRadius: 10,
                  dataLabels: {
                    position: 'top', // top, center, bottom
                  },
                }
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  const newVal = (val / 10000);
                  return `${newVal.toFixed(1).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}만원`;
                },
                offsetY: -20,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"]
                }
              },
              xaxis: {
                categories: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
                position: 'top',
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false
                },
                crosshairs: {
                  fill: {
                    type: 'gradient',
                    gradient: {
                      colorFrom: '#D82356',
                      colorTo: '#D82356',
                      stops: [0, 100],
                      opacityFrom: 0.4,
                      opacityTo: 0.5,
                    }
                  }
                },
                tooltip: {
                  enabled: true,
                }
              },
              yaxis: {
                // axisBorder: {
                //   show: false
                // },
                // axisTicks: {
                //   show: false,
                // },
                labels: {
                  // show: false,
                  formatter: function (val) {
                    const newVal = (val / 10000);
                    return `${newVal.toFixed(1).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}만원`;
                  }
                }
              
              },
              labels: {
                show: false,
                formatter: function (val) {
                  const newVal = (val / 10000);
                  return `${newVal.toFixed(1).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}만원`;                }
              },
              fill: {
                colors: ['#D82356']
              }
          }}>
      </ApexCharts>
       
    </div>
  );    
};
