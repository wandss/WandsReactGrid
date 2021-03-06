import React from 'react';
import PropTypes from 'prop-types';
import {GridColumns} from './GridColumns';
import {GridRows} from './GridRows';
import {Input} from './Input';

export class GridComponent extends React.Component{
  constructor(props){
    super(props);
    this.state={sortedBy:'', gridData:this.props.gridData,
      filter:"", originalGrid:[], cols:[],hiddenColumns:[],
      showButtons:false,
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
    if(value!==undefined && value !==null){
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
      if(isNaN(Number(value))&&value.length>=10){
        value = new Date(value).toLocaleString()==='Invalid Date'?
          value:new Date(value).toLocaleString()
      }
      if(value === 'true'){
        value = this.props.trueValueProps.text===true?
          'true':(
          <i className={this.props.trueValueProps.cssClass}
           style={{color:this.props.trueValueProps.color}}
          >
            {this.props.trueValueProps.text}
          </i>
        );
      }
      if(value==='false'){
        value = this.props.falseValueProps.text===false?
          'false':(
          <i className={this.props.falseValueProps.cssClass}
           style={{color:this.props.falseValueProps.color}}
          >
            {this.props.falseValueProps.text}
          </i>
        );
      }
    }
    return value;
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.gridData!==this.props.gridData){
      const gridData=nextProps.gridData.concat();
      const wGrid=this.renameColumns(gridData, nextProps.renameColumns);
      this.removeColumns(wGrid,this.props.removeColumns);
      const wCols=Object.keys(wGrid[0]);
      wCols.map((col)=>wGrid.map((row)=>
        row[col]=this.gridTypeFormating(row[col])
      ));
      const hiddenColumns=nextProps.hiddenColumns!==undefined?
        this.props.hiddenColumns:[];

      this.setState({gridData:wGrid,
        cols:wCols,originalGrid:wGrid,
        hiddenColumns:hiddenColumns,
      });
    }
  }
  renameColumns(grid, customCols){
    if(customCols!==undefined){
      grid.forEach((item)=>
        Object.keys(item).forEach((oldName)=>
          Object.keys(customCols).forEach((key)=>{
            if(key===oldName){
              item[customCols[key]]=item[key];
              delete(item[key]);
            }
          }
          )
        )
      )
    }
    return(grid)
  }
  removeColumns(grid, cols){
    if(cols!==undefined){
      grid.forEach((item)=>
        Object.keys(item).forEach((key)=>{
          if(cols.indexOf(key)!==-1){
            delete(item[key])
          }
        })
      )
    }
  }

  componentDidMount(){
    const gridData=this.props.gridData.concat();
    const wGrid=this.renameColumns(gridData, this.props.renameColumns);
    this.removeColumns(wGrid,this.props.removeColumns);

    const wCols=Object.keys(wGrid[0])
    wCols.map((col)=>wGrid.map((row)=>
      row[col]=this.gridTypeFormating(row[col])
    ))
    const hiddenColumns=this.props.hiddenColumns!==undefined?
      this.props.hiddenColumns:[];

    this.setState({
      originalGrid:wGrid.slice(),
      cols:wCols,
      hiddenColumns:hiddenColumns
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
  toggleColumns(e){
    let hidden=this.state.hiddenColumns.slice()
    if(hidden.indexOf(e.target.id)===-1){
      hidden.push(e.target.id)
    }
    else{
      hidden=hidden.filter((col)=>col!==e.target.id);
    }
    this.setState({hiddenColumns:hidden, showButtons:true})
  }
  render(){
    const cols = this.state.cols
    const header = cols.map((item, index)=>
        <GridColumns key={index} colName={item}
         sortBy={(item)=>this.headerSort(item)}
         getColumnName={this.toggleColumns.bind(this)}
         hiddenColumns={this.state.hiddenColumns}
        />
    );
    const rows = this.state.gridData.map((row, index)=>
        <GridRows key={index} row={row}
          getRowId={this.props.getRowId}
          getRow={this.props.getRow}
          rowColor={row.rowColor!==undefined?
            row.rowColor:'#3567FA'}
          hiddenColumns={this.state.hiddenColumns}
        />
    );
    const input =this.props.searchField?(
      <Input type="text"
       name="filter"
       value={this.state.filter}
       onChange={this.filterData.bind(this)}
      />):null;
    const showColumns=this.state.hiddenColumns.length>0&&this.state.showButtons?(
      this.state.hiddenColumns.map((col)=>
        <button key={col} id={col}
         onClick={this.toggleColumns.bind(this)}
        >
          {col}
        </button>
      )
    ):null;

    return(
      <div>
      {input}
      {showColumns}
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
       'Albums':['Diorama','Frog Stomp',],Price:'R$22.99',Stars:-5,date:'2018-04-12T16:55:39.131Z',
        sold_out:true,rowColor:'red'
      },
      {id:2,Artist:'Led Zeppelin','Genre':'Rock',
       'Albums':'The Song remains the Same',Price:'R$59.99',Stars:-4,date:'',sold_out:false},
      {id:3,Artist:'Pink Floyd','Genre':'Progressive',
       'Albums':['The Wall','The Dark Side of the Moon'],Price:'R$49.99', Stars:4,date:'',sold_out:false},
      {id:4,Artist:'Queen','Genre':'Rock',
       'Albums':['Killer Queen'],Price:'R$59.99',Stars:2,date:'',sold_out:false},
      {id:5,Artist:'QOTSA','Genre':'Rock',
       'Albums':'Songs for the Deaf',Price:'R$19.99', Stars:1, date:'',sold_out:false},
      {id:11,Artist:'Foo Fighters','Genre':'Rock',
       'Albums':'One By One',Price:'R$36.99',Stars:-1,date:'',sold_out:false, rowColor:'#049'},
      {id:7,Artist:'Steve Vai','Genre':'Instrumental',
       'Albums':'The 7Th Song',Price:'R$21', Stars:-2,date:'',sold_out:false, rowColor:'magenta'},
      {id:77,Artist:'Portishead','Genre':'Trip Rock',
        'Albums':'Roseland NYC live',Price:'R$33.99', Stars:3, date:'', sold_out:true, rowColor:'pink'},
      {id:42,Artist:'Massive Atack','Genre':'Trip Rock',
       'Albums':'Mezzanine',Price:'R$18.65', Stars:2.75, date:'1984-09-22', sold_out:true, rowColor:'black'}
    ],
  trueValueProps:{cssClass:'', text:true, color:''},
  falseValueProps:{cssClass:'', text:false, color:''}
}
GridComponent.propTypes={
  gridData:PropTypes.array.isRequired,
  getRowId:PropTypes.func,
  getRow:PropTypes.func,
  searchField:PropTypes.bool,
  cssClass:PropTypes.string,
  hiddenColumns:PropTypes.array,
  renameColumns:PropTypes.object,
  removeColumns:PropTypes.array,
}
/*TODO
 * Fix:
 *   Responsiveness. On small screen, grid is overflowing
 *
 *
 * Review unnecessairy state
 * Check and format number, currency, dates and datetimes...
 * ADD Footer to GRID
 * ADD method to sum values and show at the Footer
 * ADD Pagination and Navigation
 * ADD Icons for sorting
 * Create a Component to show help on usage.
 * ADD method to 'capitalize' column names?
 * ADD method to 'auto' rename column names like:
 *  "watched_movies" to "Watched Movies", "Artist_Name" to "Artist Name" ...
 */
