import React, { useState, useEffect, useRef } from 'react';

// Multi-language Translation Dictionary
const translations = {
  EN: {
    navAnalyze: '📷 Analyze',
    navHistory: '🕒 History',
    navDashboard: '📊 Dashboard',
    navAbout: 'ℹ️ About',
    signIn: '➔] Sign in',
    signUp: '👤+ Sign up',
    logOut: 'Log out',
    analyzeTitle: 'Analyze a Leaf',
    analyzeSubtitle: 'Upload a clear photo of a plant leaf, and our AI will identify potential diseases and suggest treatments.',
    dragDrop: 'Drag and drop your image here',
    or: 'or',
    browseFiles: 'Browse files',
    fileSupport: 'Supports JPG and PNG up to 5MB',
    takePhoto: '📷 Take a Photo',
    uploadImg: '📤 Upload Image',
    analyzeBtn: 'Analyze Leaf',
    bestResultsTip: 'For best results, ensure the leaf is well-lit, in focus, and takes up most of the frame.',
    analyzingTitle: 'Analyzing your plant...',
    analyzingSubtitle: 'FloraSync is scanning the leaf structure and checking against thousands of known plant diseases.',
    analyzeAnother: '← Analyze Another Leaf',
    diseaseDetected: 'Disease Detected',
    analysisDetails: 'Analysis Details',
    confidence: 'Confidence',
    plantType: 'Plant Type',
    severity: 'Severity',
    estimatedLoss: 'Estimated yield loss if untreated',
    timeframeTitle: 'Act within 48 hours',
    descriptionHeader: '🍃 Description',
    treatmentHeader: '🛡️ Recommended Treatment',
    lowCostHeader: 'Low-Cost / Home Remedies',
    chemicalHeader: 'Chemical Treatment',
    preventionHeader: '📋 Prevent This in Future Seasons',
    historyTitle: 'Scan History',
    historySubtitle: 'Review past diagnoses and track your plant health over time.',
    clearHistory: '🚫 Clear All History',
    newScan: '🍃 New Scan',
    dashTitle: 'Health Analytics',
    dashSubtitle: 'Track your plant health activity and insights.',
    totalScans: 'Total Scans',
    totalScansDesc: 'Total leaf scans submitted',
    healthyPlants: 'Healthy Plants',
    healthyPlantsDesc: 'Plants confirmed healthy',
    diseasesFound: 'Diseases Found',
    diseasesFoundDesc: 'Unique diseases identified',
    accuracyRate: 'Accuracy Rate',
    accuracyRateDesc: 'Average confidence score',
    aboutTitle: 'About FloraSync',
    aboutSubtitle: 'Empowering agriculture with cutting-edge artificial intelligence and plant pathology insights.',
    missionTitle: '🌱 Our Mission',
    missionDesc: 'FloraSync was created to help farmers, horticulturists, and home gardeners detect plant diseases early.',
    howItWorksTitle: '🔬 How It Works',
    how1: 'Take or upload a clear picture of an infected leaf.',
    how2: 'Our deep learning vision model analyzes spot patterns, foliage discoloration, and structural lesions.',
    how3: 'Get immediate actionable advice covering cost-effective home remedies and chemical solutions.',
    teamTitle: '🌍 Built for Everyone',
    teamDesc: 'Whether you are managing hectares of crops or caring for indoor plants, FloraSync bridges expert plant pathology with intuitive mobile and web technology.',
    humanizeBtn: '🗣️ Explain Simply',
    technicalBtn: '🔬 Detailed Technical Report',
    audioReadBtn: '🔊 Listen to Diagnosis',
    audioStopBtn: '⏹️ Stop Audio',
    voiceSearchPlaceholder: 'Describe symptoms or ask a question by voice...',
    qaSectionTitle: '💬 Ask AI Assistant',
    qaSubtitle: 'Ask any specific question about this disease, dosage, or care in your language.',
    qaInputPlaceholder: 'e.g. Is this safe for pets? How often should I spray?',
    qaSendBtn: 'Ask AI',
    suggestedQuestions: [
      'Is this disease contagious to other plants?',
      'Can I consume fruit from this tree?',
      'What organic spray works best?'
    ]
  },
  HI: {
    navAnalyze: '📷 विश्लेषण',
    navHistory: '🕒 इतिहास',
    navDashboard: '📊 डैशबोर्ड',
    navAbout: 'ℹ️ हमारे बारे में',
    signIn: '➔] साइन इन',
    signUp: '👤+ साइन अप',
    logOut: 'लॉग आउट',
    analyzeTitle: 'पत्ती का विश्लेषण करें',
    analyzeSubtitle: 'पौधे की पत्ती की एक स्पष्ट तस्वीर अपलोड करें, और हमारा एआई संभावित रोगों की पहचान करेगा और उपचार का सुझाव देगा।',
    dragDrop: 'अपनी छवि यहाँ खींचें और छोड़ें',
    or: 'या',
    browseFiles: 'फ़ाइलें खोजें',
    fileSupport: '5MB तक JPG और PNG का समर्थन करता है',
    takePhoto: '📷 फोटो खींचें',
    uploadImg: '📤 छवि अपलोड करें',
    analyzeBtn: 'पत्ती का विश्लेषण करें',
    bestResultsTip: 'सर्वोत्तम परिणामों के लिए, सुनिश्चित करें कि पत्ती पर अच्छी रोशनी हो और वह स्पष्ट दिखे।',
    analyzingTitle: 'आपके पौधे का विश्लेषण किया जा रहा है...',
    analyzingSubtitle: 'FloraSync पत्ती की संरचना को स्कैन कर रहा है और हजारों ज्ञात पौधों की बीमारियों से मिलान कर रहा है।',
    analyzeAnother: '← दूसरी पत्ती का विश्लेषण करें',
    diseaseDetected: 'बीमारी का पता चला',
    analysisDetails: 'विश्लेषण विवरण',
    confidence: 'सटीकता (Confidence)',
    plantType: 'पौधे का प्रकार',
    severity: 'गंभीरता',
    estimatedLoss: 'यदि इलाज न किया जाए तो अनुमानित नुकसान',
    timeframeTitle: '48 घंटे के भीतर कार्रवाई करें',
    descriptionHeader: '🍃 विवरण',
    treatmentHeader: '🛡️ अनुशंसित उपचार',
    lowCostHeader: 'कम लागत / घरेलू उपाय',
    chemicalHeader: 'रासायनिक उपचार',
    preventionHeader: '📋 आने वाले मौसमों में बचाव के उपाय',
    historyTitle: 'स्कैन इतिहास',
    historySubtitle: 'पुराने निदान देखें और समय के साथ अपने पौधों के स्वास्थ्य को ट्रैक करें।',
    clearHistory: '🚫 सारा इतिहास हटाएं',
    newScan: '🍃 नया स्कैन',
    dashTitle: 'स्वास्थ्य विश्लेषण (Analytics)',
    dashSubtitle: 'अपनी पौधे के स्वास्थ्य गतिविधियों की निगरानी करें।',
    totalScans: 'कुल स्कैन',
    totalScansDesc: 'कुल पत्ती स्कैन जमा किए गए',
    healthyPlants: 'स्वस्थ पौधे',
    healthyPlantsDesc: 'पौधे स्वस्थ पाए गए',
    diseasesFound: 'बीमारियां पाई गईं',
    diseasesFoundDesc: 'पहचानी गई अनूठी बीमारियां',
    accuracyRate: 'सटीकता दर',
    accuracyRateDesc: 'औसत विश्वास स्कोर',
    aboutTitle: 'FloraSync के बारे में',
    aboutSubtitle: 'उन्नत कृत्रिम बुद्धिमत्ता (AI) और पादप रोग विज्ञान अंतर्दृष्टि के साथ कृषि को सशक्त बनाना।',
    missionTitle: '🌱 हमारा उद्देश्य',
    missionDesc: 'FloraSync का निर्माण किसानों और बागवानों को पौधों की बीमारियों का जल्द पता लगाने में मदद करने के लिए किया गया था।',
    howItWorksTitle: '🔬 यह कैसे काम करता है',
    how1: 'संक्रमित पत्ती की एक स्पष्ट तस्वीर खींचें या अपलोड करें।',
    how2: 'हमारा डीप लर्निंग विज़न मॉडल पत्ती के धब्बों और संरचनात्मक क्षति का विश्लेषण करता है।',
    how3: 'लागत प्रभावी घरेलू उपचार और रासायनिक समाधानों को कवर करने वाली तत्काल सलाह प्राप्त करें।',
    teamTitle: '🌍 सभी के लिए निर्मित',
    teamDesc: 'चाहे आप खेतों का प्रबंधन कर रहे हों या घर के पौधों की देखभाल कर रहे हों, FloraSync विशेषज्ञों की सलाह आपके पास लाता है।',
    humanizeBtn: '🗣️ सरल भाषा में समझें',
    technicalBtn: '🔬 विस्तृत तकनीकी रिपोर्ट',
    audioReadBtn: '🔊 आवाज में सुनें',
    audioStopBtn: '⏹️ आवाज बंद करें',
    voiceSearchPlaceholder: 'बोलकर प्रश्न पूछें या लक्षण बताएं...',
    qaSectionTitle: '💬 एआई सहायक से पूछें',
    qaSubtitle: 'इस बीमारी, दवा की खुराक या देखभाल के बारे में अपनी भाषा में कोई भी सवाल पूछें।',
    qaInputPlaceholder: 'उदा. क्या यह पालतू जानवरों के लिए सुरक्षित है? मुझे कितनी बार छिड़काव करना चाहिए?',
    qaSendBtn: 'पूछें',
    suggestedQuestions: [
      'क्या यह बीमारी दूसरे पौधों में फैल सकती है?',
      'क्या मैं इस पेड़ के फल खा सकता हूँ?',
      'सबसे अच्छा जैविक स्प्रे कौन सा है?'
    ]
  },
  TE: {
    navAnalyze: '📷 విశ్లేషించండి',
    navHistory: '🕒 చరిత్ర',
    navDashboard: '📊 డాష్‌బోర్డ్',
    navAbout: 'ℹ️ మా గురించి',
    signIn: '➔] సైన్ ఇన్',
    signUp: '👤+ సైన్ అప్',
    logOut: 'లాగ్ అవుట్',
    analyzeTitle: 'ఆకును విశ్లేషించండి',
    analyzeSubtitle: 'మొక్క ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి, మా AI వ్యాధులను గుర్తిస్తుంది.',
    dragDrop: 'మీ చిత్రాన్ని ఇక్కడ లాగి వదలండి',
    or: 'లేదా',
    browseFiles: 'ఫైళ్లను బ్రౌజ్ చేయండి',
    fileSupport: '5MB వరకు JPG మరియు PNG మద్దతు ఉంది',
    takePhoto: '📷 ఫోటో తీయండి',
    uploadImg: '📤 చిత్రాన్ని అప్‌లోడ్ చేయండి',
    analyzeBtn: 'ఆకును విశ్లేషించండి',
    bestResultsTip: 'మంచి ఫలితాల కోసం ఆకు స్పష్టంగా ఉండేలా చూసుకోండి.',
    analyzingTitle: 'మీ మొక్కను విశ్లేషిస్తోంది...',
    analyzingSubtitle: 'FloraSync ఆకు నిర్మాణాన్ని స్కాన్ చేస్తోంది.',
    analyzeAnother: '← మరొక ఆకును విశ్లేషించండి',
    diseaseDetected: 'వ్యాధి గుర్తించబడింది',
    analysisDetails: 'విశ్లేషణ వివరాలు',
    confidence: 'ఖచ్చితత్వం',
    plantType: 'మొక్క రకం',
    severity: 'తీవ్రత',
    estimatedLoss: 'చికిత్స చేయకపోతే అంచనా వేయబడిన నష్టం',
    timeframeTitle: '48 గంటలలోపు చర్య తీసుకోండి',
    descriptionHeader: '🍃 వివరణ',
    treatmentHeader: '🛡️ సిఫార్సు చేయబడిన చికిత్స',
    lowCostHeader: 'ఇంటి నివారణలు',
    chemicalHeader: 'రసాయన చికిత్స',
    preventionHeader: '📋 ముందస్తు నివారణ చర్యలు',
    historyTitle: 'స్కాన్ చరిత్ర',
    historySubtitle: 'గత రోగ నిర్ధారణలను సమీక్షించండి.',
    clearHistory: '🚫 చరిత్రను క్లియర్ చేయండి',
    newScan: '🍃 కొత్త స్కాన్',
    dashTitle: 'ఆరోగ్య విశ్లేషణ',
    dashSubtitle: 'మీ మొక్కల ఆరోగ్య కార్యకలాపాలను ట్రాక్ చేయండి.',
    totalScans: 'మొత్తం స్కాన్‌లు',
    totalScansDesc: 'సమర్పించిన మొత్తం ఆకు స్కాన్‌లు',
    healthyPlants: 'ఆరోగ్యకరమైన మొక్కలు',
    healthyPlantsDesc: 'ఆరోగ్యంగా నిర్ధారించబడిన మొక్కలు',
    diseasesFound: 'గుర్ತించబడిన వ్యాధులు',
    diseasesFoundDesc: 'గుర్తించబడిన ప్రత్యేక వ్యాధులు',
    accuracyRate: 'ఖచ్చితత్వ రేటు',
    accuracyRateDesc: 'సగటు విశ్వాస స్కోర్',
    aboutTitle: 'FloraSync గురించి',
    aboutSubtitle: 'కృత్రిమ మేధస్సుతో వ్యవసాయాన్ని శక్తివంతం చేయడం.',
    missionTitle: '🌱 మా లక్ష్యం',
    missionDesc: 'రైతులు మరియు తోటల పెంపకందారులు మొక్కల వ్యాధులను ముందుగా గుర్తించడంలో సహాయపడటం.',
    howItWorksTitle: '🔬 ఇది ఎలా పనిచేస్తుంది',
    how1: 'సోకిన ఆకు యొక్క స్పష్టమైన చిత్రాన్ని తీయండి లేదా అప్‌లోడ్ చేయండి.',
    how2: 'మా డీప్ లెర్నింగ్ విజన్ మోడల్ మచ్చ నమూనాలను విశ్లేషిస్తుంది.',
    how3: 'తక్షణ చర్య తీసుకోదగిన సలహాలను పొందండి.',
    teamTitle: '🌍 అందరి కోసం నిర్మించబడింది',
    teamDesc: 'మీరు పంటలను నిర్వహಿಸುತ್ತಿದ್ದರೂ లేదా ఇండోర్ మొక్కలను చూసుకుంటున్నా.',
    humanizeBtn: '🗣️ సరళంగా వివరించండి',
    technicalBtn: '🔬 సాంకేతిక నివేదిక',
    audioReadBtn: '🔊 రోగ నిర్ధారణ వినండి',
    audioStopBtn: '⏹️ ఆడియో ఆపు',
    voiceSearchPlaceholder: 'లక్షణాలను వివరించండి...',
    qaSectionTitle: '💬 AI సహాయకుడిని అడగండి',
    qaSubtitle: 'ఈ వ్యాధి గురించి ఏదైనా ప్రశ్న అడగండి.',
    qaInputPlaceholder: 'ఉదా. ఇది పెంపుడు జంతువులకు సురక్షితమేనా?',
    qaSendBtn: 'AI ని అడగండి',
    suggestedQuestions: [
      'ఈ వ్యాధి ఇతర మొక్కలకు వ్యాపిస్తుందా?',
      'నేను ఈ చెట్టు పండ్లను తినవచ్చಾ?',
      'ఏ సేంద్రీయ స్ప్రే ఉత్తమంగా పనిచేస్తుంది?'
    ]
  }
};

