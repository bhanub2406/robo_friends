import React, {Component} from 'react';
import CardList from '../components/CardList.js';
import RoboSearchBox from '../components/RoboSearchBox.js';
import './App.css';
import Scroll from '../components/Scroll.js';
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState ({robots: users}));
        
    }
    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }
    render(){
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        return (!filteredRobots.length) ? 
                <h1>Loading</h1> :
                <div className = "tc">
                    <h1 className = 'f1'>Robo Friends</h1>
                    <RoboSearchBox searchChange = {this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = {filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
    };
}

export default App;