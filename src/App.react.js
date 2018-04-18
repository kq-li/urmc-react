// @flow
import * as React from 'react';
import * as axios from 'axios';

import BreedSearch from './components/BreedSearch.react';

import type {Breed} from './common/types';

type Props = {};
type State = {};

class App extends React.Component<Props, State> {
  props: Props;
  state: State;

  searchBreeds = (query: string): Promise<Breed[]> => {
    return axios.get('https://dog.ceo/api/breeds/list/all').then(response => {
      return Object.keys(response.data.message)
                   .filter(name => name.includes(query))
                   .slice(0, 10).map(name => ({name}));
    });
  };

  render(): React.Element<any> {
    return <BreedSearch searchBreeds={this.searchBreeds} />;
  }
}

export default App;