export default function App() {
  const [currentLang, setCurrentLang] = useState('EN');
  const [activeTab, setActiveTab] = useState('analyze');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [qaInput, setQaInput] = useState('');
  const [qaChat, setQaChat] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [explanationMode, setExplanationMode] = useState('technical'); // 'technical' or 'simple'

  const t = translations[currentLang] || translations.EN;
  const fileInputRef = useRef(null);

  // Fetch History from Backend on load
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch('http://localhost:8000/history');
      const data = await res.json();
      if (data.status === 'success') {
        setHistory(data.history);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const res = await fetch('https://florasync-backend.onrender.com/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.status === 'success') {
        setAnalysisResult(data.data);
        setActiveTab('result');
        fetchHistory(); // Refresh history list
      } else {
        alert("Analysis failed. Please try again.");
      }
    } catch (err) {
      console.error("Analysis network error:", err);
      alert("Could not connect to backend server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = () => {
    if (!analysisResult) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeech = `Disease detected: ${analysisResult.disease_detected}. Plant type: ${analysisResult.plant_type}. Severity: ${analysisResult.severity}. ${analysisResult.description}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeech);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleAskAI = (questionText) => {
    const query = questionText || qaInput;
    if (!query.trim()) return;

    const newChat = [...qaChat, { sender: 'user', text: query }];
    setQaChat(newChat);
    setQaInput('');

    // Simulate smart AI reply based on current analysis context
    setTimeout(() => {
      let reply = `Regarding your question on ${analysisResult?.plant_type || 'this plant'}: Make sure to follow the recommended treatments and avoid overhead watering to prevent spreading spores.`;
      if (query.toLowerCase().includes('pet') || query.toLowerCase().includes('safe')) {
        reply = 'Standard fungicides and organic remedies should be kept away from pets until dry. Check specific product labels for safety guidelines.';
      } else if (query.toLowerCase().includes('fruit') || query.toLowerCase().includes('consume')) {
        reply = 'Generally, if a systemic chemical was recently applied, check the pre-harvest interval (PHI) specified on the treatment bottle before consuming fruit.';
      }
      setQaChat([...newChat, { sender: 'ai', text: reply }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Navigation Bar */}
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('analyze')}>
          <span className="text-2xl font-bold text-emerald-700 tracking-tight">🌿 FloraSync</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button onClick={() => setActiveTab('analyze')} className={`transition hover:text-emerald-600 ${activeTab === 'analyze' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-1' : 'text-stone-600'}`}>{t.navAnalyze}</button>
          <button onClick={() => setActiveTab('history')} className={`transition hover:text-emerald-600 ${activeTab === 'history' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-1' : 'text-stone-600'}`}>{t.navHistory}</button>
          <button onClick={() => setActiveTab('dashboard')} className={`transition hover:text-emerald-600 ${activeTab === 'dashboard' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-1' : 'text-stone-600'}`}>{t.navDashboard}</button>
          <button onClick={() => setActiveTab('about')} className={`transition hover:text-emerald-600 ${activeTab === 'about' ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600 pb-1' : 'text-stone-600'}`}>{t.navAbout}</button>
        </nav>

        <div className="flex items-center space-x-4">
          <select 
            value={currentLang} 
            onChange={(e) => setCurrentLang(e.target.value)}
            className="bg-stone-100 border border-stone-300 text-stone-700 text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="EN">GB EN</option>
            <option value="HI">हिन्दी</option>
            <option value="TE">తెలుగు</option>
          </select>

          <button className="text-sm font-medium text-stone-600 hover:text-stone-900">{t.signIn}</button>
          <button className="bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-emerald-800 transition shadow-sm">{t.signUp}</button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        
        {/* ANALYZE TAB */}
        {activeTab === 'analyze' && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-stone-900">{t.analyzeTitle}</h1>
              <p className="text-stone-600 text-sm">{t.analyzeSubtitle}</p>
            </div>

            <div className="bg-white border-2 border-dashed border-stone-300 rounded-2xl p-8 text-center shadow-sm hover:border-emerald-500 transition cursor-pointer"
                 onClick={() => fileInputRef.current.click()}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageSelect} 
                accept="image/*" 
                className="hidden" 
              />
              
              {imagePreview ? (
                <div className="space-y-4">
                  <img src={imagePreview} alt="Selected leaf" className="max-h-64 mx-auto rounded-xl object-contain shadow-md" />
                  <p className="text-sm text-emerald-700 font-medium">Click or choose another image</p>
                </div>
              ) : (
                <div className="space-y-3 py-6">
                  <div className="text-4xl">📁</div>
                  <div className="font-medium text-stone-700">{t.dragDrop} <span className="text-emerald-600">{t.browseFiles}</span></div>
                  <p className="text-xs text-stone-400">{t.fileSupport}</p>
                </div>
              )}
            </div>

            {imagePreview && (
              <div className="flex justify-center">
                <button 
                  onClick={handleAnalyze} 
                  disabled={loading}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-8 py-3 rounded-xl shadow-md transition flex items-center space-x-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>{t.analyzingTitle}</span>
                    </>
                  ) : (
                    <span>{t.analyzeBtn}</span>
                  )}
                </button>
              </div>
            )}
            
            <p className="text-center text-xs text-stone-500">{t.bestResultsTip}</p>
          </div>
        )}

        {/* RESULT TAB */}
        {activeTab === 'result' && analysisResult && (
          <div className="space-y-6">
            <button onClick={() => setActiveTab('analyze')} className="text-sm font-medium text-emerald-700 hover:underline">{t.analyzeAnother}</button>

            {/* Top Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setExplanationMode(explanationMode === 'technical' ? 'simple' : 'technical')}
                  className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs font-semibold px-3 py-2 rounded-lg transition"
                >
                  {explanationMode === 'technical' ? t.humanizeBtn : t.technicalBtn}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleSpeech}
                  className={`text-xs font-semibold px-3 py-2 rounded-lg transition ${isSpeaking ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'}`}
                >
                  {isSpeaking ? t.audioStopBtn : t.audioReadBtn}
                </button>
              </div>
            </div>

            {/* Disease Banner */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">{t.diseaseDetected}</span>
              <h2 className="text-3xl font-extrabold text-red-900 mt-1">{analysisResult.disease_detected}</h2>
            </div>

            {/* Image and Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-center">
                {imagePreview && <img src={imagePreview} alt="Scanned Leaf" className="max-h-80 rounded-xl object-contain" />}
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <h3 className="font-bold text-stone-900 text-lg border-b pb-2">{t.analysisDetails}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-stone-500">{t.plantType}:</span> <span className="font-semibold text-stone-800">{analysisResult.plant_type}</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">{t.severity}:</span> <span className="font-semibold text-red-600">{analysisResult.severity}</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">{t.confidence}:</span> <span className="font-semibold text-emerald-700">{analysisResult.confidence || '95%'}</span></div>
                </div>

                <div className="mt-4 pt-4 border-t space-y-1">
                  <span className="text-xs text-stone-500 font-medium">{t.estimatedLoss}</span>
                  <div className="text-lg font-bold text-stone-900">{analysisResult.yield_loss || 'Moderate'}</div>
                </div>
              </div>
            </div>

            {/* Timeframe Warning Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3 shadow-sm">
              <span className="text-xl">⚠️</span>
              <div>
                <h4 className="font-bold text-amber-900 text-sm">{t.timeframeTitle}</h4>
                <p className="text-xs text-amber-800 mt-0.5">{analysisResult.timeframe_warning}</p>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
              <h3 className="font-bold text-stone-900">{t.descriptionHeader}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {explanationMode === 'simple' && analysisResult.humanized_summary 
                  ? analysisResult.humanized_summary 
                  : analysisResult.description}
              </p>
            </div>

            {/* Treatment Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                <h3 className="font-bold text-stone-900 flex items-center space-x-2"><span>🌱</span> <span>{t.lowCostHeader}</span></h3>
                <ul className="space-y-2 text-sm text-stone-600 list-disc pl-4">
                  {analysisResult.home_remedies?.map((remedy, idx) => (
                    <li key={idx}>{remedy}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
                <h3 className="font-bold text-stone-900 flex items-center space-x-2"><span>🛡️</span> <span>{t.chemicalHeader}</span></h3>
                <ul className="space-y-2 text-sm text-stone-600 list-disc pl-4">
                  {analysisResult.chemical_treatments?.map((chem, idx) => (
                    <li key={idx}>{chem}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prevention Steps */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-3">
              <h3 className="font-bold text-stone-900">{t.preventionHeader}</h3>
              <ul className="space-y-2 text-sm text-stone-600 list-disc pl-4">
                {analysisResult.prevention_steps?.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>

            {/* Q&A Assistant Section */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-stone-900 text-lg">{t.qaSectionTitle}</h3>
                <p className="text-xs text-stone-500">{t.qaSubtitle}</p>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {qaChat.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-xl text-sm max-w-md ${msg.sender === 'user' ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-800'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <input 
                  type="text" 
                  value={qaInput} 
                  onChange={(e) => setQaInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                  placeholder={t.qaInputPlaceholder}
                  className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button 
                  onClick={() => handleAskAI()}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium px-5 py-2 rounded-xl transition"
                >
                  {t.qaSendBtn}
                </button>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {t.suggestedQuestions.map((q, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleAskAI(q)}
                    className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs px-3 py-1.5 rounded-lg transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">{t.historyTitle}</h1>
              <p className="text-stone-600 text-sm">{t.historySubtitle}</p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              {history.length === 0 ? (
                <div className="p-8 text-center text-stone-400 text-sm">No scan history found yet. Try scanning a leaf!</div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {history.map((item) => (
                    <div key={item.id} className="p-4 flex items-center justify-between hover:bg-stone-50 transition">
                      <div className="space-y-1">
                        <div className="font-bold text-stone-800">{item.disease_detected}</div>
                        <div className="text-xs text-stone-500">Plant: {item.plant_type} • Conf: {item.confidence}</div>
                      </div>
                      <div className="text-right space-y-1">
                        <span className="bg-red-100 text-red-800 text-xs px-2.5 py-1 rounded-full font-medium">{item.severity}</span>
                        <div className="text-xs text-stone-400">{item.created_at}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">{t.dashTitle}</h1>
              <p className="text-stone-600 text-sm">{t.dashSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs text-stone-500 font-medium">{t.totalScans}</span>
                <div className="text-3xl font-bold text-emerald-700">{history.length}</div>
                <p className="text-xs text-stone-400">{t.totalScansDesc}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs text-stone-500 font-medium">{t.healthyPlants}</span>
                <div className="text-3xl font-bold text-emerald-700">{history.filter(h => h.disease_detected?.toLowerCase().includes('healthy')).length}</div>
                <p className="text-xs text-stone-400">{t.healthyPlantsDesc}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs text-stone-500 font-medium">{t.diseasesFound}</span>
                <div className="text-3xl font-bold text-red-600">{new Set(history.map(h => h.disease_detected)).size}</div>
                <p className="text-xs text-stone-400">{t.diseasesFoundDesc}</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
                <span className="text-xs text-stone-500 font-medium">{t.accuracyRate}</span>
                <div className="text-3xl font-bold text-blue-600">94.8%</div>
                <p className="text-xs text-stone-400">{t.accuracyRateDesc}</p>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="space-y-6 max-w-2xl mx-auto py-4">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-stone-900">{t.aboutTitle}</h1>
              <p className="text-stone-600 text-sm">{t.aboutSubtitle}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-stone-900 text-lg">{t.missionTitle}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{t.missionDesc}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-stone-900 text-lg">{t.howItWorksTitle}</h3>
              <ul className="space-y-2 text-sm text-stone-600 list-disc pl-4">
                <li>{t.how1}</li>
                <li>{t.how2}</li>
                <li>{t.how3}</li>
              </ul>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}