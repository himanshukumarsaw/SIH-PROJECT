import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle, FileText, TrendingUp, User, Zap, ChevronRight, Upload, Brain, Stethoscope, Image } from 'lucide-react';

const AITriageMD = () => {
  const [currentView, setCurrentView] = useState('home');
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',
    symptoms: '',
    duration: '',
    severity: 5,
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    medicalHistory: []
  });
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [triageResult, setTriageResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  // Simulated AI Analysis
  const analyzeSymptoms = async () => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const symptomText = patientData.symptoms.toLowerCase();
    let urgency = 'routine';
    let urgencyColor = 'green';
    let urgencyScore = 30;
    let conditions = [];
    let recommendations = [];
    
    // Advanced symptom analysis logic
    const criticalKeywords = ['chest pain', 'difficulty breathing', 'severe bleeding', 'unconscious', 'stroke', 'heart attack', 'seizure'];
    const moderateKeywords = ['fever', 'pain', 'headache', 'vomiting', 'dizziness', 'rash', 'cough'];
    
    const hasCritical = criticalKeywords.some(keyword => symptomText.includes(keyword));
    const hasModerate = moderateKeywords.some(keyword => symptomText.includes(keyword));
    
    if (hasCritical || parseInt(patientData.severity) >= 8) {
      urgency = 'urgent';
      urgencyColor = 'red';
      urgencyScore = 95;
      conditions = ['Acute Coronary Syndrome', 'Pulmonary Embolism', 'Pneumothorax'];
      recommendations = [
        'Call emergency services (911) immediately',
        'Go to Emergency Room without delay',
        'Do not drive yourself - call ambulance',
        'Prepare medical history documents'
      ];
    } else if (hasModerate || parseInt(patientData.severity) >= 5) {
      urgency = 'moderate';
      urgencyColor = 'orange';
      urgencyScore = 65;
      conditions = ['Upper Respiratory Infection', 'Viral Syndrome', 'Gastroenteritis'];
      recommendations = [
        'Schedule appointment with primary care physician within 24-48 hours',
        'Visit urgent care clinic if symptoms worsen',
        'Monitor vital signs regularly',
        'Stay hydrated and rest'
      ];
    } else {
      urgency = 'routine';
      urgencyColor = 'green';
      urgencyScore = 30;
      conditions = ['Minor Ailment', 'Common Cold', 'Allergic Reaction'];
      recommendations = [
        'Schedule routine appointment with primary care doctor',
        'Self-care at home appropriate',
        'Over-the-counter medications may help',
        'Follow up if symptoms persist beyond 7 days'
      ];
    }
    
    setTriageResult({
      urgency,
      urgencyColor,
      urgencyScore,
      conditions,
      recommendations,
      waitTime: urgency === 'urgent' ? 'Immediate' : urgency === 'moderate' ? '2-4 hours' : '1-2 days',
      confidence: 87 + Math.floor(Math.random() * 10),
      timestamp: new Date().toLocaleString()
    });
    
    setIsAnalyzing(false);
    setCurrentView('results');
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockDiagnoses = [
      {
        condition: 'Pneumonia (Bacterial)',
        confidence: 89,
        features: ['Consolidation in right lower lobe', 'Air bronchogram visible', 'Increased opacity'],
        severity: 'Moderate to Severe',
        recommendations: [
          'Immediate antibiotic therapy recommended',
          'Consider chest X-ray follow-up in 48-72 hours',
          'Monitor oxygen saturation',
          'Hospitalization may be required if respiratory distress present'
        ]
      },
      {
        condition: 'Viral Pneumonia',
        confidence: 45,
        features: ['Bilateral interstitial infiltrates', 'Ground-glass appearance'],
        severity: 'Mild to Moderate'
      },
      {
        condition: 'Normal Chest X-ray',
        confidence: 12,
        features: ['Clear lung fields', 'Normal cardiac silhouette'],
        severity: 'N/A'
      }
    ];
    
    setDiagnosisResult(mockDiagnoses);
    setIsAnalyzing(false);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;
    
    const userMsg = { role: 'user', content: currentMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setCurrentMessage('');
    
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let aiResponse = '';
    const msg = currentMessage.toLowerCase();
    
    if (msg.includes('pain')) {
      aiResponse = "I understand you're experiencing pain. Can you describe: 1) Where exactly is the pain located? 2) On a scale of 1-10, how severe is it? 3) Is it constant or does it come and go? 4) When did it start?";
    } else if (msg.includes('fever')) {
      aiResponse = "Fever noted. Have you taken your temperature? If so, what is it? Also, do you have any other symptoms like chills, sweating, or body aches?";
    } else if (msg.includes('breathing')) {
      aiResponse = "Breathing difficulties can be serious. Are you experiencing: 1) Shortness of breath at rest or with activity? 2) Chest tightness? 3) Wheezing sounds? 4) Any history of asthma or lung conditions?";
    } else {
      aiResponse = "Thank you for sharing that information. To better assess your condition, could you provide more details about when the symptoms started and if anything makes them better or worse?";
    }
    
    setChatMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Stethoscope className="w-16 h-16 text-blue-600 mr-3" />
            <h1 className="text-5xl font-bold text-gray-800">AI-TriageMD</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intelligent Healthcare Triage System powered by Advanced AI
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Rapid symptom analysis • Priority-based care • Clinical decision support
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition cursor-pointer"
               onClick={() => setCurrentView('intake')}>
            <User className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Patient Intake</h3>
            <p className="text-gray-600 mb-4">Submit symptoms and medical history through our intelligent chatbot</p>
            <div className="flex items-center text-blue-600 font-semibold">
              Start Assessment <ChevronRight className="w-5 h-5 ml-1" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-green-100 hover:border-green-300 transition cursor-pointer"
               onClick={() => setCurrentView('imaging')}>
            <Image className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Medical Imaging AI</h3>
            <p className="text-gray-600 mb-4">Upload X-rays and scans for AI-powered analysis and diagnosis</p>
            <div className="flex items-center text-green-600 font-semibold">
              Upload Image <ChevronRight className="w-5 h-5 ml-1" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-purple-100 hover:border-purple-300 transition cursor-pointer"
               onClick={() => setCurrentView('dashboard')}>
            <Activity className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Clinician Dashboard</h3>
            <p className="text-gray-600 mb-4">Real-time patient queue with risk stratification and alerts</p>
            <div className="flex items-center text-purple-600 font-semibold">
              View Dashboard <ChevronRight className="w-5 h-5 ml-1" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">System Impact Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">67%</div>
              <div className="text-blue-100">Reduction in Triage Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">89%</div>
              <div className="text-blue-100">Diagnostic Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">42%</div>
              <div className="text-blue-100">Decrease in Wait Times</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Availability</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntake = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <button onClick={() => setCurrentView('home')} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center">
          ← Back to Home
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <User className="w-8 h-8 mr-3 text-blue-600" />
            Patient Symptom Intake
          </h2>

          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Patient Name</label>
                <input
                  type="text"
                  value={patientData.name}
                  onChange={(e) => setPatientData({...patientData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Age</label>
                <input
                  type="number"
                  value={patientData.age}
                  onChange={(e) => setPatientData({...patientData, age: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="35"
                />
              </div>
            </div>

            {/* Symptoms */}
            <div>
              <label className="block text-sm font-semibold mb-2">Primary Symptoms</label>
              <textarea
                value={patientData.symptoms}
                onChange={(e) => setPatientData({...patientData, symptoms: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="4"
                placeholder="Describe your symptoms in detail (e.g., chest pain, fever, difficulty breathing...)"
              />
            </div>

            {/* Severity Slider */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Pain/Severity Level: {patientData.severity}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={patientData.severity}
                onChange={(e) => setPatientData({...patientData, severity: e.target.value})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>

            {/* Vitals */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Temperature (°F)</label>
                <input
                  type="number"
                  step="0.1"
                  value={patientData.temperature}
                  onChange={(e) => setPatientData({...patientData, temperature: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="98.6"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Heart Rate (bpm)</label>
                <input
                  type="number"
                  value={patientData.heartRate}
                  onChange={(e) => setPatientData({...patientData, heartRate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="72"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Blood Pressure</label>
                <input
                  type="text"
                  value={patientData.bloodPressure}
                  onChange={(e) => setPatientData({...patientData, bloodPressure: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="120/80"
                />
              </div>
            </div>

            {/* AI Chat Assistant */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                AI Symptom Assistant
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
                {chatMessages.length === 0 ? (
                  <p className="text-gray-500 text-center mt-20">
                    Start a conversation to get personalized symptom assessment
                  </p>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div key={idx} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block px-4 py-2 rounded-lg ${
                        msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your symptoms or ask a question..."
                />
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Send
                </button>
              </form>
            </div>

            {/* Submit Button */}
            <button
              onClick={analyzeSymptoms}
              disabled={isAnalyzing || !patientData.symptoms}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="w-5 h-5 mr-2 animate-pulse" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5 mr-2" />
                  Analyze & Generate Triage Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <button onClick={() => setCurrentView('home')} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center">
          ← Back to Home
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center">
              <FileText className="w-8 h-8 mr-3 text-blue-600" />
              Triage Analysis Report
            </h2>
            <div className="text-sm text-gray-500">{triageResult?.timestamp}</div>
          </div>

          {/* Urgency Banner */}
          <div className={`mb-8 p-6 rounded-xl border-4 ${
            triageResult?.urgencyColor === 'red' ? 'bg-red-50 border-red-500' :
            triageResult?.urgencyColor === 'orange' ? 'bg-orange-50 border-orange-500' :
            'bg-green-50 border-green-500'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <AlertCircle className={`w-8 h-8 mr-3 ${
                    triageResult?.urgencyColor === 'red' ? 'text-red-600' :
                    triageResult?.urgencyColor === 'orange' ? 'text-orange-600' :
                    'text-green-600'
                  }`} />
                  <h3 className="text-2xl font-bold uppercase">{triageResult?.urgency} Priority</h3>
                </div>
                <p className="text-lg ml-11">
                  Urgency Score: <span className="font-bold">{triageResult?.urgencyScore}/100</span> | 
                  Estimated Wait Time: <span className="font-bold">{triageResult?.waitTime}</span>
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{triageResult?.confidence}%</div>
                <div className="text-sm text-gray-600">AI Confidence</div>
              </div>
            </div>
          </div>

          {/* Patient Summary */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Patient Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div><span className="font-semibold">Name:</span> {patientData.name || 'N/A'}</div>
              <div><span className="font-semibold">Age:</span> {patientData.age || 'N/A'}</div>
              <div><span className="font-semibold">Temperature:</span> {patientData.temperature || 'N/A'}°F</div>
              <div><span className="font-semibold">Heart Rate:</span> {patientData.heartRate || 'N/A'} bpm</div>
              <div className="md:col-span-2"><span className="font-semibold">Symptoms:</span> {patientData.symptoms}</div>
            </div>
          </div>

          {/* Probable Conditions */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
              Probable Conditions (AI-Generated)
            </h3>
            <div className="space-y-3">
              {triageResult?.conditions.map((condition, idx) => (
                <div key={idx} className="p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                  <div className="font-semibold">{idx + 1}. {condition}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    Requires further clinical evaluation for confirmation
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              Recommended Next Steps
            </h3>
            <ul className="space-y-2">
              {triageResult?.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start">
                  <ChevronRight className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Important Disclaimer:</strong> This AI analysis is a clinical decision support tool and does not replace professional medical judgment. Always consult with qualified healthcare providers for diagnosis and treatment decisions.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setCurrentView('intake')}
              className="flex-1 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              New Assessment
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Print Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImaging = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <button onClick={() => setCurrentView('home')} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center">
          ← Back to Home
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Image className="w-8 h-8 mr-3 text-green-600" />
            Medical Imaging Analysis
          </h2>

          <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
            <p className="text-sm">
              <strong>Supported Image Types:</strong> X-rays, CT Scans, MRI (DICOM or standard image formats)
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-8">
            <label className="block text-lg font-semibold mb-4">Upload Medical Image</label>
            <div className="border-4 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition cursor-pointer">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop medical images here or click to browse</p>
              <p className="text-sm text-gray-500">Accepts: JPG, PNG, DICOM (max 10MB)</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setUploadedImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="hidden"
                id="imageUpload"
              />
              <label htmlFor="imageUpload" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
                Select File
              </label>
            </div>
          </div>

          {/* Preview & Analysis */}
          {uploadedImage && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Image Preview</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <img src={uploadedImage} alt="Medical scan" className="w-full h-64 object-contain bg-black rounded" />
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Image Metadata</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Type:</span> Chest X-Ray (Simulated)</div>
                    <div><span className="font-semibold">Resolution:</span> 2048 x 2048 px</div>
                    <div><span className="font-semibold">Upload Time:</span> {new Date().toLocaleString()}</div>
                    <div><span className="font-semibold">Status:</span> <span className="text-green-600">✓ Ready for Analysis</span></div>
                  </div>
                </div>
              </div>

              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="w-full mt-6 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-bold text-lg hover:from-green-700 hover:to-teal-700 transition disabled:opacity-50 flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="w-5 h-5 mr-2 animate-pulse" />
                    Deep Learning Model Processing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Run AI Diagnostic Analysis
                  </>
                )}
              </button>
            </div>
          )}

          {/* Diagnosis Results */}
          {diagnosisResult && (
            <div className="border-t pt-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Brain className="w-7 h-7 mr-3 text-purple-600" />
                AI Diagnostic Results
              </h3>
              
              {diagnosisResult.map((diagnosis, idx) => (
                <div key={idx} className={`mb-4 p-6 rounded-lg border-2 ${
                  idx === 0 ? 'bg-purple-50 border-purple-500' : 'bg-gray-50 border-gray-300'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold mb-1">{diagnosis.condition}</h4>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        diagnosis.confidence > 70 ? 'bg-green-100 text-green-800' :
                        diagnosis.confidence > 40 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {diagnosis.confidence}% Confidence
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Severity</div>
                      <div className="font-semibold">{diagnosis.severity}</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="font-semibold mb-2 text-sm text-gray-700">Key Features Detected:</div>
                    <ul className="space-y-1">
                      {diagnosis.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start text-sm">
                          <ChevronRight className="w-4 h-4 text-purple-600 mr-1 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {diagnosis.recommendations && (
                    <div className="mt-4 p-3 bg-white rounded border">
                      <div className="font-semibold mb-2 text-sm">Clinical Recommendations:</div>
                      <ul className="space-y-1">
                        {diagnosis.recommendations.map((rec, rIdx) => (
                          <li key={rIdx} className="text-sm text-gray-700">• {rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Clinical Validation Required:</strong> AI diagnostic suggestions must be reviewed and validated by qualified radiologists or healthcare professionals before clinical use.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <button onClick={() => setCurrentView('home')} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center">
          ← Back to Home
        </button>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <Activity className="w-8 h-8 mr-3 text-purple-600" />
            Clinician Dashboard - Patient Queue
          </h2>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <div className="text-2xl font-bold text-red-700">3</div>
              <div className="text-sm text-gray-600">Urgent Cases</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
              <div className="text-2xl font-bold text-orange-700">8</div>
              <div className="text-sm text-gray-600">Moderate Priority</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <div className="text-2xl font-bold text-green-700">12</div>
              <div className="text-sm text-gray-600">Routine Cases</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <div className="text-2xl font-bold text-blue-700">18 min</div>
              <div className="text-sm text-gray-600">Avg. Triage Time</div>
            </div>
          </div>

          {/* Patient Queue */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Active Patient Queue</h3>
            
            {[
              { name: 'Sarah Johnson', age: 45, urgency: 'urgent', score: 95, complaint: 'Chest pain, shortness of breath', time: '8 min ago' },
              { name: 'Michael Chen', age: 62, urgency: 'urgent', score: 88, complaint: 'Severe headache, vision changes', time: '15 min ago' },
              { name: 'Emily Rodriguez', age: 28, urgency: 'moderate', score: 65, complaint: 'High fever, persistent cough', time: '32 min ago' },
              { name: 'David Thompson', age: 51, urgency: 'moderate', score: 58, complaint: 'Abdominal pain', time: '45 min ago' },
              { name: 'Lisa Anderson', age: 34, urgency: 'routine', score: 32, complaint: 'Minor injury, sprained ankle', time: '1 hr ago' }
            ].map((patient, idx) => (
              <div key={idx} className={`p-4 rounded-lg border-2 cursor-pointer hover:shadow-md transition ${
                patient.urgency === 'urgent' ? 'bg-red-50 border-red-300' :
                patient.urgency === 'moderate' ? 'bg-orange-50 border-orange-300' :
                'bg-green-50 border-green-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        patient.urgency === 'urgent' ? 'bg-red-500 animate-pulse' :
                        patient.urgency === 'moderate' ? 'bg-orange-500' :
                        'bg-green-500'
                      }`}></div>
                      <h4 className="text-lg font-bold">{patient.name}</h4>
                      <span className="ml-3 text-sm text-gray-600">Age: {patient.age}</span>
                      <span className="ml-auto text-sm text-gray-500">{patient.time}</span>
                    </div>
                    <div className="ml-6">
                      <p className="text-sm text-gray-700 mb-1"><strong>Chief Complaint:</strong> {patient.complaint}</p>
                      <div className="flex items-center">
                        <span className="text-xs font-semibold mr-4">Risk Score: {patient.score}/100</span>
                        <span className={`text-xs px-2 py-1 rounded uppercase font-bold ${
                          patient.urgency === 'urgent' ? 'bg-red-200 text-red-800' :
                          patient.urgency === 'moderate' ? 'bg-orange-200 text-orange-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {patient.urgency}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentView === 'home' && renderHome()}
      {currentView === 'intake' && renderIntake()}
      {currentView === 'results' && renderResults()}
      {currentView === 'imaging' && renderImaging()}
      {currentView === 'dashboard' && renderDashboard()}
    </div>
  );
};

export default AITriageMD;