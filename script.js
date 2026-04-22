// --- Creazione dello sfondo stellare animato ---
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2.5 + 0.5;
        
        star.style.position = 'absolute';
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.boxShadow = `0 0 ${size * 3}px #fff`;
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        
        container.appendChild(star);
    }

    // Add CSS animation
    if (!document.getElementById('twinkle-animation')) {
        const style = document.createElement('style');
        style.id = 'twinkle-animation';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// --- Effetto Scroll Reveal ---
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// --- Timeline Interattiva Funzionalità ---
function setupTimeline() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    
    timelineNodes.forEach(node => {
        const marker = node.querySelector('.timeline-marker');
        const popup = node.querySelector('.timeline-popup');
        
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove active class from all popups
            document.querySelectorAll('.timeline-popup').forEach(p => {
                p.classList.remove('active');
            });
            
            // Add active class to clicked popup
            if (!popup.classList.contains('active')) {
                popup.classList.add('active');
            }
        });
        
        node.addEventListener('mouseenter', () => {
            if (window.innerWidth > 1024) {
                popup.style.display = 'block';
            }
        });
        
        node.addEventListener('mouseleave', () => {
            if (window.innerWidth > 1024) {
                popup.style.display = 'none';
            }
        });
    });
    
    // Close popups when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.timeline-popup').forEach(p => {
            p.classList.remove('active');
        });
    });
}

// --- Enhanced AI Chatbot with Context Memory ---
const aiTrigger = document.getElementById('ai-chat-trigger');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// Conversation context
let conversationContext = {
    previousTopic: null,
    messageCount: 0
};

