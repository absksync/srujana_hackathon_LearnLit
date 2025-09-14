// Doubt resolver specific functionality

// Sample AI responses for different questions
const sampleResponses = {
    physics1: {
        en: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Newton's Second Law of Motion</h4>
            <p class="mb-4">Newton's second law states that <strong>the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass</strong>.</p>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h5 class="font-semibold text-blue-900 mb-2">Mathematical Formula:</h5>
                <p class="text-lg font-mono bg-white p-2 rounded border text-center">F = ma</p>
                <ul class="mt-2 text-sm text-blue-800">
                    <li>• F = Net force (in Newtons, N)</li>
                    <li>• m = Mass (in kilograms, kg)</li>
                    <li>• a = Acceleration (in m/s²)</li>
                </ul>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">Key Points:</h5>
            <ul class="list-disc pl-5 mb-4">
                <li>If the net force is zero, acceleration is zero (first law)</li>
                <li>Greater force produces greater acceleration</li>
                <li>More massive objects require more force for the same acceleration</li>
            </ul>
            
            <h5 class="font-semibold text-gray-900 mb-2">Example:</h5>
            <p class="bg-gray-50 p-3 rounded">If you push a 2 kg object with a force of 10 N, the acceleration will be: a = F/m = 10/2 = 5 m/s²</p>
        `,
        hi: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">न्यूटन का गति का दूसरा नियम</h4>
            <p class="mb-4">न्यूटन का दूसरा नियम कहता है कि <strong>किसी वस्तु का त्वरण उस पर लगने वाले नेट बल के समानुपाती और उसके द्रव्यमान के व्युत्क्रमानुपाती होता है</strong>।</p>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h5 class="font-semibold text-blue-900 mb-2">गणितीय सूत्र:</h5>
                <p class="text-lg font-mono bg-white p-2 rounded border text-center">F = ma</p>
                <ul class="mt-2 text-sm text-blue-800">
                    <li>• F = नेट बल (न्यूटन में, N)</li>
                    <li>• m = द्रव्यमान (किलोग्राम में, kg)</li>
                    <li>• a = त्वरण (m/s² में)</li>
                </ul>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">मुख्य बिंदु:</h5>
            <ul class="list-disc pl-5 mb-4">
                <li>यदि नेट बल शून्य है, तो त्वरण शून्य है (पहला नियम)</li>
                <li>अधिक बल अधिक त्वरण उत्पन्न करता है</li>
                <li>अधिक द्रव्यमान वाली वस्तुओं को समान त्वरण के लिए अधिक बल की आवश्यकता होती है</li>
            </ul>
            
            <h5 class="font-semibold text-gray-900 mb-2">उदाहरण:</h5>
            <p class="bg-gray-50 p-3 rounded">यदि आप 2 kg की वस्तु को 10 N के बल से धकेलते हैं, तो त्वरण होगा: a = F/m = 10/2 = 5 m/s²</p>
        `
    },
    math1: {
        en: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Derivative of sin(x)</h4>
            <p class="mb-4">The derivative of sin(x) with respect to x is <strong>cos(x)</strong>.</p>
            
            <div class="bg-green-50 p-4 rounded-lg mb-4">
                <h5 class="font-semibold text-green-900 mb-2">Formula:</h5>
                <p class="text-lg font-mono bg-white p-2 rounded border text-center">d/dx[sin(x)] = cos(x)</p>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">Proof using first principles:</h5>
            <div class="bg-gray-50 p-4 rounded mb-4">
                <p class="font-mono text-sm">
                    d/dx[sin(x)] = lim(h→0) [sin(x+h) - sin(x)]/h<br>
                    = lim(h→0) [sin(x)cos(h) + cos(x)sin(h) - sin(x)]/h<br>
                    = lim(h→0) [sin(x)(cos(h)-1) + cos(x)sin(h)]/h<br>
                    = sin(x)·lim(h→0)(cos(h)-1)/h + cos(x)·lim(h→0)sin(h)/h<br>
                    = sin(x)·0 + cos(x)·1 = cos(x)
                </p>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">Remember:</h5>
            <ul class="list-disc pl-5">
                <li>d/dx[cos(x)] = -sin(x)</li>
                <li>d/dx[tan(x)] = sec²(x)</li>
                <li>These are fundamental trigonometric derivatives</li>
            </ul>
        `,
        hi: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">sin(x) का अवकलज</h4>
            <p class="mb-4">x के सापेक्ष sin(x) का अवकलज <strong>cos(x)</strong> है।</p>
            
            <div class="bg-green-50 p-4 rounded-lg mb-4">
                <h5 class="font-semibold text-green-900 mb-2">सूत्र:</h5>
                <p class="text-lg font-mono bg-white p-2 rounded border text-center">d/dx[sin(x)] = cos(x)</p>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">प्रथम सिद्धांत से सिद्ध:</h5>
            <div class="bg-gray-50 p-4 rounded mb-4">
                <p class="font-mono text-sm">
                    d/dx[sin(x)] = lim(h→0) [sin(x+h) - sin(x)]/h<br>
                    = lim(h→0) [sin(x)cos(h) + cos(x)sin(h) - sin(x)]/h<br>
                    = lim(h→0) [sin(x)(cos(h)-1) + cos(x)sin(h)]/h<br>
                    = sin(x)·lim(h→0)(cos(h)-1)/h + cos(x)·lim(h→0)sin(h)/h<br>
                    = sin(x)·0 + cos(x)·1 = cos(x)
                </p>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">याद रखें:</h5>
            <ul class="list-disc pl-5">
                <li>d/dx[cos(x)] = -sin(x)</li>
                <li>d/dx[tan(x)] = sec²(x)</li>
                <li>ये मौलिक त्रिकोणमितीय अवकलज हैं</li>
            </ul>
        `
    },
    chemistry1: {
        en: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Chemical Equilibrium</h4>
            <p class="mb-4">Chemical equilibrium is <strong>the state where the rate of forward reaction equals the rate of reverse reaction</strong>, and the concentrations of reactants and products remain constant over time.</p>
            
            <div class="bg-purple-50 p-4 rounded-lg mb-4">
                <h5 class="font-semibold text-purple-900 mb-2">Key Characteristics:</h5>
                <ul class="text-sm text-purple-800">
                    <li>• Dynamic process (reactions continue in both directions)</li>
                    <li>• Constant concentrations (not necessarily equal)</li>
                    <li>• Can be disturbed by changes in conditions</li>
                </ul>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">Equilibrium Constant (K):</h5>
            <p class="mb-2">For the reaction: aA + bB ⇌ cC + dD</p>
            <div class="bg-gray-50 p-3 rounded mb-4">
                <p class="text-center font-mono">K = [C]^c [D]^d / [A]^a [B]^b</p>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">Le Chatelier's Principle:</h5>
            <ul class="list-disc pl-5 mb-4">
                <li><strong>Concentration:</strong> Adding reactants shifts equilibrium right</li>
                <li><strong>Temperature:</strong> Increasing temp favors endothermic direction</li>
                <li><strong>Pressure:</strong> Increasing pressure favors side with fewer gas molecules</li>
            </ul>
            
            <div class="bg-yellow-50 p-3 rounded">
                <p class="text-sm"><strong>Example:</strong> In the Haber process (N₂ + 3H₂ ⇌ 2NH₃), high pressure and moderate temperature favor ammonia production.</p>
            </div>
        `,
        hi: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">रासायनिक संतुलन</h4>
            <p class="mb-4">रासायनिक संतुलन वह स्थिति है जहाँ <strong>अग्र अभिक्रिया की दर विपरीत अभिक्रिया की दर के बराबर होती है</strong>, और अभिकारकों तथा उत्पादों की सांद्रता समय के साथ स्थिर रहती है।</p>
            
            <div class="bg-purple-50 p-4 rounded-lg mb-4">
                <h5 class="font-semibold text-purple-900 mb-2">मुख्य विशेषताएं:</h5>
                <ul class="text-sm text-purple-800">
                    <li>• गतिशील प्रक्रिया (दोनों दिशाओं में अभिक्रियाएं जारी रहती हैं)</li>
                    <li>• स्थिर सांद्रता (जरूरी नहीं कि समान हो)</li>
                    <li>• परिस्थितियों में बदलाव से बाधित हो सकता है</li>
                </ul>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">संतुलन स्थिरांक (K):</h5>
            <p class="mb-2">अभिक्रिया के लिए: aA + bB ⇌ cC + dD</p>
            <div class="bg-gray-50 p-3 rounded mb-4">
                <p class="text-center font-mono">K = [C]^c [D]^d / [A]^a [B]^b</p>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">ले चैटेलियर का सिद्धांत:</h5>
            <ul class="list-disc pl-5 mb-4">
                <li><strong>सांद्रता:</strong> अभिकारक जोड़ने से संतुलन दाईं ओर खिसकता है</li>
                <li><strong>तापमान:</strong> तापमान बढ़ाने से ऊष्माशोषी दिशा को बढ़ावा मिलता है</li>
                <li><strong>दबाव:</strong> दबाव बढ़ाने से कम गैस अणुओं वाली तरफ को बढ़ावा मिलता है</li>
            </ul>
            
            <div class="bg-yellow-50 p-3 rounded">
                <p class="text-sm"><strong>उदाहरण:</strong> हेबर प्रक्रिया में (N₂ + 3H₂ ⇌ 2NH₃), उच्च दबाव और मध्यम तापमान अमोनिया उत्पादन को बढ़ावा देते हैं।</p>
            </div>
        `
    },
    math2: {
        en: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">Trigonometric Identities</h4>
            <p class="mb-4">Trigonometric identities are <strong>equations involving trigonometric functions that are true for all values of the variables</strong>.</p>
            
            <h5 class="font-semibold text-gray-900 mb-3">Fundamental Identities:</h5>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h6 class="font-semibold text-blue-900 mb-2">Pythagorean Identities:</h6>
                <ul class="text-sm font-mono space-y-1">
                    <li>• sin²θ + cos²θ = 1</li>
                    <li>• 1 + tan²θ = sec²θ</li>
                    <li>• 1 + cot²θ = csc²θ</li>
                </ul>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg mb-4">
                <h6 class="font-semibold text-green-900 mb-2">Angle Addition Formulas:</h6>
                <ul class="text-sm font-mono space-y-1">
                    <li>• sin(A ± B) = sinA cosB ± cosA sinB</li>
                    <li>• cos(A ± B) = cosA cosB ∓ sinA sinB</li>
                    <li>• tan(A ± B) = (tanA ± tanB)/(1 ∓ tanA tanB)</li>
                </ul>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg mb-4">
                <h6 class="font-semibold text-purple-900 mb-2">Double Angle Formulas:</h6>
                <ul class="text-sm font-mono space-y-1">
                    <li>• sin(2θ) = 2sinθ cosθ</li>
                    <li>• cos(2θ) = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ</li>
                    <li>• tan(2θ) = 2tanθ/(1 - tan²θ)</li>
                </ul>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">Applications:</h5>
            <ul class="list-disc pl-5">
                <li>Simplifying complex trigonometric expressions</li>
                <li>Solving trigonometric equations</li>
                <li>Integration and differentiation of trigonometric functions</li>
                <li>Physics problems involving waves and oscillations</li>
            </ul>
        `,
        hi: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">त्रिकोणमितीय सर्वसमिकाएं</h4>
            <p class="mb-4">त्रिकोणमितीय सर्वसमिकाएं <strong>त्रिकोणमितीय फलनों से युक्त ऐसे समीकरण हैं जो चरों के सभी मानों के लिए सत्य होते हैं</strong>।</p>
            
            <h5 class="font-semibold text-gray-900 mb-3">मौलिक सर्वसमिकाएं:</h5>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h6 class="font-semibold text-blue-900 mb-2">पाइथागोरस सर्वसमिकाएं:</h6>
                <ul class="text-sm font-mono space-y-1">
                    <li>• sin²θ + cos²θ = 1</li>
                    <li>• 1 + tan²θ = sec²θ</li>
                    <li>• 1 + cot²θ = csc²θ</li>
                </ul>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg mb-4">
                <h6 class="font-semibold text-green-900 mb-2">कोण योग सूत्र:</h6>
                <ul class="text-sm font-mono space-y-1">
                    <li>• sin(A ± B) = sinA cosB ± cosA sinB</li>
                    <li>• cos(A ± B) = cosA cosB ∓ sinA sinB</li>
                    <li>• tan(A ± B) = (tanA ± tanB)/(1 ∓ tanA tanB)</li>
                </ul>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg mb-4">
                <h6 class="font-semibold text-purple-900 mb-2">द्विकोण सूत्र:</h6>
                <ul class="text-sm font-mono space-y-1">
                    <li>• sin(2θ) = 2sinθ cosθ</li>
                    <li>• cos(2θ) = cos²θ - sin²θ = 2cos²θ - 1 = 1 - 2sin²θ</li>
                    <li>• tan(2θ) = 2tanθ/(1 - tan²θ)</li>
                </ul>
            </div>
            
            <h5 class="font-semibold text-gray-900 mb-2">अनुप्रयोग:</h5>
            <ul class="list-disc pl-5">
                <li>जटिल त्रिकोणमितीय व्यंजकों को सरल बनाना</li>
                <li>त्रिकोणमितीय समीकरण हल करना</li>
                <li>त्रिकोणमितीय फलनों का समाकलन और अवकलन</li>
                <li>तरंगों और दोलनों से संबंधित भौतिकी की समस्याएं</li>
            </ul>
        `
    }
};

