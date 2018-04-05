import React from "react";
import ReactDOM from 'react-dom';
import {GridComponent} from './GridComponent';

class Index extends React.Component{
  rowId(id){
    console.log(id)
  }
  row(row){
    console.log(row)
  }
  render(){
    return(
      <div>
        <GridComponent searchField
         getRowId={this.rowId}
         getRow={this.row}
        />
      </div>
    )
  }
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
