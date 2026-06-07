// Built-in TOEIC-style reading and grammar drills.
// These are original practice materials generated for this app, not TOEIC official content.

const TOTAL_TRAINING_DAYS = 84;

const CONTEXTS = [
    {
        company: 'Northline Office Supply',
        zh: '辦公室用品',
        subject: 'Copy Paper Order',
        item: 'supply request',
        purpose: 'next week\'s staff meeting',
        role: 'office manager',
        contact: 'the office services team',
        deadline: 'Friday afternoon',
        action: 'place the paper order',
        reviewAction: 'check the supply request',
        reason: 'extra copy paper is needed for next week\'s staff meeting'
    },
    {
        company: 'Blue Harbor Travel',
        zh: '商務出差',
        subject: 'Travel Itinerary',
        item: 'travel itinerary',
        purpose: 'a sales conference',
        role: 'travel coordinator',
        contact: 'the travel desk',
        deadline: 'Wednesday noon',
        action: 'confirm the hotel reservation',
        reviewAction: 'review the updated flight details',
        reason: 'several employees will attend a sales conference'
    },
    {
        company: 'FastRoute Delivery',
        zh: '配送通知',
        subject: 'Delivery Schedule',
        item: 'delivery schedule',
        purpose: 'customer shipments',
        role: 'logistics supervisor',
        contact: 'the distribution center',
        deadline: 'this afternoon',
        action: 'notify customers of the delay',
        reviewAction: 'check the revised delivery times',
        reason: 'heavy rain has delayed several customer shipments'
    },
    {
        company: 'Oak Finance',
        zh: '發票付款',
        subject: 'Invoice Approval',
        item: 'invoice',
        purpose: 'monthly payment processing',
        role: 'accounting assistant',
        contact: 'the finance department',
        deadline: 'the end of the day',
        action: 'process the approved payment',
        reviewAction: 'confirm the invoice amount',
        reason: 'manager approval is required before payment'
    },
    {
        company: 'Metro Training Center',
        zh: '訓練安排',
        subject: 'Training Room',
        item: 'training schedule',
        purpose: 'new employee orientation',
        role: 'facilities coordinator',
        contact: 'the training office',
        deadline: 'Thursday morning',
        action: 'reserve a larger room',
        reviewAction: 'check the attendee list',
        reason: 'more employees registered than expected'
    },
    {
        company: 'City Repair Desk',
        zh: '設備維修',
        subject: 'Copier Repair',
        item: 'repair request',
        purpose: 'office copier service',
        role: 'maintenance technician',
        contact: 'the service desk',
        deadline: 'tomorrow morning',
        action: 'schedule a technician visit',
        reviewAction: 'review the repair request',
        reason: 'the copier has had repeated paper jams'
    },
    {
        company: 'Market Link',
        zh: '行銷信件',
        subject: 'Newsletter Draft',
        item: 'newsletter draft',
        purpose: 'Monday\'s campaign launch',
        role: 'marketing director',
        contact: 'the marketing team',
        deadline: 'Friday morning',
        action: 'approve the subject line',
        reviewAction: 'read the revised newsletter draft',
        reason: 'the campaign will be launched on Monday'
    },
    {
        company: 'Star Hotel Booking',
        zh: '訂房變更',
        subject: 'Group Reservation',
        item: 'reservation request',
        purpose: 'a late guest arrival',
        role: 'front desk manager',
        contact: 'the reservations team',
        deadline: '6 p.m. today',
        action: 'change the check-in time',
        reviewAction: 'confirm the guest list',
        reason: 'several guests will arrive later than planned'
    },
    {
        company: 'SecureSoft',
        zh: '系統維護',
        subject: 'Password Reset',
        item: 'account request',
        purpose: 'a security update',
        role: 'system administrator',
        contact: 'the IT help desk',
        deadline: 'noon today',
        action: 'reset the user password',
        reviewAction: 'verify the employee account',
        reason: 'a security update requires all passwords to be checked'
    },
    {
        company: 'Talent Bridge',
        zh: '面試安排',
        subject: 'Interview Schedule',
        item: 'interview schedule',
        purpose: 'a morning interview',
        role: 'recruiter',
        contact: 'the hiring team',
        deadline: '4 p.m. today',
        action: 'print the final schedule',
        reviewAction: 'review the candidate information',
        reason: 'a candidate will visit the office tomorrow morning'
    },
    {
        company: 'Prime Purchasing',
        zh: '採購會議',
        subject: 'Supplier Meeting',
        item: 'price list',
        purpose: 'supplier negotiations',
        role: 'purchasing manager',
        contact: 'the purchasing office',
        deadline: 'the meeting starts',
        action: 'bring the latest price list',
        reviewAction: 'compare the updated prices',
        reason: 'the team will discuss supplier pricing'
    },
    {
        company: 'Harbor Mail Room',
        zh: '貨運標籤',
        subject: 'Shipping Labels',
        item: 'shipping labels',
        purpose: 'international shipments',
        role: 'logistics clerk',
        contact: 'the mail room',
        deadline: 'tomorrow afternoon',
        action: 'print new shipping labels',
        reviewAction: 'check the destination addresses',
        reason: 'several international packages are ready to send'
    }
];

