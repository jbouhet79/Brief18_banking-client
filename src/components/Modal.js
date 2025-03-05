import React from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div aria-label='modal-overlay' className="modal-overlay">
      <div aria-label='modal-content' className="modal-content">
        <div aria-label='modal-header' className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div aria-label='modal-body' className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
