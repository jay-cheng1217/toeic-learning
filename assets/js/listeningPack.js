// Built-in TOEIC-style listening drills.
// These are original practice materials generated for this app, not TOEIC official content.

const TOTAL_TRAINING_DAYS = 84;
const PART_SEQUENCE = ['Part 2', 'Part 1', 'Part 2', 'Part 3', 'Part 2', 'Part 4', 'Part 3'];

const TOPICS = [
    { title: 'Office Supplies', focus: 'copy paper', location: 'storage room', person: 'office manager', reason: 'the afternoon meeting', action: 'order more supplies', zh: '辦公室用品', keywords: ['copy paper', 'storage room', 'supplier'] },
    { title: 'Travel Schedule', focus: 'flight itinerary', location: 'airport', person: 'travel coordinator', reason: 'the sales conference', action: 'confirm the taxi pickup', zh: '商務出差時程', keywords: ['flight', 'taxi', 'airport'] },
    { title: 'Customer Return', focus: 'wrong model', location: 'front desk', person: 'service representative', reason: 'a replacement request', action: 'schedule a pickup', zh: '客戶退換貨', keywords: ['wrong model', 'replacement', 'pickup'] },
    { title: 'Inventory Check', focus: 'new keyboards', location: 'warehouse', person: 'design team', reason: 'Friday setup work', action: 'contact the supplier', zh: '庫存確認', keywords: ['inventory', 'warehouse', 'supplier'] },
    { title: 'Training Room', focus: 'projector setup', location: 'large conference room', person: 'facilities coordinator', reason: 'staff training', action: 'prepare twenty chairs', zh: '訓練教室安排', keywords: ['projector', 'conference room', 'facilities'] },
    { title: 'Store Notice', focus: 'electronics counter', location: 'second floor', person: 'customer service counter', reason: 'a private company event', action: 'assist shoppers downstairs', zh: '商店公告', keywords: ['electronics', 'second floor', 'customer service'] },
    { title: 'Delivery Delay', focus: 'customer packages', location: 'distribution center', person: 'tracking team', reason: 'heavy rain', action: 'update the delivery time', zh: '配送延誤', keywords: ['delivery', 'rain', 'tracking'] },
    { title: 'Invoice Approval', focus: 'unpaid invoice', location: 'finance portal', person: 'finance manager', reason: 'manager approval', action: 'process the payment', zh: '發票付款', keywords: ['invoice', 'approval', 'payment'] },
    { title: 'Hotel Survey', focus: 'check-in service', location: 'front desk', person: 'hotel manager', reason: 'customer survey results', action: 'add evening staff', zh: '旅館問卷回饋', keywords: ['survey', 'check-in', 'front desk'] },
    { title: 'System Maintenance', focus: 'online ordering system', location: 'company website', person: 'support desk', reason: 'scheduled maintenance', action: 'take urgent orders by phone', zh: '系統維護', keywords: ['system', 'maintenance', 'urgent orders'] },
    { title: 'Client Presentation', focus: 'revised slides', location: 'small conference room', person: 'sales manager', reason: 'a schedule change', action: 'update the calendar invitation', zh: '客戶簡報', keywords: ['presentation', 'slides', 'calendar'] },
    { title: 'Test Day Documents', focus: 'admission ticket', location: 'testing room', person: 'test coordinator', reason: 'tomorrow s certification test', action: 'check photo identification', zh: '考試文件', keywords: ['ticket', 'identification', 'testing room'] },
    { title: 'Cafeteria Schedule', focus: 'lunch vouchers', location: 'cafeteria', person: 'HR assistant', reason: 'new employee orientation', action: 'hand out vouchers', zh: '員工餐廳安排', keywords: ['cafeteria', 'voucher', 'orientation'] },
    { title: 'Product Demo', focus: 'sample unit', location: 'showroom', person: 'marketing team', reason: 'a product demonstration', action: 'set up the display table', zh: '產品展示', keywords: ['sample', 'showroom', 'display'] },
    { title: 'Repair Request', focus: 'office copier', location: 'copy room', person: 'maintenance desk', reason: 'paper jams', action: 'send a technician', zh: '設備維修', keywords: ['copier', 'repair', 'technician'] },
    { title: 'Reservation Change', focus: 'hotel booking', location: 'reception desk', person: 'travel agent', reason: 'a late arrival', action: 'change the check-in time', zh: '訂房變更', keywords: ['reservation', 'check-in', 'travel agent'] },
    { title: 'Marketing Email', focus: 'newsletter draft', location: 'shared drive', person: 'marketing director', reason: 'Monday campaign launch', action: 'review the subject line', zh: '行銷電子報', keywords: ['newsletter', 'draft', 'campaign'] },
    { title: 'Budget Report', focus: 'expense report', location: 'finance folder', person: 'accounting team', reason: 'quarterly review', action: 'attach missing receipts', zh: '預算報告', keywords: ['expense', 'receipt', 'quarterly'] },
    { title: 'Job Interview', focus: 'candidate resume', location: 'interview room', person: 'recruiter', reason: 'a morning interview', action: 'print the interview schedule', zh: '求職面試', keywords: ['resume', 'interview', 'recruiter'] },
    { title: 'Conference Badge', focus: 'visitor badges', location: 'main lobby', person: 'reception team', reason: 'guest registration', action: 'prepare name tags', zh: '會議識別證', keywords: ['badge', 'lobby', 'registration'] },
    { title: 'Parking Permit', focus: 'parking permit', location: 'security office', person: 'building manager', reason: 'temporary visitor parking', action: 'send the permit number', zh: '停車證', keywords: ['parking', 'permit', 'security'] },
    { title: 'Software Update', focus: 'login password', location: 'IT help desk', person: 'system administrator', reason: 'a security update', action: 'reset the password', zh: '軟體更新', keywords: ['login', 'password', 'security'] },
    { title: 'Shipping Label', focus: 'shipping labels', location: 'mail room', person: 'logistics clerk', reason: 'international shipments', action: 'print new labels', zh: '貨運標籤', keywords: ['shipping', 'label', 'mail room'] },
    { title: 'Supplier Meeting', focus: 'contract file', location: 'conference room B', person: 'purchasing manager', reason: 'supplier negotiations', action: 'bring the latest price list', zh: '供應商會議', keywords: ['contract', 'supplier', 'price list'] },
    { title: 'Customer Survey', focus: 'feedback forms', location: 'front desk', person: 'operations team', reason: 'service improvement', action: 'collect completed forms', zh: '顧客問卷', keywords: ['feedback', 'forms', 'operations'] },
    { title: 'Safety Training', focus: 'safety handbook', location: 'training room', person: 'safety officer', reason: 'annual safety training', action: 'review emergency exits', zh: '安全訓練', keywords: ['safety', 'handbook', 'emergency'] },
    { title: 'Cafe Order', focus: 'coffee order', location: 'break room', person: 'office assistant', reason: 'a client visit', action: 'confirm drink preferences', zh: '咖啡訂單', keywords: ['coffee', 'client visit', 'break room'] },
    { title: 'Sales Forecast', focus: 'sales spreadsheet', location: 'shared folder', person: 'sales director', reason: 'the monthly forecast meeting', action: 'update the revenue numbers', zh: '銷售預測', keywords: ['forecast', 'spreadsheet', 'revenue'] }
];

