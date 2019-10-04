import React, { Component } from "react";

export default class Word extends Component {
  state = {
    item: this.props.item,
    right: false,
    help: false
  };

  fixedString = str => {
    return str
      .toLowerCase()
      .replace(/[.,?-\s]/g, "")
      .trim();
  };

  handleChange = event => {
    if (
      this.fixedString(event.target.value) ===
      this.fixedString(
        `${this.state.item.gsx$infinite.$t} ${this.state.item.gsx$ii.$t} ${
          this.state.item.gsx$iii.$t
        }`
      )
    ) {
      this.setState({ right: true });
    } else {
      this.setState({ right: false });
    }
  };

  voice = word => {
    const speak = new SpeechSynthesisUtterance();
    const voices = speechSynthesis.getVoices();
    speak.voice = voices[3];
    speak.voiceURI = "native";
    speak.volume = 1;
    speak.rate = 1;
    speak.pitch = 1;
    speak.text = word;
    speak.lang = "en-EN";
    speechSynthesis.speak(speak);
  };

  showHelp = () => {
    this.setState(prevState => {
      return {
        help: !prevState.help
      };
    });
  };

  render() {
    const { item, right, help } = this.state;

    return (
      <tr>
        <td className={`input ${right ? "right" : ""}`}>
          <div className="rus">{item.gsx$rus.$t}</div>
          <button
            className={`voice`}
            onClick={() =>
              this.voice(
                `${this.state.item.gsx$infinite.$t} ${
                  this.state.item.gsx$ii.$t
                } ${this.state.item.gsx$iii.$t}`
              )
            }
            tabIndex="-1"
          >
            <i className="fas fa-volume-up" />
          </button>
          <button className={`help`} onClick={this.showHelp} tabIndex="-1">
            {!help ? "show help" : "hide help"}
          </button>
          <div className={`eng ${help ? "show" : ""}`}>{`${
            this.state.item.gsx$infinite.$t
          } / ${this.state.item.gsx$ii.$t} / ${
            this.state.item.gsx$iii.$t
          }`}</div>

          <input
            className={"input-word"}
            type="text"
            onChange={this.handleChange}
            placeholder="Infinitive, Simple Past, Past Participle"
          />
        </td>
      </tr>
    );
  }
}
