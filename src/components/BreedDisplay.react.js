// @flow
import * as React from 'react';

import type {Breed} from '../common/types';

type Props = {
  breed: Breed,
  image: ?Object,
  invalidated: boolean
};

class BreedDisplay extends React.Component<Props, any> {
  render(): React.Element<any> {
    const className = `breed-display ${this.props.invalidated ? 'invalid' : ''}`;
    return (
      <div className={className}>
        <h2>Currently selected: {this.props.breed.name}</h2>
        {
          this.props.image ? this.props.image : null
        }
    </div>
    );
  }
}

export default BreedDisplay;
