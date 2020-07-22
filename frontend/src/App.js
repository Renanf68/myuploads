import React, { useState, useEffect } from "react";
import { uniqueId } from "lodash";
import { MdCloudUpload } from "react-icons/md";
import filesize from "filesize";

import api from "./services/api";

import GlobalStyles from "./styles/global";
import { Container, Content, BgImg, Title, LimitInfo } from "./styles/styles";
import ReactLogo from "./image/react-logo.png";
import Upload from "./components/Upload";
import FileList from "./components/FileList";

function App() {
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadLimit, setUploadLimit] = useState(false);
  useEffect(() => {
    async function loadData() {
      const response = await api.get("posts");
      const uploadsFiles = response.data.map((file) => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        error: false,
        url: file.url,
      }));
      setUploadFiles(uploadsFiles);
    }
    loadData();
    return uploadFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);
  useEffect(() => {
    if (uploadFiles.length === 5) {
      setUploadLimit(true);
    } else {
      setUploadLimit(false);
    }
  }, [uploadFiles]);
  const updateFile = (id, data) => {
    setUploadFiles((prevState) =>
      prevState.map((file) => {
        return id === file.id ? { ...file, ...data } : file;
      })
    );
  };
  const processUpload = (fileToUpload) => {
    const data = new FormData();
    data.append("file", fileToUpload.file, fileToUpload.name);
    api
      .post("posts", data, {
        onUploadProgress: (event) => {
          const progress = parseInt(
            Math.round((event.loaded * 100) / event.total)
          );
          updateFile(fileToUpload.id, { progress });
        },
      })
      .then((response) => {
        console.log(uploadFiles.length);
        updateFile(fileToUpload.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
      })
      .catch(() => {
        updateFile(fileToUpload.id, {
          error: true,
        });
      });
  };
  const handleUploads = (files) => {
    if (uploadFiles.length < 5) {
      const uploadedFiles = files.map((file) => ({
        file,
        id: uniqueId(),
        name: file.name,
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      }));
      setUploadFiles((prevState) => prevState.concat(uploadedFiles));
      uploadedFiles.forEach(processUpload);
    }
    if (uploadFiles.length === 5) {
      setUploadLimit(true);
    }
  };
  const handleDelete = async (id) => {
    await api.delete(`posts/${id}`);
    setUploadFiles((prevState) => prevState.filter((file) => file.id !== id));
  };
  const handleClear = (id) => {
    setUploadFiles((prevState) => prevState.filter((file) => file.id !== id));
  };
  return (
    <Container>
      <BgImg src={ReactLogo} alt="React Logo" />
      <Title>
        My Uploads <MdCloudUpload />
      </Title>
      <Content>
        <Upload onUpload={handleUploads} limit={uploadLimit} />
        {!!uploadFiles.length && (
          <FileList
            files={uploadFiles}
            onDelete={handleDelete}
            onClear={handleClear}
          />
        )}
      </Content>
      <LimitInfo>
        Por segurança, foi definido um limite de 5 arquivos.
      </LimitInfo>
      <GlobalStyles />
    </Container>
  );
}

export default App;
