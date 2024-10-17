import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadedFile(null); // Reset uploaded file state
  };

  // Handle file upload
  const handleUpload = async (fileToUpload) => {
    if (!fileToUpload) {
      alert('Please select a file or record audio first');
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('audio', fileToUpload);

      const response = await axios.post('https://sitar.iitdh.ac.in/speech/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setUploadedFile(response.data.message);
    } catch (error) {
      console.error('Error uploading file: ', error);
      setUploadedFile('error');
    } finally {
      setIsUploading(false);
    }
  };

  // Handle microphone recording start
  const startRecording = () => {
    if (isRecording) return;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();

        const audioChunks = [];
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
        };

        setIsRecording(true);
      })
      .catch(error => {
        console.error('Error accessing microphone: ', error);
      });
  };

  // Handle microphone recording stop
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Handle recorded file upload
  const handleRecordUpload = () => {
    if (audioBlob) {
      const recordedFile = new File([audioBlob], 'recorded_audio.wav', { type: 'audio/wav' });
      handleUpload(recordedFile);
    } else {
      alert('No audio recorded yet!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Fake Speech Detection</h1>

        {/* File upload input */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-700 mb-4">Upload or Record Your Audio</h3>

          <input
            type="file"
            accept=".wav"
            onChange={handleFileChange}
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4 p-2"
          />

          <button
            onClick={() => handleUpload(selectedFile)}
            className={`w-full py-2 px-4 rounded text-white font-semibold transition duration-300 ${
              isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>

          {isUploading && (
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
              <div className="bg-blue-600 h-4 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          )}
        </div>

        {/* Recording controls */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-700 mb-4">Record Using Microphone</h3>

          <button
            onClick={isRecording ? stopRecording : startRecording}
            className={`w-10 h-10 rounded-full text-white mb-4 ${
              isRecording ? 'bg-red-600' : 'bg-green-600'
            }`}
          >
            {isRecording ? '■' : '🎤'}
          </button>

          {audioBlob && (
            <button
              onClick={handleRecordUpload}
              className="w-full py-2 px-4 rounded text-white bg-blue-600 hover:bg-blue-700"
            >
              Upload Recorded Audio
            </button>
          )}
        </div>

        {/* Upload status */}
        <div className="text-center mt-3">
          {uploadedFile === 'error' && <p className="text-red-500">Error uploading file. Please try again.</p>}
          {uploadedFile === 0 && <p className="text-red-500 font-semibold">The voice input is Fake</p>}
          {uploadedFile === 1 && <p className="text-green-500 font-semibold">The voice input is Real</p>}
          {uploadedFile === null && <p className="text-gray-500">Please upload or record an audio file.</p>}
        </div>

        {/* Back button */}
        <div className="mt-6 text-center">
          <Link to="/demo" className="text-blue-600 hover:underline">Go Back</Link>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
