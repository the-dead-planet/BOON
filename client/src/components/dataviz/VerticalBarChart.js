import React, { Component } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from '../../../styles/main';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import ChartImpl from './ChartImpl';

const VerticalBarChart = ({ data, size }) => {
    const values = data.map(row => row.value);
    const categories = data.map(row => row.category);
    const maxValue = max(values);
    // TODO: calculate based on longest category text length and font size
    const offset = {
        top: 0,
        left: maxValue.toString().length * 5,
        bottom: categories.reduce((longestStr, str) => (longestStr.length < str.length ? str : longestStr)).length * 4,
        right: 0,
    };
    const margin = { top: 20, left: 20, bottom: 20, right: 20 };
    const chartWidth = size.width - margin.left - margin.right - offset.left - offset.right;
    const chartHeight = size.height - margin.left - margin.right - offset.top - offset.bottom;

    // Horizontal axis
    const xScale = scaleBand()
        .range([0, chartWidth])
        .domain(categories);

    // Vertical axis
    const yScale = scaleLinear()
        .range([0, chartHeight])
        .domain([max(values), 0]);

    const xRect = (d, i) => offset.left + 0.05 * xScale.bandwidth() + xScale(categories[i]);
    const yRect = (d, i) => yScale(d);
    const heightRect = d => chartHeight - yScale(d);
    const widthRect = d => 0.9 * xScale.bandwidth();

    return (
        <ChartImpl
            categories={categories}
            values={values}
            chartHeight={chartHeight}
            chartWidth={chartWidth}
            xScale={xScale}
            yScale={yScale}
            xRect={xRect}
            yRect={yRect}
            widthRect={widthRect}
            heightRect={heightRect}
            xCatAngle={-45}
            yCatAngle={0}
            size={size}
            margin={margin}
            offset={offset}
            barColor="#00174f"
            xFontColor="#404040"
            yFontColor="#404040"
        />
    );
};

export default VerticalBarChart;
