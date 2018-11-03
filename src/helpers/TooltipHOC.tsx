import * as React from "react";
import { isMobile } from "react-device-detect";
import { Popup } from "semantic-ui-react";

const style = {
  borderRadius: 0,
  opacity: 0.75,
  padding: "10px"
};

interface IProps {
  children: any;
  content: string;
}

const tooltipHOC = ({ children, content }: IProps) =>
  !isMobile ? (
    <Popup trigger={children} content={content} style={style} inverted={true} />
  ) : (
    children
  );

export default tooltipHOC;
