import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstras';

import './Visualizer.css';

let START_NODE_ROW = 10;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 10;
let FINISH_NODE_COL = 35;

let set_start_point = false;
let set_end_point = false;

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
    setTimeout(() => {
      document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).classList.remove('node-shortest-path');
      document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).classList.add('node-start');
      document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).classList.remove('node-shortest-path');
      document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).classList.add('node-finish');
    }, 50 * nodesInShortestPathOrder.length);
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <div className="btn-container">
          <div className="btn-left">
            <button class="button-82-pushable start-vis" onClick={() => this.visualizeDijkstra()}>
              <span class="button-82-shadow"></span>
              <span class="button-82-edge"></span>
              <span class="button-82-front text">
                Start Visualising
              </span>
            </button>
            <button class="button-82-pushable reset-scr" onClick={() => window.location.reload()}>
              <span class="button-82-shadow"></span>
              <span class="button-82-edge"></span>
              <span class="button-82-front text">
                Reset
              </span>
            </button>
          </div>
          <div className="btn-right">
            <button className='button-29' onClick={() => {set_start_point = true}}>Set Start Node</button>
            <button className='button-29' onClick={() => {set_end_point = true}}>Set End Node</button>
          </div>
        </div>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (

                    
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                      
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if(set_start_point === true)
  {
    const prev_start_node = newGrid[START_NODE_ROW][START_NODE_COL];
    const new_prev_start_node = {
      ...prev_start_node,
      isStart: false,
    }
    newGrid[START_NODE_ROW][START_NODE_COL] = new_prev_start_node;

    START_NODE_ROW = row;
    START_NODE_COL = col;
    set_start_point = false;

    const newNode = {
      ...node,
      isStart: true,
    };
    newGrid[row][col] = newNode;
  }
  else if(set_end_point === true)
  {
    const prev_end_node = newGrid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const new_prev_end_node = {
      ...prev_end_node,
      isFinish: false,
    }
    newGrid[FINISH_NODE_ROW][FINISH_NODE_COL] = new_prev_end_node;

    FINISH_NODE_ROW = row;
    FINISH_NODE_COL = col;
    set_end_point = false;

    const newNode = {
      ...node,
      isFinish: true,
    };
    newGrid[row][col] = newNode;
  }
  else
  {
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};