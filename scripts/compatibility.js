const questionnaireData = [
    {
        category: "Family and Living Arrangements",
        icon: "🏡",
        questions: [
            {
                question: "After marriage, what living arrangement appeals most to you?",
                options: [
                    "Living with my husband's parents as part of an extended family household where multiple generations share daily life",
                    "Living near my husband's parents with frequent interaction but maintaining a separate household",
                    "Living independently as a couple with periodic visits to both sets of parents",
                    "Living independently with the understanding that parents may join us temporarily during specific circumstances"
                ]
            },
            {
                question: "How would you describe your ideal relationship with your in-laws after marriage?",
                options: [
                    "Close daily involvement where they are central figures in our household and family decisions",
                    "Warm and respectful with regular contact but clear boundaries around our married life",
                    "Cordial and respectful with scheduled visits and involvement during major occasions",
                    "Respectful but primarily focused on building our own nuclear family unit"
                ]
            }
        ]
    },
    {
        category: "Cultural Practices and Traditions",
        icon: "🎎",
        questions: [
            {
                question: "Regarding traditional cultural practices and festivals specific to my community, which statement best reflects your perspective?",
                options: [
                    "I find deep meaning in these practices and look forward to participating fully as expressions of heritage and identity",
                    "I respect these traditions and will participate willingly as part of joining my husband's family",
                    "I am open to learning about these practices and will participate in those that resonate with me personally",
                    "I prefer to selectively participate based on my personal comfort level and understanding of each practice"
                ]
            },
            {
                question: "How do you view the balance between maintaining traditional customs and adapting to modern lifestyles?",
                options: [
                    "Traditional customs form the foundation of identity and should be preserved and practiced with pride",
                    "Important traditions should be maintained while adapting less central practices to modern contexts",
                    "Modern lifestyles should take priority with selective incorporation of meaningful traditions",
                    "Individual choice and personal comfort should determine which traditions one follows"
                ]
            }
        ]
    },
    {
        category: "Lifestyle and Personal Habits",
        icon: "🌿",
        questions: [
            {
                question: "Which statement best describes your dietary preferences and lifestyle choices?",
                options: [
                    "I maintain a strictly vegetarian diet and abstain from alcohol and smoking based on personal conviction",
                    "I am vegetarian and avoid alcohol and smoking, though my choices are influenced by family or health considerations",
                    "I am flexible in my dietary choices and moderate in consumption of alcohol on social occasions",
                    "I believe personal choice around diet and lifestyle should not be constrained by traditional expectations"
                ]
            },
            {
                question: "How do you typically prefer to spend your free time and social energy?",
                options: [
                    "I am most fulfilled by solitary pursuits or quiet time with close family, rarely seeking large social gatherings",
                    "I enjoy balance between alone time for personal interests and occasional social activities with friends",
                    "I thrive on regular social interaction and feel energized by gatherings, parties, and group activities",
                    "I need frequent social stimulation and prefer being around people to spending time alone"
                ]
            }
        ]
    },
    {
        category: "Financial Philosophy and Material Values",
        icon: "💰",
        questions: [
            {
                question: "Which approach to financial decisions and material possessions most closely aligns with your values?",
                options: [
                    "I prioritize long-term financial security and thoughtful spending, choosing quality and value over brands and social display",
                    "I believe in balanced spending that includes saving for the future while occasionally enjoying material comforts",
                    "I think maintaining certain lifestyle standards and owning quality branded items reflects appropriate success",
                    "I believe life should be enjoyed through experiences and possessions that bring immediate satisfaction and social recognition"
                ]
            },
            {
                question: "How important is it to you that material possessions and lifestyle choices align with what peers and social circles consider appropriate or desirable?",
                options: [
                    "External opinions hold no influence over my choices, which are guided entirely by personal values and practical considerations",
                    "I make independent decisions but remain aware of social contexts and general standards",
                    "I consider what others in my social circle have and do as one factor among many in my decisions",
                    "Maintaining lifestyle parity with my social circle is important for my sense of belonging and satisfaction"
                ]
            }
        ]
    },
    {
        category: "Conflict Resolution and Communication",
        icon: "🕊️",
        questions: [
            {
                question: "When disagreements arise with family members or your partner, what approach do you naturally tend toward?",
                options: [
                    "I prioritize understanding all perspectives and finding solutions that preserve harmony, even when this requires significant personal flexibility",
                    "I seek compromise through open communication while also ensuring my concerns are heard and addressed",
                    "I believe in direct communication where both parties clearly state their positions and negotiate toward resolution",
                    "I think it is important to stand firm on matters of principle and ensure my perspective is validated and respected"
                ]
            },
            {
                question: "How do you balance individual autonomy with family considerations in making personal decisions?",
                options: [
                    "I naturally consider how my choices affect family members and prioritize collective harmony over individual preferences",
                    "I value input from family but ultimately make decisions based on what seems best for everyone involved",
                    "I believe in making independent decisions while keeping family informed and considering their perspectives",
                    "I maintain that personal decisions should be made autonomously with family input being advisory rather than determinative"
                ]
            }
        ]
    },
    {
        category: "Intellectual Engagement and Personal Growth",
        icon: "📚",
        questions: [
            {
                question: "Which statement best describes how you engage with ideas and pursue personal growth?",
                options: [
                    "I have deep interests in specific areas that I pursue seriously, dedicating substantial time to learning and creative expression",
                    "I enjoy learning about various topics and have hobbies that engage me intellectually when time permits",
                    "I appreciate interesting conversations and entertainment that broadens my perspective without requiring deep commitment",
                    "I prefer practical focus on immediate responsibilities and find relaxation in entertainment rather than intellectual pursuits"
                ]
            },
            {
                question: "What role do you see a partner's individual interests and pursuits playing in married life?",
                options: [
                    "Each partner should have meaningful personal pursuits that require dedicated time and space, which enriches rather than detracts from the relationship",
                    "Personal interests are important but should be balanced with sufficient shared time and activities as a couple",
                    "Couples should primarily focus on shared activities and interests to build connection and intimacy",
                    "After marriage, individual pursuits should be limited to ensure the relationship remains the central priority"
                ]
            }
        ]
    },
    {
        category: "Relationship Dynamics and Intimacy",
        icon: "💞",
        questions: [
            {
                question: "What does partnership mean to you in the context of marriage?",
                options: [
                    "Marriage is fundamentally about friendship, shared values, and building a life together based on mutual respect and compatible worldviews",
                    "Marriage combines romantic love with practical partnership in navigating life's challenges and opportunities together",
                    "Marriage is primarily about romantic and emotional fulfillment supported by compatible life goals",
                    "Marriage centers on passion and chemistry that create the foundation for handling practical matters together"
                ]
            }
        ]
    },
    {
        category: "Personal History and Experience",
        icon: "🕰️",
        questions: [
            {
                question: "Which statement most accurately describes your previous relationship experience?",
                options: [
                    "I have not been in romantic relationships and have focused on personal development and education",
                    "I have had limited dating experience consisting of one or two brief relationships in the past",
                    "I have had several dating relationships that helped me understand what I seek in a partner",
                    "I have substantial relationship experience including long-term partnerships that shaped my expectations about marriage"
                ]
            },
            {
                question: "How much time and energy do you envision dedicating to social activities and friendships outside your immediate family after marriage?",
                options: [
                    "I prefer minimal social commitments outside family, valuing depth with a few close connections over broad social engagement",
                    "I enjoy maintaining a small circle of close friends with occasional social activities",
                    "I value having an active social life with regular gatherings and maintaining diverse friendships",
                    "Extensive social connections and frequent social activities are essential to my sense of wellbeing and identity"
                ]
            }
        ]
    },
    {
        category: "Values and Life Philosophy",
        icon: "🌸",
        questions: [
            {
                question: "Which statement best captures your fundamental approach to measuring a life well-lived?",
                options: [
                    "A meaningful life centers on kindness, integrity, strong family bonds, and positive impact on those around you through daily actions",
                    "A balanced life includes both personal values like kindness and practical achievements in career and personal goals",
                    "Success in career, financial stability, and recognition in your field indicate a life of accomplishment and satisfaction",
                    "Enjoyment, experiences, personal freedom, and achieving your individual potential define a fulfilling life"
                ]
            },
            {
                question: "How do you view the role of parents and elders in your adult life and decision-making?",
                options: [
                    "Parents and elders are sources of wisdom whose guidance and presence I actively seek and deeply value throughout life",
                    "I respect my parents and consider their input important while ultimately making independent adult decisions",
                    "I appreciate my parents but believe adult children should make decisions autonomously without parental involvement",
                    "While I care for my parents, I believe healthy adult relationships require significant independence and boundary-setting"
                ]
            }
        ]
    }
];

