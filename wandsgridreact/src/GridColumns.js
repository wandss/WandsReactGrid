import React from 'react';

export class GridColumns extends React.Component{
  constructor(props){
    super(props);
    this.state={isHovering:false,
        clickedOn:false,
    };
  }
  hover(){
    this.setState({isHovering:!this.state.isHovering});
  }
  handleClick(e){
    this.props.onClick(e);
    this.setState({clickedOn:!this.state.clickedOn})
  }
  shouldComponentUpdate(prevProps, prevState){
    if(prevState.isHovering!==this.state.isHovering){
      return false
    }
    return true
  }
  render(){
    const hiddenColumns=this.props.hiddenColumns;
    const headerStyle={cursor:'pointer',
      textShadow:this.state.isHovering?'1px 5px 6px black':'1px 1px 1px gray',
      transition:'all ease-in-out .45s',
      background:'linear-gradient(#333 4%, #06A 95%, white 1%)',
      color:'#EEE',
    }
    const sortIcon=this.state.clickedOn?
        'fa fa-sort-up':'fa fa-sort-down';
    const colName=this.props.colName;
    return(
      colName!=='rowColor'&&hiddenColumns.indexOf(colName)===-1?(
        <th onClick={this.handleClick.bind(this)}
         style={headerStyle}
         id={this.props.colName}
         onMouseEnter={this.hover.bind(this)}
         onMouseLeave={this.hover.bind(this)}
        >
          <div onDoubleClick={this.props.getColumnName}
           id={this.props.colName}
          >
             <i className={sortIcon}></i>
              {this.props.colName}
          </div>
        </th>):null
    )
  }
}
GridColumns.defaultProps={
  hiddenColumns:['rowColor'],
}
/*TODO
 * Controll unecessary rerendering
 */
