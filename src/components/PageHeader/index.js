import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import './PageHeader.css';

const PageHeader = ({ title = '', showSubmitButton = false }) => (
  <div className="PageHeader">
    <h1>{title}</h1>
    <div className="publishControls">
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
    { showSubmitButton && <PrimaryButton text="Publish Feedback" styles={{ root: { marginLeft: 8 }}} />}
    </div>
  </div>
);

PageHeader.propTypes = {
  title: PropTypes.string,
  showSubmitButton: PropTypes.bool,
};

export default PageHeader;
