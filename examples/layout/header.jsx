import React, { Fragment } from 'react';

const Header = () => (
  <Fragment>
    <nav className="navbar navbar-dark bg-dark justify-content-between">
      <span className="navbar-brand" href="#">
        DROPDOWN SELECT <span className="text-success">(3.1.0)</span>
        <span className="text-warning"> (DEMO)</span>
      </span>
      <ul className="nav">
        <li className="nav-item">
          <span className="nav-link active" href="https://github.com/ganapathy888/dropdown-select/">
            Github
          </span>
        </li>
        <li className="nav-item">
          <span className="nav-link" href="https://www.npmjs.com/package/dropdown-select">
            Npm
          </span>
        </li>
        <li className="nav-item">
          <span className="nav-link" href="https://yarnpkg.com/en/package/dropdown-select">
            Yarn
          </span>
        </li>
      </ul>
    </nav>
  </Fragment>
);

export default Header;
