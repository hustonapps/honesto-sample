import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'office-ui-fabric-react';
import UserList from '../../components/UserList';
import { getTeamFeedback } from '../../services/api.service';
import './LandingPage.css';

const LandingPage = ({ history }) => {
  const [state, setState] = useState({
    feedbacks: [],
  });

  const getData = async () => {
    try {
      const { data } = await getTeamFeedback();
      setState({
        ...state,
        feedbacks: data,
      })
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="LandingPage">
      <div className="LandingPageHeader">
        <h1>Share Feedback</h1>
        <Dropdown
          label="Feedback Period"
          styles={{
            root: {
              width: 342,
            }
          }}
          defaultSelectedKey={0}
          options={[
            {key: 0, text: 'April 2020'}
          ]}
        />
      </div>
      <UserList feedbacks={state.feedbacks} history={history} />
    </div>
  );
}

LandingPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default LandingPage;
