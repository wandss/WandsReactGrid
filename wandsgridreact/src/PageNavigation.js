import React from 'react';

export class PageNavigation extends React.Component{
  constructor(props){
    super(props);
    this.state={totalPages:this.props.pages, btnsArray:[], fullArray:[],
      activePage:1};
    this.createPagesArray=this.createPagesArray.bind(this);
  }
  createPagesArray(){
    const size = this.state.totalPages;
    let btnsArray = []
    for(let i=1;i<=size; i++){
      btnsArray.push(i)
    }
    const fullArray=btnsArray.slice();
    if(btnsArray.length>10){
      btnsArray=btnsArray.slice(0, 5);
      btnsArray.push('>>')
    }
    this.setState({btnsArray:btnsArray, fullArray:fullArray})
  }
  navigate(btnValue){
    const navigation={btns:this.state.btnsArray,page:btnValue};
    if(btnValue==='>>'){
      const starts = navigation.btns[navigation.btns.length-2];
      navigation.btns=this.state.fullArray.slice(starts, starts+5);

      if(navigation.btns[navigation.btns.length-1] < this.state.totalPages){
        navigation.btns.push('>>');
      }
      navigation.btns.unshift('<<');
      navigation.page=starts+1;
    }
    else if(btnValue==='<<'){
      const ends = navigation.btns[1]-1;
      navigation.btns=this.state.fullArray.slice(ends-5, ends);
      if(navigation.btns[navigation.btns.length-1]){
        navigation.btns.push('>>');
      }
      if(navigation.btns[0]!==1){
        navigation.btns.unshift('<<');
      }
      navigation.page=ends;
    }
    return navigation;
  }
  handleClick(e){
    if(this.state.activePage.toString()!==e.target.id.toString()){
      const navigation = this.navigate(e.target.id);
      this.setState({activePage:navigation.page, btnsArray:navigation.btns});
      this.props.getPage(navigation.page);
    }
  }
  componentDidMount(){
    this.createPagesArray()
  }
  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.totalPages!==nextProps.pages){
      return {totalPages:nextProps.pages, btnsArray:prevState.btnsArray}
    }
    return null

  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.state.totalPages!==prevState.totalPages){
      this.createPagesArray()
    }
  }
  render(){
    function setStyle(activePage, btn){
      const style={color:activePage.toString()===btn.toString()?'blue':'',
        fontSize:activePage.toString()===btn.toString()?'1.6rem':'',
        fontWeigth:activePage.toString()===btn.toString()?'bold':'',
        transition:'all ease 0.3s',
      };
      return style;
    }
    const btnStyle={outline:'none'}
    const btns=this.state.btnsArray.map((btn)=>
      <button onClick={this.handleClick.bind(this)}
       key={btn} id={btn}
       style={{...setStyle(this.state.activePage, btn), ...btnStyle}}
      >
        {btn}
      </button>
    );
    return(
      <div>
        {btns}
      </div>
    )
  }
}
/*TODO:
 * Create a button to go to the last and first pages "|< >|"
 * Customize button style
 * Add Effects (transition)
 * Add PropTypes
 *
 */
