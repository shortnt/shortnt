import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";
import { css } from "styled-components/macro"; //eslint-disable-line
// import TwoColumnWithVideo from 'components/hero/TwoColumnWithVideo'
import Login from 'components/auth/Login.js';
import SignUp from 'components/auth/SignUp.js';

/*
 * This is the entry point component of this project. You can change the below exported default App component to any of
 * the prebuilt landing page components by uncommenting their import and export lines respectively.
 * See one of the landing page components to better understand how to import and render different components (Always
 * make sure if you are building your own page, the root component should be the AnimationRevealPage component. You can
 * disable the animation by using the disabled prop.
 *
 * The App component below is using React router to render the landing page that you see on the live demo website
 * and the component previews.
 *
 */

/* Use AnimationRevealPage as a wrapper component for your pages if you are building a custom one yourself */
// import AnimationRevealPage from "helpers/AnimationRevealPage.js";

/*
 * Hero section is the top most section on the page. It contains the header as well.
 * So you dont need to import headers
 * separately
 */



import SaaSProductLandingPage from "demos/SaaSProductLandingPage.js";




import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SaaSProductLandingPage} />

        <Route exact path="/login" component={Login} />

        <Route exact path="/signup" component={SignUp} />


      </Switch>
    </Router>

  );
}

export default App;