const PART5_ITEMS = [
    {
        skill: 'Verb Form',
        sentence: 'Ms. Chen will ___ the client after lunch.',
        answerKey: 'B',
        options: ['contacted', 'contact', 'contacting', 'to contact'],
        clue: 'will contact',
        explanation: 'After "will", use the base verb form.',
        zh: '題目考助動詞後的動詞型態。will 後面要接原形動詞，所以答案是 contact。'
    },
    {
        skill: 'Preposition',
        sentence: 'The updated file is available ___ the shared drive.',
        answerKey: 'A',
        options: ['on', 'between', 'during', 'until'],
        clue: 'on the shared drive',
        explanation: 'Use "on" for an online shared drive.',
        zh: '題目考介系詞。shared drive 是線上儲存位置，英文通常說 on the shared drive。'
    },
    {
        skill: 'Word Form',
        sentence: 'The manager gave a ___ explanation of the new policy.',
        answerKey: 'C',
        options: ['clearly', 'clearance', 'clear', 'cleared'],
        clue: 'a clear explanation',
        explanation: 'An adjective is needed before the noun "explanation".',
        zh: '題目考詞性。名詞 explanation 前面需要形容詞，所以要選 clear。'
    },
    {
        skill: 'Adverb',
        sentence: 'The service team responded ___ to the customer\'s request.',
        answerKey: 'D',
        options: ['prompt', 'promptness', 'prompts', 'promptly'],
        clue: 'responded promptly',
        explanation: 'An adverb is needed to describe the verb "responded".',
        zh: '題目考副詞。空格修飾動詞 responded，所以要用 promptly。'
    },
    {
        skill: 'Noun',
        sentence: 'Please send a copy of the ___ to the finance department.',
        answerKey: 'B',
        options: ['carefully', 'invoice', 'approve', 'recently'],
        clue: 'the invoice',
        explanation: 'A noun is needed after "the".',
        zh: '題目考名詞。the 後面需要名詞，因此 invoice 最合理。'
    },
    {
        skill: 'Conjunction',
        sentence: 'The meeting was moved ___ several team members were unavailable.',
        answerKey: 'A',
        options: ['because', 'although', 'unless', 'despite'],
        clue: 'because several team members were unavailable',
        explanation: '"Because" introduces the reason for the change.',
        zh: '題目考連接詞。後半句是在說原因，所以要用 because。'
    },
    {
        skill: 'Passive Voice',
        sentence: 'The report must be ___ before the end of the day.',
        answerKey: 'C',
        options: ['review', 'reviewing', 'reviewed', 'reviews'],
        clue: 'must be reviewed',
        explanation: 'Use a past participle after "must be" for passive voice.',
        zh: '題目考被動語態。must be 後面要接過去分詞，所以選 reviewed。'
    },
    {
        skill: 'Comparative',
        sentence: 'The shipment arrived ___ than expected.',
        answerKey: 'D',
        options: ['early', 'earliest', 'earliness', 'earlier'],
        clue: 'earlier than expected',
        explanation: 'Use the comparative form before "than".',
        zh: '題目考比較級。看到 than，前面要用比較級 earlier。'
    },
    {
        skill: 'Determiner',
        sentence: '___ employees must wear identification badges in the building.',
        answerKey: 'A',
        options: ['All', 'Every', 'Each', 'Another'],
        clue: 'All employees',
        explanation: 'Use "All" before a plural noun.',
        zh: '題目考限定詞。employees 是複數名詞，最自然是 All employees。'
    },
    {
        skill: 'Infinitive',
        sentence: 'The company plans ___ a new training program next month.',
        answerKey: 'B',
        options: ['launching', 'to launch', 'launched', 'launches'],
        clue: 'plans to launch',
        explanation: 'The verb "plan" is followed by an infinitive.',
        zh: '題目考動詞搭配。plan 後面常接 to V，所以答案是 to launch。'
    },
    {
        skill: 'Pronoun',
        sentence: 'Employees should submit ___ expense reports by Friday.',
        answerKey: 'C',
        options: ['they', 'them', 'their', 'theirs'],
        clue: 'their expense reports',
        explanation: 'A possessive adjective is needed before the noun phrase.',
        zh: '題目考代名詞。expense reports 前面需要所有格形容詞 their。'
    },
    {
        skill: 'Relative Clause',
        sentence: 'The technician ___ repaired the copier will return tomorrow.',
        answerKey: 'A',
        options: ['who', 'where', 'when', 'which'],
        clue: 'technician who repaired',
        explanation: 'Use "who" for a person in a relative clause.',
        zh: '題目考關係代名詞。technician 是人，所以用 who。'
    }
];

const PART6_WRONG_ACTIONS = [
    'paint the office walls',
    'hire a photographer',
    'delete old computer files',
    'cancel the holiday party',
    'move the company headquarters',
    'order lunch for visitors'
];

const PART7_WRONG_REASONS = [
    'a museum tour is scheduled',
    'a sports tournament was canceled',
    'a restaurant menu changed',
    'a holiday concert will begin',
    'a parking area was repainted',
    'a weather report was requested'
];

