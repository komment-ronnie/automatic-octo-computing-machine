import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getMonthYear } from "../../utils/Helpers";
import { FaInfinity } from "react-icons/fa6";
import classNames from "classnames";

/**
 * @description This function takes in a props object with the following properties:
 * 
 * 	- `data`: An array of objects, each representing a point on a line chart. Each
 * object has properties for `x` (the date) and `metric` (a value associated with
 * that date).
 * 	- `label`: A string label for the line chart.
 * 
 * The function then performs the following actions:
 * 
 * 1/ It initializes state variables for `amount`, `delta`, and `points`.
 * 2/ It uses the `useEffect` hook to calculate and update the values of `amount` and
 * `delta` based on the length of the `data` array. If the array has more than one
 * element, it calculates the total value for the metric across all dates and stores
 * it in `amount`. It then calculates the delta (or change) between consecutive
 * elements in the array and stores it in `delta`.
 * 3/ It creates a new array called `points` and pushes onto it an object with
 * properties `id`, `data`, and `label`. The `id` property is set to the value of
 * `metric`, and the `data` property is an array of objects representing the point
 * on the line chart for that date.
 * 4/ It returns a React component that renders a line chart displaying the values
 * of `amount` and `delta` over time, along with a label indicating the metric being
 * displayed.
 * 
 * @param { object } data - The `data` input parameter in the given function is used
 * to pass an array of objects containing the data for the line chart. It is being
 * used to calculate and store the total value, delta, and points for the line chart.
 * 
 * @param { string } metric - The `metric` input parameter is used to specify the
 * variable to be plotted on the line chart. It takes an object with the metric name
 * as its key and the data to be plotted as its value.
 * 
 * @param { string } label - The `label` input parameter in this function is used to
 * set the text displayed near the line chart, indicating what the line represents.
 * It is passed as a prop to the `div` component with the class name "title", which
 * displays the text at the top of the chart.
 * 
 * @returns { object } The output of the provided function is a line chart displaying
 * the value of a metric over time, along with a delta marker indicating the difference
 * between consecutive points. The chart includes a tooltip showing the value of the
 * metric at each point, as well as a label indicating the month and year.
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
       * @description This function takes in an object `data` and returns a new object with
       * two properties: `x` and `y`. The `x` property is the value of the `period` key in
       * `data`, while the `y` property is the value of the specified `metric` key in `data`.
       * 
       * @param { object } data - In this function, `data` is used as an input parameter
       * to pass in the necessary data for the chart creation. Specifically, it provides
       * the period and metric values that will be plotted on the chart.
       * 
       * @returns { object } The output of this function is an object with two properties:
       * `x` and `y`. `x` contains the value of the `period` parameter, while `y` contains
       * the value of the specified `metric` parameter.
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
       * @description This element is a ResponsiveLine component in React, used to create
       * a line chart with customizable options. It accepts data as an array of points,
       * each consisting of x and y coordinates, and renders the line chart based on the
       * provided options. The chart includes tooltips with labels and values for each
       * point, as well as markers and colors that can be customized.
       * 
       * @param { object } data - The `data` property in the `ResponsiveLine` component
       * defines the data used to generate the line chart. It is an array of objects, where
       * each object represents a single data point and contains `x` and `y` properties.
       * The `x` property is the value of the x-axis label, while the `y` property is the
       * value of the y-axis label. By default, the `data` property is used to determine
       * the position of the line on the chart, as well as the color and width of the line.
       * 
       * @param { object } margin - The `margin` property in the `ResponsiveLine` component
       * sets the spacing between the line and the axes, as well as between the line and
       * any other elements in the chart. It allows for better readability and usability
       * of the chart by providing a clear visual buffer between the line and other elements.
       * 
       * @param { Component } yScale - The `yScale` property sets the scaling of the y-axis,
       * defining the range of values that will be displayed on the chart. It specifies a
       * linear scale with a minimum value of 0 and a maximum value determined by the `max`
       * property, which is calculated based on the maximum value of the `points` array.
       * The `yScale` property also sets the default value for the y-axis to be twice the
       * maximum value of the `points` array if there are no data points at a particular
       * x-coordinate, and sets the tooltip text for each data point to display the
       * corresponding x and y values.
       * 
       * @param { Component } tooltip - The `tooltip` property in the `Line` component is
       * used to display a tooltip when the user hovers over a point on the line. It takes
       * a function as its value, which returns an element that contains information about
       * the point. In this case, the function returns a div with a label and a value for
       * the x and y coordinates of the point, respectively. The `tooltip` property can be
       * customized to display different types of information depending on the needs of the
       * application.
       * 
       * @param { object } markers - The `markers` property in this component allows you
       * to add custom markers to the line chart. In this case, it adds a single marker at
       * the y-axis with a line style that includes a stroke width of 1.5 and a color of `#717d86`.
       * 
       * @param { string } curve - The `curve` property in this code determines the shape
       * of the line plot. It can take on various values, including "natural," "linear,"
       * and others. In this case, the value of "curve" is set to "natural," which means
       * that the line will be drawn as a smooth curve through the data points, rather than
       * a straight line.
       * 
       * @param { boolean } enableGridX - EnableGridX disables the grid lines on the x-axis.
       * 
       * @param { boolean } enableGridY - EnableGridY disables the grid lines for the y-axis.
       * 
       * @param { number } lineWidth - The `lineWidth` property sets the width of the line
       * used to render the plot. In this component, it is set to 1.5, which means the line
       * will have a width of 1.5 pixels.
       * 
       * @param { array } colors - The `colors` property in this component defines the
       * colors for the line and markers. It is an array of color values that are used to
       * fill the mesh and mark the lines. In this case, the only color defined is `#26de81`,
       * which is a blue-green color.
       * 
       * @param { number } pointSize - The `pointSize` property in this component sets the
       * size of the points displayed on the line chart. It is set to 1 by default, which
       * means that each point will be displayed as a small circle with a diameter of 1
       * pixel. You can adjust this value to make the points larger or smaller, depending
       * on your preference.
       * 
       * @param { boolean } useMesh - The `useMesh` property enables mesh rendering for the
       * line plot, allowing for more detailed and precise visualization of the data. With
       * `useMesh` set to `true`, the line is rendered as a mesh, providing a more accurate
       * representation of the data.
       * 
       * @param { boolean } enableCrosshair - The `enableCrosshair` property controls whether
       * a crosshair is displayed on the chart at the current position of the mouse cursor.
       * When set to `false`, a crosshair will not be displayed, while when set to `true`,
       * a crosshair will be displayed at the position of the mouse cursor.
       * 
       * @param { object } theme - The `theme` property in the component sets various
       * aesthetic properties of the chart, such as axis labels, tick mark line styles, and
       * color schemes. It allows for customization of the chart's appearance based on user
       * preferences or requirements.
       */}
      {/**
       * @description generates a line plot with points representing data, options for
       * customizing appearance and behavior are provided including margins, y-scale,
       * tooltip, markers, curve, and theme.
       * 
       * @param { object } data - 2D array of coordinates for the line plot, with each
       * element of the array representing a data point on the graph.
       * 
       * @param { number } margin - 10-pixel margins applied to the top, right, bottom, and
       * left sides of the chart.
       * 
       * @param { `linear` scale. } yScale - 1D linear scale for the y-axis, setting the
       * minimum and maximum values of the data points to be displayed based on the input
       * range, with the option to increase the maximum value by a factor for highlighting
       * purposes.
       * 
       * 	1/ `type`: The scale type is set to "linear", indicating that the value will
       * increase linearly as the data increases.
       * 	2/ `min`: The minimum value of the scale is 0.
       * 	3/ `max`: The maximum value of the scale is determined by taking the maximum value
       * of the `points` array and multiplying it by 1.5, or 10000 if no points are provided.
       * This sets the upper limit of the y-axis scale.
       * 	4/ `yScale`: The scale attribute is a linear scale, which means that each data
       * point contributes to the overall shape of the line.
       * 	5/ `tooltip`: A function is provided to render tooltips for each data point. If
       * `delta` is true (i.e., there are no null values in the input array), the tooltip
       * will display the month and year at the corresponding x-axis value, along with the
       * y-value for that point. Otherwise, the tooltip will be null.
       * 
       * 
       * @param { element reference. } tooltip - tooltip display of line chart markers,
       * providing additional information on mouse hover actions.
       * 
       * 	1/ `({ datum })`: The tooltip component takes a `datum` parameter, which represents
       * the current data point being rendered.
       * 	2/ ` className="line-tooltip"`: Adds a "line-tooltip" class to the tooltip element
       * for styling purposes.
       * 	3/ `<span className="label">`: Creates a label tag with a "label" class. The
       * contents of this tag will be displayed as the x-axis value of the data point.
       * 	4/ `<span className="value">`: Creates a value tag with a "value" class. The
       * contents of this tag will be displayed as the y-axis value of the data point.
       * 	5/ `{if (delta) { return null; } else { return tooltip } }`): Checks whether
       * `delta` is truthy (i.e., not null or undefined). If it's not, then the function
       * returns null, otherwise it returns the tooltip component. The `delta` variable is
       * passed as a prop from the parent component and represents whether the tooltip
       * should be displayed in the form of a label or an value tag.
       * 	6/ `[...]`: An array of markers is generated using the `markers` prop. Each marker
       * has an `axis` property set to "y", a `lineStyle` property set to { stroke: "#717d86",
       * strokeWidth: 1.5 }, and a `value` property set to 0.
       * 	7/ `[...]`: The `curve` prop is set to "natural". This specifies the shape of the
       * line connecting the data points.
       * 	8/ `[...]`: The `enableGridX` and `enableGridY` props are set to false. These
       * properties control whether grid lines are displayed for the x- and y-axes, respectively.
       * 	9/ `[...]`: The `lineWidth` prop is set to 1.5. This controls the width of the
       * lines connecting the data points.
       * 	10/ `[...]`: The `colors` prop is set to a single value, "#26de81". This sets the
       * color of the lines connecting the data points.
       * 	11/ `[...]`: The `pointSize` prop is set to 1. This controls the size of each
       * data point marker.
       * 	12/ `[...]`: The `useMesh` prop is set to true. This enables mesh-based rendering
       * of the data points, which can provide a more accurate and detailed visualization
       * of the data.
       * 	13/ `[...]`: The `enableCrosshair` prop is set to false. This disables crosshair
       * display in the plot area.
       * 
       * 
       * @param { object } markers - 2D line marker series for the y-axis, with one marker
       * representing the baseline value of 0.
       * 
       * @param { string } curve - shape of the line, where `natural` is the default value
       * and sets the line to follow the data points with a smooth curve.
       * 
       * @param { boolean } enableGridX - x-axis grid lines, disabling it hides the grid
       * lines on the x-axis.
       * 
       * @param { boolean } enableGridY - whether to show or hide the grid lines on the
       * y-axis in the given Line chart.
       * 
       * @param { number } lineWidth - width of the line that is drawn to represent the
       * data points on the chart, with a default value of 1.5.
       * 
       * @param { array } colors - 1-based integer array of colors used to fill each data
       * point's marker area.
       * 
       * @param { number } pointSize - size of each data point displayed on the line chart,
       * with larger values resulting in larger points and smaller values resulting in
       * smaller points.
       * 
       * @param { boolean } useMesh - 3D mesh visualization of the data points, which is
       * enabled by default to display a smooth surface of the data in the graph.
       * 
       * @param { boolean } enableCrosshair - enable or disable feature that allows users
       * to display crosshairs on the chart, which helps them accurately position the mouse
       * pointer when clicking points or making other adjustments on the graph.
       * 
       * @param { object } theme - layout and appearance of the chart, including options
       * for the axes, markers, and curves.
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
