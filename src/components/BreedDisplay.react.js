// @flow
import * as React from 'react';

import type {Breed} from '../common/types';

type Props = {
  imageUrl: string
};

class BreedDisplay extends React.Component<Props, any> {
  render(): React.Element<any> {
    const url = this.props.imageUrl;
    return (
      <div>
      {
        url ? <img src={url} /> : null
      }
    </div>
    );
  }
}

export default BreedDisplay;
