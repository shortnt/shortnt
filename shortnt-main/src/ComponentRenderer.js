import React from 'react';
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js"
import SaaSProductLandingPage from "demos/SaaSProductLandingPage.js";
import SaaSProductLandingPageImageSrc from "images/demo/SaaSProductLandingPage.jpeg";



export const components = {
    SaaSProductLandingPage: {
      component: SaaSProductLandingPage,
      imageSrc: SaaSProductLandingPageImageSrc,
      url: "/components/landingPages/SaaSProductLandingPage",
    }
  }



export default () => {
  const { type, subtype, name } = useParams()

  try {
    let Component = null;
    if(type === "blocks" && subtype) {
      Component= components[type][subtype]["elements"][name].component
      return <AnimationRevealPage disabled>
          <Component/>
        </AnimationRevealPage>
    }
    else
      Component= components[type][name].component

    if(Component)
      return <Component/>

    throw new Error("Component Not Found")
  }
  catch (e) {
    console.log(e)
    return <div>Error: Component Not Found</div>
  }
}