aiTrigger.addEventListener('click', () => {
    chatWindow.style.display = 'flex';
    aiTrigger.style.display = 'none';
    userInput.focus();
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
    aiTrigger.style.display = 'flex';
});

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = sender === 'user' ? 'user-msg' : 'bot-msg';
    
    if (sender === 'bot') {
        msgDiv.innerHTML = `<div class="bot-message-content">${text}</div>`;
    } else {
        msgDiv.textContent = text;
    }
    
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Enhanced AI Response Database with Categories
const aiResponses = {
    // Greetings
    greetings: [
        { keywords: ['ciao', 'hey', 'salve', 'ola', 'hello'], responses: [
            "Ciao! 👋 Sono qui per raccontarti la storia straordinaria di Katherine Johnson. Cosa vorresti sapere?",
            "Benvenuto! 🌟 Sono pronto a condividere informazioni su Katherine e la sua incredibile carriera.",
            "Ehi! Sono entusiasta di parlarti di Katherine Johnson. Dimmi pure cosa ti incuriosisce!"
        ]},
    ],
    
    // About Katherine
    biography: [
        { keywords: ['chi', 'biografia', 'vita', 'nata', 'nascita'], responses: [
            "Katherine Johnson (1918-2020) è stata una matematica afroamericana straordinaria. 🎓\n\nNata a White Sulphur Springs, West Virginia, si laureò in matematica a soli 18 anni. Ha lavorato alla NASA dal 1953 al 1986, calcolando le traiettorie critiche per le missioni spaziali americane.",
            "Katherine Goble Johnson è nata il 26 agosto 1918. Era una genio della matematica che superò incredibili barriere razziali e di genere per diventare una figura cruciale nel Progetto Mercury e Apollo. 🚀",
            "Una mente straordinaria! Katherine nacque in una famiglia che valorizzava l'educazione. Da giovane mostrò subito un talento eccezionale per i numeri e la matematica."
        ]},
    ],
    
    // Space Missions
    spaceProgram: [
        { keywords: ['mercury', 'apollo', 'spazio', 'nasa', 'gemini', 'shepard', 'glenn'], responses: [
            "Katherine ha contribuito a tre programmi spaziali cruciali:\n\n🛸 **Mercury (1961-62)**: Primi voli americani - Alan Shepard e Gus Grissom\n🌍 **Gemini**: Sviluppo di tecniche orbitali\n🌙 **Apollo (1961-69)**: Missioni lunari, incluso l'Apollo 11\n\nI suoi calcoli erano così precisi che gli astronauti si fidavano più di lei che dei computer IBM!",
            "Nel 1961, Katherine calcolò la traiettoria per il primo volo spaziale americano (Alan Shepard - Mercury). Nel 1962, John Glenn insisté personalmente per i suoi calcoli per l'orbita (Friendship 7). Nel 1969, Apollo 11 sulla Luna! 🌙",
            "La sua lavoro era fondamentale! Ogni calcolo, ogni traiettoria, ogni parametro di sicurezza passava attraverso la sua mente brillante. Senza di lei, la corsa allo spazio avrebbe avuto un esito diverso."
        ]},
    ],
    
    // Challenges
    challenges: [
        { keywords: ['difficoltà', 'razzismo', 'discriminazione', 'segregazione', 'sfide', 'genere'], responses: [
            "Katherine affrontò sfide enormi:\n\n✊ **Segregazione Razziale**: Bagni separati, uffici separati, risorse limitate\n👩‍💼 **Discriminazione di Genere**: Stipendi inferiori, meno riconoscimenti\n🎓 **Accesso all'Educazione**: Doveva viaggiare 120 miglia per il liceo\n🔬 **Riconoscimento**: I suoi contributi erano spesso ignorati\n\nMa lei disse: \"Non ho mai lasciato che il pregiudizio mi impedisse di fare il mio lavoro.\"",
            "Negli anni '50 e '60, Katherine lavorava in un ambiente profondamente segregato. Aveva letteralmente bagni e fontanelle d'acqua separate. Eppure, la sua eccellenza era innegabile. Gli astronauti sapevano di poter contare su di lei.",
            "La lotta di Katherine non era solo professionale. Era personale. Era quotidiana. Dovette provare e riprovare il suo valore, ancora e ancora. La sua resilienza è straordinaria."
        ]},
    ],
    
    // Recognition & Legacy
    legacy: [
        { keywords: ['premio', 'riconoscimento', 'medaglia', 'eredità', 'film', 'hidden figures', 'diritto di contare'], responses: [
            "Nel 2015, Katherine ricevette la **Medaglia Presidenziale della Libertà** 🎖️ - il massimo onore civile americano.\n\nNel 2016, il film \"Il Diritto di Contare\" (Hidden Figures) finalmente raccontò la sua storia al mondo. È stata celebrata da università, musei e organizzazioni in tutto il mondo.",
            "La sua eredità? Infinita. ∞\n\nHa ispirato generazioni di scienziate. Ha dimostrato che il genio non ha colore né genere. Ha tracciato la strada per donne e uomini di colore nella scienza. Il Virginia Science Museum ha persino eretto una statua in suo onore!",
            "Katherine Johnson non è solo un nome in una libro di storia. È un simbolo di speranza, eccellenza e determinazione. La sua storia continua a ispirare milioni di persone ogni giorno."
        ]},
    ],
    
    // Technical / Math
    technical: [
        { keywords: ['matematica', 'calcoli', 'traiettoria', 'geometria', 'equazioni', 'balistica'], responses: [
            "Katherine era una maestra della **geometria analitica** e dei **calcoli balistici**.\n\nEra specializzata in:\n📐 Equazioni differenziali\n🚀 Calcoli di traiettoria\n⚡ Parametri di velocità e accelerazione\n🎯 Precisione balistica per il rientro in atmosfera\n\nUsava calcoli manuali straordinariamente precisi!",
            "La matemica di Katherine era perfetta. Calcolava traiettorie ellittiche, parametri orbitali, velocità di fuga... tutto manualmente! I computer di allora commettevano errori; lei no.",
            "I suoi algoritmi e metodi di calcolo erano rivoluzionari. Sviluppò procedure che divennero standard alla NASA. La sua precisione era leggendaria."
        ]},
    ],
    
    // Personal Curiosities
    curiosities: [
        { keywords: ['curiosità', 'personale', 'musica', 'famiglia', 'hobby', 'pianoforte'], responses: [
            "Alcuni fatti interessanti su Katherine:\n\n🎵 Era una **pianista talentuosa** - amava la musica classica\n👨‍👩‍👧 **Tre mariti** e **tre figlie** - equilibrio perfetto tra famiglia e carriera\n📚 **Lettrice vorace** - manteneva una biblioteca personale impressionante\n🗣️ In vecchiaia era una **oratrice ispirante** che parlava alle università\n💻 Passò dal calcolo manuale ai computer IBM senza problemi\n🏫 Supportò attivamente i programmi STEM per le donne",
            "Katherine aveva molte passioni oltre la matematica! Amava leggere, suonare il pianoforte, e soprattutto aiutare le giovani donne a perseguire carriere scientifiche.",
            "Anche oltre i numeri e le orbite, Katherine era una persona straordinaria. Una madre, una moglie, un'insegnante, un'ispirazione."
        ]},
    ],
    
    // Default responses
    default: [
        "Interessante domanda! 🤔 Puoi chiedermi di:\n\n• La sua vita e biografia\n• Le missioni spaziali (Mercury, Apollo)\n• Le sfide che ha affrontato\n• I suoi riconoscimenti\n• Curiosità personali\n\nCos'altro vorresti sapere?",
        "Quella è una grande domanda! Katherine affrontò tutto con logica e determinazione. Vuoi sapere di più su qualcosa in particolare?",
        "Puoi essere più specifico? 😊 Dimmi se preferisci sapere di:\n✓ La NASA e lo spazio\n✓ La segregazione e le sfide\n✓ I suoi successi\n✓ La sua vita personale"
    ]
};

