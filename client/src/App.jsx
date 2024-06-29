import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [file, setFile] = useState(null);
  const [format, setFormat] = useState('pdf');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:8000/api/files/upload', formData)
      .then(response => {
        console.log(response);
        toast.success('File uploaded and processing started.');;
      })
      .catch(error => {
        console.log(error);
        toast.error('Error uploading file.');
      });
  };

  const handleDownload = () => {
    axios.get(`/download/${format}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `analysis_result.${format}`);
        document.body.appendChild(link);
        link.click();
        toast.success('File downloaded successfully.');
      })
      .catch(error => {
        toast.error('Error downloading file.');
      });
  };

  return (
    <div className="min-h-screen bg-dark-800 flex flex-col items-center justify-center text-white">
      <div className="bg-dark-600 p-6 rounded-lg shadow-inner shadow-white w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">File Analyzer</h1>

        <div className="mb-4">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="w-full p-2 bg-dark-700 border border-dark-500 rounded text-white" 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-300">Select format:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full p-2 bg-dark-700 border border-dark-500 rounded text-white"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="ppt">PPT</option>
          </select>
        </div>

        <div className="flex justify-between mb-4">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
          >
            Upload
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-700"
          >
            Download
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">Developed by:</p>
          <div className="flex flex-col items-center">
            <a href="https://www.linkedin.com/in/kushagrakatiha/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Kushagra Katiha
            </a>
            <a href="https://www.linkedin.com/in/sonaly-jain-5a6740227/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Sonaly Jain
            </a>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
