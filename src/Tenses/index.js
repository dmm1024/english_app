import React, { Component } from "react";

import PresentSimple from "./PresentSimple";
import PresentContinuous from "./PresentContinuous";

export default class Tenses extends Component {
  state = {
    tenseIndex: 0
  };

  tenses = [
    {
      name: "Present Simple",
      component: <PresentSimple />
    },
    {
      name: "Present Continuous",
      component: <PresentContinuous />
    }
  ];

  selectTense = event => {
    this.setState({ tenseIndex: event.target.value });
  };

  render() {
    const { tenseIndex } = this.state;

    return (
      <div className="Tenses">
        <h1>Tenses</h1>

        <select className="Tenses-select" onChange={this.selectTense}>
          {this.tenses.map((item, index) => (
            <option value={index} key={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <div className="Tenses-wrapper">
          {this.tenses[tenseIndex].component}
        </div>
      </div>
    );
  }
}
