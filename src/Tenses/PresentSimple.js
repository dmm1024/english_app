import React, { Component } from "react";

export default class PresentSimple extends Component {
  render() {
    return (
      <div className="Tense">
        <h2>Present Simple</h2>

        <div className="Tense__rules">
          <div className="Tense__rule">
            <h3>Affirmative</h3>

            <div>
              <p>I/You/We/They + V + ...</p>
              <p>
                He/She/It + V<sub>s(es)</sub> + ...
              </p>
            </div>
          </div>

          <div className="Tense__rule">
            <h3>Negative</h3>

            <div>
              <p>I/You/We/They + don't + V + ...</p>
              <p>He/She/It + doesn't + V + ...</p>
            </div>
          </div>

          <div className="Tense__rule">
            <h3>Questions</h3>

            <div>
              <p>Do + I/You/We/They + V + ...</p>
              <p>Does + He/She/It + V + ...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
