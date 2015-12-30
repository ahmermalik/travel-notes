import request from 'superagent';
import React, {Component} from 'react';
import { Panel } from 'react-bootstrap';
import DestinationListItem from './DestinationListItem';

export default class Travelers extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { store } = this.context;
    const { travelers, panelOpenForUserId, currentUser } = store.getState().reducer;

    return (
      <div>
        {travelers.map(t => {
          const userId = t.id;

          return (
            <Panel
              id={userId}
              key={userId}
              className={panelOpenForUserId[userId] ? 'active' : ''}
              header={t.name.toUpperCase()}
              eventKey={userId}
              collapsible
              destinations={t.destinations}
              expanded={panelOpenForUserId[userId] || false}
              onClick={() => {
                store.dispatch({ type: 'TRAVELER_PANEL_CLICKED', userId });
              }}
            >
              <ul className="list-unstyled" onClick={e => e.stopPropagation()}>
                {t.destinations.map((d, i) => {
                  const key = `${userId}-${i}`;

                  return (
                    <DestinationListItem
                      key={key}
                      id={`destination-list-item-${key}`}
                      isChecked={d.visited}
                      isDisabled={userId != currentUser.id}
                      onChange={() => alert('Refactor in progress')}
                      label={d.name}
                    />
                  );
                })}
              </ul>
            </Panel>
          );
        })}
      </div>
    );
  }
};

Travelers.contextTypes = {
  store: React.PropTypes.object
}