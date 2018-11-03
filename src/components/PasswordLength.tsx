import * as React from "react";
import { Button, Form, Icon } from "semantic-ui-react";

import { passwordLength } from "../helpers/crypto";
import showTest from '../helpers/showToast'
import TooltipHOC from "../helpers/TooltipHOC";

import "./styles.css";

interface IProps {
  passwordLength: passwordLength;
  updatePasswordLength: (value: passwordLength) => void;
}

const valuesUp = (value: passwordLength) => {
  switch (value) {
    case 16:
      return 32;
    case 32:
      return 64;
    case 64:
      return 16;
  }
};

const valuesDown = (value: passwordLength) => {
  switch (value) {
    case 16:
      return 64;
    case 32:
      return 16;
    case 64:
      return 32;
  }
};

class PasswordLength extends React.Component<IProps, object> {
  public handleClickUp = () => {
    showTest("Increased.")
    this.props.updatePasswordLength(valuesUp(this.props.passwordLength));
  };
  public handleClickDown = () => {
    showTest("Decreased.")
    this.props.updatePasswordLength(valuesDown(this.props.passwordLength));
  };
  public render() {
    return (
      <Form.Field>
        <label>Password length [chars]</label>
        <div className="passwordLength_container">
          <TooltipHOC content="Decrease password length">
            <Button
              aria-label="Increase"
              onClick={this.handleClickDown}
              basic={true}
              icon={true}
            >
              <Icon name="angle down" />
            </Button>
          </TooltipHOC>
            {this.props.passwordLength}
          <TooltipHOC content="Increase password length">
            <Button
              aria-label="Decrease"
              onClick={this.handleClickUp}
              basic={true}
              icon={true}
            >
              <Icon name="angle up" />
            </Button>
          </TooltipHOC>
        </div>
      </Form.Field>
    );
  }
}

export default PasswordLength;
