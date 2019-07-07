import React, { Component } from "react";
import * as d3 from "d3";

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

			var queue = []
			// DFS
			
			for(var i = 0; i < nodes.data.children.length;i++) {
				// console.log(nodes.data.children[i]);
				// queue.push(nodes.data.children[i]);
				for(var j = 0; j < nodes.data.children[i].children.length;j++) {
					// console.log(nodes.data.children[i].children[j]);
					// queue.push(nodes.data.children[i].children[j]);
					for(var k=0;k<nodes.data.children[i].children[j].children.length;k++) {
						// console.log(nodes.data.children[i].children[j].children[k]);
						// queue.push(nodes.data.children[i].children[j].children[k]);
						for(var l=0;l<nodes.data.children[i].children[j].children[k].children.length;l++) {
							// console.log(nodes.data.children[i].children[j].children[k].children[l]);
							// queue.push(nodes.data.children[i].children[j].children[k].children[l]);
						}
					}
				}
			}
			console.log(queue);
			
		});
	};
}
export default Tree;
