import './useModal.css';
import React, { useCallback, useEffect, useState } from "react";
import _ from 'lodash';
import { createRoot } from "react-dom/client";

const MODAL_CONTAINER_ID = 'modal-container';
const MODAL_CLASS = 'modal';

function Modal({ children, onEscape }: Readonly<{ children: React.ReactElement, onEscape: () => void }>) {
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onEscape();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    }
  }, [onKeyDown]);

  return <div className={MODAL_CLASS}>{children}</div>;
}

export function useModal() {
  const [modalContainer, setModalContainer] = useState<HTMLDivElement>();
  
  useEffect(() => {
    let container = document.querySelector<HTMLDivElement>(`#${MODAL_CONTAINER_ID}`);
    if (!container) {
      container = document.createElement('div');
      container.setAttribute('id', MODAL_CONTAINER_ID);
      document.body.appendChild(container);
    }
    setModalContainer(container);
  }, []);

  return {
    open: (children: React.ReactElement, onClose?: () => void) => {
      if (modalContainer) {
        const root = createRoot(modalContainer);
        const unmount = () => {
          root?.unmount();
          if (onClose) {
            onClose();
          }
        }
        root.render(<Modal onEscape={unmount}>{children}</Modal>);
        return unmount;
      }

      return _.noop;
    }
  } 
}