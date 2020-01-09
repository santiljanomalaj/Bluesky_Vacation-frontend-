import React from "react";
import { ToastContainer } from "react-toastify";
// import {createStore,applyMiddleware} from "redux";
// import thunk from "redux-thunk";
// import {Provider} from "react-redux";

import "react-toastify/dist/ReactToastify.css";

import { AppFooter,AppHeader } from "components";
// import { ChatBox } from "components/chatbox";

// import { authService } from "services/auth";



export class FrontendLayout extends React.Component {
  render() {
    const currentPath = window.location.pathname;
    return (
      <div>

        <AppHeader />
        <ToastContainer />
        {this.props.children}
        {!currentPath.includes("search") && !currentPath.includes("inbox") ? (<AppFooter />) : null}

        {/* <Suspense fallback={<div>Loading...</div>}>
          {authService.isSigned() && !currentPath.includes("inbox") ? (<ChatBox />) : null}
        </Suspense> */}

      </div>
    );
  }
}