function getRandomResponse(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function handleAIResponse(userText) {
    const text = userText.toLowerCase();
    let response = null;
    let found = false;

    // Check each category
    for (const [category, items] of Object.entries(aiResponses)) {
        if (category === 'default') continue;
        
        for (const item of items) {
            for (const keyword of item.keywords) {
                if (text.includes(keyword)) {
                    response = getRandomResponse(item.responses);
                    found = true;
                    conversationContext.previousTopic = category;
                    break;
                }
            }
            if (found) break;
        }
        if (found) break;
    }

    // If no specific match found, use default
    if (!response) {
        response = getRandomResponse(aiResponses.default);
    }

    // Add thinking delay
    setTimeout(() => {
        addMessage(response, 'bot');
        conversationContext.messageCount++;
    }, 800);
}

sendBtn.addEventListener('click', () => {
    const text = userInput.value.trim();
    if (text) {
        addMessage(text, 'user');
        userInput.value = '';
        handleAIResponse(text);
    }
});

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendBtn.click();
    }
});

// --- Mobile Menu Setup ---
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '60px';
                navLinks.style.right = '10px';
                navLinks.style.flexDirection = 'column';
                navLinks.style.gap = '15px';
                navLinks.style.background = 'rgba(5, 7, 10, 0.98)';
                navLinks.style.padding = '20px';
                navLinks.style.borderRadius = '10px';
                navLinks.style.border = '1px solid rgba(197, 160, 89, 0.3)';
                navLinks.style.zIndex = '999';
            }
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.style.display = 'none';
            });
        });
    }
}

// --- Smooth Scroll to Sections ---
function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks && navLinks.style.display === 'flex') {
                        navLinks.style.display = 'none';
                    }
                }
            }
        });
    });
}

// Initialize everything on load
window.addEventListener("scroll", reveal);
window.onload = () => {
    createStars();
    reveal();
    setupTimeline();
    setupMobileMenu();
    setupSmoothScroll();
};

// Optional: Auto-reveal on resize
window.addEventListener('resize', reveal);