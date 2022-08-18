import React, { Fragment } from "react";
import Header from "./header";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "./../routes/router";
import { connect } from "react-redux";

const DefaultLayout = (props) => {
  const {isLoggedIn} = props;

  return (
    <Fragment>
      <Header />
      <Switch>
        {!isLoggedIn ? <Redirect to="/login"/> : (
          routes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                component={route.component}
              />
            ) : null;
          })
        )}
      </Switch>
    </Fragment>
  );
};

const mapSateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapSateToProps) (DefaultLayout);
