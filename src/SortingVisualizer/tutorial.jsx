import React from 'react';
import Popup from 'reactjs-popup';
import './tutorial.css';

export default () => (
  <Popup
    trigger={<button className="button"> Create your own sorting function </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> Custom Sorting Function </div>
        <div className="content">
          {' '}
	    Enter your own javascript sorting function
	 <textarea name="body">
	  </textarea>
        </div>
        <div className="actions">
          <button
            className="button"
            onClick={() => {
              close();
            }}
          >
            Run
          </button>
        </div>
      </div>
    )}
  </Popup>
);
