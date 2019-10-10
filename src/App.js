import React, { Component } from "react";
import FruitCard from "./components/FruitCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import fruits from "./fruits.json";
import Jumbotron from "./components/Jumbotron";

class App extends Component {
  state = {
    fruits,
    clickedId: [],
    message: "",
    count: 0,
    topScore: 0,
    showGame: false
  };

  handleStart = () => {
    this.setState({showGame: true});
  }

  shuffleFruits = () => {
    return this.state.fruits.sort(() => Math.random() - 0.5);
  }

  //While I have worked on several projects that required API integration, database management through mySQL and MongoDB, and other third-party integrations, I personally take pride in this memory game project I built from scratch using React and ES6. 
  //I am particularly proud of creating my own shuffle function (highlighted) that shuffles all the fruit cards after each selection and they way I keep score 
    // Current Score which keeps track of each unique selection and Top Score which is the longest consecutive selection of unique fruits.

  handleClick = (id, name) => {
    const winningScore = 12;
    let clickedIdCopy = this.state.clickedId;

   if (clickedIdCopy.includes(id)){
      let tempCount = this.state.count;
      let tempTopScore = this.state.topScore;
      if (tempCount > tempTopScore){
        tempTopScore = tempCount;
      }
      clickedIdCopy = [];
      let shuffledFruits = this.shuffleFruits();
      this.setState({ 
        message: `You already clicked ${name}. You lose`,
        count: 0,
        clickedId: clickedIdCopy,
        topScore: tempTopScore,
        shuffledFruits
      })
    }
    else {
      const newClicked = this.state.clickedId;
      let newCount = this.state.count + 1;
      let shuffledFruits = this.shuffleFruits();
      newClicked.push(id);
      this.setState({ 
        clickedId: newClicked,
        message: `You just clicked ${name}`,
        count: newCount,
        shuffledFruits 
      }); 
    }
    if (clickedIdCopy.length === winningScore){
      let tempCount = this.state.count + 1;
      let shuffledFruits = this.shuffleFruits();
      clickedIdCopy = [];
      this.setState({ 
        message: `You Won! Click any fruit to play again!`,
        topScore: tempCount,
        count: 0,
        clickedId: clickedIdCopy,
        shuffledFruits
      });
    }
  }
  render() {
    return (
      <div>
        <Title count={this.state.count} topScore={this.state.topScore} message={this.state.message}>Clicky Fruits</Title>
        <Jumbotron handleStart={this.handleStart} showGame={this.state.showGame}/>
        <Wrapper showGame = {this.state.showGame}>
        {this.state.fruits.map(fruit => (
          <FruitCard
            handleClick={this.handleClick}
            id={fruit.id}
            key={fruit.id}
            image={fruit.image}
            name={fruit.name}
          />
        ))}
        </Wrapper>
      </div>
    );
  } 
}
export default App;
