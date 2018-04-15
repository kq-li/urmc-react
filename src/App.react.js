// @flow
import * as React from 'react';
import * as axios from 'axios';

import BreedSearch from './components/BreedSearch.react';

class App extends React.Component<void, void> {
  apiUrl: string = 'https://dog.ceo/api';
  
  searchBreeds = (query: string): string[] => {
    return axios
      .get(`${this.apiUrl}/breeds/list/all`)
      .then(response => {
        const data = response.data.message;
        const breeds = [];

        for (let breed in data) {
          if (data[breed].length == 0) {
            if (breed.includes(query))
              breeds.push(breed);
          } else {
            for (let subbreed of data[breed]) {
              const s = subbreed + ' ' + breed;
              if (s.includes(query)) {
                breeds.push(s);
                if (breeds.length >= 5) break;
              }
            }
          }

          if (breeds.length >= 5) break;
        }

        console.log(breeds);
        return breeds.slice(0, 5);
      });
  };
  
  render(): React.Element<any> {
    return (
      <div>
        <h1>Search dog breeds</h1>
        <BreedSearch searchBreeds={this.searchBreeds} />
      </div>
    );
  }
}

export default App;
