// @flow
import * as React from 'react';
import * as axios from 'axios';

import BreedSearch from './components/BreedSearch.react';
import BreedDisplay from './components/BreedDisplay.react';
import type {Breed} from './common/types';

type Props = {};

type State = {
  breeds: Breed[],
  selectedBreed: ?Breed,
  image: ?Object,
  invalidated: boolean
};

class App extends React.Component<Props, State> {
  props: Props;
  state: State;
  apiUrl: string = 'https://dog.ceo/api';
  
  constructor(props: Props) {
    super(props);
    this.state = {
      breeds: [],
      selectedBreed: null,
      image: null,
      invalidated: false
    };
  }

  makeBreed(breed: string, subbreed: ?string = null): Breed {
    return {
      breed: breed,
      subbreed: subbreed,
      name: subbreed ? subbreed + ' ' + breed : breed
    };
  }

  componentDidMount() {
    axios
      .get(`${this.apiUrl}/breeds/list/all`)
      .then(response => {
        const data = response.data.message;
        const breeds = [];

        for (let breed in data) 
          if (data[breed].length == 0) 
            breeds.push(this.makeBreed(breed));
        else 
          for (let subbreed of data[breed]) 
            breeds.push(this.makeBreed(breed, subbreed));

        this.setState({breeds});
      });    
  }

  searchBreeds = (query: string): Breed[] => {
    return query.length == 0
         ? []
         : this.state.breeds
               .filter(({name}: Breed) => name.includes(query))
               .slice(0, 5);
  };

  fetchImageUrl({breed, subbreed}: Breed): Promise<string> {
    const breedUrlFrag = subbreed ? breed + '/' + subbreed : breed;
    return axios
      .get(`${this.apiUrl}/breed/${breedUrlFrag}/images/random`)
      .then(response => response.data.message);
  }

  validate = () => {
    this.setState({
      invalidated: false
    });
  };

  selectBreed = (selectedBreed: Breed) => {
    this.setState({
      selectedBreed,
      invalidated: true
    });
    this.fetchImageUrl(selectedBreed).then(imageUrl => {
      this.setState({
        image: <img src={imageUrl} onLoad={this.validate} />
      });
    });
  };
  
  render(): React.Element<any> {
    return (
      <div>
        <h1>Dogg</h1>
        <h3>Search breeds</h3>
        <BreedSearch searchBreeds={this.searchBreeds}
                     selectBreed={this.selectBreed} />
        {
          this.state.selectedBreed && this.state.image 
          ? <BreedDisplay image={this.state.image}
                          breed={this.state.selectedBreed}
                          invalidated={this.state.invalidated} />
          : null
        }
      </div>
    );
  }
}

export default App;
