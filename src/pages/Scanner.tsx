import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '../components/Layout';
import { Camera, Upload, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export const Scanner = () => {
  const { user } = useAuth();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setError('Unable to access camera. Please check permissions or use file upload.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setImagePreview(imageData);
        stopCamera();
        analyzeImage(imageData);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImagePreview(imageData);
        analyzeImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData: string) => {
    setScanning(true);
    setError('');
    setResult(null);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/scan`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);

        if (user) {
          await supabase.from('scan_history').insert({
            user_id: user.id,
            image_url: imageData,
            detected_condition: data.condition,
            confidence: data.confidence,
            prevention_tips: data.tips,
          });
        }
      }
    } catch (err) {
      setError('Failed to analyze image. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            AI Disease Scanner
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Use your camera or upload an image to detect potential health conditions
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800 dark:text-yellow-300">
                This AI scanner is for educational purposes only. Always consult with healthcare professionals for medical advice.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Capture or Upload Image
              </h2>

              {!imagePreview && !cameraActive && (
                <div className="space-y-4">
                  <button
                    onClick={startCamera}
                    className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Use Camera
                  </button>

                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center px-6 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload Image
                    </button>
                  </div>
                </div>
              )}

              {cameraActive && (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg"
                  />
                  <div className="flex space-x-4">
                    <button
                      onClick={capturePhoto}
                      className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Capture Photo
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {imagePreview && (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setImagePreview(null);
                      setResult(null);
                      setError('');
                    }}
                    className="w-full px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Take Another Photo
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Analysis Results
              </h2>

              {scanning && (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Analyzing image with AI...
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-red-800 dark:text-red-300">{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-900 dark:text-green-300 mb-1">
                          Analysis Complete
                        </h3>
                        <p className="text-sm text-green-800 dark:text-green-400">
                          Confidence: {result.confidence}%
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Detected Condition:
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {result.condition}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Prevention Tips:
                    </h3>
                    <ul className="space-y-2">
                      {result.tips.map((tip: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-start text-gray-700 dark:text-gray-300"
                        >
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {!scanning && !result && !error && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Camera className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    Capture or upload an image to begin analysis
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
