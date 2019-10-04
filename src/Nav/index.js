import React, { Component } from "react";
import { Route, NavLink, Redirect, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';

import Routes from "./routes";

import Dictionary from "../Dictionary";
import Tenses from "../Tenses";
import IrregularVerbs from "../IrregularVerbs";

export default class Nav extends Component {
  state = {
    active: false
  };

  open = () => {
    this.setState({ active: true });
  };

  close = () => {
    this.setState({ active: false });
  };

  render() {
    const { active } = this.state;

    return (
      <>
        <div className={`Nav ${active && "Nav--active"}`}>
          <nav>
            <button
              className={`Nav-button ${active && "Nav-button--active"}`}
              onClick={active ? this.close : this.open}
            >
              {
                active
                  ? <FontAwesomeIcon icon={faTimes} />
                  : <FontAwesomeIcon icon={faBars} />
              }
            </button>
            <ul>
              <li>
                <NavLink
                  to={Routes.dictionary}
                  activeClassName="active"
                  onClick={this.close}
                >
                  Dictionary
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={Routes.irregularVerbs}
                  activeClassName="active"
                  onClick={this.close}
                >
                  Irregular verbs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={Routes.tenses}
                  activeClassName="active"
                  onClick={this.close}
                >
                  Tenses
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        <Switch>
          <Route path={Routes.dictionary} component={Dictionary} />
          <Route path={Routes.tenses} component={Tenses} />
          <Route path={Routes.irregularVerbs} component={IrregularVerbs} />
          <Redirect from="/" exact to="/dictionary" />
        </Switch>

        <div
          className={`veil ${active && "veil--active"}`}
          onClick={this.close}
        />
      </>
    );
  }
}
