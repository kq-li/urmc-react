// @flow
import * as React from 'react';

import type {Breed} from '../common/types';

import BreedItem from './BreedItem.react';

type Props = {
  searchBreeds: string => Promise<Breed[]>
};

type State = {
  query: string,
  breeds: Breed[]
};

class BreedSearch extends React.Component<Props, State> {
  props: Props;
  state: State;
  
  constructor(props: Props) {
    super(props);
    
    this.state = {
      query: '',
      breeds: []
    };
  }

  handleInput = (event: Object) => {
    const query = event.target.value;
    this.setState({query});
    this.props.searchBreeds(query).then((breedNames: string[]) => {
      const breeds = breedNames.map(name => ({name}));
      this.setState({breeds});
    });
  };
  
  render(): React.Element<any> {
    return (
      <div>
        <input
            type="text"
            name="query"
            value={this.state.query}
            onChange={this.handleInput} />
        <div>
          {
            this.state.breeds.map((breed: Breed) => 
              <BreedItem key={breed.name} breed={breed} />)
          }
        </div>
      </div>
    );
  }
}

export default BreedSearch;
