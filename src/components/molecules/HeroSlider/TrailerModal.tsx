import React, { useEffect, useRef } from "react";
import { Modal, ModalContent } from "../../atoms/Modal";

interface TrailerModalProps {
  item: { id: number };
  videos: { key: string }[];
}

const TrailerModal: React.FC<TrailerModalProps> = ({ item, videos }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (videos.length > 0 && iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videos[0].key}`;
    }
  }, [videos]);

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent>
        <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
      </ModalContent>
    </Modal>
  );
};

export default TrailerModal;
