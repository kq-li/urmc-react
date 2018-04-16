// @flow
import * as React from 'react';

import type {Breed} from '../common/types';

type Props = {
  breed: Breed,
  selectBreed: Breed => any
}

class BreedItem extends React.Component<Props, any> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  handleClick = (e: Object) => {
    this.props.selectBreed(this.props.breed);
  };
  
  render(): React.Element<any> {
    return (
      <div onClick={this.handleClick}>
        {this.props.breed.name}
      </div>
    );
  }
}

export default BreedItem;
