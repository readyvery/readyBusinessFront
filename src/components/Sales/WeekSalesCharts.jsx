import React from "react";
import "./WeekSalesCharts.css";
export default function WeekSalesCharts({ data }) {
  const addSalesYValue = 5000; //0.5만원 추가.
  const maxSalesValue =
    Math.max(...data.map((item) => item.sale)) + addSalesYValue;

  // y축 구성
  const maxSalesLabelValue = Math.ceil(maxSalesValue / 5000) * 5000;
  const yAxisLabels = [];
  for (let value = 0; value <= maxSalesLabelValue; value += 5000) {
    yAxisLabels.push(value / 10000); // 만원 단위로 변환하여 배열에 추가합니다.
  }
  return (
    <div className="chart-container">
      {/* 빈칸 */}
      <div className="grid-1" />
      {/* x축 요일 매핑 */}
      <div className="chart-day-column-container">
        {data.map((item, index) => (
          <div key={index} className="chart-day-column">
            <span className="chart-day-column-name">
              {item.day.slice(0, 3).toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* 차트 및 실선 */}
      <div className="bar-chart">
        {yAxisLabels.map((label, index) => (
          // 가격 축
          <div
            key={index}
            className="chart-sales-column-container"
            style={{
              bottom: `${(label / (maxSalesLabelValue / 10000)) * 100}%`, // 눈금선 위치 조정
            }}
          >
            <div className="chart-sales-column-line-wrapper">
              <span className="chart-sales-column-label">{label}만원</span>
              <div className="chart-sales-column-line" />
            </div>
          </div>
        ))}
        {/* 기존 막대 차트 렌더링 로직 */}
        {data.map((item, index) => (
          <div key={index} className="bar-container">
            <div className="bar-wrapper">
              <span className="bar-label">{`${item.sale}원`}</span>
              <div
                className="bar"
                style={{
                  height: `${
                    item.sale !== 0 ? (item.sale / maxSalesValue) * 100 : 1
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
