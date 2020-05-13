import React, { Component, Fragment } from "react";
import "./index.scss";
import { Box, Card, CardContent, CardActionArea } from "@material-ui/core";
import { CopyToClipboard } from "react-copy-to-clipboard";

class ColorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }
  render() {
    const { color } = this.props;
    const style = {
      width: "100%",
      backgroundColor: color.color,
      color: color.color > "#888888" ? "#ffffff" : "#000000",
    };
    return (
      <Fragment>
        <Card style={style}>
          <CardActionArea>
            <CopyToClipboard text={color.color} onCopy={this.props.copyData}>
              <CardContent>
                <Box display="flex" justifyContent="flex-start">
                  <Box>{color.year}</Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="center"
                  p={this.props.selected ? 8 : 0}
                >
                  <Box>{this.props.selected ? "¡Copiado!" : color.name}</Box>
                </Box>
                {!this.props.selected ? (
                  <Box display="flex" justifyContent="center">
                    <Box>{color.color}</Box>
                  </Box>
                ) : null}
                <Box display="flex" justifyContent="flex-end">
                  <Box>{color.pantone_value}</Box>
                </Box>
              </CardContent>
            </CopyToClipboard>
          </CardActionArea>
        </Card>
      </Fragment>
    );
  }
}
export default ColorComponent;
