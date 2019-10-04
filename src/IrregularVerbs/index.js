import React, { Fragment, Component } from "react";
import Word from "./word";
import Spinner from "../Spinner";

export default class Dictionary extends Component {
  state = {
    words: []
  };

  componentDidMount() {
    const hrefData =
      "https://spreadsheets.google.com/feeds/list/1EBEPd96CMV-mGnJk7SNtvYjyf5xjDZBiuR8TCHbni4o/od6/public/values?alt=json";

    this.fetchData(hrefData);
  }

  fetchData = async hrefData => {
    const data = await fetch(hrefData)
      .then(data => data.json())
      .then(data => {
        return data.feed.entry.filter(
          obj => obj.gsx$active.$t.toLowerCase() === "true"
        );
      })
      .catch(error => console.error(error));

    this.setState({
      words: data.sort(() => (!!Math.round(Math.random()) ? 1 : -1))
    });
  };

  reset = () => {
    const allInputs = document.querySelectorAll("input");
    const rights = document.querySelectorAll(".right");

    for (const input of allInputs) {
      input.value = "";
    }

    for (const right of rights) {
      right.classList.remove("right");
    }
  };

  filterData = () => {
    this.setState(prevState => {
      const newData = prevState.data.sort(() =>
        !!Math.round(Math.random()) ? 1 : -1
      );
      return {
        words: newData
      };
    });
  };

  render() {
    const { words } = this.state;

    return (
      <div className="Dictionary">
        <h1>English</h1>

        {!words.length ? (
          <Spinner />
        ) : (
          <Fragment>
            <table>
              <tbody>
                {words.map(item => {
                  return <Word key={item.id.$t} item={item} />;
                })}
              </tbody>
            </table>

            <button className="reset" onClick={this.reset}>
              reset
            </button>
          </Fragment>
        )}
      </div>
    );
  }
}
