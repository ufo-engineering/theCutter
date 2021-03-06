import React, { Component } from 'react';
import '../css/App.css';

import LnksActions from '../actions/LnksActions';
import LnksStore from '../stores/LnksStore';
import LinkAdder from './LinkAdder.jsx';
import LinksGrid from './LinksGrid.jsx';



function getFluxState(){
  console.log(LnksStore.getLnks());
  return{
    isLoading: LnksStore.isLoading(),
    lnks: LnksStore.getLnks()
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = getFluxState();    
    this._onChange = this._onChange.bind(this);  
  }
 
  componentWillMount(){
    LnksActions.loadLnks(); 
  }  
  componentDidMount(){
    LnksStore.addChangeListener(this._onChange);
  }
  componentWillUnmount(){
    LnksStore.removeChangeListener(this._onChange); 
  }  
  handleLinkAdd(data){
    LnksActions.createLnks(data); 
  }
  handleLinkDelete(id){
    LnksActions.deleteLnk(id); 
  }  
  render() {
    return (
      <section className="App">
        <header>
          <div className="container">
            <div className="col-sm-5">
              <a id="logo" alt="logo"></a>
              <h1 className="App-title">the cutter <a>by ufo-engineering</a></h1>
            </div>
            <div className="col-sm-7 text-right">
              <button className="green-btn _main">Sign in</button>
              <button className="blue-btn _main">Sign up</button>
            </div>
          </div>
        </header>
        <div id="content" className="container">
          <LinkAdder onLinkAdd={this.handleLinkAdd}/>
          <LinksGrid lnks={this.state.lnks} onLnkDelete={this.handleLinkDelete}/>
        </div>
      </section>
    );
  }
  _onChange(){
    this.setState(getFluxState());
  }
}

export default App;
