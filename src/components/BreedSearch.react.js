// @flow
import * as React from 'react';

import type {Breed} from '../common/types';

import BreedItem from './BreedItem.react';

type Props = {
  searchBreeds: string => Breed[],
  selectBreed: Breed => any
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
    this.setState({
      query,
      breeds: this.props.searchBreeds(query)
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
              <BreedItem key={breed.name} breed={breed}
                         selectBreed={this.props.selectBreed} />)
          }
        </div>
      </div>
    );
  }
}

export default BreedSearch;
