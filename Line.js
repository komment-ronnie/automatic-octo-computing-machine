import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getMonthYear } from "../../utils/Helpers";
import { FaInfinity } from "react-icons/fa6";
import classNames from "classnames";

/**
 * @description This function is a React component that renders a line chart for a
 * given dataset. It takes in the following props:
 * 
 * 	- `data`: An array of objects containing the dataset data
 * 	- `metric`: The name of the metric to be displayed on the chart (e.g. "revenue")
 * 	- `label`: The label for the chart (e.g. "Revenue by Month")
 * 
 * The function first checks if there is any data provided, and if so, it calculates
 * the total value of the dataset, the delta (change) between the last two points,
 * and the points array. If there is no data provided, it sets the amount to zero and
 * delta to null, and sets the points array to an empty list.
 * 
 * It then renders a line chart using the `ResponsiveLine` component from the `recharts`
 * library. The chart shows the total value of the dataset over time, along with a
 * marker indicating the change between the last two points. The marker is displayed
 * as a vertical line extending from the last point to the beginning of the chart,
 * with a label showing the delta value.
 * 
 * The function also provides a tooltip for each data point, displaying the month and
 * year when the data was recorded, along with the corresponding value.
 * 
 * @param { object } data - The `data` input parameter is used to define the data for
 * the line chart. It is passed as an array of objects, where each object represents
 * a point on the line. The function uses the `useEffect` hook to iterate through the
 * `data` array and perform calculations based on the values in the array.
 * 
 * @param { string } metric - The `metric` input parameter is used to define the data
 * field that will be used to calculate the line's value and delta. It specifies the
 * name of the data field that contains the values for the line chart.
 * 
 * @param { string } label - The `label` input parameter sets the text displayed above
 * the line chart. It is used to provide a brief label or title for the line being plotted.
 * 
 * @returns { object } The function returns a React component that renders a line
 * chart with a title, content, and ResponsiveLine component. The ResponsiveLine
 * component displays data points and their corresponding values on a line graph. The
 * chart also includes tooltips with labels and values for each data point. The
 * function takes in several parameters, including `data`, `metric`, and `label`,
 * which are used to generate the chart.
 */
