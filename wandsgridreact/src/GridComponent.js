import React from 'react';
import PropTypes from 'prop-types';
import {GridColumns} from './GridColumns';
import {GridRows} from './GridRows';
import {Input} from './Input';

export class GridComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={sortedBy:'', gridData:this.props.gridData,
      filter:"", originalGrid:[], cols:[],
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
  gridTypeFormating(value){
    if(value!==undefined){
      if(!isNaN(Number(value))){
        value = value.toLocaleString()
        if(value.length>=10){
          value = new Date(value).toLocaleString()==='Invalid Date'?
            value:new Date(value).toLocaleString()
        }
      }
      if(value.toString().split('$').length>1){
        let newValue = value.toString().split('$');
        const currencySymbol=newValue[0]//.length>0?newValue[0]:'';
        newValue = Number(newValue[newValue.length-1]).toLocaleString();
        return currencySymbol+'$'+newValue
      }
      if(isNaN(Number(value))){
        value = new Date(value).toLocaleString()==='Invalid Date'?
          value:new Date(value).toLocaleString()
      }
    }
    return value;
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
    const wGrid=this.props.gridData.slice()
    const wCols=Object.keys(wGrid[0])
    wCols.map((col)=>wGrid.map((row)=>
      row[col]=this.gridTypeFormating(row[col])
    ))

    this.setState({
      originalGrid:this.state.gridData.slice(),
      cols:Object.keys(this.state.gridData.slice()[0])
    });
  }
  filterData(e){
    this.setState({filter:e.target.value});
    const userSearch=e.target.value.toLowerCase();
    const gridData=this.state.originalGrid.slice();
    const cols = this.state.cols;
    let result = userSearch.length>0?
      cols.map((col)=>gridData.filter((item)=>{
        let words=Array.isArray(item[col])?
          item[col]:[item[col]];
        words=words.filter((word)=>word!==null).filter((word)=>word!==undefined);
        try{
          const pattern = new RegExp(userSearch);
          return words.filter((word)=>
            pattern.test(word.toString().toLowerCase()
            )).length>0?
                item:null;
        }
        catch(err){
          return null;
        }
        })
      ):[];

    let filteredResult=[]
    result.filter((res)=>res.length>0).map((item)=>
      item.map((obj)=>filteredResult.push(obj))
    )
    result = filteredResult.filter((item, index,arr)=>arr.indexOf(item)===index)

    result!==undefined&&result.length>0?
      this.setState({gridData:result}):
      this.setState({gridData:this.state.originalGrid.slice()})
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
          getRowId={this.props.getRowId}
          getRow={this.props.getRow}
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
      {id:1,Artist:'Silverchair','Genre':'Rock',
       'Albums':['Diorama','Frog Stomp',],Price:'R$22.99',Stars:-5,date:'2018-04-12T16:55:39.131Z'},
      {id:2,Artist:'Led Zeppelin','Genre':'Rock',
       'Albums':'The Song remains the Same',Price:'R$59.99',Stars:-4,date:''},
      {id:3,Artist:'Pink Floyd','Genre':'Progressive',
       'Albums':['The Wall','The Dark Side of the Moon'],Price:'R$49.99', Stars:4,date:''},
      {id:4,Artist:'Queen','Genre':'Rock',
       'Albums':['Killer Queen'],Price:'R$59.99',Stars:2,date:''},
      {id:5,Artist:'QOTSA','Genre':'Rock',
       'Albums':'Songs for the Deaf',Price:'R$19.99', Stars:1},
      {id:11,Artist:'Foo Fighters','Genre':'Rock',
       'Albums':'One By One',Price:'R$36.99',Stars:-1,date:''},
      {id:7,Artist:'Steve Vai','Genre':'Instrumental',
       'Albums':'The 7Th Song',Price:'R$21', Stars:-2,date:''},
      {id:77,Artist:'Portishead','Genre':'Trip Rock',
        'Albums':'Roseland NYC live',Price:'R$33.99', Stars:3, date:''},
      {id:42,Artist:'Massive Atack','Genre':'Trip Rock',
       'Albums':'Mezzanine',Price:'R$18.65', Stars:2.75, date:'1984-09-22'},
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
 * Fix:
 *   Since now I'm using RegExp,
 *   handle if user enter an invalid RegExp
 *    first. Probably handle this with try block
 *  Some negative values are not been filtered
 *
 * Review unnecessairy state
 * Check and format number, currency, dates and datetimes...
 * Allow user to pass the color for each line. As a valu in the Object
 *  {..color:'#FFB957'}
 *  do the same for tolltip?
 * ADD Footer to GRID
 * ADD Pagination and Navigation
 * ADD Icons for sorting
 * Creates Method to Hide Column??
 * Create a Component to show help on usage.
 */
