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

  handleClick = (id, name) => {
    let clickedIdCopy = this.state.clickedId;
    if (clickedIdCopy.includes(id)){
      this.setState({ message: `You already clicked ${name}. You lose`});
      let tempCount = this.state.count;
      if (tempCount > this.state.topScore){
        this.setState({ topScore: tempCount});
      }
      clickedIdCopy = [];
      let shuffledFruits = this.shuffleFruits();
      this.setState({ 
        count: 0,
        clickedId: clickedIdCopy,
        shuffledFruits
      })
    }
    else {
      const newClicked = this.state.clickedId;
      newClicked.push(id);
      let newCount = this.state.count + 1;
      let shuffledFruits = this.shuffleFruits();
      this.setState({ 
        clickedId: newClicked,
        message: `You just clicked ${name}`,
        count: newCount,
        shuffledFruits 
      });
    }

    let winningScore = 12;
    if (clickedIdCopy.length === winningScore){
      let tempCount = this.state.count + 1;
      clickedIdCopy = [];
      let shuffledFruits = this.shuffleFruits();
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
