// Built-in TOEIC-style reading and grammar drills.
// These are original practice materials generated for this app, not TOEIC official content.

const TOTAL_TRAINING_DAYS = 84;

const TOPICS = [
    { company: 'Northline Office Supply', item: 'copy paper', place: 'storage room', role: 'office manager', action: 'place the order', reason: 'next week\'s staff meeting', zh: '辦公室用品' },
    { company: 'Blue Harbor Travel', item: 'flight itinerary', place: 'airport', role: 'travel coordinator', action: 'confirm the taxi pickup', reason: 'a sales conference', zh: '商務出差' },
    { company: 'Silver Desk Design', item: 'replacement request', place: 'front desk', role: 'service representative', action: 'schedule the pickup', reason: 'a wrong model', zh: '客戶退換貨' },
    { company: 'Bright Keyboards', item: 'inventory list', place: 'warehouse', role: 'purchasing manager', action: 'contact the supplier', reason: 'Friday installation work', zh: '庫存管理' },
    { company: 'Metro Training Center', item: 'projector', place: 'conference room', role: 'facilities coordinator', action: 'set up the room', reason: 'staff training', zh: '訓練安排' },
    { company: 'Green Mart', item: 'electronics counter', place: 'second floor', role: 'customer service clerk', action: 'assist shoppers', reason: 'a private event', zh: '商店公告' },
    { company: 'FastRoute Delivery', item: 'delivery schedule', place: 'distribution center', role: 'logistics supervisor', action: 'update customers', reason: 'heavy rain', zh: '配送延誤' },
    { company: 'Oak Finance', item: 'invoice', place: 'finance portal', role: 'accounting assistant', action: 'process the payment', reason: 'manager approval', zh: '發票付款' },
    { company: 'Grand City Hotel', item: 'survey results', place: 'front desk', role: 'hotel manager', action: 'add evening staff', reason: 'slow check-in service', zh: '旅館服務' },
    { company: 'Online Order Pro', item: 'ordering system', place: 'company website', role: 'IT support team', action: 'complete maintenance', reason: 'a security update', zh: '系統維護' },
    { company: 'Vista Sales Group', item: 'presentation slides', place: 'small conference room', role: 'sales manager', action: 'update the calendar invitation', reason: 'a schedule change', zh: '客戶簡報' },
    { company: 'Global Test Center', item: 'admission ticket', place: 'testing room', role: 'test coordinator', action: 'check identification', reason: 'tomorrow s certification test', zh: '考試文件' },
    { company: 'Riverside Cafe', item: 'lunch vouchers', place: 'cafeteria', role: 'HR assistant', action: 'hand out vouchers', reason: 'new employee orientation', zh: '員工餐廳' },
    { company: 'Peak Product Lab', item: 'sample unit', place: 'showroom', role: 'marketing specialist', action: 'prepare the display', reason: 'a product demonstration', zh: '產品展示' },
    { company: 'City Repair Desk', item: 'office copier', place: 'copy room', role: 'maintenance technician', action: 'inspect the machine', reason: 'paper jams', zh: '設備維修' },
    { company: 'Star Hotel Booking', item: 'reservation', place: 'reception desk', role: 'travel agent', action: 'change the check-in time', reason: 'a late arrival', zh: '訂房變更' },
    { company: 'Market Link', item: 'newsletter draft', place: 'shared drive', role: 'marketing director', action: 'review the subject line', reason: 'Monday campaign launch', zh: '行銷信件' },
    { company: 'Clear Budget Services', item: 'expense report', place: 'finance folder', role: 'accounting team', action: 'attach missing receipts', reason: 'quarterly review', zh: '預算報告' },
    { company: 'Talent Bridge', item: 'candidate resume', place: 'interview room', role: 'recruiter', action: 'print the interview schedule', reason: 'a morning interview', zh: '求職面試' },
    { company: 'Expo Guest Services', item: 'visitor badges', place: 'main lobby', role: 'reception team', action: 'prepare name tags', reason: 'guest registration', zh: '會議識別證' },
    { company: 'Parkwell Security', item: 'parking permit', place: 'security office', role: 'building manager', action: 'send the permit number', reason: 'temporary visitor parking', zh: '停車證' },
    { company: 'SecureSoft', item: 'login password', place: 'IT help desk', role: 'system administrator', action: 'reset the password', reason: 'a security update', zh: '軟體更新' },
    { company: 'Harbor Mail Room', item: 'shipping labels', place: 'mail room', role: 'logistics clerk', action: 'print new labels', reason: 'international shipments', zh: '貨運標籤' },
    { company: 'Prime Purchasing', item: 'contract file', place: 'conference room B', role: 'purchasing manager', action: 'bring the latest price list', reason: 'supplier negotiations', zh: '供應商會議' }
];

const PART5_TEMPLATES = [
    {
        skill: 'Verb Form',
        sentence: ({ role, action }) => `The ${role} will ___ before leaving the office.`,
        answer: ({ action }) => action,
        wrong: ['to review the request', 'reviewed the request', 'reviewing the request'],
        explanation: 'After "will", use the base verb form.'
    },
    {
        skill: 'Preposition',
        sentence: ({ place }) => `The updated file is available ___ the ${place}.`,
        answer: () => 'in',
        wrong: ['between', 'during', 'until'],
        explanation: 'Use "in" for a location such as a room, folder, or place.'
    },
    {
        skill: 'Adverb',
        sentence: ({ role }) => `The ${role} responded ___ to the client s request.`,
        answer: () => 'promptly',
        wrong: ['prompt', 'promptness', 'prompts'],
        explanation: 'An adverb is needed to describe the verb "responded".'
    },
    {
        skill: 'Noun',
        sentence: ({ item }) => `Please send a copy of the ___ to the manager by noon.`,
        answer: ({ item }) => item,
        wrong: ['carefully', 'approve', 'recently'],
        explanation: 'A noun phrase is needed after "the".'
    },
    {
        skill: 'Conjunction',
        sentence: ({ reason }) => `The meeting was moved ___ the team needed more time for ${reason}.`,
        answer: () => 'because',
        wrong: ['although', 'unless', 'despite'],
        explanation: '"Because" introduces the reason for the change.'
    },
    {
        skill: 'Passive Voice',
        sentence: ({ item }) => `The ${item} must be ___ before the end of the day.`,
        answer: () => 'reviewed',
        wrong: ['review', 'reviewing', 'reviews'],
        explanation: 'Use the past participle after "must be" for passive voice.'
    }
];

