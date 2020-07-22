import React from "react";
import Dropzone from "react-dropzone";

import { DropContainer, UploadMessage } from "./styles";

function Upload({ onUpload, limit }) {
  function renderDragMessage(isDragActive, isDragReject, limit) {
    if (!isDragActive) {
      if (limit) {
        return (
          <UploadMessage>O limite de arquivos já foi atingido.</UploadMessage>
        );
      }
      return <UploadMessage>Arraste seus arquivos aqui!</UploadMessage>;
    }
    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado.</UploadMessage>;
    }
    if (limit) {
      return (
        <UploadMessage>O limite de arquivos já foi atingido.</UploadMessage>
      );
    }
    return (
      <UploadMessage type="success">Solte os arquivos aqui!</UploadMessage>
    );
  }
  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject, limit)}
        </DropContainer>
      )}
    </Dropzone>
  );
}

export default Upload;
