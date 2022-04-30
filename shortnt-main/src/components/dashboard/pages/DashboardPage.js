import { AnnouncementCard, TodosCard } from 'components/dashboard/components/Card';
import HorizontalAvatarList from 'components/dashboard/components/HorizontalAvatarList';
import MapWithBubbles from 'components/dashboard/components/MapWithBubbles';
import Page from 'components/dashboard/components/Page';
import ProductMedia from 'components/dashboard/components/ProductMedia';
import SupportTicket from 'components/dashboard/components/SupportTicket';
import UserProgressTable from 'components/dashboard/components/UserProgressTable';
import { IconWidget, NumberWidget } from 'components/dashboard/components/Widget';
import { getStackLineChart, stackLineChartOptions } from 'components/dashboard/demos/chartjs';
import AddFolderModal from '../components/added/AddFolderModal'
import FilesComponent from '../components/added/FilesComponent';
import TextField from '@mui/material/TextField';


import {
  avatarsData,
  chartjs,
  productsData,
  supportTicketsData,
  todosData,
  userProgressTableData,
} from 'components/dashboard/demos/dashboardPage';
import React,{useEffect,useState} from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  MdBubbleChart,
  MdInsertChart,
  MdPersonPin,
  MdPieChart,
  MdRateReview,
  MdShare,
  MdShowChart,
  MdThumbUp,
} from 'react-icons/md';
// import InfiniteCalendar from 'react-infinite-calendar';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardText,
  CardDeck,
  CardGroup,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap';
import { getColor } from 'components/dashboard/utils/colors';
import { CenterFocusStrong, LocalConvenienceStoreOutlined, SettingsInputSvideo } from '@material-ui/icons';
import { boxSizing, maxWidth } from '@mui/system';

// CARD IMPORT
// import Box from '@mui/material/Box';
// // import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// // import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
//CARD IMPORT CLOSE


const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7,
);



const DashboardPage = () => {
  // componentDidMount() {
  //   // this is needed, because InfiniteCalendar forces window scroll
  //   window.scrollTo(0, 0);
  // }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     showComponent: false,
  //   };
  //   this._onButtonClick = this._onButtonClick.bind(this);
  // }
  const [state,setState] = useState(false);
  const [userData,setUserData] = useState([]);
  const [len,setLen] = useState(0);
  const [show, setShow] = useState(false);
  const [folderData,setFolderData] = useState([]);
  const [log,setLog] = useState(localStorage.getItem('loginData'));
  const [searchTerm, setsearchTerm] = useState("");

  // const [btn,setBtn] = useState(false);

  // _onButtonClick() {
  //   this.setState({
  //     showComponent: true,
  //   });
  // }
  const onButtonClick = ()=> {
    setState(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    let s = '';
    for(let i=0;i<log.length;i++){
      if(i==0 || i==log.length-1){
        continue;
      }
      s+=log.charAt(i);

    }

    console.log("loggggg")
    console.log(log)
    console.log(s)



    fetch(process.env.REACT_APP_API+"socialuser/"+s)
    .then((res)=>res.json())
    .then((data) => {
      fetch(process.env.REACT_APP_API+"folders/"+data.uid)
      .then((res)=>res.json())
      .then((data) => {
        setUserData(data)
        setLen(data.length)

        })
      .catch((error)=>console.log(error));
    })
    .catch((err)=> console.log(err))

  
},[len,userData]);
    const buttonClicked = (event,data) =>{
      event.preventDefault();
      console.log(data);
      setFolderData(data);
      if(show){
        setShow(false);
      }else {
        setShow(true);
      }
      window.location.href=`dash/files/${data.folder_title}/${data.folder_id}`;
    }

    const deleteFolder = (event, folderData) => {
      event.preventDefault();
      console.log("You deleted " + folderData.folder_id)
      fetch(process.env.REACT_APP_API + 'folders/'+ folderData.folder_id, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then((result) => {
          setLen(result.length)
          console.log(result)
        },
          (error) => {
            alert('Failed');
          })
      
    }

    const starFolder = (event, folderData) => {
      event.preventDefault();
      console.log("You deleted " + folderData.folder_id)
      // fetch(process.env.REACT_APP_API + 'folders/'+ folderData.folder_id, {
      //   method: 'DELETE',
      // })
      //   .then(res => res.json())
      //   .then((result) => {
      //     setLen(result.length)
      //     console.log(result)
      //   },
      //     (error) => {
      //       alert('Failed');
      //     })
      
    }

    const showBtn = (event) => {
      event.preventDefault();
      if(show){
        setShow(false);
      }else {
        setShow(true);
      }
    }


    const primaryColor = getColor('primary');
    const secondaryColor = getColor('secondary');

    return (
      <>

      { show === true ? 
      <>
      {/* {window.location.href="/dash/files"} */}
      <Button outline color="dark" style={{ width: '65px', marginLeft: '20px', marginRight: '20px'}}  onClick={showBtn} >
                  BACK
      </Button>
      {/* <FilesComponent data={folderData} /> */}
      </> : <> 
      <Page
        className="DashboardPage"
        // title="ShortNt Dashboard"
        breadcrumbs={[{ name: '', active: true }]}
      >
        {/* <div  style={{display: 'flex',  justifyContent:'center', alignItems:'center',border: '10px solid blue'}}>
          <input type="text"
                  placeholder="Search.."
                  style={{border: '2px solid red', height:"40px"}}
                  onChange={(event)=>{
                      setsearchTerm(event.target.value)
                  }} 
               />
               </div> */}
               <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>
               <TextField id="standard-basic" label="Search..." variant="outlined" 
                  onChange={(event)=>{
                      setsearchTerm(event.target.value)
                  }} 
                 sx={{width: "300px"}}
               />
               </div>
           

               <br/>
     <Row>
       {console.log(userData)}
        {userData.filter((val)=>{
                        if(searchTerm===""){
                            return val;
                        }else if(val.folder_title.toLowerCase().includes(searchTerm.toLowerCase())){
                            return val
                        }
          })
        .map((val) => (
          <div style={{
          maxWidth:"19rem",
          margin:'0.5rem',
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
          }}>


            <Card
              style={{
                height: 200,
                width: 300,
                color: "white",
                backgroundColor : '#4299E1',
                
              }}
            >
              <CardBody className="d-flex flex-column justify-content-start align-items-start">
                {/* <CardTitle>{userData[index].folder_id}</CardTitle> */}
                <CardText>{val.folder_title}</CardText>
                <CardText>{val.date_of_folder.substring(0,10)}</CardText>

              </CardBody>

              <CardBody className="d-flex justify-content-between align-items-center">
                {/* <Button outline color="light"   href={"/dash/files"} >
                  OPEN
                </Button> */}
                <Button outline color="light"  onClick={(event)=> {buttonClicked(event,val)}} >
                  OPEN
                </Button>
                <div>
                <Button outline color="light"  onClick={(event)=> {deleteFolder(event,val)}} >
                  DELETE
                </Button>
                </div>
                {/* <div>
                <Button outline color="light"  onClick={(event)=> {starFolder(event,val)}} >
                  STAR
                </Button>
                </div> */}
                {/* {state ?
          //  <FilesComponent id="This" text="This is text" /> 
          <Home id="myhome" />:
           null
               } */}
              </CardBody>
            </Card>
          </div> 
        ))}
      </Row>
      </Page>
      <div style={{ display: "flex" }}>
      
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
         width: "70px"
        }}
    >
           <AddFolderModal data={userData}></AddFolderModal>

    </button>
    </div>
    </>}
    </>
    );
  }
export default DashboardPage;
