import React, { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getMonthYear } from "../../utils/Helpers";
import { FaInfinity } from "react-icons/fa6";
import classNames from "classnames";


/**
 * @description uses `useEffect` to compute and display a line chart based on an array
 * of objects containing 'data', 'metric', and 'label'. It also provides a tooltip
 * for the line.
 * 
 * @param { object } data - 2D array of data points to be processed and plotted on
 * the line chart, and it is used to calculate the total value, delta, and plot the
 * points on the chart.
 * 
 * @param { string } metric - attribute of data object that is being graphed.
 * 
 * @param { string } label - display label for the line, which is displayed near the
 * line in the chart.
 * 
 * @returns { `HTMLDivElement`. } a line chart displaying the given data points, with
 * axis labels and a curve line.
 * 
 * 		- `className`: This is an attribute that sets the CSS class name for the line.
 * It can be any string or array of strings.
 * 		- `title`: This is an attribute that sets the title for the line. It can be any
 * string or HTML content.
 * 		- `content`: This is an attribute that sets the content for the line. It can be
 * any string or HTML content.
 * 		- `value`: This is an attribute that sets the value of the line. It can be any
 * number or other numerical value.
 * 		- `margin`: This is an attribute that sets the margin for the line. It can be
 * any array of numbers specifying top, right, bottom, and left margins.
 * 		- `yScale`: This is an attribute that sets the scaling factor for the y-axis.
 * It can be any object with `type`, `min`, and `max` properties.
 * 		- `tooltip`: This is an attribute that sets the tooltip content for the line.
 * It can be any function that returns HTML content.
 * 		- `markers`: This is an attribute that sets the markers for the line. It can be
 * any array of objects with `axis`, `lineStyle`, and `value` properties.
 * 		- `curve`: This is an attribute that sets the curve type for the line. It can
 * be any string indicating the curve type (e.g., "natural", "linear", etc.).
 * 		- `enableGridX`: This is an attribute that sets whether to display a grid on the
 * x-axis. It can be any boolean value.
 * 		- `enableGridY`: This is an attribute that sets whether to display a grid on the
 * y-axis. It can be any boolean value.
 * 		- `lineWidth`: This is an attribute that sets the line width for the line. It
 * can be any number.
 * 		- `colors`: This is an attribute that sets the colors for the line. It can be
 * any array of strings indicating the colors to use (e.g., ["#26de81"]).
 * 		- `pointSize`: This is an attribute that sets the point size for the line points.
 * It can be any number.
 * 		- `useMesh`: This is an attribute that sets whether to use a mesh for the line.
 * It can be any boolean value.
 * 		- `enableCrosshair`: This is an attribute that sets whether to display a crosshair
 * on the line. It can be any boolean value.
 * 		- `theme`: This is an attribute that sets the theme for the line. It can be any
 * object with `axis` properties.
 * 
 * 	Overall, these attributes allow for customizing the appearance and behavior of
 * the line in various ways.
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
       * @description takes in `data` and returns an object with two properties: `x` and
       * `y`. The value of `x` is set to the input `period`, while the value of `y` is set
       * to the value of `metric` within the `data` object.
       * 
       * @param { object } data - input data that is used to calculate the period and metric
       * values.
       * 
       * @returns { object } a JSON object containing `x` and `y` properties, where `x`
       * represents the input period and `y` represents the input metric value.
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
       * @description generates a line chart with markers, based on the data provided,
       * displaying the change over time of a single variable.
       * 
       * @param { object } data - 2D array of coordinates that make up the line chart, with
       * each element in the array representing a single data point on the chart.
       * 
       * @param { object } margin - 10-pixel spacing between the plot and its boundaries,
       * applying top, right, bottom, and left margins for a total of 40 pixels of space
       * around the plot.
       * 
       * @param { linear scale. } yScale - 0-15 range of data points, with its min value
       * set to the lowest point's y value and max value set to the highest point's y value,
       * scaled up by a factor of 1.5.
       * 
       * 		- `type`: The scale type is set to "linear".
       * 		- `min`: The minimum value of the scale is set to 0.
       * 		- `max`: The maximum value of the scale is determined by the maximum value of
       * the data points in the `points` array, multiplied by a factor of 1.5.
       * 
       * 	The tooltip property is also defined, which returns a custom label and value for
       * each data point when the user hovers over it. The label includes the month and
       * year, while the value includes the corresponding data point value.
       * 
       * 
       * @param { React element. } tooltip - information to display when the user hovers
       * over a particular data point on the line chart, and it can render custom HTML
       * content using the `dataset` object and `datum` variable.
       * 
       * 	1/ `datum`: This is the tooltip component's parameter, which is an object
       * representing the dataset point.
       * 	2/ `delta`: A boolean value that indicates whether the tooltip should display a
       * date label or not. If `delta` is true, the tooltip displays a date label for each
       * data point; otherwise, it returns null.
       * 	3/ `getMonthYear`: A function that calculates and returns the month and year of
       * the data point's x-value as a string. This function is used to construct the date
       * label displayed in the tooltip.
       * 	4/ `tooltip`: A component that renders a tooltip display when the user hovers
       * over the line. The `tooltip` component takes two parameters: `(datum) => { ... }`
       * and `null`. The former displays the data point information, while the latter
       * displays a null value when the user is not hovering over any point.
       * 	5/ `axis`: An object that defines various properties of the graph's axes, such
       * as line styles and ticks. In this case, `axis.ticks.line` has no stroke to avoid
       * any visual obstruction.
       * 	6/ `curve`: A string value that specifies the curve type for the line plot. In
       * this case, it is set to `'natural'`.
       * 	7/ `colors`: An array of strings representing the line colors. In this case, there
       * is only one color, `#26de81`.
       * 	8/ `pointSize`: A number value that represents the size of the data points. In
       * this case, it is set to 1.
       * 	9/ `useMesh`: A boolean value that indicates whether to use a mesh plot or not.
       * In this case, it is set to `true`.
       * 	10/ `enableCrosshair`: A boolean value that determines whether to show a crosshair
       * marker at the end of each line. It is set to `false` in this case.
       * 	11/ `theme`: An object that defines various graphical properties, such as axis
       * styles and colors. In this case, it defines an axis style with no stroke for the
       * ticks.
       * 
       * 
       * @param { array } markers - 2D visual representation of a line, where it defines
       * the shape and appearance of the line, including its color, stroke width, and other
       * attributes.
       * 
       * @param { string } curve - 3D curve of the line, allowing for a more smooth and
       * natural appearance of the line when rendered.
       * 
       * @param { boolean } enableGridX - enable or disable option for grid lines on the x-axis.
       * 
       * @param { boolean } enableGridY - visibility of the y-axis grid in the chart. When
       * set to `false`, it hides the y-axis grid, which can improve the visualization's
       * readability and clarity.
       * 
       * @param { 1.5. } lineWidth - width of the line used to draw the generated mesh,
       * with a default value of 1.5.
       * 
       * 		- `lineWidth`: The width of the line connecting the data points.
       * 		- `margin`: Additional space between the chart and the edge of the canvas. Top,
       * right, bottom, and left margins are customizable separately.
       * 		- `yScale`: A configuration object for the y-axis scale. It has three main properties:
       * 		+ `type`: The scale type, which can be either "linear" or "category". In this
       * case, it is set to "linear".
       * 		+ `min`: The minimum value of the y-axis.
       * 		+ `max`: The maximum value of the y-axis. If `points` is empty, the default
       * maximum value is set to 10000.
       * 		- `tooltip`: A function that returns a tooltip message when the user hovers over
       * a data point. It takes the `datum` argument as input and returns a JSX element.
       * In this case, it displays the month and year of each data point, along with the
       * corresponding value. If `delta` is set to true, the tooltip message includes an
       * additional line showing the maximum value. Otherwise, the tooltip is empty.
       * 		- `markers`: An array of configurations for marker lines on the y-axis. The only
       * element in this array is a single object with the following properties:
       * 		+ `axis`: The axis that the marker line is associated with (in this case, "y").
       * 		+ `lineStyle`: A configuration object for the line style of the marker line. It
       * has the following properties:
       * 			- `stroke`: The color of the line.
       * 			- `strokeWidth`: The width of the line.
       * 		- `curve`: The type of curve used to connect the data points. In this case, it
       * is set to "natural".
       * 		- `enableGridX`: Whether or not to display the x-axis grid. It is disabled in
       * this chart.
       * 		- `enableGridY`: Whether or not to display the y-axis grid. It is also disabled
       * in this chart.
       * 		- `colors`: An array of colors used for the line and markers. In this case, it
       * contains only one color, `#26de81`.
       * 		- `pointSize`: The size of each data point marker. In this case, it is set to 1.
       * 		- `useMesh`: Whether or not to use a mesh background instead of a single line
       * for the chart. It is enabled in this chart.
       * 		- `enableCrosshair`: Whether or not to display a crosshair on the chart for
       * manual navigation. It is disabled in this chart.
       * 
       * 
       * @param { array } colors - 6 available color options for the line series, which are
       * specified using hex codes and used to determine the color of each line in the visualization.
       * 
       * @param { integer } pointSize - size of each data point displayed on the chart, set
       * to 1 by default to display small circles.
       * 
       * @param { boolean } useMesh - 3D mesh visualization of the data, allowing for more
       * detailed and interactive visualizations.
       * 
       * @param { boolean } enableCrosshair - whether or not to display a crosshair marker
       * on top of the line plot, which can be helpful for navigating and inspecting the
       * data more closely.
       * 
       * @param { object } theme - theme object that sets options for various visual elements,
       * such as axis ticks and grid lines, but not crosshairs, to enhance the visualization
       * of the line chart.
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
