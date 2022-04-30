import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Media from 'reactstrap/lib/Media';
import Page from 'components/dashboard/components/Page';
import { BorderColor, LaptopWindows, LocalConvenienceStoreOutlined, Title } from '@material-ui/icons';
import './AddFileModal';
import AddFileModal from './AddFileModal';
import AddFolderModal from './AddFolderModal'
import Add from '@material-ui/icons/Add';
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import LaunchIcon from '@material-ui/icons/Launch';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import DeleteIcon from '@mui/icons-material/Delete';

import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ReactModalAdapter from "./ReactModalAdapter";
import propTypes from "components/dashboard/utils/propTypes";
import { conditionallyUpdateScrollbar } from "reactstrap/lib/utils";
import LinearProgress from '@mui/material/LinearProgress';

import '../../../../styles/globalStyles.css';
import { createTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';



const muiTheme = createTheme({});

const PrimaryButton = tw.button`font-bold px-8 lg:px-10 py-3 rounded bg-blue-500 text-gray-100 hocus:bg-blue-700 focus:shadow-outline focus:outline-none transition duration-300`;

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


const useStyles = makeStyles({
  root: {
    borderStyle: "solid",
    BorderColor: 'red',
    margin: 5,
    marginLeft: 30,
    marginRight: 30,
    display: 'flex',
    flexDirection: 'row',

    justifyContent: 'space-around',
    '@media (max-width: 500px)': {
      backgroundColor: 'green',
      flexDirection: 'column',
      marginLeft: '10px',
      marginRight: '10px',
      
    },
    // alignItems: 'center',

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',

    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


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
  {
    value: 'Youtube_Url',
    label: 'Youtube_Url',
  },

];



const FilesComponent = (props) => {

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');
  const [filename, setFilename] = React.useState('');
  const [inputText, setInputText] = useState('');
  const [showText, setShowText] = useState('');
  const [audioSrc, setAudioSrc] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [showLoading, setshowLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [audioshow, setAudioShow] = useState(false);
  const [audioFile, setAudioFile] = useState("anonymous.png");
  const [audioFilename, setAudioFilename] = useState("");
  const [audioText, setAudioText] = useState("");
  const [audioSummary, setAudioSummary] = useState("");
  const [inputUrl, setInputUrl] = useState('');
  const [urlSummary, seturlSummary] = useState('');
  const [urlTranscipt, seturlTranscript] = useState('');

  const [showFile, setShowFile] = useState(false);
  const [fileDetails, setFileDetails] = useState({});

  const [searchTerm, setsearchTerm] = useState("");
  const {id,title} = useParams();

  const handleChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value)
  };
  const handleFileChange = (event) => {
    if(event.target.value.length>15){
      alert("length exceded")
    }
    else{
      setFilename(event.target.value);
    }
  };

  const audioInput = (event) => {
    setAudioSrc(event.target.value);
  };

  const textChange = (event) => {
    setInputText(event.target.value);
  };

  const urlChange = (event) => {
    setInputUrl(event.target.value);
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_API + 'files/' + "f" + id)
      .then((res) => res.json())
      .then((data) => setDisplayData(data))
      .catch((err) => console.log(err));

  }, [displayData]);

  const handleOpen = () => {
    console.log(open);
    setOpen(true);
    console.log("Modal should be visible ");
  }
  const handleClose = () => setOpen(false);


  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const getAudio = () => {
    console.log(id)
    console.log(fileDetails.output_text)
    fetch(process.env.REACT_APP_API + 'getaudio/', {
      method: 'POST',
      body: JSON.stringify({
        audio_text: fileDetails.output_text
      })
    })
      .then(res => res.json())
      .then((result) => {
        setAudioShow(true)
        //this.imagesrc = process.env.REACT_APP_PHOTOPATH + result;
        // setAudioFile(process.env.REACT_APP_PHOTOPATH + result);
      },
        (error) => {
          alert('Failed');
        })
  }
  const getSummary = (event) => {
    console.log(id)
    event.preventDefault();
    setshowLoading(true);

    console.log("11111111")

    fetch(process.env.REACT_APP_API + 'files/' + "f" + id)
    .then((res) => res.json())
    .then((data) => {console.log(data)
    const temp=data.filter((val)=>val.file_title===filename)
    if(temp.length!==0){
      alert("File Title " + filename +" Already Exists!.." )
      handleClose();
      window.location.reload()

    }else{
      fetch(process.env.REACT_APP_API + 'files/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          file_id: null,
          file_title: filename,
          folder_id: "f" + id.toString(),
          input_text_or_audio: input,
          input_text: inputText
          // Output:event.target.Output.value
        })
      })
        .then(res => res.json())
        .then((result) => {
          // alert(result);
          fetch(process.env.REACT_APP_API + 'files/')
            .then((res) => res.json())
            .then((data) => {
  
              // console.log("data "+data[data.length-1].file_id)
              fetch(process.env.REACT_APP_API + 'files/' +data[data.length-1].file_id)
                .then((res) => res.json())
                .then((data) => {
                  setShowText(data[0].output_text)
                  setshowLoading(false);
                  window.location.reload()

                }
                )
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
  }
    )
    .catch((err) => console.log(err));
  }


  const getUrlSummary = (event) => {
    event.preventDefault();
    setshowLoading(true);
    console.log("Get URL Summary")
    console.log(process.env.REACT_APP_API)
    console.log(inputUrl)

    fetch(process.env.REACT_APP_API + 'files/' + "f" + id)
    .then((res) => res.json())
    .then((data) => {console.log(data)
    const temp=data.filter((val)=>val.file_title===filename)
    if(temp.length!==0){
      alert("File Title " + filename +" Already Exists!.." )
      handleClose();
      // window.location.reload()

    }else{
      fetch(process.env.REACT_APP_API + 'files/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          file_id: null,
          file_title: filename,
          folder_id: "f" + id.toString(),
          input_text_or_audio: input,
          url_link:inputUrl,
          input_text: inputUrl,
          // Output:event.target.Output.value
        })
      })
        .then(res => res.json())
        .then((result) => {
          // alert(result);
          fetch(process.env.REACT_APP_API + 'files/')
            .then((res) => res.json())
            .then((data) => {
  
              // console.log("data "+data[data.length-1].file_id)
              fetch(process.env.REACT_APP_API + 'files/' +data[data.length-1].file_id)
                .then((res) => res.json())
                .then((data) => {
                  setShowText(data[0].output_text)
                  setInputText(data[0].input_text)
                  setInputUrl(data[0].url_link)
                  // window.location.reload()

                }
                )
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
  }
    )
    .catch((err) => console.log(err));
  }



  const handleSubmitButton = (event) => {
    event.preventDefault();
    setshowLoading(true);

    fetch(process.env.REACT_APP_API + 'files/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file_id: null,
        file_title: filename,
        folder_id: "f" + id.toString(),
        input_text_or_audio: input,
        uploaded_filepath: audioFilename
      })
    })
      .then(res => res.json())
      .then((result) => {
        // alert(result);

        fetch(process.env.REACT_APP_API + 'files/')
          .then((res) => res.json())
          .then((data) => {
            fetch(process.env.REACT_APP_API + 'files/'+data[data.length-1].file_id)
              .then((res) => res.json())
              .then((data) => {
                setShow(true)
                setAudioText(data[0].input_text)
                setAudioSummary(data[0].output_text)
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


  // const handleSubmitButton = (event) => {
  //   event.preventDefault();
  //   setshowLoading(true);

  //   fetch(process.env.REACT_APP_API + 'audiosummary/', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       aid: null,
  //       AudioFileName: audioFilename
  //     })
  //   })
  //     .then(res => res.json())
  //     .then((result) => {
  //       // alert(result);

  //       fetch(process.env.REACT_APP_API + 'audiosummary/')
  //         .then((res) => res.json())
  //         .then((data) => {
  //           fetch(process.env.REACT_APP_API + 'audiosummary/' + data.length)
  //             .then((res) => res.json())
  //             .then((data) => {
  //               setShow(true)
  //               setAudioText(data.AudioText)
  //               setAudioSummary(data.AudioSummary)
  //               setshowLoading(false);

  //             })
  //             .catch((error) => console.log(error));
  //         })
  //         .catch((error) => console.log(error));

  //     },
  //       (error) => {
  //         alert('Failed');
  //       })
  // }



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
  // console.log(props.data);

  const openFile = (event, fileData) => {
    event.preventDefault();
    console.log("You clicked " + fileData.file_title)
    setShowFile(true);
    console.log(fileData);
    setFileDetails(fileData);
  }

  const deleteFile = (event, fileData) => {
    event.preventDefault();
    console.log("You deleted " + fileData.file_id)
    fetch(process.env.REACT_APP_API + 'files/'+ fileData.file_id, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then((result) => {
        
        console.log(result)
      },
        (error) => {
          alert('Failed');
        })
    
  }
  const showBtn = () => {
    window.location.href="/dash";
  }


  return (
    <>

<Button outline color="dark" style={{ width: '65px', marginLeft: '20px', marginRight: '20px'}}  onClick={showBtn} >
                  BACK
      </Button>

      <Page
        className="DashboardPage"
        breadcrumbs={[{ name: ' ' +title, active: true }]}
      >
              <h1 style={{ textAlign: "center" }}>{title}</h1>
                 <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
               <TextField id="standard-basic" label="Search..." variant="outlined" 
                  onChange={(event)=>{
                      setsearchTerm(event.target.value)
                  }} 
                 sx={{width: "300px"}}
               />
               </div>
               <br/>




        <div style={{ display: "flex" }}>



          {/* <button 
  style={{ padding: "5px", marginLeft: "auto" ,marginTop:'auto',marginRight:'30px', borderRadius:'',backgroundColor:"yellow",position:'fixed',
   bottom:'1%',right:'1%'}}
   
>
      <AddFileModal/>
</button>  */}
          {/* <button
            style={{
              padding: "10px", marginLeft: "auto", marginTop: 'auto', marginRight: '30px', borderRadius: '5px', backgroundColor: '#3182ce',
              color: "white", position: 'fixed',
              bottom: '1%', right: '1%'
            }}
            onClick={handleOpen}
          >Add File </button> */}
          <button
      style={{ marginLeft: "auto" ,
       backgroundColor:"crimson",
       marginTop:'auto',
       marginRight:'10px', 
       borderRadius:'50%',
       position:'fixed',
         bottom:'1%',
         right:'1%',
         height : '70px',
         width: "70px",
        fontSize: "30px",
         color: "white" 
        }}
        onClick={handleOpen}
    >
    +
    </button>
        </div>


        <Modal

          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        // closeButton

        >
          <Box sx={style} className="box">
            <TextField
              label="File Name"
              value={filename}
              onChange={handleFileChange}
              className="format"
              variant="standard"
            // helperText="Please select your input format"
            ></TextField>
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
                  <br></br>
                  {showLoading === false ? null :
                    <Box  >
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <LinearProgress style={{ height: "0.5rem", width: "25rem" }} />
                      </div>
                    </Box>
                  }
                  <br></br>
                  <PrimaryButton as="button" onClick={getSummary}>Get Summary</PrimaryButton>
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
                :input==='Audio' ? <>

                  {/* <input type="file" accept="audio/*" onChange={audioInput} /> */}
                  <input onChange={handleFileSelectedButton} type="File" />

                  <br></br>
                  {show === false ? null :
                    <>
                      <div className="parent">
                        <div className="child1">
                          <textarea style={{ height: "35vh" }} className="intext" value={audioText} onChange={textChange} placeholder="Type/Paste the text here....."></textarea>
                        </div>
                        <div className="child2">
                          <textarea cols="70" className="intext" value={audioSummary} placeholder="Summary....."></textarea>
                          <div style={{ marginLeft: "2.5rem", marginTop: "1.3rem" }}>
                            <ThemeProvider theme={muiTheme}>
                              <AudioPlayer download={true} target="new" width="100%" src={process.env.REACT_APP_PHOTOPATH + "saved1.mp3"} />
                            </ThemeProvider>
                          </div>
                        </div>
                      </div>
                    </>
                  }

                  <br></br>

                  {showLoading === false ? null :
                    <Box  >
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <LinearProgress style={{ height: "0.5rem", width: "25rem" }} />
                      </div>
                    </Box>
                  }
                  <br></br>
                  <PrimaryButton as="button" onClick={handleSubmitButton}>Get Summary</PrimaryButton>
                  <br></br>

                </>:
                <>
                 <div className="parent">
                    <div className="child1">
                      <h5>URL</h5>
                      <textarea className="intext"   value={inputUrl} onChange={urlChange} placeholder="Paste the Youtube URL here....."></textarea>
                    </div>
                    <div className="child2">
                    <h5>SUMMARY</h5>
                      <textarea className="intext" value={showText} placeholder="Summary....."></textarea>
                    </div>
            </div>
            <div className="parent">
                    <div className="child1">
                    <h5>TRANSCRIPT</h5>
                      <textarea className="intext"  value={inputText} placeholder="Transcript of the video..."></textarea>
                    </div>
            </div>
            <br></br>
                  <PrimaryButton as="button" onClick={getUrlSummary}>Get Summary</PrimaryButton>
                  {showLoading===false?null:
              <Box  >
                <br />
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <LinearProgress  style={{height:"0.5rem",width:"25rem"}} />
                </div>
              </Box>
              }
                </>
                }
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
        </StyledModal>

        <div style={{margin: "0 auto",}}>

        {displayData
        .filter((val)=>{
          if(searchTerm===""){
              return val;
          }else if(val.file_title.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
          }
          })
        .map((val, index) => (

          <Card className={classes.root} key={index} style={{ backgroundColor: "rgb(66, 153, 225)",
          color: "white", borderRadius:"5px",}}>
            <CardContent >

              <Typography variant="h5" component="h2" style={{}}>
                {index + 1}
              </Typography>

            </CardContent>
            <CardContent>
              <Typography variant="h5" component="h2" style={{}}>
                {val.file_title}
              </Typography>
            </CardContent>
            <CardActions style={{}}>
              <Button size="small"
                style={{
                  backgroundColor: 'white',
                  color: "#3182ce",
                  border: "1.5px solid black",
                }}
                onClick={(event) => { openFile(event, displayData[index]) }}
                endIcon={<FileOpenIcon/>}
              >Open</Button>
              <Button size="small"
                style={{
                  backgroundColor: '#ff3f3fdb',
                  color: "white",
                  marginLeft:'22px',
                  border: "1.5px solid black",
                }}
                onClick={(event) => { deleteFile(event, displayData[index]) }}
                endIcon={<DeleteIcon/>}
              >Delete</Button>
            </CardActions>
          </Card>
        ))}
        </div>

        {/* ====================== This is open file modal ================================== */}
        <Modal
          open={showFile}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {fileDetails.file_title}
            </Typography>
            <br></br>
            <div className="parent">
              <div className="child1">
                <textarea className="intext" value={fileDetails.input_text} ></textarea>
              </div>
              <div className="child2">
                <textarea className="intext" value={fileDetails.output_text} ></textarea>
                <PrimaryButton as="button" onClick={() => { getAudio() }} style={{ backgroundColor: "green", }}>Play Audio</PrimaryButton>

              </div>
              {audioshow === false ? null :
              <div style={{ marginLeft: "2.5rem", marginTop: "1.3rem" }}>
                <ThemeProvider theme={muiTheme}>
                  <AudioPlayer download={true} target="new" width="100%" src={process.env.REACT_APP_PHOTOPATH + "textaudio.mp3"} />
                </ThemeProvider>
              </div>
              }
            </div>
            <br></br>
            <PrimaryButton as="button" onClick={() => { setShowFile(false);setAudioShow(false) }}>Close File</PrimaryButton>
            <br></br>
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
        </StyledModal>


      </Page>

    </>
  );
}

export default FilesComponent;