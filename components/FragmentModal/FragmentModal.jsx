import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@nextui-org/react';
import { CSVTable } from '../CSVTable/CSVTable';
import Image from 'next/image';

// ===== FRAGMENT MODAL COMPONENT =====
export const FragmentModal = ({ isOpen, onClose, content, mimeType }) => {
  const parseCsv = (csvText) => {
    const rows = csvText.split('\n').map((row) => row.split(','));
    return rows;
  };

  // Render content based on MIME type
  const renderContent = () => {
    if (mimeType.startsWith('text/') || mimeType.startsWith('application/')) {
      if (mimeType === 'text/csv') {
        const rows = parseCsv(content);
        return <CSVTable data={rows} />;
      }

      return <pre>{content}</pre>;
    }

    if (mimeType.startsWith('image/')) {
      return <Image width={500} height={500} src={content} alt="Fragment" />;
    }

    return <p>Unsupported content type</p>;
  };

  // Create a download link for the content
  const createDownloadLink = () => {
    const blob = new Blob([content], { type: mimeType });
    return URL.createObjectURL(blob);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Viewing fragment as {mimeType}</ModalHeader>
        <ModalBody>{renderContent()}</ModalBody>
        <ModalFooter>
          <Button
            as="a"
            href={createDownloadLink()}
            download={`fragment${mimeType.split('/')[1]}`}
            color="primary"
          >
            Download
          </Button>
          <Button color="danger" variant="light" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
