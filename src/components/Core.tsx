import * as React from "react";
import { Button, Card, Form, Message, Ref } from "semantic-ui-react";
import { getPassword } from "../helpers/crypto";
import About from "./About";
import Password from "./Password";
import PasswordLength from "./PasswordLength";

import { passwordLength as passwordLengthType } from "../helpers/crypto";
import {
  get as getFromLocalStorage,
  set as setFromLocalStorage
} from "../helpers/localStorage";
import showToast from "../helpers/showToast";
import TooltipHOC from "../helpers/TooltipHOC";

import "./styles.css";

interface IState {
  passwordLength: passwordLengthType;
  password: string | null;
  pin: number | null;
  initialPassword: string | null;
  pinErrors: null | string[];
  initialPasswordErrors: null | string[];
  secured: boolean;
  aboutExpanded: boolean;
}

class Core extends React.Component<object, IState> {
  private intialPasswordRef: null | HTMLInputElement;
  private pinRef: null | HTMLInputElement;
  constructor(props: object) {
    super(props);
    const localData = getFromLocalStorage() || {
      aboutExpanded: true,
      passwordLength: 16,
      secured: false
    };
    this.state = {
      aboutExpanded: localData.aboutExpanded,
      initialPassword: null,
      initialPasswordErrors: null,
      password: null,
      passwordLength: localData.passwordLength,
      pin: null,
      pinErrors: null,
      secured: localData.secured
    };
  }
  public render() {
    const {
      pinErrors,
      initialPasswordErrors,
      secured,
      aboutExpanded
    } = this.state;
    return (
      <React.Fragment>
        <About expanded={aboutExpanded} toogleAbout={this.toogleAbout} />
        <Card>
          <Card.Content>
            <Card.Header className="header_container">
              Generate password
              <div className="header_container_btns">
                <TooltipHOC content="Clear the app">
                  <Button
                    aria-label="Clear the app"
                    onClick={this.cleanState}
                    basic={true}
                    positive={!this.isCleanState()}
                    icon="x"
                  />
                </TooltipHOC>
                <TooltipHOC content="Secure mode">
                  <Button
                    aria-label="Secure"
                    onClick={this.toogleSecured}
                    basic={true}
                    positive={!secured}
                    icon="user secret"
                  />
                </TooltipHOC>
              </div>
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <Form error={pinErrors !== null || initialPasswordErrors !== null}>
              <Password value={this.state.password} secured={secured} />
              <Form.Field required={true}>
                <label>Initial password</label>
                <Ref innerRef={this.setIntialPasswordRef}>
                  <Form.Input
                    aria-label="Initial password"
                    error={initialPasswordErrors !== null}
                    onChange={this.handleInitialPasswordChange}
                    type={secured ? "password" : "text"}
                    placeholder="Initial password"
                  />
                </Ref>
              </Form.Field>
              <Form.Field required={true}>
                <label>PIN</label>
                <Ref innerRef={this.setPinRef}>
                  <Form.Input
                    aria-label="PIN"
                    error={pinErrors !== null}
                    onChange={this.handlePinChange}
                    type="number"
                    placeholder="0000"
                  />
                </Ref>
              </Form.Field>
              <PasswordLength
                passwordLength={this.state.passwordLength}
                updatePasswordLength={this.setPasswordLength}
              />
              <Button
                aria-label="Generate password"
                onClick={this.generatePassword}
                fluid={true}
                positive={true}
              >
                Generate
              </Button>
              {this.renderErrors()}
            </Form>
          </Card.Content>
        </Card>
      </React.Fragment>
    );
  }
  private isCleanState = (): boolean => {
    const {
      initialPassword,
      initialPasswordErrors,
      password,
      pin,
      pinErrors
    } = this.state;
    return (
      initialPassword === null &&
      initialPasswordErrors === null &&
      password === null &&
      pin === null &&
      pinErrors === null
    );
  };
  private setPinRef = (ref: HTMLElement | null) => {
    if (ref) {
      this.pinRef = ref as HTMLInputElement;
    }
  };
  private setIntialPasswordRef = (ref: HTMLElement | null) => {
    if (ref) {
      this.intialPasswordRef = ref as HTMLInputElement;
    }
  };
  private cleanState = () => {
    showToast("Cleared.");
    if (this.intialPasswordRef) {
      this.intialPasswordRef.getElementsByTagName("input")[0].value = "";
    }
    if (this.pinRef) {
      this.pinRef.getElementsByTagName("input")[0].value = "";
    }
    this.setState({
      initialPassword: null,
      initialPasswordErrors: null,
      password: null,
      pin: null,
      pinErrors: null
    });
  };
  private toogleAbout = () => {
    showToast(this.state.aboutExpanded ? "Hidden." : "Expanded.");
    this.setState(
      prevState => ({
        aboutExpanded: !prevState.aboutExpanded
      }),
      () =>
        setFromLocalStorage({
          aboutExpanded: this.state.aboutExpanded,
          passwordLength: this.state.passwordLength,
          secured: this.state.secured
        })
    );
  };
  private toogleSecured = () => {
    showToast(!this.state.secured ? "Secured." : "Shown.");
    this.setState(
      prevState => ({
        secured: !prevState.secured
      }),
      () =>
        setFromLocalStorage({
          aboutExpanded: this.state.aboutExpanded,
          passwordLength: this.state.passwordLength,
          secured: this.state.secured
        })
    );
  };
  private renderErrors = () => {
    const { pinErrors, initialPasswordErrors } = this.state;
    const initialPasswordErrors$ =
      initialPasswordErrors !== null ? (
        <Message
          key="initialPasswordErrors"
          error={true}
          header="Initial Password errors"
          list={initialPasswordErrors}
        />
      ) : null;
    const pinErrors$ =
      pinErrors !== null ? (
        <Message
          key="pinErrors"
          error={true}
          header="PIN errors"
          list={pinErrors}
        />
      ) : null;

    return [initialPasswordErrors$, pinErrors$];
  };
  private handleInitialPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const initialPassword = e.target.value;
    const errors = [];