const flatQuestions = questionnaireData.flatMap(section =>
    section.questions.map(question => ({
        ...question,
        categoryIcon: section.icon,
        categoryName: section.category
    }))
);

const formEl = document.getElementById('compatibilityForm');
const progressBar = document.getElementById('progressBar');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resultContainer = document.getElementById('resultContainer');
const resultSummaryEl = resultContainer.querySelector('.result-summary');
const resultPillarsEl = resultContainer.querySelector('.result-pillars');
const contactBtn = document.getElementById('contactBtn');
const contactSection = document.getElementById('contactSection');

let currentIndex = 0;
const answers = new Array(flatQuestions.length).fill(null);

function renderQuestion(index) {
    const question = flatQuestions[index];

    formEl.innerHTML = `
    <div class="question visible">
      <h3><span class="category-icon">${question.categoryIcon || '❓'}</span>${question.question}</h3>
      <div class="options">
        ${question.options.map((option, idx) => {
        const optionLetter = String.fromCharCode(65 + idx);
        const isSelected = answers[index] === idx;
        return `
            <label class="option ${isSelected ? 'selected' : ''}" data-letter="${optionLetter}" data-option-idx="${idx}">
              <input type="radio" name="question-${index}" value="${idx}" ${isSelected ? 'checked' : ''} />
              <span class="option-label">${option}</span>
            </label>
          `;
    }).join('')}
      </div>
    </div>
  `;

    // Add click event listeners to options
    const optionElements = formEl.querySelectorAll('.option');
    optionElements.forEach(optionEl => {
        optionEl.addEventListener('click', (e) => {
            const optionIdx = parseInt(optionEl.dataset.optionIdx);
            selectOption(optionIdx);
        });
    });

    updateProgress(index);
    updateNavButtons();
    // ... rest of the function
}
function selectOption(optionIdx) {
    answers[currentIndex] = optionIdx;
    renderQuestion(currentIndex);
}

