import React from 'react';
import PropTypes from 'prop-types';
import {GridColumns} from './GridColumns';
import {GridRows} from './GridRows';
import {Input} from './Input';

export class GridComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={sortedBy:'', gridData:this.props.gridData,
      getSelectedRowId:this.props.getRowId,
      getRow:this.props.getRow, filter:"",
      originalGrid:[], cols:[],
    };
    this.headerSort = this.headerSort.bind(this);
  }
  headerSort(e){
    const columnName = e.target.id;
    const reverse = columnName === this.state.sortedBy;
    let newGridData = this.state.gridData.concat();
    if(reverse) {
      newGridData.reverse((a,b)=>{
          if(a[columnName] > b[columnName]){
              return 1;
          }
          if(a[columnName] < b[columnName]){
              return -1;
          }
          else{
              return 0;
          }
      });
    }
    else{
      newGridData.sort((a,b)=>{
          if(a[columnName] > b[columnName]){
              return 1;
          }
          if(a[columnName] < b[columnName]){
              return -1;
          }
          else{
              return 0;
          }
      });
    }
    this.setState({sortedBy:columnName, gridData:newGridData});
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.gridData !== this.props.gridData){
          this.setState({gridData:nextProps.gridData,
            cols:Object.keys(nextProps.gridData[0]),
            originalGrid:nextProps.gridData,
          });
      }
  }
  componentDidMount(){
    this.setState({
      originalGrid:this.state.gridData.slice(),
      cols:Object.keys(this.state.gridData.slice()[0])
    });
  }
  filterData(e){
    this.setState({filter:e.target.value});
    const gridData=this.state.gridData.slice();
    const cols = this.state.cols;
    const filteredData=gridData.filter(item=>{
      const result=cols.map(col=>{
        if(item[col]!==null){
          if(item[col].toString().toLowerCase()===e.target.value.toLowerCase()){
            return col
          }
          return undefined
        }
        return undefined
      })

      if(result.filter(res=>res!==undefined).length>0){
        return item;
      }

      return undefined
      }
    );

    if(filteredData.length>0){
      this.setState({gridData:filteredData});
    }
    else{
      this.setState({gridData:this.state.originalGrid.slice()})
    }
  }
  render(){
    const cols = this.state.cols
    const header = cols.map((item, index)=>
        <GridColumns key={index} colName={item}
         onClick={(item)=>this.headerSort(item)}
        />
    );
    const rows = this.state.gridData.map(row=>
        <GridRows key={row.id} row={row}
          getRowId={this.state.getSelectedRowId}
          getRow={this.state.getRow}
        />
    );
    const input =this.props.searchField?(
      <Input type="text"
       name="filter"
       value={this.state.filter}
       onChange={this.filterData.bind(this)}
      />):null;
    return(
      <div>
      {input}
        <table className={"table "+this.props.cssClass}>
          <thead>
            <tr>
              {header}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }
}

GridComponent.defaultProps={
    gridData:[
        {id:1,Artist:'Silverchair','Genre':'Rock','Albums':['Diorama','Frog Stomp']},
        {id:2,Artist:'Led Zeppelin','Genre':'Rock','Albums':'The Song Remains the Same'},
        {id:3,Artist:'Pink Floyd','Genre':'Progressive','Albums':['The Wall','The Darks Side of the Moon']},
        {id:4,Artist:'Queen','Genre':'Rock','Albums':['Killer Queen']},
    ]
}
GridComponent.propTypes={
  gridData:PropTypes.array.isRequired,
  getRowId:PropTypes.func,
  getRow:PropTypes.func,
  searchField:PropTypes.bool,
  cssClass:PropTypes.string,
}
/*TODO
 * Allow search to match by character. Rigth now its is
 *  matching only the whole word.
 * When data came from Array, they're not been filtered.
 * ADD Footer to GRID
 * ADD Pagination and Navigation
 * ADD Icons for sorting
 * Creates Method to Hide Column?
 */
