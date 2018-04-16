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
  imageUrl: ?string
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
      imageUrl: null
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
    const breedUrlFrag = subbreed ? breed + '/' + breed : breed;
    console.log(breedUrlFrag);
    return axios
      .get(`${this.apiUrl}/breed/${breedUrlFrag}/images/random`)
      .then(response => response.data.message);
  }

  selectBreed = (selectedBreed: Breed) => {
    console.log('setting state');
    this.setState({selectedBreed});
    this.fetchImageUrl(selectedBreed).then(imageUrl => {
      this.setState({imageUrl});
    });
  };

  
  render(): React.Element<any> {
    return (
      <div>
        <h1>Search dog breeds</h1>
        <BreedSearch searchBreeds={this.searchBreeds}
                     selectBreed={this.selectBreed} />
        {
          this.state.selectedBreed
          ? (
            <div>
              <h1>Currently selected breed: {this.state.selectedBreed.name}</h1>
              {
                this.state.imageUrl
                ? <BreedDisplay imageUrl={this.state.imageUrl} />
                : null
              }
            </div>
          ) : null
        }
      </div>
    );
  }
}

export default App;
