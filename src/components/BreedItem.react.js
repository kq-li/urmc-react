// @flow
import * as React from 'react';

import type {Breed} from '../common/types';

type Props = {
  breed: Breed
}

class BreedItem extends React.Component<Props, void> {
  props: Props;

  constructor(props: Props) {
    super(props);
  }

  render(): React.Element<any> {
    return (
      <div>
        {this.props.breed.name}
      </div>
    );
  }
}

export default BreedItem;
