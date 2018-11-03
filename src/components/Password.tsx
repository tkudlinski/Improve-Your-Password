import * as React from "react";
import { Button, Divider, Form, Header } from "semantic-ui-react";
// tslint:disable-next-line
const copy = require("clipboard-copy");

import showTest from '../helpers/showToast'
import TooltipHOC from "../helpers/TooltipHOC";
import "./styles.css";

interface IProps {
  value: string | null;
  secured: boolean;
}

class Password extends React.Component<IProps, object> {
  public handleCopy = () => {
    if (this.props.value === null) {
      return;
    }
    showTest('Copied.')
    copy(this.props.value);
  };
  public render() {
    if (this.props.value === null) {
      return null;
    }
    return (
      <Form.Field>
        <div className="password_container">
          <TooltipHOC content="Your enhanced password">
            <Header className="password_value" color="green">
              {this.getValue()}
            </Header>
          </TooltipHOC>
          <Button
            aria-label="Copy to Clipboard"
            basic={true}
            fluid={true}
            positive={true}
            onClick={this.handleCopy}
            icon="copy outline"
            content="Copy to Clipboard"
          />
        </div>
        <Divider />
      </Form.Field>
    );
  }

  private getValue = () => {
    if (this.props.value === null || !this.props.secured) {
      return this.props.value;
    }
    let result = "";
    // tslint:disable-next-line
    for (let i = 0; i < this.props.value.length; i++) {
      result = result + "\u25CF";
    }
    return result;
  };
}

export default Password;
