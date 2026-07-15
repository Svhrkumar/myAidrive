"use client";

import { useEffect, useState } from "react";

const apiBase = "/api/files";

export default function HomePage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [storedFiles, setStoredFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function loadFiles() {
    try {
      const response = await fetch(apiBase);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load files.");
      }

      setStoredFiles(data.files);
    } catch (error) {
      setStatus(error.message);
    }
  }

  useEffect(() => {
    loadFiles();
  }, []);

  function handleFileChange(event) {
    setSelectedFiles(Array.from(event.target.files || []));
  }

  async function handleUpload(event) {
    event.preventDefault();

    if (!selectedFiles.length) {
      setStatus("Please choose at least one file.");
      return;
    }

    setIsLoading(true);
    setStatus("Uploading files...");

    try {
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(apiBase, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed.");
      }

      setSelectedFiles([]);
      setStatus(data.message);
      await loadFiles();
      document.getElementById("file-input").value = "";
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Next.js + MongoDB</p>
        <h1>Upload files and download PDFs</h1>
        <p className="intro">
          This basic app stores uploaded files in MongoDB and lets you download
          them later. PDF files open through a dedicated download route.
        </p>

        <form onSubmit={handleUpload} className="uploadForm">
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,image/*,.doc,.docx"
            onChange={handleFileChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Uploading..." : "Upload Files"}
          </button>
        </form>

        {status ? <p className="status">{status}</p> : null}

        <div className="listBlock">
          <div className="listHeader">
            <h2>Stored files</h2>
            <button type="button" className="secondary" onClick={loadFiles}>
              Refresh
            </button>
          </div>

          {storedFiles.length ? (
            <ul className="fileList">
              {storedFiles.map((file) => (
                <li key={file._id} className="fileItem">
                  <div>
                    <strong>{file.name}</strong>
                    <p>
                      {file.mimeType} • {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <a
                    href={`/api/files/${file._id}/download`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty">No files uploaded yet.</p>
          )}
        </div>
      </section>
    </main>
  );
}