    if (initialPassword.length === 0) {
      errors.push("Initial Password can't be empty");
    }

    this.setState({
      initialPassword: errors.length === 0 ? initialPassword : null,
      initialPasswordErrors: errors.length === 0 ? null : errors,
      password: null
    });
  };
  private handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pin = parseInt(e.target.value, 10);
    const errors = [];
    if (!Number.isInteger(pin)) {
      errors.push("PIN can't be empty");
    } else {
      if (pin === 0) {
        errors.push("PIN can't consits of only zeros");
      }
      if (e.target.value.length < 4) {
        errors.push("PIN is to short (4 digits)");
      }
      if (e.target.value.length > 4) {
        errors.push("PIN is to long (4 digits)");
      }
    }
    this.setState({
      password: null,
      pin: errors.length === 0 ? pin : null,
      pinErrors: errors.length === 0 ? null : errors
    });
  };
  private generatePassword = () => {
    const { pin, initialPassword, passwordLength } = this.state;
    if (pin === null || initialPassword === null) {
      this.setState({
        initialPasswordErrors:
          initialPassword === null ? ["Initial Password can't be empty"] : null,
        password: null,
        pinErrors: pin === null ? ["PIN can't be empty"] : null
      });
      return;
    }
    this.setState({
      password: getPassword(initialPassword, pin, passwordLength)
    }, () => showToast('Generated.'));
  };
  private setPasswordLength = (passwordLength: passwordLengthType) => {
    setFromLocalStorage({
      aboutExpanded: this.state.aboutExpanded,
      passwordLength,
      secured: this.state.secured
    });
    this.setState({
      password: null,
      passwordLength
    });
  };
}

export default Core;