const WRONG_ACTIONS = ['cancel the event', 'paint the office', 'hire a photographer', 'delete all records'];
const WRONG_PLACES = ['parking garage', 'restaurant entrance', 'city museum', 'train station'];
const WRONG_REASONS = ['a holiday concert', 'a sports tournament', 'a museum tour', 'a weather forecast'];

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

function getPart5RuleZh(skill, answer) {
    const rules = {
        'Verb Form': `題目考助動詞後的動詞型態。will 後面要接原形動詞，因此空格要用「${answer}」。`,
        Preposition: `題目考介系詞。空格後面是地點或資料位置，表示「在某處」要用「${answer}」。`,
        Adverb: `題目考副詞。空格修飾動詞 responded，需要用副詞「${answer}」。`,
        Noun: `題目考名詞。the 後面需要名詞或名詞片語，因此要選「${answer}」。`,
        Conjunction: `題目考連接詞。前後句是原因關係，需要用「${answer}」引導原因。`,
        'Passive Voice': `題目考被動語態。must be 後面要接過去分詞，因此要選「${answer}」。`
    };
    return rules[skill] || `題目考 ${skill}。空格需要「${answer}」，因為它最符合句子的文法和語意。`;
}

function getPart5WrongReason(skill) {
    const reasons = {
        'Verb Form': '錯誤選項不是 will 後面需要的原形動詞',
        Preposition: '錯誤選項不能自然表示題目中的地點關係',
        Adverb: '錯誤選項不是可修飾動詞 responded 的副詞',
        Noun: '錯誤選項不能放在 the 後面當名詞片語',
        Conjunction: '錯誤選項無法表達前後句的原因關係',
        'Passive Voice': '錯誤選項不能和 must be 組成正確被動語態'
    };
    return reasons[skill] || '錯誤選項和本題文法或語意不合';
}

function buildPart5(day, topic) {
    const template = PART5_TEMPLATES[(day - 1) % PART5_TEMPLATES.length];
    const answer = template.answer(topic);
    return withChineseExplanation({
        id: 'q1',
        part: 'Part 5',
        skill: template.skill,
        passage: '',
        question: template.sentence(topic),
        options: makeOptions(answer, template.wrong, 'A', day),
        answerKey: 'A',
        explanation: template.explanation
    }, getPart5RuleZh(template.skill, answer), answer, getPart5WrongReason(template.skill));
}

function buildPart6(day, topic) {
    const answerKey = 'B';
    const passage = `To: All Staff\nSubject: ${topic.item}\n\nPlease remember that the ${topic.item} needs attention because of ${topic.reason}. The ${topic.role} will review the details this afternoon and handle the next step. If you have questions, please contact the team in the ${topic.place}. The next step is to ___ after the review.`;
    return withChineseExplanation({
        id: 'q2',
        part: 'Part 6',
        skill: 'Text Completion',
        passage,
        question: 'Which option best completes the text?',
        options: makeOptions(topic.action, WRONG_ACTIONS, answerKey, day),
        answerKey,
        explanation: `The sentence needs an action that logically completes the task: "${topic.action}".`
    }, `題目考段落補句。前文說「${topic.item}」因為 ${topic.reason} 需要處理，且 ${topic.role} 會在 review 後處理下一步，所以空格要填能推進這項任務的動作「${topic.action}」。`, `The next step is to ${topic.action} after the review`, `錯誤選項沒有延續「${topic.item}」這個任務，也不是 review 後合理的下一步`);
}

function buildPart7(day, topic) {
    const answerKey = 'C';
    const passage = `${topic.company} Notice\n\nThe ${topic.role} has asked employees to check the ${topic.item} in the ${topic.place}. This is necessary because of ${topic.reason}. Employees who need help should contact the department before noon. A short update will be sent after the team finishes the review.`;
    return withChineseExplanation({
        id: 'q3',
        part: 'Part 7',
        skill: 'Reading Evidence',
        passage,
        question: 'Why are employees asked to check the item?',
        options: makeOptions(topic.reason, WRONG_REASONS, answerKey, day),
        answerKey,
        explanation: `The notice says the check is necessary because of ${topic.reason}.`
    }, `題目問員工為什麼被要求檢查。原文定位句是「This is necessary because of ${topic.reason}」，所以原因是 ${topic.reason}。`, `because of ${topic.reason}`, '錯誤選項不是公告中列出的原因');
}

function buildLesson(day) {
    const topic = TOPICS[(day - 1) % TOPICS.length];
    const dayLabel = padDay(day);
    const questions = [
        buildPart5(day, topic),
        buildPart6(day, topic),
        buildPart7(day, topic)
    ];
    return {
        id: `reading${dayLabel}`,
        day,
        week: Math.ceil(day / 7),
        level: getLevel(day),
        title: `${topic.zh} Reading Set`,
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
