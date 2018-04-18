// @flow
import * as React from 'react';

import type {Breed} from '../common/types';

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

  handleInput = (e: Object) => {
    const query = e.target.value;
    this.setState({query});

    this.props.searchBreeds(query).then((breeds: Breed[]) => {
      this.setState({breeds});
    });
  };

  render(): React.Element<any> {
    return (
      <div>
        <input type="text" onChange={this.handleInput} />
        <ul>
          {this.state.breeds.map((breed: Breed) =>
            <li key={breed.name}>{breed.name}</li>)}
        </ul>
      </div>
    );
  }
}

export default BreedSearch;
