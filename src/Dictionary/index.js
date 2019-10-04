import React, { Fragment, Component } from "react";
import ReactDOM from "react-dom";
import Word from "./word";
import Spinner from "../Spinner";

export default class Dictionary extends Component {
  state = {
    data: [],
    theme: "",
    words: []
  };

  componentDidMount() {
    const hrefData =
      "https://spreadsheets.google.com/feeds/list/1sZr9y8ofduLrP_UpdN3UPoRS0E6Db-GGAMwPBmWv5j8/od6/public/values?alt=json";

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
      .catch(error => console.log(error));

    const themeSort = data.sort((a, b) =>
      a.gsx$theme.$t > b.gsx$theme.$t ? 1 : -1
    );

    this.setState({
      data: data,
      theme: themeSort[0].gsx$theme.$t,
      words: data
        .filter(item => item.gsx$theme.$t === data[0].gsx$theme.$t)
        .sort(() => (!!Math.round(Math.random()) ? 1 : -1))
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

  filterData = event => {
    this.setState(prevState => {
      const newData = prevState.data
        .filter(item => item.gsx$theme.$t === event.target.value)
        .sort(() => (!!Math.round(Math.random()) ? 1 : -1));
      return {
        theme: event.target.value,
        words: newData
      };
    });
  };

  render() {
    const { data, words } = this.state;
    const arr = data.map(item => item.gsx$theme.$t);
    const themes = [...new Set(arr)].sort();

    return (
      <div className="Dictionary">
        <h1>English</h1>

        {!words.length ? (
          <Spinner />
        ) : (
          <Fragment>
            <select onChange={ev => this.filterData(ev)}>
              {themes.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

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