const TIME_OPTIONS = [
    'by nine this morning',
    'before noon',
    'by three this afternoon',
    'tomorrow morning',
    'before Friday',
    'early next week'
];

const WRONG_TOPICS = ['printer ink', 'meeting folders', 'company uniforms', 'phone chargers', 'training videos', 'parking receipts'];
const WRONG_PLACES = ['parking garage', 'cafeteria entrance', 'main elevator', 'customer lounge', 'sales office', 'delivery truck'];
const WRONG_TIMES = ['next month', 'late tonight', 'after the holiday', 'at midnight', 'next summer', 'during lunch'];
const WRONG_ACTIONS = ['cancel the event', 'close the office', 'delete the report', 'change the company name', 'hire a photographer', 'move the building'];

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

function makeOptions(answer, wrongPool, answerKey = 'A', offset = 0) {
    const keys = ['A', 'B', 'C', 'D'];
    const wrong = wrongPool.filter((item) => item !== answer);
    const result = {};
    let wrongIndex = offset;
    keys.forEach((key) => {
        if (key === answerKey) {
            result[key] = answer;
            return;
        }
        result[key] = pick(wrong, wrongIndex);
        wrongIndex += 1;
    });
    return keys.map((key) => ({ key, text: result[key] }));
}

function makeWrongExplanations(question, clue, wrongReason = '音檔沒有提供這個線索') {
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

function buildPart1(day, topic, time) {
    const audioText = `In the picture, one employee is checking the ${topic.focus} in the ${topic.location}. Another employee is preparing notes for the ${topic.person}. Some documents are placed on a table near the entrance.`;
    return {
        audioText,
        transcript: `Narrator: ${audioText}`,
        translation: `中文重點：圖片描述訓練。有人在 ${topic.location} 檢查 ${topic.focus}，另一位員工正在為 ${topic.person} 準備資料。`,
        questions: [
            withChineseExplanation({
                id: 'q1',
                question: 'What is one employee checking?',
                options: makeOptions(topic.focus, WRONG_TOPICS, 'A', day),
                answerKey: 'A',
                explanation: `The employee is checking the ${topic.focus}.`
            }, `題目問其中一位員工正在檢查什麼。音檔第一句說「checking the ${topic.focus}」，所以答案是 ${topic.focus}。`, `checking the ${topic.focus}`),
            withChineseExplanation({
                id: 'q2',
                question: 'Where is the person working?',
                options: makeOptions(topic.location, WRONG_PLACES, 'B', day),
                answerKey: 'B',
                explanation: `The person is working in the ${topic.location}.`
            }, `題目問人物所在位置。音檔說員工在 ${topic.location} 檢查物品，因此地點是 ${topic.location}。`, `in the ${topic.location}`),
            withChineseExplanation({
                id: 'q3',
                question: 'What is on the table?',
                options: makeOptions('Some documents', ['A laptop bag', 'Several coffee cups', 'A flower vase', 'A visitor badge'], 'C', day),
                answerKey: 'C',
                explanation: 'Some documents are placed on a table near the entrance.'
            }, '題目問桌上有什麼。音檔最後說一些文件放在入口附近的桌上，所以答案是 Some documents。', 'Some documents are placed on a table')
        ]
    };
}

function buildPart2(day, topic, time) {
    const audioText = `Could you check the ${topic.focus} ${time}? I need it for ${topic.reason}. Yes. It is in the ${topic.location}, and I will notify the ${topic.person} right away.`;
    return {
        audioText,
        transcript: `A: Could you check the ${topic.focus} ${time}? I need it for ${topic.reason}.\nB: Yes. It is in the ${topic.location}, and I will notify the ${topic.person} right away.`,
        translation: `中文重點：詢問 ${topic.zh}。重點是 ${topic.focus}、${topic.location}，以及通知 ${topic.person}。`,
        questions: [
            withChineseExplanation({
                id: 'q1',
                question: 'What does the first speaker ask about?',
                options: makeOptions(topic.focus, WRONG_TOPICS, 'A', day),
                answerKey: 'A',
                explanation: `The first speaker asks about the ${topic.focus}.`
            }, `題目問第一位說話者在詢問什麼。開頭直接說「Could you check the ${topic.focus}」，所以答案是 ${topic.focus}。`, `Could you check the ${topic.focus}`),
            withChineseExplanation({
                id: 'q2',
                question: 'Where is it located?',
                options: makeOptions(topic.location, WRONG_PLACES, 'B', day),
                answerKey: 'B',
                explanation: `It is in the ${topic.location}.`
            }, `題目問物品或資料在哪裡。第二位說話者回答「It is in the ${topic.location}」，所以答案是 ${topic.location}。`, `It is in the ${topic.location}`),
            withChineseExplanation({
                id: 'q3',
                question: 'Who will be notified?',
                options: makeOptions(topic.person, ['security guard', 'delivery driver', 'restaurant owner', 'bank teller', 'tour guide', 'hotel guest'], 'C', day),
                answerKey: 'C',
                explanation: `The second speaker will notify the ${topic.person}.`
            }, `題目問誰會被通知。對話結尾說「I will notify the ${topic.person}」，所以答案是 ${topic.person}。`, `notify the ${topic.person}`)
        ]
    };
}

function buildPart3(day, topic, time) {
    const audioText = `We have a problem with the ${topic.focus}. It is needed for ${topic.reason}, but the current information is incomplete. Could you ${topic.action} and inform the ${topic.person}? Yes, I will take care of it and send a short update ${time}.`;
    return {
        audioText,
        transcript: `A: We have a problem with the ${topic.focus}. It is needed for ${topic.reason}, but the current information is incomplete.\nB: Could you ${topic.action} and inform the ${topic.person}?\nA: Yes, I will take care of it and send a short update ${time}.`,
        translation: `中文重點：對話在處理 ${topic.zh} 的問題。資料不完整，需要 ${topic.action}，並在 ${time} 更新 ${topic.person}。`,
        questions: [
            withChineseExplanation({
                id: 'q1',
                question: 'What is the problem?',
                options: makeOptions(`The ${topic.focus} information is incomplete`, ['The office is closed today', 'The customer paid twice', 'The weather report is missing', 'The elevator is too crowded'], 'A', day),
                answerKey: 'A',
                explanation: `The current information about the ${topic.focus} is incomplete.`
            }, `題目問問題是什麼。音檔說 ${topic.focus} 目前資訊不完整，因此答案是資訊不完整。`, `the current information is incomplete`),
            withChineseExplanation({
                id: 'q2',
                question: 'What is the speaker asked to do?',
                options: makeOptions(topic.action, WRONG_ACTIONS, 'B', day),
                answerKey: 'B',
                explanation: `The speaker is asked to ${topic.action}.`
            }, `題目問說話者被要求做什麼。第二位說話者說「Could you ${topic.action}」，所以答案是 ${topic.action}。`, `Could you ${topic.action}`),
            withChineseExplanation({
                id: 'q3',
                question: 'When will an update be sent?',
                options: makeOptions(time, WRONG_TIMES, 'C', day),
                answerKey: 'C',
                explanation: `A short update will be sent ${time}.`
            }, `題目問更新何時送出。最後一句說「send a short update ${time}」，所以答案是 ${time}。`, `send a short update ${time}`)
        ]
    };
}

function buildPart4(day, topic, time) {
    const audioText = `This is a notice for all staff. Due to ${topic.reason}, the ${topic.focus} in the ${topic.location} will be checked today. If you need assistance, please ask the ${topic.person} or visit the service desk ${time}.`;
    return {
        audioText,
        transcript: `Announcement: ${audioText}`,
        translation: `中文重點：公告說明 ${topic.zh}。因為 ${topic.reason}，${topic.location} 的 ${topic.focus} 會被檢查，需要協助可找 ${topic.person}。`,
        questions: [
            withChineseExplanation({
                id: 'q1',
                question: 'What is the notice mainly about?',
                options: makeOptions(topic.focus, WRONG_TOPICS, 'A', day),
                answerKey: 'A',
                explanation: `The notice is mainly about the ${topic.focus}.`
            }, `題目問公告主旨。公告主體提到要檢查 ${topic.location} 的 ${topic.focus}，所以主旨是 ${topic.focus}。`, `the ${topic.focus} in the ${topic.location} will be checked`),
            withChineseExplanation({
                id: 'q2',
                question: 'Why is the item being checked?',
                options: makeOptions(topic.reason, ['a holiday party', 'a restaurant discount', 'a parking ticket', 'a lost suitcase', 'a museum tour', 'a movie schedule'], 'B', day),
                answerKey: 'B',
                explanation: `It is being checked because of ${topic.reason}.`
            }, `題目問為什麼要檢查。公告說「Due to ${topic.reason}」，所以原因是 ${topic.reason}。`, `Due to ${topic.reason}`),
            withChineseExplanation({
                id: 'q3',
                question: 'Who can staff ask for assistance?',
                options: makeOptions(topic.person, ['taxi driver', 'tour guide', 'store cashier', 'bank customer', 'museum visitor', 'delivery customer'], 'C', day),
                answerKey: 'C',
                explanation: `Staff can ask the ${topic.person} for assistance.`
            }, `題目問員工需要協助時可以找誰。公告說「please ask the ${topic.person}」，所以答案是 ${topic.person}。`, `please ask the ${topic.person}`)
        ]
    };
}

function buildLesson(day) {
    const topic = TOPICS[(day - 1) % TOPICS.length];
    const time = TIME_OPTIONS[(day + Math.floor((day - 1) / TOPICS.length)) % TIME_OPTIONS.length];
    const part = PART_SEQUENCE[(day - 1) % PART_SEQUENCE.length];
    const builders = {
        'Part 1': buildPart1,
        'Part 2': buildPart2,
        'Part 3': buildPart3,
        'Part 4': buildPart4
    };
    const content = builders[part](day, topic, time);
    const dayLabel = padDay(day);
    return {
        id: `day${dayLabel}`,
        day,
        week: Math.ceil(day / 7),
        level: getLevel(day),
        part,
        title: `${topic.title} ${part}`,
        audioFile: `./assets/audio/listening/day${dayLabel}.wav`,
        keywords: [...topic.keywords, part, time].slice(0, 6),
        ...content
    };
}

export const LISTENING_LESSONS = Array.from({ length: TOTAL_TRAINING_DAYS }, (_, index) => buildLesson(index + 1));

export function getListeningLessonForDay(dayIndex) {
    const day = Number(dayIndex);
    if (!Number.isFinite(day)) return LISTENING_LESSONS[0];
    const index = Math.max(0, Math.min(LISTENING_LESSONS.length - 1, Math.floor(day) - 1));
    return LISTENING_LESSONS[index];
}

export function getListeningLessonForWeek(weekIndex) {
    const week = Number(weekIndex);
    if (!Number.isFinite(week)) return LISTENING_LESSONS[0];
    return getListeningLessonForDay(Math.floor(week) * 7 + 1);
}