const Line = ({ data, metric, label }) => {
  
  const [amount, setAmount] = useState(0);
  const [delta, setDelta] = useState(0.0);
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (data.length > 1) {
      setAmount(
        data.reduce((acc, current) => {
          return current[metric] + acc;
        }, 0),
      );

      const previous = data[data.length - 2][metric];
      const latest = data[data.length - 1][metric];
      setDelta(((100 * (latest - previous)) / previous).toFixed(1));

      /**
       * @description This function takes in an object `data` containing a `period` property
       * and an array `metric`. It returns an object with two properties: `x` set to the
       * value of `data.period`, and `y` set to the value of `data[metric]`. In other words,
       * it maps the values in the `metric` array to the corresponding period in the `data`
       * object.
       * 
       * @param { object } data - In this function, `data` is the input parameter that
       * provides the necessary data for the calculation of the output values. Specifically,
       * it contains the period and metric values that are used to create the resulting
       * object with `x` and `y` properties.
       * 
       * @returns { object } The output of this function is an object with two properties:
       * `x` and `y`. The `x` property contains the value of the `period` field in the input
       * data, while the `y` property contains the value of the specified `metric` field
       * in the input data.
       */
      const _points = [
        {
          id: metric,
          data: data.map((data) => ({
            x: data.period,
            y: data[metric],
          })),
        },
      ];
      setPoints(_points);
    } else {
      setAmount(data?.[0]?.[metric]);
      setDelta(null);
      setPoints([]);
    }
  }, [data]);

  const deltaClasses = classNames(
    "delta",
    delta >= 0 ? "positive" : "negative",
    isFinite(delta) && "baseline",
  );

  return (
    <div className="line">
      <div className="title">{label}</div>

      <div className="content">
        <div className="value">{amount?.toLocaleString("en-US") ?? 0}</div>

        <div>
          {isFinite(delta) ? (
            <div className={deltaClasses}>
              <span>{delta >= 0 ? "↑" : "↓"}</span>
              <span className="number">{Math.abs(delta)}</span>
              <span className="percent">%</span>
            </div>
          ) : null}
        </div>
      </div>

      {/**
       * @description This component is a `ResponsiveLine` chart element in React, used for
       * visualizing data on a line chart. It takes in `points` data as an array of objects,
       * where each object represents a point on the line and contains `x` and `y` properties.
       * The component sets up a linear scale for the `y` axis and maps the `x` values to
       * the corresponding `y` values based on the maximum value in the `points` array. It
       * also adds a tooltip to display the `x` and `y` values when the user hovers over
       * the line. Additionally, it sets up markers on the line to represent the minimum
       * and maximum values of the data.
       * 
       * @param { object } data - The `data` property in this component refers to an array
       * of data points that will be displayed on the line chart. It is used to define the
       * points that the line will pass through, and their corresponding x and y values.
       * 
       * @param { object } margin - The `margin` property sets the spacing between the line
       * and the nearest axis boundary. In this case, it sets the top, right, bottom, and
       * left margins to 10 pixels each, creating a buffer zone around the line.
       * 
       * @param { Component } yScale - The `yScale` property sets the scale for the `y`
       * axis of the graph. It defines the range of values that will be displayed on the
       * y-axis, and the amount by which the values will be stretched or compressed. In
       * this case, it is set to a linear scale with a minimum value of 0 and a maximum
       * value of the maximum value of the `y` field of each point in the data array, scaled
       * by a factor of 1.5.
       * 
       * @param { Component } tooltip - The `tooltip` property in this component defines
       * what content is displayed when a user hovers over a point on the line chart. It
       * takes a function as its value, which returns a React element containing the tooltip
       * content. In this case, the function returns a `div` element with a `label` and
       * `value` span for displaying the date and value of the hovered-over point. If `delta`
       * is true (which it is by default), the tooltip will display the date in the format
       * `month year`, otherwise it will display nothing.
       * 
       * @param { object } markers - The `markers` property in the code component is used
       * to define a marker for each data point on the line chart. In this case, there is
       * only one marker defined, which sets the `axis` property to "y", the `lineStyle`
       * property to include a stroke and stroke width, and the `value` property to 0.
       * 
       * @param { string } curve - The `curve` property sets the type of curve to use for
       * the line chart. In this case, it is set to `"natural"`, which means the line will
       * be a smooth curve through the data points rather than a straight line.
       * 
       * @param { boolean } enableGridX - EnableGridX disables the x-axis grid. It's set
       * to false by default, which means that there will be grid lines on the x-axis. If
       * you want a more streamlined look, you can set it to true or use `enableGridX:
       * false` in your props.
       * 
       * @param { boolean } enableGridY - EnableGridY disables the grid lines on the y-axis.
       * 
       * @param { number } lineWidth - The `lineWidth` property sets the width of the line
       * that represents the data points in the chart. It can be set to a value between 0
       * and 1, where 0 results in a thin line and 1 results in a thick line. In this
       * particular component, the `lineWidth` property is set to 1.5, which creates a
       * medium-width line.
       * 
       * @param { array } colors - The `colors` property in this component determines the
       * color of the line and points. It is an array of colors that are used to render the
       * line and points on the chart. In this case, it is set to `[#26de81]`.
       * 
       * @param { integer } pointSize - The `pointSize` property in the code you provided
       * sets the size of each point on the line chart. It accepts a numerical value, which
       * determines the width of each point marker. In this case, the value of `pointSize`
       * is set to `1`, meaning that each point will have a small circle marker with a
       * diameter of 1 pixel.
       * 
       * @param { boolean } useMesh - The `useMesh` property in the code you provided enables
       * mesh rendering for the line chart, allowing for a more detailed and precise
       * representation of the data. When enabled, the chart will display a mesh surface
       * instead of just lines, providing a more detailed visualization of the data.
       * 
       * @param { boolean } enableCrosshair - EnableCrosshair disables the display of a
       * crosshair at the current plot point when hovering over a line or area series.
       * 
       * @param { object } theme - The `theme` property in this component sets various
       * aesthetic properties of the chart, such as colors, axis styles, and point size.
       * It is an object that contains properties for different parts of the chart, like
       * `axis`, `colors`, and `pointSize`. By setting these properties, the developer can
       * customize the look and feel of the chart to better suit their needs.
       */}
      <ResponsiveLine
        data={points}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        yScale={{
          type: "linear",
          min: 0,
          max: points.length
            ? Math.max(...points[0].data.map((d) => d.y)) * 1.5
            : 10000,
        }}
        tooltip={(datum) => {
          if (delta) {
            return (
              <div className="line-tooltip">
                <span className="label">
                  {getMonthYear(datum.point.data.x)}
                </span>
                :<span className="value"> {datum.point.data.y}</span>
              </div>
            );
          } else {
            return null;
          }
        }}
        markers={[
          {
            axis: "y",
            lineStyle: {
              stroke: "#717d86",
              strokeWidth: 1.5,
            },
            value: 0,
          },
        ]}
        curve={"natural"}
        enableGridX={false}
        enableGridY={false}
        lineWidth={1.5}
        colors={["#26de81"]}
        pointSize={1}
        useMesh={true}
        enableCrosshair={false}
        theme={{
          axis: {
            ticks: {
              line: {
                stroke: "none",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Line;
