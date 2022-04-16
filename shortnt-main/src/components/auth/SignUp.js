import React from "react";
import { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import logo from "images/logo.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import GoogleLogin from "react-google-login";
import Home from 'components/auth/Home';

const Container = tw(ContainerBase)`min-h-screen bg-blue-600 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
// const SocialButton = styled.a`
//   ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
//   .iconContainer {
//     ${tw`bg-white p-2 rounded-full`}
//   }
//   .icon {
//     ${tw`w-4`}
//   }
//   .text {
//     ${tw`ml-4`}
//   }
// `;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-blue-600 text-gray-100 w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
// const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
// const IllustrationImage = styled.div`
//   ${props => `background-image: url("${props.imageSrc}");`}
//   ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
// `;

const SignUp =  () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData') ? 
    JSON.parse(localStorage.getItem('loginData'))
    : null
  );
  const [cred,setCred] = useState({
    username:"",
    email:"",
    password:"",
  })
  const [submit,setSubmit] = useState({
    username:"",
    email:"",
    password:""
  })
  const handleFailure = () => {
    alert("Failure");
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCred((prev) => {
        return ({
          ...prev,
          [name]:value
        });
    });
  }

  const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmit(cred);
        console.log(cred);
        const res = await fetch('http://localhost:8000/socialuser/',{
          method : 'POST',
          body : JSON.stringify(cred),
          headers : {
            'Content-Type': 'application/json',
          }
        });
      
        const data1 = await res.json();
        if(data1 === "Email Already Exists"){
          alert("Email Already Exists !!!!, Try Again");
          setLoginData(null);
        }else if(data1 === "Failed"){
          alert("Failed");
          setLoginData(null);
        }else {
          setLoginData(data1);
          console.log(data1)
          console.log("userrrr")
          localStorage.setItem('loginData',JSON.stringify(data1));
        }

        setCred({
          username:"",
          email:"",
          password:""
        })

  }
  
  const handleSuccess = async (data) => {
    console.log(data.profileObj.email);
    const res = await fetch('http://localhost:8000/socialuser/',{
      method : 'POST',
      body : JSON.stringify({
        uid:null,
        username:data.profileObj.name,
        email:data.profileObj.email,
        image: data.profileObj.imageUrl
      }),
      headers : {
        'Content-Type': 'application/json',
      }
    });
  
    const data1 = await res.json();
    setLoginData(data1);
    localStorage.setItem('loginData',JSON.stringify(data1));
  }
  return(<>
  
  <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
        {
                  loginData ? (
                    // <div>
                    //   <h3>You logged in as {loginData}</h3>
                    //   <button onClick={handleLogout}>Logout</button>
                    // </div>
                    <>
                    {window.location.href="/dash"}
                    
                    <Home  />
                    </>
                  ) : <>
          <LogoLink href="/">
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>Sign Up for ShortNt</Heading>
            <FormContainer>
            <SocialButtonsContainer>

               
              <GoogleLogin
                className = "gbtn"
                clientId = {process.env.REACT_APP_GOOGLE_CLIENT_ID}
                // buttonText="Sign In with Google"
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}

                ><span className="gtext">Sign Up with Google</span>
                  </GoogleLogin>

                    {/* <SocialButton>
                      <span className="iconContainer">
                        <img src={twitterIconImageSrc} className="icon" alt=""/>
                      </span>
                      <span className="text">Sign In With Twitter</span>
                    </SocialButton> */}
                  </SocialButtonsContainer>
              <DividerTextContainer>
                <DividerText>Or Sign up with your e-mail</DividerText>
              </DividerTextContainer>
              <Form onSubmit={handleSubmit}>
                <Input type="text" placeholder="Username" value={cred.username} name ="username" onChange={handleChange} required />
                <Input type="email" placeholder="Email" value = {cred.email} name = "email" onChange={handleChange} required/>
                <Input type="password" placeholder="Password" value={cred.password} name="password" onChange={handleChange} required/>

                <SubmitButton type="submit" value="submit">
                  <SignUpIcon className="icon" />
                  <span className="text">Sign Up</span>
                </SubmitButton>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by treact's{" "}
                  <a href="/" tw="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href="/" tw="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>

                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href="/login" tw="border-b border-gray-500 border-dotted">
                    Sign In
                  </a>
                </p>
              </Form>
            </FormContainer>
          </MainContent>
          </>
            }
        </MainContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
  </>
  );
}

export default SignUp;