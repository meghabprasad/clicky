import React, { Component } from "react";
import FruitCard from "./components/FruitCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import fruits from "./fruits.json";
import Jumbotron from "./components/Jumbotron";

class App extends Component {
  // Setting this.state.fruits to the fruits json array
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

  handleClick = (id, name) => {

    //check to see if they have clicked this card. 
      let clickedIdCopy = this.state.clickedId;
      console.log(clickedIdCopy);

      if (clickedIdCopy.includes(id)){
        //If they have clicked, send message
        this.setState({ message: `You already clicked ${name}. You lose`});
        let tempCount = this.state.count;
        //only change topScore if the tempCount is greater than topScore 
        //if (tempCount > this.state.count){this.setState({ topScore: tempCount})};
        this.setState({ topScore: tempCount});
        this.setState({ count: 0 })
        clickedIdCopy = [];
        this.setState({ clickedId : clickedIdCopy });
        let shuffledFruits = this.state.fruits.sort(() => Math.random() - 0.5);
        this.setState({ shuffledFruits });
      } 
        //else add the id of the card to the clickedId array

      else {
        const newClicked = this.state.clickedId;
        newClicked.push(id);
        this.setState({ clickedId: newClicked});
        this.setState({ message: `You just clicked ${name}`});
        let newCount = this.state.count + 1;
        this.setState({count: newCount});
        let shuffledFruits = this.state.fruits.sort(() => Math.random() - 0.5);
        this.setState({ shuffledFruits });
      }

      if (clickedIdCopy.length === 12){
        this.setState({ message: `You Won! Click any fruit to play again!`});
        let tempCount = this.state.count + 1;
        this.setState({ topScore: tempCount});
        this.setState({ count: 0 })
        clickedIdCopy = [];
        this.setState({ clickedId : clickedIdCopy });
        let shuffledFruits = this.state.fruits.sort(() => Math.random() - 0.5);
        this.setState({ shuffledFruits });
      }
  }

  // Map over this.state.fruits and render a fruitCard component for each fruit object
  render() {
    return (
      <div>
      <Title count={this.state.count} topScore={this.state.topScore} message={this.state.message}>Clicky Fruits</Title>
      <Jumbotron handleStart={this.handleStart} showGame={this.state.showGame}/>
      <Wrapper showGame = {this.state.showGame}>
        {/* <h1>{this.state.message}</h1>
        <h1>Current Count: {this.state.count}</h1>
        <h1>Top Score: {this.state.topScore}</h1> */}
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
