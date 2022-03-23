import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import '../../styles/globalStyles.css';
import Header from "../headers/light.js";
// import DemoModal from '../modal/demo.js';
import ReactModalAdapter from "../../helpers/ReactModalAdapter.js";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../images/dot-pattern.svg";
import DesignIllustration from "../../images/design-illustration.svg";
import Typewriter from 'typewriter-effect';
// import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { render } from "react-dom";
import LinearProgress from '@mui/material/LinearProgress';

//media player
import AudioPlayer from 'material-ui-audio-player';
import {createTheme, ThemeProvider} from '@material-ui/core';


const muiTheme = createTheme({ });

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row md:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-6/12 lg:pr-12 flex-shrink-0 text-center lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex flex-col justify-center`;
const Heading = tw.h1`font-black text-3xl md:text-5xl leading-snug max-w-3xl`;
const Paragraph = tw.p`my-5 lg:my-8 text-sm lg:text-base font-medium text-gray-600 max-w-lg mx-auto lg:mx-0`;
const Actions = tw.div`flex flex-col items-center sm:flex-row justify-center lg:justify-start mt-8`;
const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-blue-500 text-gray-100 hocus:bg-blue-700 focus:shadow-outline focus:outline-none transition duration-300`;
const IllustrationContainer = tw.div`flex justify-center md:justify-end items-center relative max-w-3xl lg:max-w-none`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3  -z-10 `}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none fill-current  opacity-25 absolute w-32 h-32 right-0 bottom-0 transform translate-x-10 translate-y-10 -z-10`}
`;

const StyledModal = styled(ReactModalAdapter)`
  &.mainHeroModal__overlay {
    ${tw`fixed inset-0 z-50`}
  }
  &.mainHeroModal__content {
    ${tw`xl:mx-auto m-4 sm:m-16 max-w-screen-xl absolute inset-0 flex justify-center items-center rounded-lg bg-gray-200 outline-none`}
  }
  .content {
    ${tw`w-full lg:p-16`}
  }
