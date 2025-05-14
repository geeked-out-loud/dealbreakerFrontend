"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Waves from '../Waves/Waves';

export default function Page() {
  const [fileName, setFileName] = useState("");
  const [productSearchInput, setProductSearchInput] = useState("");

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const name = acceptedFiles[0].name;
      setFileName(name);
    }
  };

  const handleImageSearchClick = () => {
    if (fileName) {
      alert(`Image Search initiated for: ${fileName}`);
    } else {
      alert("Please upload an image.");
    }
  };

  const handleProductSearchClick = () => {
    if (productSearchInput.trim()) {
      alert(`Product Search initiated for: ${productSearchInput}`);
    } else {
      alert("Please enter a product name.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // State for showing the uploaded file name
  const [showFileName, setShowFileName] = useState(false);

  // Show file name for 10 seconds when fileName changes
  useEffect(() => {
    if (fileName) {
      setShowFileName(true);
      const timer = setTimeout(() => setShowFileName(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [fileName]);

  return (
    <div className="maincontainer">
      <div className="container">
        <div className="joined-boxes">
          {/* Left: Image Search */}
          <div className="box left-box">
            <div className="inner" {...getRootProps()}>
              <input {...getInputProps()} />
              <Image
                src="/upload_icon.png"
                alt="Upload Icon"
                width={80}
                height={80}
              />
            </div>
            <button className="button" onClick={handleImageSearchClick}>
              Image Search
            </button>
          </div>

          {/* Right: Text Search */}
          <div className="box right-box">
            <div className="content">
              <input
                type="text"
                className="input"
                placeholder="Search Your Product"
                value={productSearchInput}
                onChange={(e) => setProductSearchInput(e.target.value)}
              />
              <button className="button" onClick={handleProductSearchClick}>
                Search Your Product
              </button>
            </div>
          </div>
        </div>
        <Waves
          lineColor="rgba(255, 255, 255, 0.3)"
          backgroundColor="rgba(0, 0, 0, 0.65)"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
          zIndex={0}
        />
      </div>
      {/* Display file name with fade-out */}
      {fileName && (
        <div className={`file-name${showFileName ? " visible" : ""}`}>
          Uploaded File: {fileName}
        </div>
      )}

      <style jsx>{`
        .container {
          background-color: #161616;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1;
        }

        .joined-boxes {
          display: flex;
          background-color: rgba(11, 11, 11, 0.85);
          gap: 0;
          width: auto;
        }

        .box {
          border: 0.125rem solid #c2c2c2;
          background: rgba(11, 11, 11, 0.70);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          z-index: 1;
        }

        .left-box {
          border-radius: 1rem;
          border-right: none;
        }

        .right-box {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0;
          width: 30vw;
          border-radius: 1rem;
        }

        .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          padding: 1.5rem 2rem;
        }

        .inner {
          width: 20vw;
          max-width: 15rem;
          height: 20vw;
          max-height: 15rem;
          border: 0.125rem dashed #c2c2c2;
          border-radius: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
          cursor: pointer;
          transition: transform 0.4s ease, box-shadow 0.3s ease;
          box-shadow: 0 0.25rem 0.5rem rgba(0,0,0,0.4);
        }

        .inner:hover {
          background-color: rgba(194, 194, 194, 0.1);
          transform: scale(1.02);
          box-shadow: 0 0.75rem 1.5rem rgba(0,0,0,0.6);
        }

        .button {
          width: 100%;
          height: 4rem;
          border: none;
          border-radius: 0.625rem;
          background-color: #c2c2c2;
          color: #161616;
          font-size: 1.125rem;
          font-weight: bold;
          cursor: pointer;
          text-align: center;
        }

        .button:hover {
          opacity: 0.9;
          transform: scale(1.02);
          box-shadow: 0 0.75rem 1.5rem rgba(0,0,0,0.6);
        }

        .input {
          width: 100%;
          height: 4rem;
          padding: 0.5rem 0.75rem;
          border: 0.1875rem solid #c2c2c2;
          border-radius: 0.625rem;
          background: transparent;
          color: #c2c2c2;
          font-size: 1.25rem;
          margin-bottom: 1rem;
          text-align: left;
        }

        .input:focus {
          outline: none;
          box-shadow: 0 0 0 0.125rem rgba(194, 194, 194, 0.5);
          transform: scale(1.02);
          box-shadow: 0 0.75rem 1.5rem rgba(0,0,0,0.6);
        }

        .file-name {
          background-color: rgba(0, 0, 0, 0.8);
          padding: 0.625rem 1.25rem;
          border-radius: 0.625rem;
          font-size: 1rem;
          position: absolute;
          bottom: 2vh;
          color: #c2c2c2;
          opacity: 0;
          transition: opacity 1s;
          pointer-events: none;
        }
        .file-name.visible {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
