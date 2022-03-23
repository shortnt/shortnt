import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';

const AddFolderModal = (props) => {
  // state = {
  //   open: false,
  // };
  const [open,setOpen] = useState(false);
  const [title,setTitle] = useState("");
  const [data,setData] = useState(props.data);
  const [len,setLen] = useState(0);
  const [clog,setLog] = useState(localStorage.getItem('loginData'));
  const [userData,setUserData] = useState({});


  useEffect(() => {
    let s = '';
    for(let i=0;i<clog.length;i++){
      // console.log(clog.charAt(i) + " ");
      
      if(i==0 || i==clog.length-1){
        continue;
      }
      s+=clog.charAt(i);

    }
          fetch(process.env.REACT_APP_API+"socialuser/"+s)
          .then((res)=>res.json())
          .then((data) => {setUserData(data)
            setLen(props.data.length)
          })
          .catch((error)=>console.log(error));

}, [len]);

  const handleClickOpen = () => {
    // this.setState({ open: true });
    setOpen(true);
  };

  const handleClose = () => {
    // this.setState({ open: false });
    setOpen(false);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  }

  const onAddFolder = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_API+'folders/',{
      method:'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
      body:JSON.stringify({
          folder_id:null,
          folder_title:title,
          uid:userData.uid.toString(),
          
      })
    })
    .then((res)=> res.json())
    .then((data)=> {console.log("hello" + data)
    setLen(props.data.length)
  })
    .catch((err)=> alert(err));
    setTitle("");
    
    handleClose();
  }

    return (
      <div >
        <Button onClick={handleClickOpen} style={{color:"white"}}
     ><AddIcon></AddIcon></Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add New Folder</DialogTitle>
          <DialogContent>
            <DialogContentText>
                {/* Manage all related files in one repo */}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={title}
              onChange={handleChange}
              fullWidth
            />
              {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Input2"
              type="email"
              fullWidth
            /> */}
          </DialogContent>
          <DialogActions>
             <Button onClick={onAddFolder} color="primary">
              Cancel
            </Button>
            <Button onClick={onAddFolder} color="primary">
              ADD
            </Button> 
          </DialogActions>
        </Dialog>
      </div>
    );
}


export default AddFolderModal;