`;
const CloseModalButton = tw.button`absolute top-0 right-0 mt-8 mr-8 hocus:text-primary-500`;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',

  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const inputs = [
  {
    value: 'Audio',
    label: 'Audio',
  },
  {
    value: 'Text',
    label: 'Text',
  },

];



export default ({
  heading = "Audio to text and Text to Summary",
  description = "We provide a summary of audio, text, and video to users. It helps to work faster with the reduced amount of reading material.",
  primaryButtonText = "Quick Summary",
  watchVideoYoutubeUrl = "",
  imageSrc = DesignIllustration,
  imageCss = null,
  imageDecoratorBlob = false,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [inputText, setInputText] = useState('');
  const [showText, setShowText] = useState('');
  const [audioSrc, setAudioSrc] = useState("");
  const [show, setShow] = useState(false);

  const [audioFile, setAudioFile] = useState("anonymous.png");
  const [audioFilename, setAudioFilename] = useState("");
  const [audioText, setAudioText] = useState("");
  const [audioSummary, setAudioSummary] = useState("");

  const [showLoading, setshowLoading] = useState(false)


  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const textChange = (event) => {
    setInputText(event.target.value);
  };

  const audioInput = (event) => {
    setAudioSrc(event.target.value);
  };




  //Code updated

  //   useEffect(() => {
  //           fetch(process.env.REACT_APP_API+'quicksummary/' + num)
  //           .then((res)=>res.json())
  //           .then((data) => console.log(data))
  //           .catch((error)=>console.log(error));

  // }, []);

  // handleSubmit(event){
  //     event.preventDefault();
  //     fetch(process.env.REACT_APP_API+'department',{
  //         method:'POST',
  //         headers:{
  //             'Accept':'application/json',
  //             'Content-Type':'application/json'
  //         },
  //         body:JSON.stringify({
  //             DepartmentId:null,
  //             DepartmentName:event.target.DepartmentName.value,
  //             summ:event.target.summ.value

  //         })
  //     })
  //     .then(res=>res.json())
  //     .then((result)=>{
  //         alert(result);
  //     },
  //     (error)=>{
  //         alert('Failed');
  //     })
  // }



  //close
  const handleSubmitButton = (event) => {
    event.preventDefault();
    setshowLoading(true);

    fetch(process.env.REACT_APP_API + 'audiosummary/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        aid: null,
        AudioFileName: audioFilename
      })
    })
      .then(res => res.json())
      .then((result) => {
        // alert(result);

        fetch(process.env.REACT_APP_API + 'audiosummary/')
          .then((res) => res.json())
          .then((data) => {
            fetch(process.env.REACT_APP_API + 'audiosummary/' + data.length)
              .then((res) => res.json())
              .then((data) => {
                setShow(true)
                setAudioText(data.AudioText)
                setAudioSummary(data.AudioSummary)
                setshowLoading(false);

              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));

      },
        (error) => {
          alert('Failed');
        })
  }

  const handleFileSelectedButton = (event) => {
    event.preventDefault();
    //this.photofilename = event.target.files[0].name;
    setAudioFilename(event.target.files[0].name);

    // this.audiofilename=event.target.files[0].name;

    const formData = new FormData();
    formData.append(
      "myFile",
      event.target.files[0],
      event.target.files[0].name
    );

    fetch(process.env.REACT_APP_API + 'Employee/SaveFile', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then((result) => {
        //this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;
        setAudioFile(process.env.REACT_APP_PHOTOPATH + result);
      },
        (error) => {
          alert('Failed');
        })

  }

  const getSummary = (event) => {
    event.preventDefault();
    setshowLoading(true);
    console.log("11111111")
    fetch(process.env.REACT_APP_API + 'quicksummary/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Id: null,
        Input: inputText,
        // Output:event.target.Output.value
      })
    })
      .then(res => res.json())
      .then((result) => {
        // alert(result);
        fetch(process.env.REACT_APP_API + 'quicksummary/')
          .then((res) => res.json())
          .then((data) => {
            fetch(process.env.REACT_APP_API + 'quicksummary/' + data.length)
              .then((res) => res.json())
              .then((data) => {setShowText(data.Output);setshowLoading(false)})
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      },
        (error) => {
          alert(error);
        })
    // setShowText(inputText)
    console.log(inputText);

  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  console.log(audioSrc);


  return (

    <>
      <Header />
      <Container >
        <TwoColumn>
          <LeftColumn>

            <Heading>
              Audio to Text,
              <Typewriter
                options={{
                  strings: ['Text to Summary'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              <PrimaryButton as="button" onClick={handleOpen}>{primaryButtonText}</PrimaryButton>
              {/* <WatchVideoButton onClick={toggleModal}>
                <span className="playIconContainer">
                  <PlayIcon className="playIcon" />
                </span>
                <span className="playText">{watchVideoButtonText}</span>
              </WatchVideoButton> */}
            </Actions>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img
                className="mymove"
                css={imageCss}
                src={imageSrc}
                alt="Hero"
              />
              {imageDecoratorBlob && <DecoratorBlob2 />}
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
        <Modal
          // className="modal"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closebutton="true"

        >
          <Box sx={style} className="box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select the Input Type
            </Typography>
            <br></br>
            <TextField
              id="standard-select-currency"
              select
              // label="Select Input Type"
              value={input}
              onChange={handleChange}
              className="format"
              variant="standard"
            // helperText="Please select your input format"
            >
              {inputs.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <br></br>
            <br></br>
            <div>
              {input === '' ? <Typography variant="h6" component="h4">
                No input format is selected
              </Typography> : input === 'Audio' ? <Typography variant="h6" component="h4">
                You have selected {input} as Input format
              </Typography> : <Typography variant="h6" component="h4">
                You have selected {input} as Input format
              </Typography>}
            </div>
            <br></br>
            <div>
              {input === '' ? null : input === 'Text' ?
                <>
                  <div className="parent">
                    <div className="child1">
                      <textarea className="intext" value={inputText} onChange={textChange} placeholder="Type/Paste the text here....."></textarea>
                    </div>
                    <div className="child2">
                      <textarea className="intext" value={showText} placeholder="Summary....."></textarea>
                    </div>
                  </div>
                  {/* {showLoading===false?null:
              <Box  >
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <LinearProgress  style={{height:"0.5rem",width:"25rem"}} />
                </div>
              </Box>
             } */}
        
                  <br></br>
                  <PrimaryButton as="button" onClick={getSummary}>Get Summary</PrimaryButton>
                  {showLoading===false?null:
              <Box  >
                <br />
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <LinearProgress  style={{height:"0.5rem",width:"25rem"}} />
                </div>
              </Box>
            }
                  <br></br>
                  {inputText === '' ? null :

                    <>

                      <br></br>
                      {/* <Typography variant="h6" component="h5">
             Summary : 
             </Typography>
             <p>{showText}</p> */}
                    </>
                  }
                </>
                : <>

                  {/* <input type="file" accept="audio/*" onChange={audioInput} /> */}
                  <input onChange={handleFileSelectedButton} type="File" />

                  <br></br>
                  {show === false ? null :
                  <>
                    <div className="parent">
                      <div className="child1">
                        <textarea style={{height:"35vh"}} className="intext" value={audioText} onChange={textChange} placeholder="Type/Paste the text here....."></textarea>
                      </div>
                      <div className="child2">
                        <textarea cols="70" className="intext" value={audioSummary} placeholder="Summary....."></textarea>
                        <div style={{marginLeft:"2.5rem",marginTop: "1.3rem"}}>
                        <ThemeProvider theme={muiTheme}>
                        <AudioPlayer download={true} target="new" width="100%" src={process.env.REACT_APP_PHOTOPATH + "saved1.mp3"} />
                        </ThemeProvider>
                        </div>
                      </div>
                    </div>
 

                    </>
                  }

                  <br></br>

    

                  {/* <ReactAudioPlayer
              src="Kalimba.mp3"
              autoPlay
              controls
            /> */}
            {showLoading===false?null:
              <Box  >
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <LinearProgress  style={{height:"0.5rem",width:"25rem"}} />
                </div>
              </Box>
            }
            <br></br>
                  <PrimaryButton as="button" onClick={handleSubmitButton}>Get Summary</PrimaryButton>
                  <br></br>

                </>}
            </div>


          </Box>
        </Modal>
        <StyledModal
          closeTimeoutMS={300}
          className="mainHeroModal"
          isOpen={modalIsOpen}
          onRequestClose={toggleModal}
          shouldCloseOnOverlayClick={true}
        >
          <CloseModalButton onClick={toggleModal}>
            <CloseIcon tw="w-6 h-6" />
          </CloseModalButton>
          <div className="content">
            <ResponsiveVideoEmbed url={watchVideoYoutubeUrl} tw="w-full" />
          </div>
        </StyledModal>
      </Container>
    </>
  );
};