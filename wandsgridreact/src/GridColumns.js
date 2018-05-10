import React from 'react';
import PropTypes from 'prop-types';

export class GridColumns extends React.Component{
  constructor(props){
    super(props);
    this.state={isHovering:false,
        clickedOn:false,
    };
  }
  hover(e){
    const isHovering=e.type==='mouseenter'||e.type==='ontouchstart'
      ?true:false;
    this.setState({isHovering:isHovering});
  }
  handleClick(e){
    this.props.sortBy(e);
    this.setState({clickedOn:!this.state.clickedOn})
  }
  hideColumn(e){
    this.props.getColumnName(e);
    this.setState({isHovering:false});
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
    const hideButtonStyle={
      marginLeft:'1.2rem',
      display:'inline-block',
      opacity:this.state.isHovering?1:0.01,
      fontSize:this.state.isHovering?'':'1rem',
      color:this.state.isHovering?'red':'white',
      transform:this.state.isHovering?'translateY(0px)':'translateY(-10px)',
      transition:'all ease 0.35s',
    };
    const hideButton=(
      <div style={hideButtonStyle}
      >
        <i className="fa fa-ban" id={colName}
         onClick={this.hideColumn.bind(this)}
        >
        </i>
      </div>
    );
    return(
      colName!=='rowColor'&&hiddenColumns.indexOf(colName)===-1?(
        <th onClick={this.handleClick.bind(this)}
         style={headerStyle}
         id={colName}
         onMouseEnter={this.hover.bind(this)}
         onMouseLeave={this.hover.bind(this)}
         onTouchStart={this.hover.bind(this)}
        >
          <div onDoubleClick={this.props.getColumnName}
           id={this.props.colName}
          >
             <i className={sortIcon}></i>
            {this.props.colName}
            {hideButton}
          </div>
        </th>):null
    )
  }
}
GridColumns.propTypes={
  colName:PropTypes.string.isRequired,
  getColumnName:PropTypes.func,
  sortBy:PropTypes.func,
  hiddenColumns:PropTypes.array,
}
GridColumns.defaultProps={
  hiddenColumns:['rowColor'],
}
/*TODO
 * Check unecessary rerendering
 */
