import React, { useState, useCallback } from 'react';
import { Upload, X, FileText, Image, Database, Edit3, Check } from 'lucide-react';
import type { BillData } from '../App';

type FileUploadProps = {
  onClose: () => void;
  onUpload: (bill: BillData) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onClose, onUpload }) => {
  const [uploadType, setUploadType] = useState<'file' | 'csv' | 'manual'>('file');
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [manualData, setManualData] = useState({
    month: '',
    units: '',
    amount: ''
  });
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const simulateOCRProcessing = (): Promise<{ units: number; amount: number; month: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate OCR extraction with realistic values
        const mockData = {
          units: Math.floor(Math.random() * 500) + 200,
          amount: Math.floor(Math.random() * 3000) + 1000,
          month: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
        resolve(mockData);
      }, 2000);
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    
    try {
      let billData: BillData;
      
      if (uploadType === 'manual') {
        billData = {
          id: Date.now().toString(),
          month: manualData.month,
          units: parseInt(manualData.units),
          amount: parseInt(manualData.amount),
          uploadDate: new Date(),
          type: 'manual'
        };
      } else {
        // Simulate OCR processing for file uploads
        const extractedData = await simulateOCRProcessing();
        billData = {
          id: Date.now().toString(),
          month: extractedData.month,
          units: extractedData.units,
          amount: extractedData.amount,
          uploadDate: new Date(),
          type: 'uploaded'
        };
      }
      
      onUpload(billData);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const isValid = uploadType === 'manual' 
    ? manualData.month && manualData.units && manualData.amount
    : file !== null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Upload Electricity Bill</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Upload Type Selection */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setUploadType('file')}
              className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all ${
                uploadType === 'file' 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>PDF/Image</span>
            </button>
            <button
              onClick={() => setUploadType('csv')}
              className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all ${
                uploadType === 'csv' 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Database className="w-5 h-5" />
              <span>CSV Data</span>
            </button>
            <button
              onClick={() => setUploadType('manual')}
              className={`flex-1 flex items-center justify-center space-x-2 p-4 rounded-xl border-2 transition-all ${
                uploadType === 'manual' 
                  ? 'border-purple-500 bg-purple-50 text-purple-700' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Edit3 className="w-5 h-5" />
              <span>Manual Entry</span>
            </button>
          </div>

          {/* Upload Content */}
          {uploadType === 'manual' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Billing Month
                </label>
                <input
                  type="text"
                  placeholder="e.g., January 2024"
                  value={manualData.month}
                  onChange={(e) => setManualData({ ...manualData, month: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Units Consumed (kWh)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 350"
                  value={manualData.units}
                  onChange={(e) => setManualData({ ...manualData, units: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Amount (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g., 2500"
                  value={manualData.amount}
                  onChange={(e) => setManualData({ ...manualData, amount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : file 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-600">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => setFile(null)}
                    className="text-red-500 hover:text-red-700 text-sm underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    {uploadType === 'csv' ? (
                      <Database className="w-8 h-8 text-gray-600" />
                    ) : (
                      <Image className="w-8 h-8 text-gray-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      {uploadType === 'csv' 
                        ? 'Drop your CSV file here or click to browse' 
                        : 'Drop your electricity bill here or click to browse'
                      }
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {uploadType === 'csv' 
                        ? 'Supports CSV files with timestamp and units columns' 
                        : 'Supports PDF, JPG, PNG files up to 10MB'
                      }
                    </p>
                  </div>
                  <input
                    type="file"
                    accept={uploadType === 'csv' ? '.csv' : '.pdf,.jpg,.jpeg,.png'}
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl cursor-pointer transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Choose File</span>
                  </label>
                </div>
              )}
            </div>
          )}

          {/* Upload Button */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!isValid || uploading}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  <span>Upload & Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;