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
  render(){
    const headerStyle={cursor:'pointer',
      textShadow:this.state.isHovering?'1px 5px 6px black':'1px 1px 1px gray',
      transition:'all ease-in-out .45s',
      background:'linear-gradient(#333 4%, #06A 95%, white 1%)',
      color:'#EEE',
    }
    const sortIcon=this.state.clickedOn?
        'fa fa-sort-up':'fa fa-sort-down';
    return(
      this.props.colName!=='rowColor'?(
        <th onClick={this.handleClick.bind(this)}
         style={headerStyle}
         id={this.props.colName}
         onMouseEnter={this.hover.bind(this)}
         onMouseLeave={this.hover.bind(this)}
        >
         <i className={sortIcon}></i>
          {this.props.colName}
        </th>):null
    )
  }
}
