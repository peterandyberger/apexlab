import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  return (
    <div>
      <Modal
        data-test-id="modal"
        data-test-text={props.datatext}
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div dangerouslySetInnerHTML={{ __html: props.lead }} />
          </Typography>
          {props.lead && (
            <Button
              data-test-id="wikipedia-button"
              variant="contained"
              onClick={() => {
                window.open(props.urlwiki, '_blank', 'noopener,noreferrer');
              }}
            >
              WIKIPEDIA RESULTS
            </Button>
          )}
          {props.imdb && (
            <Button
              data-test-id="imdb-button"
              variant="contained"
              onClick={() => {
                window.open(props.urlimdb, '_blank', 'noopener,noreferrer');
              }}
            >
              IMDB RESULTS
            </Button>
          )}
        </Box>
      </Modal>
    </div>
  );
}
