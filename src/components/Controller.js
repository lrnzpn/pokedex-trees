import React, { Component } from 'react';
// import RadialTree from './RadialTree';
import TreeTraversal from './TreeTraversal';
// import Tree from './Tree';
// import DFSTree from './TreeGenerate/DFSTree';
// import ForceLayout from './ForceLayout';

class Controller extends Component {

    onSubmit = (evt) => {
        evt.preventDefault();
        
    }

    render () {
        return(
            <div className="controller">
                <form>
                    {/* <button className="bfs" >BFS Tree</button>
                    <button className="dfs" >DFS Tree</button>
                    <button className="reset" >Reset</button> */}
                </form>
                {/* <RadialTree /> */}
                <TreeTraversal />
            </div>
        );
    }
}

export default Controller