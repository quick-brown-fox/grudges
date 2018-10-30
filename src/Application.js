import React, { Component } from 'react';
import { withAuthenticator } from 'aws-amplify-react';
import { API, Auth, graphqlOperation } from 'aws-amplify';

import {
  ListGrudges,
  CreateGrudge,
  SubscribeToNewGrudge,
  SubscribeToDeletedGrudge,
  DeleteGrudge,
  SubscribeToUpdatedGrudge, UpdateGrudge,
} from './graphql';
import NewGrudge from './NewGrudge';
import Grudges from './Grudges';
import './Application.css';

class Application extends Component {
  state = {
    grudges: [],
  };

  componentDidMount() {
    const component = this;
    Auth.currentAuthenticatedUser().then(function(user) {
      component.userId = user.pool.clientId;
    });

    API.graphql(graphqlOperation(ListGrudges))
      .then(response => {
        console.log(response);
        const grudges = response.data.listGrudges.items;
        this.setState({ grudges });
      });

    API.graphql(graphqlOperation(SubscribeToNewGrudge))
      .subscribe({
        next: response => {
          console.log(response);
          const grudge = response.value.data.onCreateGrudges;
          this.setState({ grudges: [grudge, ...this.state.grudges] });
        },
      });

    API.graphql(graphqlOperation(SubscribeToDeletedGrudge))
      .subscribe({
        next: response => {
          console.log(response);
          const grudge = response.value.data.onDeleteGrudges;
          this.setState({
            grudges: this.state.grudges.filter(other => other.id !== grudge.id),
          });
        },
      });

    API.graphql(graphqlOperation(SubscribeToUpdatedGrudge))
      .subscribe({
        next: response => {
          console.log(response);
          const grudge = response.value.data.onUpdateGrudges;
          const othergrudges = this.state.grudges.filter(
            other => other.id !== grudge.id,
          );
          this.setState({ grudges: [grudge, ...othergrudges] });
        },
      });
  }

  addGrudge = grudge => {
    API.graphql(graphqlOperation(CreateGrudge, { ...grudge, userId: this.userId }))
      .then(response => {
        console.log('Added', grudge);
      })
      .catch(err => console.error(err));
  };

  removeGrudge = grudge => {
    API.graphql(graphqlOperation(DeleteGrudge, { ...grudge, userId: this.userId }))
      .then(response => {
        console.log('Deleted', grudge);
      })
      .catch(err => console.error(err));
  };

  toggle = grudge => {
    const updatedGrudge = { ...grudge, avenged: !grudge.avenged };
    API.graphql(graphqlOperation(UpdateGrudge, { ...updatedGrudge, userId: this.userId }))
      .then(response => {
        console.log('Updated', grudge);
      })
      .catch(err => console.error(err));
  };

  render() {
    const { grudges } = this.state;
    const unavengedgrudges = grudges.filter(grudge => !grudge.avenged);
    const avengedgrudges = grudges.filter(grudge => grudge.avenged);

    return (
      <div className="Application">
        <NewGrudge onSubmit={this.addGrudge} />
        <Grudges
          title="Unavenged Grudges"
          grudges={unavengedgrudges}
          onCheckOff={this.toggle}
          onRemove={this.removeGrudge}
        />
        <Grudges
          title="Avenged Grudges"
          grudges={avengedgrudges}
          onCheckOff={this.toggle}
          onRemove={this.removeGrudge}
        />
      </div>
    );
  }
}

export default withAuthenticator(Application);
