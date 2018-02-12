import React, { Fragment } from 'react';

const Header = props => (
  <Fragment>
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <a className="navbar-brand" href="#">
        DROPDOWN SELECT <span className="text-success">(3.1.4)</span>
        <span className="text-warning"> (DEMO)</span>
      </a>
      <ul className="nav">
        <li className="nav-item">
          <a
            className="nav-link active"
            href="https://github.com/ganapathy888/dropdown-select/"
          >
            Github
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://www.npmjs.com/package/dropdown-select"
          >
            Npm
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="https://yarnpkg.com/en/package/dropdown-select"
          >
            Yarn
          </a>
        </li>
      </ul>
    </nav>
  </Fragment>
);

export default Header;
