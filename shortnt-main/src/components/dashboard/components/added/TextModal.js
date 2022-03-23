import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { TextareaAutosize } from '@mui/material';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div >
        <Button onClick={this.handleClickOpen} style={{color:"green"}}
     >Text</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth={'lg'}
        >
          <DialogTitle id="form-dialog-title">Add New File</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ...
            </DialogContentText>
            <div style={{display:"flex", FlexDirection:"row"}}>
            
           
            <textarea style={{margin:"15px"}} cols="250" rows="10" class="inline-txtarea" placeholder='place text here..'></textarea>
            <br />
            <textarea style={{margin:"15px"}} cols="250" rows="10" class="inline-txtarea" placeholder='summary..'></textarea>
            </div>
            
              
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}