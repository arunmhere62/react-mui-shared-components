import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type CustomizedDialogProps = {
  open?: boolean;
  title?: string;
  maxwidth?: any;
  minWidth?: any;
  content?: React.ReactNode;
  actions?: React.ReactNode;
  handleClose?: () => void;  // Callback to handle closing event
  paperWidth?: string;
  paperMaxWidth?: any;
  paperMinHeight?: string;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    overflow: 'auto', // Enable overflow scrolling
    scrollbarWidth: 'none', // Hide scrollbar in Firefox
    '&::-webkit-scrollbar': {
      display: 'none', // Hide scrollbar in WebKit browsers (Chrome, Safari)
    },
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DialogBoxUi = ({
  open: defaultOpen = false,
  paperWidth,
  paperMaxWidth, // Default Material-UI maxWidth prop
  minWidth,              // Apply minWidth dynamically
  title,
  content,
  actions,
  handleClose,
}: CustomizedDialogProps) => {
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    setOpen(defaultOpen); // Sync local state with prop
  }, [defaultOpen]);

  const handleCloseDialog = () => {
    setOpen(false); // Close the dialog
    if (handleClose) {
      handleClose(); // Call custom onClose callback
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseDialog} // Use onClose to manage state and unmount
        aria-labelledby="customized-dialog-title"
        open={open} // Control visibility using the open state
        maxWidth={paperMaxWidth} // Use Material-UI's maxWidth property
        PaperProps={{
          sx: {
            width: paperWidth, // Width as specified by props
            minWidth: "minWidth", 
            maxWidth: "100vw", // Optional: limit max width for responsiveness
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 6,
            top: 3,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon sx={{ width: '20px' }} />
        </IconButton>
        <DialogContent
          sx={{
            margin: '30px 20px 20px 20px',
          }}
        >
          {content}
        </DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
      </BootstrapDialog>
    </React.Fragment>
  );
};


export default DialogBoxUi;
