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
    ],
    mockResult: {
      disease_detected: 'Apple Scab',
      plant_type: 'Apple',
      severity: 'Severe',
      yield_loss: '60–100%',
      timeframe_warning: 'Act within 48 hours. Delay will significantly worsen losses and risk spreading to neighboring plants.',
      description: 'Apple Scab (Venturia inaequalis) causes olive-brown to black velvety spots on leaves and fruit. Infected leaves may yellow and drop prematurely, leaving trees defoliated and reducing fruit quality.',
      home_remedies: [
        'Remove all scabby fruit from trees and the ground immediately to reduce spore count.',
        'Apply lime sulfur during dormancy next year — traditional, inexpensive, and highly effective against overwintering spores.'
      ],
      chemical_treatments: [
        'Apply systemic fungicide (myclobutanil or tebuconazole) combined with a protectant (captan) immediately.',
        'Repeat application every 7–10 days through the remainder of the primary infection period.'
      ],
      prevention_steps: [
        'Rake and burn or compost deeply all fallen leaves under trees at the end of every season.',
        'Prune branches to open the tree canopy for improved airflow and sunlight penetration.',
        'Plan to source scab-resistant varieties for future orchard plantings.'
      ],
      humanized_summary: "Think of this like a bad skin rash for your apple plant caused by a tiny fungus. If left alone, the leaves will turn yellow and fall off, and your apples won't grow properly. What to do right now: Clean up all the dry leaves and bad fruits around the tree so it doesn't spread, and spray a plant fungicide soon to save the rest of your tree!"
    }
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
    ],
    mockResult: {
      disease_detected: 'सेब का स्कैब (Apple Scab)',
      plant_type: 'सेब (Apple)',
      severity: 'गंभीर (Severe)',
      yield_loss: '60–100%',
      timeframe_warning: '48 घंटे के भीतर कार्रवाई करें। देरी से नुकसान काफी बढ़ जाएगा और पड़ोसी पौधों में फैलने का खतरा रहेगा।',
      description: 'एप्पल स्कैब (Venturia inaequalis) के कारण पत्तियों और फलों पर काले मखमली धब्बे पड़ जाते हैं। संक्रमित पत्तियां पीली होकर समय से पहले गिर जाती हैं।',
      home_remedies: [
        'बीजाणुओं की संख्या कम करने के लिए तुरंत पेड़ों और जमीन से सभी पपड़ीदार फलों को हटा दें।',
        'अगले वर्ष सुप्त अवस्था के दौरान चूना सल्फर (Lime Sulfur) लागू करें।'
      ],
      chemical_treatments: [
        'तुरंत कवकनाशी (माइक्लोबुटानिल या टेबूकोनाज़ोल) का छिड़काव करें।',
        'संक्रमण की अवधि के दौरान हर 7-10 दिनों में दोहराएं।'
      ],
      prevention_steps: [
        'पेड़ों के नीचे गिरी हुई सभी पत्तियों को इकट्ठा करके नष्ट कर दें।',
        'हवा और धूप के बेहतर प्रवाह के लिए शाखाओं की छंटाई करें।'
      ],
      humanized_summary: "इसे अपने सेब के पौधे के लिए त्वचा की बीमारी की तरह समझें। अभी पेड़ के आसपास की सभी सूखी पत्तियों को साफ करें और तुरंत फफूंदनाशक दवा का छिड़काव करें।"
    }
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
    analyzeSubtitle: 'మొక్క ఆకు స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి, మా AI వ్యాధులను గుర్తించి చికిత్సలను సూచిస్తుంది.',
    dragDrop: 'మీ చిత్రాన్ని ఇక్కడ లాగి వదలండి',
    or: 'లేదా',
    browseFiles: 'ఫైళ్లను ఎంచుకోండి',
    fileSupport: '5MB వరకు JPG మరియు PNG లకు మద్దతు ఇస్తుంది',
    takePhoto: '📷 ఫోటో తీయండి',
    uploadImg: '📤 చిత్రాన్ని అప్‌లోడ్ చేయండి',
    analyzeBtn: 'ఆకును విశ్లేషించండి',
    bestResultsTip: 'మంచి ఫలితాల కోసం, ఆకుపై సరిపడా వెలుతురు ఉండేలా చూసుకోండి.',
    analyzingTitle: 'మీ మొక్కను విశ్లేషిస్తోంది...',
    analyzingSubtitle: 'FloraSync ఆకు నిర్మాణాన్ని స్కాన్ చేస్తోంది మరియు వేలాది మొక్కల వ్యాధులతో సరిపోలుస్తోంది.',
    analyzeAnother: '← మరొక ఆకును విశ్లేషించండి',
    diseaseDetected: 'వ్యాధి గుర్తించబడింది',
    analysisDetails: 'విశ్లేషణ వివరాలు',
    confidence: 'ఖచ్చితత్వం (Confidence)',
    plantType: 'మొక్క రకం',
    severity: 'తీవ్రత',
    estimatedLoss: 'చికిత్స చేయకపోతే అంచనా వేసిన నష్టం',
    timeframeTitle: '48 గంటల్లో చర్య తీసుకోండి',
    descriptionHeader: '🍃 వివరణ',
    treatmentHeader: '🛡️ సిఫార్సు చేసిన చికిత్స',
    lowCostHeader: 'తక్కువ ఖర్చు / ఇంటి నివారణలు',
    chemicalHeader: 'రసాయన చికిత్స',
    preventionHeader: '📋 భవిష్యత్తులో నివారించే చర్యలు',
    historyTitle: 'స్కాన్ చరిత్ర',
    historySubtitle: 'పాత నిర్ధారణలను సమీక్షించండి మరియు మీ మొక్కల ఆరోగ్యాన్ని ట్రాక్ చేయండి.',
    clearHistory: '🚫 చరిత్ర మొత్తాన్ని తీసివేయండి',
    newScan: '🍃 కొత్త స్కాన్',
    dashTitle: 'ఆరోగ్య విశ్లేషణలు',
    dashSubtitle: 'మీ మొక్కల ఆరోగ్య కార్యకలాపాలను పర్యవేక్షించండి.',
    totalScans: 'మొత్తం స్కాన్లు',
    totalScansDesc: 'సమర్పించిన మొత్తం స్కాన్‌లు',
    healthyPlants: 'ఆరోగ్యకరమైన మొక్కలు',
    healthyPlantsDesc: 'ఆరోగ్యంగా ఉన్నట్లు ధృవీకరించబడిన మొక్కలు',
    diseasesFound: 'గుర్తించిన వ్యాధులు',
    diseasesFoundDesc: 'ప్రత్యేకంగా గుర్తించిన వ్యాధులు',
    accuracyRate: 'ఖచ్చితత్వ రేటు',
    accuracyRateDesc: 'సగటు కాన్ఫిడెన్స్ స్కోర్',
    aboutTitle: 'FloraSync గురించి',
    aboutSubtitle: 'అధునాతన ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ మరియు ప్లాంట్ పాథాలజీతో వ్యవసాయాన్ని శక్తివంతం చేయడం.',
    missionTitle: '🌱 మా లక్ష్యం',
    missionDesc: 'రైతులు మరియు తోటమాలిలకు మొక్కల వ్యాధులను ప్రారంభంలోనే గుర్తించడంలో సహాయపడటానికి FloraSync రూపొందించబడింది.',
    howItWorksTitle: '🔬 ఇది ఎలా పనిచేస్తుంది',
    how1: 'వ్యాధి సోకిన ఆకు స్పష్టమైన చిత్రాన్ని తీయండి లేదా అప్‌లోడ్ చేయండి.',
    how2: 'మా డీప్ లెర్నింగ్ విజన్ మోడల్ ఆకు మచ్చలు మరియు నిర్మాణ నష్టాన్ని విశ్లేషిస్తుంది.',
    how3: 'ఇంటి నివారణలు మరియు రసాయన పరిష్కారాలతో కూడిన తక్షణ సలహాను పొందండి.',
    teamTitle: '🌍 అందరి కోసం తయారు చేయబడింది',
    teamDesc: 'మీరు పంటలను నిర్వహిస్తున్నా లేదా ఇంట్లోని మొక్కలను సంరక్షిస్తున్నా, FloraSync మీ చేతుల్లోకి నిపుణుల సలహాను తెస్తుంది.',
    humanizeBtn: '🗣️ సులభమైన భాషలో అర్థం చేసుకోండి',
    technicalBtn: '🔬 విస్తృతమైన నివేదిక',
    audioReadBtn: '🔊 వివరాలను వినండి',
    audioStopBtn: '⏹️ ఆపివేయండి',
    voiceSearchPlaceholder: 'ప్రశ్నలు అడగండి లేదా లక్షణాలు చెప్పండి...',
    qaSectionTitle: '💬 AI సహాయకుడిని అడగండి',
    qaSubtitle: 'ఈ వ్యాధి, మందుల మోతాదు లేదా సంరక్షణ గురించి మీ భాషలో ఏవైనా ప్రశ్నలు అడగండి.',
    qaInputPlaceholder: 'ఉదా. ఇది పెంపుడు జంతువులకు సురక్షితమేనా? నేను ఎంత తరచుగా పిచికారీ చేయాలి?',
    qaSendBtn: 'అడగండి',
    suggestedQuestions: [
      'ఈ వ్యాధి ఇతర మొక్కలకు వ్యాపిస్తుందా?',
      'నేను ఈ చెట్టు నుండి పండ్లను తినవచ్చా?',
      'ఏ ఆర్గానిక్ స్ప్రే బాగా పనిచేస్తుంది?'
    ],
    mockResult: {
      disease_detected: 'యాపిల్ స్కాబ్ (Apple Scab)',
      plant_type: 'యాపిల్ (Apple)',
      severity: 'తీవ్రమైనది (Severe)',
      yield_loss: '60–100%',
      timeframe_warning: '48 గంటల్లో చర్య తీసుకోండి. ఆలస్యం చేయడం వల్ల నష్టం గణనీయంగా పెరుగుతుంది.',
      description: 'యాపిల్ స్కాబ్ ఆకులు మరియు పండ్లపై నల్లటి మచ్చలను కలిగిస్తుంది. సోకిన ఆకులు పసుపు రంగులోకి మారి రాలిపోతాయి.',
      home_remedies: [
        'నేల నుండి సోకిన అన్ని పండ్లను వెంటనే తొలగించండి.',
        'మరుసటి సంవత్సరం సున్నం సల్ఫర్‌ను ఉపయోగించండి.'
      ],
      chemical_treatments: [
        'వెంటనే మైక్లోబుటానిల్ లాంటి ఫంగిసైడ్ పిచికారీ చేయండి.',
        'ప్రతి 7-10 రోజులకు ఒకసారి మళ్లీ పిచికారీ చేయండి.'
      ],
      prevention_steps: [
        'రాలిన ఆకులన్నింటినీ తీసివేసి నాశనం చేయండి.',
        'గాలి మరియు వెలుతురు బాగా తగిలేలా కొమ్మలను కత్తిరించండి.'
      ],
      humanized_summary: "దీన్ని మీ యాపిల్ చెట్టుకు చిన్న ఫంగస్ వల్ల వచ్చిన చర్మ వ్యాధిలా ఊహించుకోండి. వెంటనే చెట్టు చుట్టూ రాలిపడిన ఆకులను శుభ్రం చేయండి, మరియు మందు పిచికారీ చేయండి."
    }
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const [selectedLang, setSelectedLang] = useState({ code: 'GB', label: 'EN', name: 'English', langCode: 'en-US' });
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  const languages = [
    { code: 'GB', label: 'EN', name: 'English', langCode: 'en-US' },
    { code: 'IN', label: 'HI', name: 'हिंदी', langCode: 'hi-IN' },
    { code: 'IN', label: 'TE', name: 'తెలుగు', langCode: 'te-IN' }
  ];

  const t = translations[selectedLang.label] || translations.EN;

  const [activeTab, setActiveTab] = useState('analyze');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const [isHumanizedView, setIsHumanizedView] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voiceInputText, setVoiceInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const [chatMessages, setChatMessages] = useState([]);
  const [userQuestion, setUserQuestion] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  const [showCameraModal, setShowCameraModal] = useState(false);
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
      }
    };
    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const speakText = (textToRead) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in your browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const sentences = textToRead
      .split(/[\.।!\?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (sentences.length === 0) return;

    const voices = window.speechSynthesis.getVoices();
    const targetLang = selectedLang.langCode;
    const langPrefix = selectedLang.label.toLowerCase();

    const matchedVoice = voices.find(
      (v) =>
        v.lang === targetLang ||
        v.lang.toLowerCase().startsWith(langPrefix) ||
        v.lang.replace('_', '-').toLowerCase().startsWith(langPrefix)
    );

    setIsPlayingAudio(true);

    sentences.forEach((sentence, index) => {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = targetLang;

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.rate = 0.9;

      if (index === sentences.length - 1) {
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
      }

      window.speechSynthesis.speak(utterance);
    });
  };

  const handleToggleSpeech = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = isHumanizedView 
        ? resultData.humanized_summary 
        : `${t.diseaseDetected}: ${resultData.disease_detected}. ${t.timeframeTitle}: ${resultData.timeframe_warning}. ${resultData.description}`;
      speakText(textToRead);
    }
  };

  const handleStartVoiceInput = (targetSetter) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported on this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang.langCode;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      targetSetter(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleAskQuestion = (questionToAsk) => {
    const q = questionToAsk || userQuestion;
    if (!q.trim()) return;

    const newMsg = { sender: 'user', text: q };
    setChatMessages((prev) => [...prev, newMsg]);
    setUserQuestion('');
    setIsAnswering(true);

    setTimeout(() => {
      let aiResponse = '';
      if (selectedLang.label === 'HI') {
        aiResponse = `आपके प्रश्न "${q}" के लिए: इस बीमारी में प्रभावित पत्तियों को तुरंत हटा दें। 7-10 दिनों के अंतराल में नीम के तेल या उपयुक्त कवकनाशी का छिड़काव करें। पानी देते समय पत्तियों को गीला न करें।`;
      } else if (selectedLang.label === 'TE') {
        aiResponse = `మీ ప్రశ్న "${q}" కి సమాధానం: వ్యాధి సోకిన భాగాలను వెంటనే వేరు చేయండి. ప్రతి 7-10 రోజులకు వేప నూనె లేదా సరిపోయే శిలీంధ్ర నాశినిని పిచికారీ చేయండి మరియు నీరు చిమ్మకుండా జాగ్రత్త వహించండి.`;
      } else {
        aiResponse = `Regarding your question "${q}": For this diagnosis, isolate infected parts immediately. Apply neem oil or targeted fungicide every 7–10 days and avoid overhead watering to prevent spore dispersal.`;
      }

      setChatMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
      setIsAnswering(false);
    }, 1000);
  };

  const handleStartCamera = async () => {
    setShowCameraModal(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
    } catch (err) {
      alert('Unable to access camera. Please check permissions.');
      setShowCameraModal(false);
    }
  };

  const handleStopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCameraModal(false);
  };

  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const capturedFile = new File([blob], 'captured_leaf.jpg', { type: 'image/jpeg' });
        setSelectedImage(capturedFile);
        setPreviewUrl(URL.createObjectURL(capturedFile));
      }
      handleStopCamera();
    }, 'image/jpeg');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (userEmail.trim() !== '') {
      setIsLoggedIn(true);
      setShowAuthModal(false);
    }
  };

  const handleSwitchTab = (tab) => {
    if (tab !== 'analyze') {
      setResultData(null);
      if (isPlayingAudio) window.speechSynthesis.cancel();
    }
    setActiveTab(tab);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;
    setLoading(true);
    setTimeout(() => {
      setResultData(t.mockResult);
      setChatMessages([]);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (resultData) setResultData(t.mockResult);
  }, [selectedLang]);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col justify-between font-sans">
      
      {/* HEADER NAVBAR */}
      <header className="bg-[#faf8f5] border-b border-slate-200/60 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            onClick={() => handleSwitchTab('analyze')} 
            className="flex items-center gap-2 font-serif text-xl font-bold text-[#2d5a27] cursor-pointer"
          >
            <span>🍃</span> FloraSync
          </div>

          <nav className="flex items-center gap-6 text-xs font-medium text-slate-600">
            <button onClick={() => handleSwitchTab('analyze')} className={`hover:text-[#2d5a27] transition cursor-pointer ${activeTab === 'analyze' ? 'text-[#2d5a27] font-bold' : ''}`}>{t.navAnalyze}</button>
            <button onClick={() => handleSwitchTab('history')} className={`hover:text-[#2d5a27] transition cursor-pointer ${activeTab === 'history' ? 'text-[#2d5a27] font-bold' : ''}`}>{t.navHistory}</button>
            <button onClick={() => handleSwitchTab('dashboard')} className={`hover:text-[#2d5a27] transition cursor-pointer ${activeTab === 'dashboard' ? 'text-[#2d5a27] font-bold' : ''}`}>{t.navDashboard}</button>
            <button onClick={() => handleSwitchTab('about')} className={`hover:text-[#2d5a27] transition cursor-pointer ${activeTab === 'about' ? 'text-[#2d5a27] font-bold' : ''}`}>{t.navAbout}</button>
          </nav>

          <div className="flex items-center gap-3 relative" ref={langDropdownRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="border border-slate-200/80 rounded-lg px-3 py-1 bg-white text-xs font-medium text-slate-700 flex items-center gap-1.5 shadow-2xs hover:bg-slate-50 cursor-pointer"
            >
              <span>🌐</span> {selectedLang.code} {selectedLang.label} <span className="text-[10px] text-slate-400">▼</span>
            </button>

            {isLangOpen && (
              <div className="absolute top-10 right-20 w-44 bg-white border border-slate-200/80 rounded-xl shadow-lg py-1.5 z-50 text-xs">
                {languages.map((lang) => (
                  <button
                    key={lang.label}
                    onClick={() => { setSelectedLang(lang); setIsLangOpen(false); }}
                    className={`w-full text-left px-3.5 py-2 flex items-center justify-between hover:bg-slate-50 transition ${
                      selectedLang.label === lang.label ? 'text-[#2d5a27] font-bold bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span><strong className="text-slate-400 mr-2">{lang.code}</strong> {lang.name}</span>
                    {selectedLang.label === lang.label && <span className="text-[#2d5a27]">●</span>}
                  </button>
                ))}
              </div>
            )}

            {!isLoggedIn ? (
              <>
                <button onClick={() => setShowAuthModal(true)} className="text-xs font-medium text-slate-700 hover:text-[#2d5a27] px-2 py-1 cursor-pointer">{t.signIn}</button>
                <button onClick={() => setShowAuthModal(true)} className="bg-[#2d5a27] hover:bg-[#20421c] text-white text-xs font-medium px-3.5 py-1.5 rounded-lg shadow-2xs cursor-pointer">{t.signUp}</button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs">{userEmail ? userEmail[0].toUpperCase() : 'U'}</div>
                <button onClick={() => setIsLoggedIn(false)} className="text-xs text-red-600 hover:underline cursor-pointer">{t.logOut}</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN BODY */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-10 w-full">
        
        {/* ANALYZE TAB */}
        {activeTab === 'analyze' && !loading && !resultData && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-left space-y-1">
              <h1 className="font-serif text-3xl font-normal text-slate-900">{t.analyzeTitle}</h1>
              <p className="text-slate-500 text-xs">{t.analyzeSubtitle}</p>
            </div>

            {/* TOP VOICE INPUT BAR */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-2 flex items-center gap-2 shadow-2xs">
              <input 
                type="text" 
                value={voiceInputText}
                onChange={(e) => setVoiceInputText(e.target.value)}
                placeholder={t.voiceSearchPlaceholder}
                className="flex-1 text-xs px-3 py-1.5 border-none focus:outline-none"
              />
              <button 
                onClick={() => handleStartVoiceInput(setVoiceInputText)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-100 text-[#2d5a27] hover:bg-emerald-200'
                }`}
              >
                🎤 {isListening ? 'Listening...' : 'Voice Query'}
              </button>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-2xs space-y-6">
              {!previewUrl ? (
                <div className="border-2 border-dashed border-emerald-800/20 bg-emerald-50/10 rounded-xl p-10 text-center space-y-3">
                  <div className="w-10 h-10 bg-emerald-100/50 text-[#2d5a27] rounded-xl flex items-center justify-center text-xl mx-auto">📤</div>
                  <p className="text-slate-800 font-semibold text-sm">{t.dragDrop}</p>
                  <p className="text-xs text-slate-500">{t.or} <label htmlFor="browse-files" className="text-emerald-800 font-semibold underline cursor-pointer">{t.browseFiles}</label></p>
                  <input id="browse-files" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <p className="text-[11px] text-slate-400">{t.fileSupport}</p>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-slate-200">
                  <button onClick={() => { setPreviewUrl(null); setSelectedImage(null); }} className="absolute top-2 right-2 bg-white/80 hover:bg-white text-slate-700 w-7 h-7 rounded-full flex items-center justify-center text-xs shadow-md cursor-pointer">✕</button>
                  <img src={previewUrl} alt="Leaf Preview" className="w-full max-h-72 object-cover" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <button type="button" onClick={handleStartCamera} className="border border-slate-200/80 rounded-xl py-2.5 text-xs font-medium text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer transition">{t.takePhoto}</button>
                <label htmlFor="upload-img" className="border border-slate-200/80 rounded-xl py-2.5 text-xs font-medium text-slate-700 flex items-center justify-center gap-2 hover:bg-slate-50 cursor-pointer transition">
                  {t.uploadImg}
                  <input id="upload-img" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>

              {selectedImage && (
                <button onClick={handleAnalyze} className="w-full bg-[#2d5a27] hover:bg-[#20421c] text-white py-3 rounded-xl font-semibold text-xs shadow-sm transition cursor-pointer">{t.analyzeBtn}</button>
              )}
            </div>

            <p className="text-center text-[11px] text-slate-400">{t.bestResultsTip}</p>
          </div>
        )}

        {/* LOADING ANIMATION */}
        {activeTab === 'analyze' && loading && (
          <div className="py-24 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100/50 text-[#2d5a27] rounded-full flex items-center justify-center text-3xl mx-auto animate-pulse">🍃</div>
            <h2 className="font-serif text-2xl font-normal text-slate-900">{t.analyzingTitle}</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">{t.analyzingSubtitle}</p>
          </div>
        )}

        {/* DIAGNOSIS RESULT & INTERACTIVE Q&A */}
        {activeTab === 'analyze' && resultData && !loading && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <button onClick={() => setResultData(null)} className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer">{t.analyzeAnother}</button>

              <div className="flex gap-2">
                <button onClick={handleToggleSpeech} className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs border ${isPlayingAudio ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' : 'bg-emerald-100 text-[#2d5a27] border-emerald-200 hover:bg-emerald-200'}`}>
                  {isPlayingAudio ? t.audioStopBtn : t.audioReadBtn}
                </button>
                <button onClick={() => setIsHumanizedView(!isHumanizedView)} className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs border border-purple-200">
                  {isHumanizedView ? t.technicalBtn : t.humanizeBtn}
                </button>
              </div>
            </div>

            {/* Disease Banner */}
            <div className="bg-red-50/60 border border-red-200/60 rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">!</div>
              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block">{t.diseaseDetected}</span>
                <h2 className="text-xl font-serif font-bold text-slate-900">{resultData.disease_detected}</h2>
              </div>
            </div>

            {/* Main Visual & Analysis Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {previewUrl && <img src={previewUrl} alt="Analyzed Leaf" className="w-full h-52 object-cover rounded-xl border border-slate-200" />}
              <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
                <h3 className="font-serif font-bold text-slate-800 text-sm">{t.analysisDetails}</h3>
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>{t.confidence}</span>
                    <span className="font-bold text-slate-800">92.4%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5"><div className="bg-[#2d5a27] h-1.5 rounded-full" style={{ width: '92%' }}></div></div>
                </div>
                <div className="flex justify-between text-xs border-t border-slate-100 pt-2">
                  <div><span className="text-[10px] text-slate-400 block">{t.plantType}</span><span className="font-semibold text-slate-800">{resultData.plant_type}</span></div>
                  <div className="text-right"><span className="text-[10px] text-slate-400 block">{t.severity}</span><span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] rounded-full font-bold">{resultData.severity}</span></div>
                </div>
              </div>
            </div>

            {/* Mode Switch Content: Simple Explanation OR Full Technical Details */}
            {isHumanizedView ? (
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-sm font-serif">
                  <span className="text-xl">💡</span>
                  <span>Simple Explanation (Easy to Understand)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-sans">{resultData.humanized_summary}</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Timeframe & Loss Warning */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                    <span>⚠️</span> <span>{t.timeframeTitle}</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">{resultData.timeframe_warning}</p>
                  <p className="text-[11px] text-amber-700 font-semibold pt-1">{t.estimatedLoss}: <span className="font-bold text-red-700">{resultData.yield_loss}</span></p>
                </div>

                {/* Description */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs space-y-2">
                  <h3 className="font-serif font-bold text-slate-900 text-base">{t.descriptionHeader}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{resultData.description}</p>
                </div>

                {/* Recommended Treatments */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs space-y-4">
                  <h3 className="font-serif font-bold text-slate-900 text-base">{t.treatmentHeader}</h3>
                  
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-[#2d5a27]">{t.lowCostHeader}</h4>
                    <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                      {resultData.home_remedies.map((remedy, i) => (
                        <li key={i}>{remedy}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <h4 className="text-xs font-bold text-slate-800">{t.chemicalHeader}</h4>
                    <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                      {resultData.chemical_treatments.map((chem, i) => (
                        <li key={i}>{chem}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Prevention Steps */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs space-y-2">
                  <h3 className="font-serif font-bold text-slate-900 text-base">{t.preventionHeader}</h3>
                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-1">
                    {resultData.prevention_steps.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* INTERACTIVE MULTILINGUAL Q&A SECTION */}
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-xs space-y-4">
              <div>
                <h3 className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                  <span>{t.qaSectionTitle}</span>
                  <span className="text-xs font-sans font-normal px-2 py-0.5 bg-emerald-100 text-[#2d5a27] rounded-full">
                    {selectedLang.name}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">{t.qaSubtitle}</p>
              </div>

              {/* Sample Quick Questions */}
              <div className="flex flex-wrap gap-2 pt-1">
                {t.suggestedQuestions.map((q, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleAskQuestion(q)}
                    className="text-[11px] bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-[#2d5a27] border border-slate-200 hover:border-emerald-300 rounded-lg px-2.5 py-1 text-left cursor-pointer transition"
                  >
                    💡 {q}
                  </button>
                ))}
              </div>

              {/* Dynamic Q&A History */}
              {chatMessages.length > 0 && (
                <div className="space-y-3 pt-2 max-h-60 overflow-y-auto border-t border-slate-100">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-3 rounded-2xl text-xs space-y-1 ${msg.sender === 'user' ? 'bg-[#2d5a27] text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                        <p>{msg.text}</p>
                        {msg.sender === 'ai' && (
                          <button 
                            onClick={() => speakText(msg.text)}
                            className="text-[10px] font-semibold underline text-[#2d5a27] hover:opacity-80 block cursor-pointer pt-1"
                          >
                            🔊 Listen in {selectedLang.name}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isAnswering && <div className="text-xs text-slate-400 italic">FloraSync AI is typing in {selectedLang.name}...</div>}
                </div>
              )}

              {/* Input Box for Asking Custom Questions */}
              <div className="flex gap-2 pt-2">
                <input 
                  type="text" 
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                  placeholder={t.qaInputPlaceholder}
                  className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2d5a27]"
                />
                <button 
                  onClick={() => handleStartVoiceInput(setUserQuestion)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition ${
                    isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title="Speak question"
                >
                  🎤
                </button>
                <button 
                  onClick={() => handleAskQuestion()}
                  className="bg-[#2d5a27] hover:bg-[#20421c] text-white px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer shadow-2xs transition"
                >
                  {t.qaSendBtn}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif text-3xl font-normal text-slate-900">{t.historyTitle}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{t.historySubtitle}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { disease: 'Apple Scab', plant: 'Apple', confidence: '92%', date: 'Jul 22, 2026', img: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=400' },
                { disease: 'Rice Brown Spot', plant: 'Rice', confidence: '90%', date: 'Jul 22, 2026', img: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
                  <img src={item.img} alt={item.disease} className="w-full h-40 object-cover" />
                  <div className="p-4 space-y-1">
                    <h3 className="font-serif font-bold text-slate-900 text-base">{item.disease}</h3>
                    <p className="text-xs text-slate-500">{item.plant}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl font-normal text-slate-900">{t.dashTitle}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{t.dashSubtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.totalScans}</span>
                <p className="text-3xl font-bold text-slate-900 mt-1">8</p>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8 py-4">
            <div className="text-center space-y-2">
              <h1 className="font-serif text-3xl font-bold text-slate-900">{t.aboutTitle}</h1>
              <p className="text-xs text-slate-600 max-w-lg mx-auto">{t.aboutSubtitle}</p>
            </div>
          </div>
        )}

      </main>

      {/* LIVE CAMERA MODAL */}
      {showCameraModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-black border border-slate-700 rounded-3xl p-4 max-w-md w-full relative space-y-4 text-center">
            <button onClick={handleStopCamera} className="absolute top-3 right-3 bg-white/20 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer">✕</button>
            <h3 className="text-white text-sm font-medium">Position Leaf in Frame</h3>
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-3/4 flex items-center justify-center border border-slate-800">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            </div>
            <button onClick={handleCapturePhoto} className="w-14 h-14 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg border-4 border-slate-300 cursor-pointer">
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-emerald-600"></div>
            </button>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-2xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#faf8f5] border border-slate-200/80 rounded-3xl p-8 max-w-md w-full shadow-xl relative space-y-5 text-center">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer">✕</button>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Welcome to FloraSync</h2>
            <form onSubmit={handleLoginSubmit} className="space-y-3 text-left">
              <input type="email" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="Enter email" className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs bg-white" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border border-slate-200 rounded-xl px-3.5 py-2 text-xs bg-white" />
              <button type="submit" className="w-full bg-[#2d5a27] text-white py-2.5 rounded-xl font-semibold text-xs cursor-pointer">Continue ▸</button>
            </form>
          </div>
        </div>
      )}

      <footer className="border-t border-slate-200/60 py-5 text-center text-[11px] text-slate-400">
        © 2026 FloraSync. All rights reserved.
      </footer>
    </div>
  );
}