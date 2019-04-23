import * as React from 'react';
import { List } from 'react-native-paper';

const listItem = () => (
  <List.Item
    title="First Item"
    description="Item description"
    left={props => <List.Icon {...props} icon="folder" />}
  />
);

export default listItem;