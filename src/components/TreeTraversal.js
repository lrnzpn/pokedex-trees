import React, { Component } from "react";
import * as d3 from "d3";
import "../css/RadialTree.css";

class TreeTraversal extends Component {
	componentDidMount() {
		this.draw(this.props);
	}

	draw = props => {
		d3.json("gen1_tree.json").then(function(treeData) {
			var data = treeData[0];
			var i = 0;
			var tree = d3
				.tree()
				.size([360, 500])
				.separation(function(a, b) {
					return (a.parent === b.parent ? 1 : 2) / a.depth;
				});
			d3.selection.prototype.moveToFront = function() {
				return this.each(function() {
					this.parentNode.appendChild(this);
				});
			};

			var svg = d3.select("body").append("svg"),
				width = +svg.attr("width"),
				height = +svg.attr("height"),
				g = svg
					.append("g")
					.attr(
						"transform",
						"translate(" + (width / 2 + 640) + "," + (height / 2 + 690) + ")"
					);

			var root = tree(d3.hierarchy(data));

			var resetTraversal = function(root) {
				d3.selectAll(".node")
					.transition()
					.duration(500)
					.style("fill", "#fff")
					.style("stroke", "steelblue");
			};

			var update = function(root) {
				resetTraversal(root);

				var node = g
					.selectAll(".node")
					.data(root.descendants().slice(), function(d) {
						return d.id || (d.id = ++i);
					})
					.enter()
					.append("g")
					.attr("class", function(d) {
						return (
							"node" +
							(d.children
								? " node--internal node-" + d.id
								: " node--leaf node-" + d.id)
						);
					})
					.attr("transform", function(d) {
						return "translate(" + project(d.x, d.y) + ")";
					});

				var link = g
					.selectAll(".link")
					.data(root.descendants().slice(1))
					.enter()
					.append("path")
					.attr("class", "link")
					.attr("d", function(d) {
						return (
							"M" +
							project(d.x, d.y) +
							"C" +
							project(d.x, (d.y + d.parent.y) / 2) +
							" " +
							project(d.parent.x, (d.y + d.parent.y) / 2) +
							" " +
							project(d.parent.x, d.parent.y)
						);
					});

				node.append("circle").attr("r", 2.5);

				node
					.append("text")
					.attr("dy", ".31em")
					.attr("x", function(d) {
						return (d.x < 180) === !d.children ? 6 : -6;
					})
					.style("text-anchor", function(d) {
						return (d.x < 180) === !d.children ? "start" : "end";
					})
					.attr("transform", function(d) {
						return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")";
					})
					.text(function(d) {
						return d.data.name;
					});
			};

			var visitElement = function(element, animate) {
				d3.select(".node-" + element.id)
					.transition()
					.duration(500)
					.delay(500 * animate)
					.style("fill", "red")
					.style("stroke", "red");
			};
			update(root);

			var dft = function(root) {
				var stack = [];
				var animate = 0;
				stack.push(root);
				while (stack.length !== 0) {
					var element = stack.pop();
					visitElement(element, animate);
					animate = animate + 1;
					if (element.children !== undefined) {
						for (var i = 0; i < element.children.length; i++) {
							stack.push(element.children[element.children.length - i - 1]);
						}
					}
				}
			};

			var bft = function() {
				var queue = [];
				var animate = 0;
				queue.push(root);
				while (queue.length !== 0) {
					var element = queue.shift();
					visitElement(element, animate);
					animate = animate + 1;
					if (element.children !== undefined) {
						for (var i = 0; i < element.children.length; i++) {
							queue.push(element.children[i]);
						}
					}
				}
            };

            // dft(root)
            console.log(typeof root.data.children[0].name)

			function project(x, y) {
				var angle = ((x - 90) / 180) * Math.PI,
					radius = y;
				return [radius * Math.cos(angle), radius * Math.sin(angle)];
			}
        });

		// function resetTraversal(root){
		//     //d3.selectAll(".node").classed("visited",false);
		//     d3.selectAll(".node")
		//         .transition().duration(500)
		//         .style("fill","#fff")
		//         .style("stroke","steelblue");

        // }
	};

	render() {
		return (
			<div>
				<button className='bfs'>bfs</button>
				<button className='dfs'>dfs</button>
				<button className='reset'>reset</button>
			</div>
		);
	}
}

export default TreeTraversal;
