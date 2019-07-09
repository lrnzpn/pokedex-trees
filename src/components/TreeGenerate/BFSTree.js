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
					// eslint-disable-next-line
				g = svg
					.append("g")
					.attr(
						"transform",
						"translate(" + margin.left + "," + margin.top + ")"
					);
			var rootNode = nodes.data

			// console.log(rootNode) 
			// console.log(rootNode.children) // what you search
			// console.log(rootNode.children[0].children[0]) // what will be added to queue

			var breadthFirst = function(node) {
				
				var q = [rootNode]

				for(let i = 0; i < node.children.length;i++){
					q = [...q, node.children[i]]
					for(let j = 0; j < node.children[i].children.length;j++){
						q = [...q, node.children[i].children[j]]
						console.log(q)

					}
				}
			}
			breadthFirst(rootNode)
		});
	};
}
export default Tree;
