import React, { Component } from "react";
import * as d3 from "d3";
import "../css/RadialTree.css";

class Tree extends Component {
	componentDidMount() {
		this.draw(this.props);
	}

	render() {
		return (
			<div className='tree'>
				{/* <button id='dft' onClick={this.dft}>
					Depth First
				</button>
				<button id='bft' onClick={this.bft}>
					Breadth First
				</button>
				<button id='reset' onClick={this.resetTraversal}>
					Reset
				</button> */}
			</div>
		);
	}

	draw = props => {
		d3.json("./gen1_tree.json").then(function(treeData) {
			var data = treeData[0];
			// console.log(Object.values(data))

			// TREE DIAGRAM
			var svg = d3.select("body").append("svg"),
				width = +svg.attr("width"),
				height = +svg.attr("height"),
				g = svg
					.append("g")
					.attr(
						"transform",
						"translate(" + (width / 2 + 640) + "," + (height / 2 + 690) + ")"
					);

			var stratify = d3.stratify().parentId(function(d) {
				return d.id.substring(0, d.id.lastIndexOf("."));
			});

			var tree = d3
				.tree()
				.size([360, 500])
				.separation(function(a, b) {
					return (a.parent === b.parent ? 1 : 2) / a.depth;
				});

			// build with json file
			var root = tree(d3.hierarchy(data));

			// var fringe = [root.data];
			// console.log(root.descendants().length);

			// bfs
			var i = 0;
			var bfs_loop = function(root) {
				var link = g
					.selectAll(".link")
					.data(root.descendants().slice(1, 1 + i)) // ends at 1,0 (-230)
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

				var node = g
					.selectAll(".node")
					.data(root.descendants().slice(0, 1 + i)) // ends at 0,231 (+230)
					.enter()
					.append("g")
					.attr("class", function(d) {
						return "node" + (d.children ? " node--internal" : " node--leaf");
					})
					.attr("transform", function(d) {
						return "translate(" + project(d.x, d.y) + ")";
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
				i++;
				console.log(i);
			};

			var j = 0;
			// console.log(root.children.length)
			var get_deep = function(root) {
				var fringe = [root];
				for (let i = 0; i < root.children.length; i++) {
					fringe.push(root.children[i]);
					for (let j = 0; j < root.children[i].children.length; j++) {
						fringe.push(root.children[i].children[j]);
						for (
							let k = 0;
							k < root.children[i].children[j].children.length;
							k++
						) {
							fringe.push(root.children[i].children[j].children[k]);
							for (
								let l = 0;
								l < root.children[i].children[j].children[k].children.length;
								l++
							) {
								fringe.push(
									root.children[i].children[j].children[k].children[l]
								);
							}
						}
					}
				}
				// console.log(fringe)
				return fringe;
			};
			// var d = get_deep(root)
			// console.log(d.slice(1))

			var dfs_loop = function(root) {
				var link = g
					.selectAll(".link")
					.data(root.slice(1, 1 + j))
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

				var node = g
					.selectAll(".node")
					.data(root.slice(0, 1 + j))
					.enter()
					.append("g")
					.attr("class", function(d) {
						return "node" + (d.children ? " node--internal" : " node--leaf");
					})
					.attr("transform", function(d) {
						return "translate(" + project(d.x, d.y) + ")";
					});

				node.append("circle").attr("r", 5);
				node.select("circle").style("fill","red")

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

				
				j++;
				console.log(j);
			};
			// BREADTH FIRST
			// var timer = d3.interval(function(duration) {
			// 	bfs_loop(root)
			// 	if(i === root.descendants().length+1){
			// 		timer.stop();
			// 	}
			// }, 100)

			// DEPTH FIRST
			var timer = d3.interval(function(duration) {
				var d_root = get_deep(root);
				dfs_loop(d_root);
				if (j === d_root.length + 1) {
					timer.stop();
				}
			}, 100);

			function project(x, y) {
				var angle = ((x - 90) / 180) * Math.PI,
					radius = y;
				return [radius * Math.cos(angle), radius * Math.sin(angle)];
			}

			// https://gist.github.com/mph006/7e7d7f629de75ada9af5
			/*
			var visitElement = function(element, animX) {
				// d3.select("#node-"+element.id).classed("visited",true);
				d3.select(
					"node" + (element.children ? " node--internal" : " node--leaf")
				)
					.transition()
					.duration(500)
					.delay(500 * animX)
					.style("fill", "red")
					.style("stroke", "red");
			};

			var dft = () => {
				var stack = [];
				var animX = 0;
				stack.push(root);
				while (stack.length !== 0) {
					var element = stack.pop();
					visitElement(element, animX);
					animX = animX + 1;
					if (element.children !== undefined) {
						for (var i = 0; i < element.children.length; i++) {
							stack.push(element.children[element.children.length - i - 1]);
						}
					}
				}
			};

			var bft = () => {
				var queue = [];
				var animX = 0;
				queue.push(root);
				while (queue.length !== 0) {
					var element = queue.shift();
					visitElement(element, animX);
					animX = animX + 1;
					if (element.children !== undefined) {
						for (var i = 0; i < element.children.length; i++) {
							queue.push(element.children[i]);
						}
					}
				}
			};
			var resetTraversal = (root) => {
				//d3.selectAll(".node").classed("visited",false);
				d3.selectAll(".node")
					.transition()
					.duration(500)
					.style("fill", "#fff")
					.style("stroke", "steelblue");
			} */
		});
	};
}
export default Tree;
