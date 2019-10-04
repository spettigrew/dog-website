import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'

class App extends Component {
  constructor() {
    super()
    this.state = {
      breed: 'husky', 
      images: []
    }
  }

  handleChange = (event) => {
    this.setState({
      breed: event.target.value
    })
  }

  componentDidMount() {
   this.fetchDogImages()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.breed !== this.state.breed) {
        
    this.setState({
      images: []
    })
    this.fetchDogImages()
   }
  }

// ----- same idea -----
    //   useEffect(() => {
    // 
    //   }, [breed])
    //

  fetchDogImages = () => {
    axios.get(`https://dog.ceo/api/breed/${this.state.breed}/images`)
      .then(result => {
        this.setState({
          images: result.data.message
        })
      })
      .catch(error => {
        console.log('error:', error)
      })
  }

  render() {
    return (
      <PicStyles>
      <h1>The Dog Website</h1>

      <select> value={this.state.breed} onChange={this.handleChange}>
        <option value="husky">Husky</option>
          <option value="beagle">Beagle</option>
          <option value="chow">Chow</option>
          <option value="spaniel">Spaniel</option>
      </select>

      <div>
        {this.state.images.map((image, index) => (
          <img key={index} src={image} alt="Dogs" />
        ))}
      </div>
      </PicStyles>
    )
  }
}


export default App;


const PicStyles = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    .picture{
      width: 400px;
      height: 400px;
      margin: 10px;
    }
`;