function updateProgress(index) {
  const percentage = ((index + 1) / flatQuestions.length) * 100;
  progressBar.style.width = `${percentage}%`;
}

function updateNavButtons() {
  prevBtn.disabled = currentIndex === 0;
  const isLastQuestion = currentIndex === flatQuestions.length - 1;
  nextBtn.innerHTML = isLastQuestion
    ? '<span class="btn-label">Submit <i class="fa-solid fa-check"></i></span>'
    : '<span class="btn-label">Next <i class="fa-solid fa-arrow-right-long"></i></span>';
  nextBtn.disabled = answers[currentIndex] === null;
}

function showResults() {
  const score = answers.reduce((sum, value) => sum + value, 0);
  const average = score / answers.length;

  let title = 'Balanced Compatibility';
  let description = `Your responses show a blend of traditional and modern preferences. A thoughtful conversation can reveal how these perspectives complement each other.`;

  if (average <= 0.75) {
    title = 'Traditional Alignment';
    description = 'You strongly resonate with family-centric values, shared traditions, and holistic harmony in relationships—great alignment with similar outlooks!';
  } else if (average >= 2.5) {
    title = 'Modern Synergy';
    description = 'You value individuality, contemporary lifestyles, and evolving traditions—paired with someone who shares these priorities, you’ll thrive!';
  } else if (average >= 1.5 && average < 2.5) {
    title = 'Contemporary Balance';
    description = 'You appreciate structure yet embrace flexibility, balancing heritage with personal expression. This adaptability often leads to enriching partnerships.';
  }

  resultContainer.classList.add('active');
  resultSummaryEl.textContent = `${title} — ${description}`;

  const categorySummaries = questionnaireData.map((section, idx) => {
    const sectionStart = questionnaireData
      .slice(0, idx)
      .reduce((count, sect) => count + sect.questions.length, 0);
    const sectionAnswers = answers.slice(sectionStart, sectionStart + section.questions.length);
    const avg = sectionAnswers.reduce((sum, value) => sum + value, 0) / sectionAnswers.length;

    let emphasis = 'Balanced Outlook';
    if (avg <= 0.75) emphasis = 'Traditions & Togetherness';
    else if (avg >= 2.5) emphasis = 'Independent & Modern';
    else if (avg >= 1.5) emphasis = 'Blended Perspective';

    return {
      icon: section.icon,
      category: section.category,
      emphasis
    };
  });

  resultPillarsEl.innerHTML = categorySummaries.map(pillar => `
    <article class="pillar-card">
      <h3 class="pillar-title">${pillar.icon} ${pillar.category}</h3>
      <p>${pillar.emphasis}</p>
    </article>
  `).join('');

  resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function handleNext() {
  const isLastQuestion = currentIndex === flatQuestions.length - 1;
  if (isLastQuestion) {
    showResults();
    document.querySelector('.navigation').style.display = 'none';
  } else {
    currentIndex += 1;
    renderQuestion(currentIndex);
  }
}

function handlePrev() {
  if (currentIndex > 0) {
    currentIndex -= 1;
    renderQuestion(currentIndex);
  }
}

prevBtn.addEventListener('click', handlePrev);
nextBtn.addEventListener('click', handleNext);

contactBtn.addEventListener('click', () => {
  contactSection.classList.add('active');
  contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

renderQuestion(currentIndex);
