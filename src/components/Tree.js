import React, { Component } from "react";
import * as d3 from "d3";
import "../css/Tree.css";

class Tree extends Component {
	componentDidMount() {
		this.draw(this.props);
	}

	render() {
		return <div className='tree' />;
	}

	draw = props => {
		d3.json("./gen1_tree.json").then(function(treeData) {
			var data = treeData[0];
			// console.log(Object.values(data))

			// TREE DIAGRAM
			var margin = { top: 40, right: 90, bottom: 50, left: 90 },
				width = 3600 - margin.left - margin.right,
				height = 1280 - margin.top - margin.bottom;

			var treeMap = d3.tree().size([width, height]);

			var nodes = d3.hierarchy(data);
			nodes = treeMap(nodes);

			var svg = d3
					.select("body")
					.append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom),
				g = svg
					.append("g")
					.attr(
						"transform",
						"translate(" + margin.left + "," + margin.top + ")"
					);
			var link = g
				.selectAll(".link")
				.data(nodes.descendants().slice(1))
				.enter()
				.append("path")
				.attr("class", "link")
				.attr("d", function(d) {
					return (
						"M" +
						d.x +
						"," +
						d.y +
						"C" +
						d.x +
						"," +
						(d.y + d.parent.y) / 2 +
						" " +
						d.parent.x +
						"," +
						(d.y + d.parent.y) / 2 +
						" " +
						d.parent.x +
						"," +
						d.parent.y
					);
                });
                var node = g
				.selectAll(".node")
				.data(nodes.descendants())
				.enter()
				.append("g")
				.attr("class", function(d) {
					return "node" + (d.children ? " node--internal" : " node--leaf");
				})
				.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")";
				});

			node.append("circle").attr("r", 10);
			node.append("text")
				.attr("dy", ".35em")
				.attr("y", function(d) {
					return d.children ? -20 : 20;
				})
				.style("text-anchor", "middle")
				.text(function(d) {
					return d.data.name;
                });
		});
    }
}
export default Tree;
