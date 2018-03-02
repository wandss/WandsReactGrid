import React from "react";
import ReactDOM from 'react-dom';
import {GridComponent} from './GridComponent';

class Index extends React.Component{
  render(){
    return(
      <div>
        <GridComponent searchField/>
      </div>
    )
  }
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