function padDay(day) {
    return String(day).padStart(2, '0');
}

function pick(pool, index) {
    return pool[index % pool.length];
}

function getLevel(day) {
    if (day <= 14) return '300-360';
    if (day <= 28) return '360-430';
    if (day <= 42) return '430-500';
    if (day <= 60) return '500-560';
    return '560-600';
}

function toOptions(texts) {
    return ['A', 'B', 'C', 'D'].map((key, index) => ({ key, text: texts[index] }));
}

function makeOptions(answer, wrongOptions, answerKey, offset = 0) {
    const keys = ['A', 'B', 'C', 'D'];
    const wrong = wrongOptions.filter((item) => item !== answer);
    const mapped = {};
    let wrongIndex = offset;
    keys.forEach((key) => {
        if (key === answerKey) {
            mapped[key] = answer;
            return;
        }
        mapped[key] = pick(wrong, wrongIndex);
        wrongIndex += 1;
    });
    return keys.map((key) => ({ key, text: mapped[key] }));
}

function makeWrongExplanations(question, clue, wrongReason = '原文或文法線索沒有支持這個選項') {
    const correctOption = question.options.find((option) => option.key === question.answerKey);
    return question.options
        .filter((option) => option.key !== question.answerKey)
        .reduce((items, option) => {
            items[option.key] = `選項 ${option.key}「${option.text}」不符合題目線索；${wrongReason}。正確線索是「${clue}」，所以應選 ${question.answerKey}「${correctOption?.text || clue}」。`;
            return items;
        }, {});
}

function withChineseExplanation(question, zhExplanation, clue, wrongReason) {
    return {
        ...question,
        zhExplanation,
        wrongExplanations: makeWrongExplanations(question, clue, wrongReason)
    };
}

function buildPart5(day) {
    const item = PART5_ITEMS[(day - 1) % PART5_ITEMS.length];
    return withChineseExplanation({
        id: 'q1',
        part: 'Part 5',
        skill: item.skill,
        passage: '',
        question: item.sentence,
        options: toOptions(item.options),
        answerKey: item.answerKey,
        explanation: item.explanation
    }, item.zh, item.clue, '錯誤選項不是這個句子需要的文法形式或詞性');
}

function buildPart6(day, context) {
    const answerKey = 'B';
    const passage = `To: Department Staff\nSubject: ${context.subject}\n\nThe ${context.item} for ${context.purpose} has been reviewed by the ${context.role}. One final action is needed before ${context.deadline}. Please contact ${context.contact} if you have any questions. The team should ___ after the review.`;
    return withChineseExplanation({
        id: 'q2',
        part: 'Part 6',
        skill: 'Text Completion',
        passage,
        question: 'Which option best completes the text?',
        options: makeOptions(context.action, PART6_WRONG_ACTIONS, answerKey, day),
        answerKey,
        explanation: `The sentence needs the next action related to the ${context.item}: "${context.action}".`
    }, `題目考段落補句。前文說 ${context.item} 已經由 ${context.role} review，而且還需要最後一步，因此空格要接和主題直接相關的下一步「${context.action}」。`, `The team should ${context.action} after the review`, `錯誤選項和「${context.item}」或「${context.purpose}」沒有直接關係`);
}

function buildPart7(day, context) {
    const answerKey = 'C';
    const passage = `${context.company} Notice\n\nThe ${context.role} has posted an update about the ${context.item}. Staff members should ${context.reviewAction} by ${context.deadline}. This update is important because ${context.reason}. Anyone with questions should contact ${context.contact}.`;
    return withChineseExplanation({
        id: 'q3',
        part: 'Part 7',
        skill: 'Reading Evidence',
        passage,
        question: 'Why is the update important?',
        options: makeOptions(context.reason, PART7_WRONG_REASONS, answerKey, day),
        answerKey,
        explanation: `The notice says the update is important because ${context.reason}.`
    }, `題目問這則更新為什麼重要。原文定位句是「This update is important because ${context.reason}」，所以答案就是 ${context.reason}。`, `because ${context.reason}`, '錯誤選項不是公告中列出的原因');
}

function buildLesson(day) {
    const context = CONTEXTS[(day - 1) % CONTEXTS.length];
    const dayLabel = padDay(day);
    const questions = [
        buildPart5(day),
        buildPart6(day, context),
        buildPart7(day, context)
    ];
    return {
        id: `reading${dayLabel}`,
        day,
        week: Math.ceil(day / 7),
        level: getLevel(day),
        title: `${context.zh} Reading Set`,
        focus: `${questions[0].skill} / ${questions[1].part} / ${questions[2].part}`,
        questions
    };
}

export const READING_LESSONS = Array.from({ length: TOTAL_TRAINING_DAYS }, (_, index) => buildLesson(index + 1));

export function getReadingLessonForDay(dayIndex) {
    const day = Number(dayIndex);
    if (!Number.isFinite(day)) return READING_LESSONS[0];
    const index = Math.max(0, Math.min(READING_LESSONS.length - 1, Math.floor(day) - 1));
    return READING_LESSONS[index];
}
