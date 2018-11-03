import * as React from "react";
import MarkdownRenderer from "react-markdown-renderer";
import { Card, Icon } from "semantic-ui-react";

import TextSource from "../helpers/text";
import TooltipHOC from "../helpers/TooltipHOC";

import "./styles.css";

interface IProps {
  expanded: boolean;
  toogleAbout: () => void;
}

class About extends React.Component<IProps, object> {
  public render() {
    const { expanded, toogleAbout } = this.props;
    return (
      <Card>
      <TooltipHOC content={`${expanded ? "Hide" : "Show"} About section`}>
          <Card.Content onClick={toogleAbout} className="about_container">
            <Card.Header>About & Contact</Card.Header>
            {expanded ? (
              <Icon name="angle up" className="about_arrow" />
            ) : (
              <Icon name="angle down" className="about_arrow" />
            )}
          </Card.Content>
        </TooltipHOC>
        {expanded ? (
          <React.Fragment>
            <Card.Content>
              <MarkdownRenderer markdown={TextSource.about} />
            </Card.Content>
          </React.Fragment>
        ) : null}
      </Card>
    );
  }
}

export default About;
