import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import "./index.scss";
import ColorComponent from "../../../Components/Color";
import { Card, CardContent, Box, Button, Container } from "@material-ui/core";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_pages: 0,
      page: 1,
      colorList: [],
      color: {},
      copied: false,
    };
    this.colorRef = React.createRef();
    this.getColorList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.getColorList();
    }
  }
  handlePrev = () => {
    var { page } = this.state;
    page--;
    this.setState({ page: page });
  };

  handleNext = () => {
    var { page } = this.state;
    page++;
    this.setState({ page: page });
  };
  handleSelect = (color) => {
    // Un pequeño retardo para apreciar el efecto del botón
    setTimeout(()=>{
      this.setState({
        copied: !this.state.copied,
        color: color,
      });
    },300)
  };
  getColorList = () => {
    axios
      .get(`https://reqres.in/api/colors?page=${this.state.page}`)
      .then((res) => {
        this.setState({
          colorList: res.data.data,
          total_pages: res.data.total_pages,
        });
      });
  };
  render() {
    return (
      <Container maxWidth="md">
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center">
                  <Box>Colores</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          {this.state.copied ? (
            <Grid item xs={12}>
              <ColorComponent color={this.state.color} selected copyData={this.handleSelect.bind(this, {})} />
            </Grid>
          ) : (
            this.state.colorList.map((color, index) => (
              <Grid item xs={4} key={index}>
                <ColorComponent
                  color={color}
                  copyData={this.handleSelect.bind(this, color)}
                />
              </Grid>
            ))
          )}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="center">
                  <Box flexGrow={1}>
                    <Button
                      size="small"
                      id="prev"
                      name="prev"
                      disabled={this.state.page === 1 || this.state.copied}
                      onClick={this.handlePrev}
                    >
                      {'< Anterior'}
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      size="small"
                      id="next"
                      name="next"
                      disabled={
                        this.state.page === this.state.total_pages ||
                        this.state.copied
                      }
                      onClick={this.handleNext}
                    >
                      {'Siguiente >'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
export default Main;