// Ask question functionality
function askQuestion() {
    const questionInput = document.getElementById('questionInput');
    const subjectSelect = document.getElementById('subjectSelect');
    const answerSection = document.getElementById('answerSection');
    const answerContent = document.getElementById('answerContent');
    const askButton = document.getElementById('askButton');
    
    const question = questionInput.value.trim();
    const subject = subjectSelect.value;
    
    if (!question) {
        alert(currentLanguage === 'hi' ? 'कृपया एक प्रश्न दर्ज करें।' : 'Please enter a question.');
        return;
    }
    
    // Show loading state
    askButton.textContent = currentLanguage === 'hi' ? 'AI सोच रहा है...' : 'AI is thinking...';
    askButton.disabled = true;
    
    // Simulate AI processing delay
    setTimeout(() => {
        // Generate sample response based on question content
        let response = generateSampleResponse(question, subject);
        
        answerContent.innerHTML = response;
        answerSection.classList.remove('hidden');
        
        // Reset button
        askButton.textContent = currentLanguage === 'hi' ? 'AI सहायक से पूछें' : 'Ask AI Assistant';
        askButton.disabled = false;
        
        // Scroll to answer
        answerSection.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
}

// Ask quick question
function askQuickQuestion(questionId) {
    const answerSection = document.getElementById('answerSection');
    const answerContent = document.getElementById('answerContent');
    
    if (sampleResponses[questionId]) {
        answerContent.innerHTML = sampleResponses[questionId][currentLanguage];
        answerSection.classList.remove('hidden');
        answerSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Generate sample response
function generateSampleResponse(question, subject) {
    const lowerQuestion = question.toLowerCase();
    
    // Check for specific keywords and return appropriate responses
    if (lowerQuestion.includes('newton') || lowerQuestion.includes('second law')) {
        return sampleResponses.physics1[currentLanguage];
    } else if (lowerQuestion.includes('derivative') || lowerQuestion.includes('sin')) {
        return sampleResponses.math1[currentLanguage];
    } else if (lowerQuestion.includes('equilibrium') || lowerQuestion.includes('chemical')) {
        return sampleResponses.chemistry1[currentLanguage];
    } else if (lowerQuestion.includes('trigonometric') || lowerQuestion.includes('identities')) {
        return sampleResponses.math2[currentLanguage];
    }
    
    // Default generic response
    const genericResponse = {
        en: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">AI Response</h4>
            <p class="mb-4">Thank you for your question about <strong>"${question}"</strong>.</p>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h5 class="font-semibold text-blue-900 mb-2">Analysis:</h5>
                <p class="text-sm text-blue-800">This appears to be a ${subject} question. Let me provide you with a comprehensive explanation.</p>
            </div>
            
            <p class="mb-4">Based on your question, here are the key concepts you should understand:</p>
            
            <ul class="list-disc pl-5 mb-4">
                <li>The fundamental principles related to your topic</li>
                <li>Practical applications and examples</li>
                <li>Common problem-solving approaches</li>
                <li>Related concepts that might be helpful</li>
            </ul>
            
            <div class="bg-yellow-50 p-3 rounded">
                <p class="text-sm"><strong>Tip:</strong> For more specific help, try asking about particular aspects of this topic or provide more context about what you're trying to understand.</p>
            </div>
        `,
        hi: `
            <h4 class="text-lg font-semibold text-gray-900 mb-3">AI प्रतिक्रिया</h4>
            <p class="mb-4"><strong>"${question}"</strong> के बारे में आपके प्रश्न के लिए धन्यवाद।</p>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
                <h5 class="font-semibold text-blue-900 mb-2">विश्लेषण:</h5>
                <p class="text-sm text-blue-800">यह ${subject} का प्रश्न लगता है। मैं आपको एक व्यापक स्पष्टीकरण प्रदान करता हूं।</p>
            </div>
            
            <p class="mb-4">आपके प्रश्न के आधार पर, यहाँ मुख्य अवधारणाएं हैं जिन्हें आपको समझना चाहिए:</p>
            
            <ul class="list-disc pl-5 mb-4">
                <li>आपके विषय से संबंधित मौलिक सिद्धांत</li>
                <li>व्यावहारिक अनुप्रयोग और उदाहरण</li>
                <li>सामान्य समस्या-समाधान दृष्टिकोण</li>
                <li>संबंधित अवधारणाएं जो सहायक हो सकती हैं</li>
            </ul>
            
            <div class="bg-yellow-50 p-3 rounded">
                <p class="text-sm"><strong>सुझाव:</strong> अधिक विशिष्ट सहायता के लिए, इस विषय के विशेष पहलुओं के बारे में पूछने का प्रयास करें या इस बारे में अधिक संदर्भ प्रदान करें कि आप क्या समझना चाहते हैं।</p>
            </div>
        `
    };
    
    return genericResponse[currentLanguage];
}

// Ask follow-up question
function askFollowUp() {
    const questionInput = document.getElementById('questionInput');
    questionInput.focus();
    questionInput.placeholder = currentLanguage === 'hi' ? 
        'फॉलो-अप प्रश्न पूछें...' : 
        'Ask a follow-up question...';
}

// Update placeholders when language changes
function updateDoubtResolverLanguage() {
    const questionInput = document.getElementById('questionInput');
    if (questionInput) {
        const enPlaceholder = questionInput.getAttribute('data-en-placeholder');
        const hiPlaceholder = questionInput.getAttribute('data-hi-placeholder');
        
        if (currentLanguage === 'hi' && hiPlaceholder) {
            questionInput.placeholder = hiPlaceholder;
        } else if (enPlaceholder) {
            questionInput.placeholder = enPlaceholder;
        }
    }
}

// Initialize doubt resolver
document.addEventListener('DOMContentLoaded', function() {
    // Update language-specific content
    updateDoubtResolverLanguage();
    
    // Add enter key support for question input
    const questionInput = document.getElementById('questionInput');
    if (questionInput) {
        questionInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                askQuestion();
            }
        });
    }
});

// Override the updateLanguage function to include doubt resolver updates
const originalUpdateLanguage = window.updateLanguage;
if (originalUpdateLanguage) {
    window.updateLanguage = function() {
        originalUpdateLanguage();
        updateDoubtResolverLanguage();
    };
}