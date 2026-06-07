// Built-in TOEIC-style listening drills.
// These are original practice materials generated for this app, not TOEIC official content.

const TOTAL_TRAINING_DAYS = 84;
const PART_SEQUENCE = ['Part 2', 'Part 1', 'Part 2', 'Part 3', 'Part 2', 'Part 4', 'Part 3'];

const CONTEXTS = [
    {
        title: 'Office Supply Request',
        zh: '辦公室用品',
        item: 'copy paper order',
        object: 'copy paper',
        location: 'storage room',
        placePhrase: 'in the storage room',
        role: 'office manager',
        contact: 'the office services team',
        deadline: 'Friday afternoon',
        reason: 'extra copy paper is needed for next week\'s staff meeting',
        problem: 'the storage room is almost out of copy paper',
        request: 'check the supply request',
        action: 'place the paper order',
        keywords: ['copy paper', 'storage room', 'office manager']
    },
    {
        title: 'Travel Itinerary',
        zh: '商務出差',
        item: 'travel itinerary',
        object: 'flight details',
        location: 'travel desk',
        placePhrase: 'at the travel desk',
        role: 'travel coordinator',
        contact: 'the travel desk',
        deadline: 'Wednesday noon',
        reason: 'several employees will attend a sales conference',
        problem: 'one flight time was changed this morning',
        request: 'review the updated flight details',
        action: 'confirm the hotel reservation',
        keywords: ['travel', 'flight', 'hotel']
    },
    {
        title: 'Delivery Schedule',
        zh: '配送通知',
        item: 'delivery schedule',
        object: 'customer shipments',
        location: 'distribution center',
        placePhrase: 'at the distribution center',
        role: 'logistics supervisor',
        contact: 'the delivery team',
        deadline: 'this afternoon',
        reason: 'heavy rain delayed several customer shipments',
        problem: 'several packages will arrive later than planned',
        request: 'check the revised delivery times',
        action: 'notify customers of the delay',
        keywords: ['delivery', 'delay', 'customers']
    },
    {
        title: 'Invoice Approval',
        zh: '發票付款',
        item: 'invoice approval',
        object: 'invoice amount',
        location: 'finance portal',
        placePhrase: 'on the finance portal',
        role: 'accounting assistant',
        contact: 'the finance department',
        deadline: 'the end of the day',
        reason: 'manager approval is required before payment',
        problem: 'the invoice is waiting for final approval',
        request: 'confirm the invoice amount',
        action: 'process the approved payment',
        keywords: ['invoice', 'approval', 'payment']
    },
    {
        title: 'Training Room',
        zh: '訓練安排',
        item: 'training schedule',
        object: 'attendee list',
        location: 'training room',
        placePhrase: 'in the training room',
        role: 'facilities coordinator',
        contact: 'the training office',
        deadline: 'Thursday morning',
        reason: 'more employees registered than expected',
        problem: 'the current room is too small for the group',
        request: 'check the attendee list',
        action: 'reserve a larger room',
        keywords: ['training', 'attendees', 'room']
    },
    {
        title: 'Copier Repair',
        zh: '設備維修',
        item: 'copier repair request',
        object: 'office copier',
        location: 'copy room',
        placePhrase: 'in the copy room',
        role: 'maintenance technician',
        contact: 'the service desk',
        deadline: 'tomorrow morning',
        reason: 'the copier has had repeated paper jams',
        problem: 'the copier stopped twice during printing',
        request: 'review the repair request',
        action: 'schedule a technician visit',
        keywords: ['copier', 'repair', 'technician']
    },
    {
        title: 'Newsletter Draft',
        zh: '行銷信件',
        item: 'newsletter draft',
        object: 'subject line',
        location: 'shared drive',
        placePhrase: 'on the shared drive',
        role: 'marketing director',
        contact: 'the marketing team',
        deadline: 'Friday morning',
        reason: 'the campaign will be launched on Monday',
        problem: 'the subject line still needs final approval',
        request: 'read the revised newsletter draft',
        action: 'approve the subject line',
        keywords: ['newsletter', 'campaign', 'subject line']
    },
    {
        title: 'Group Reservation',
        zh: '訂房變更',
        item: 'group reservation',
        object: 'guest list',
        location: 'front desk',
        placePhrase: 'at the front desk',
        role: 'front desk manager',
        contact: 'the reservations team',
        deadline: '6 p.m. today',
        reason: 'several guests will arrive later than planned',
        problem: 'the check-in time needs to be changed',
        request: 'confirm the guest list',
        action: 'change the check-in time',
        keywords: ['reservation', 'guests', 'check-in']
    },
    {
        title: 'Password Reset',
        zh: '系統維護',
        item: 'account request',
        object: 'employee account',
        location: 'IT help desk',
        placePhrase: 'at the IT help desk',
        role: 'system administrator',
        contact: 'the IT help desk',
        deadline: 'noon today',
        reason: 'a security update requires all passwords to be checked',
        problem: 'one employee cannot sign in after the update',
        request: 'verify the employee account',
        action: 'reset the user password',
        keywords: ['password', 'security', 'account']
    },
    {
        title: 'Interview Schedule',
        zh: '面試安排',
        item: 'interview schedule',
        object: 'candidate information',
        location: 'interview room',
        placePhrase: 'in the interview room',
        role: 'recruiter',
        contact: 'the hiring team',
        deadline: '4 p.m. today',
        reason: 'a candidate will visit the office tomorrow morning',
        problem: 'the final interview time has not been printed',
        request: 'review the candidate information',
        action: 'print the final schedule',
        keywords: ['interview', 'candidate', 'schedule']
    },
    {
        title: 'Supplier Meeting',
        zh: '採購會議',
        item: 'supplier meeting',
        object: 'price list',
        location: 'conference room B',
        placePhrase: 'in conference room B',
        role: 'purchasing manager',
        contact: 'the purchasing office',
        deadline: 'the meeting starts',
        reason: 'the team will discuss supplier pricing',
        problem: 'the old price list is no longer accurate',
        request: 'compare the updated prices',
        action: 'bring the latest price list',
        keywords: ['supplier', 'prices', 'meeting']
    },
    {
        title: 'Shipping Labels',
        zh: '貨運標籤',
        item: 'shipping labels',
        object: 'destination addresses',
        location: 'mail room',
        placePhrase: 'in the mail room',
        role: 'logistics clerk',
        contact: 'the mail room',
        deadline: 'tomorrow afternoon',
        reason: 'several international packages are ready to send',
        problem: 'some labels still show old destination addresses',
        request: 'check the destination addresses',
        action: 'print new shipping labels',
        keywords: ['shipping', 'labels', 'addresses']
    }
];

const TIME_OPTIONS = [
    'by nine this morning',
    'before noon',
    'by three this afternoon',
    'tomorrow morning',
    'before Friday',
    'early next week'
];

const WRONG_ITEMS = [
    'parking permit request',
    'restaurant menu',
    'holiday schedule',
    'visitor badge list',
    'sales brochure',
    'office furniture plan',
    'training video',
    'lunch voucher form'
];

const WRONG_PLACES = [
    'parking garage',
    'cafeteria entrance',
    'customer lounge',
    'main elevator',
    'sales office',
    'hotel lobby',
    'airport gate',
    'break room'
];

const WRONG_REASONS = [
    'a menu will be changed',
    'a parking area is closed',
    'a company picnic was announced',
    'a hotel room was cleaned',
    'a visitor badge was lost',
    'a new desk was delivered',
    'a restaurant discount was offered',
    'a bus route was changed'
];

const WRONG_ACTIONS = [
    'reserve a parking space',
    'update a lunch menu',
    'print visitor badges',
    'move office furniture',
    'cancel a staff event',
    'check a hotel brochure',
    'collect parking receipts',
    'send a museum schedule'
];

const WRONG_CONTACTS = [
    'the cafeteria manager',
    'a taxi driver',
    'the museum guide',
    'a bank teller',
    'the parking attendant',
    'a hotel guest',
    'the restaurant owner',
    'a tour group'
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

function sentenceCase(text) {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : text;
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

function buildPart1(day, topic) {
    const audioText = `One employee is checking the ${topic.object} ${topic.placePhrase}. Another employee is writing notes for the ${topic.role}. Several documents are on the table near the door.`;
    return {
        audioText,
        transcript: `Narrator: ${audioText}`,
        translation: `中文摘要：一名員工正在 ${topic.location} 檢查 ${topic.object}，另一名員工正在替 ${topic.role} 寫筆記，門邊桌上有幾份文件。`,
        questions: [
            withChineseExplanation({
                id: 'q1',
                question: 'What is one employee checking?',
                options: makeOptions(topic.object, WRONG_ITEMS, 'A', day),
                answerKey: 'A',
                explanation: `One employee is checking the ${topic.object}.`
            }, `題目問員工正在檢查什麼。音檔直接說 checking the ${topic.object}，所以答案是 ${topic.object}。`, `checking the ${topic.object}`, '其他選項沒有在音檔中被檢查'),
            withChineseExplanation({
                id: 'q2',
                question: 'Where is the employee working?',
                options: makeOptions(topic.location, WRONG_PLACES, 'B', day),
                answerKey: 'B',
                explanation: `The employee is working ${topic.placePhrase}.`
            }, `題目問地點。音檔說 ${topic.placePhrase}，因此地點是 ${topic.location}。`, topic.placePhrase, '其他地點沒有被提到'),
            withChineseExplanation({
                id: 'q3',
                question: 'What is on the table?',
                options: makeOptions('Several documents', ['A laptop bag', 'Some coffee cups', 'A flower vase', 'A visitor badge', 'A phone charger'], 'C', day),
                answerKey: 'C',
                explanation: 'Several documents are on the table near the door.'
            }, '題目問桌上有什麼。音檔說 Several documents are on the table near the door，所以答案是 Several documents。', 'Several documents are on the table', '其他物品不是音檔中的桌上物品')
        ]
    };
}

function buildPart2(day, topic, time) {
    const audioText = `Could you ${topic.request} ${time}? This is important because ${topic.reason}. Yes, I will ${topic.action} and update ${topic.contact}.`;
    return {
        audioText,
        transcript: `A: Could you ${topic.request} ${time}? This is important because ${topic.reason}.\nB: Yes, I will ${topic.action} and update ${topic.contact}.`,
        translation: `中文摘要：第一位說話者請對方在 ${time} ${topic.request}，原因是 ${topic.reason}。第二位說話者會 ${topic.action}，並通知 ${topic.contact}。`,
        questions: [
            withChineseExplanation({
                id: 'q1',
                question: 'What does the first speaker ask the second speaker to do?',
                options: makeOptions(topic.request, WRONG_ACTIONS, 'A', day),
                answerKey: 'A',
                explanation: `The first speaker asks the second speaker to ${topic.request}.`
            }, `題目問第一位說話者要求什麼。開頭是 Could you ${topic.request}，所以答案是 ${topic.request}。`, `Could you ${topic.request}`, '其他動作不是第一位說話者提出的要求'),
            withChineseExplanation({
                id: 'q2',
                question: 'Why is it needed?',
                options: makeOptions(topic.reason, WRONG_REASONS, 'B', day),
                answerKey: 'B',
                explanation: `It is important because ${topic.reason}.`
            }, `題目問原因。音檔說 This is important because ${topic.reason}，所以答案是 ${topic.reason}。`, `This is important because ${topic.reason}`, '其他原因沒有在音檔中出現'),
            withChineseExplanation({
                id: 'q3',
                question: 'Who will receive an update?',
                options: makeOptions(topic.contact, WRONG_CONTACTS, 'C', day),
                answerKey: 'C',
                explanation: `The second speaker will update ${topic.contact}.`
            }, `題目問誰會收到更新。第二位說話者說 update ${topic.contact}，因此答案是 ${topic.contact}。`, `update ${topic.contact}`, '其他人物或單位不是更新對象')
        ]
    };
}

function buildPart3(day, topic, time) {
    const problemSentence = sentenceCase(topic.problem);
    const audioText = `We have a problem with the ${topic.item}. ${problemSentence}. Should I ${topic.action} before ${topic.deadline}? Yes, and please tell ${topic.contact}. I will send a short update ${time}.`;
    return {
        audioText,
        transcript: `A: We have a problem with the ${topic.item}. ${problemSentence}.\nB: Should I ${topic.action} before ${topic.deadline}?\nA: Yes, and please tell ${topic.contact}. I will send a short update ${time}.`,
        translation: `中文摘要：兩人討論 ${topic.item} 的問題：${topic.problem}。第二位說話者會 ${topic.action}，並通知 ${topic.contact}。`,
        questions: [
            withChineseExplanation({
                id: 'q1',
                question: 'What problem are the speakers discussing?',
                options: makeOptions(topic.problem, WRONG_REASONS, 'A', day),
                answerKey: 'A',
                explanation: `They are discussing that ${topic.problem}.`
            }, `題目問討論的問題。音檔第二句直接說 ${topic.problem}，所以答案是這個問題。`, topic.problem, '其他選項不是對話中的問題'),
            withChineseExplanation({
                id: 'q2',
                question: 'What will the second speaker probably do?',
                options: makeOptions(topic.action, WRONG_ACTIONS, 'B', day),
                answerKey: 'B',
                explanation: `The second speaker will probably ${topic.action}.`
            }, `題目問第二位說話者可能會做什麼。他問 Should I ${topic.action}，對方回答 Yes，所以答案是 ${topic.action}。`, `Should I ${topic.action}`, '其他動作沒有被同意或要求'),
            withChineseExplanation({
                id: 'q3',
                question: 'Who should be told?',
                options: makeOptions(topic.contact, WRONG_CONTACTS, 'C', day),
                answerKey: 'C',
                explanation: `${topic.contact} should be told.`
            }, `題目問應該通知誰。音檔說 please tell ${topic.contact}，所以答案是 ${topic.contact}。`, `please tell ${topic.contact}`, '其他人物或單位不是通知對象')
        ]
    };
}

function buildPart4(day, topic, time) {
    const audioText = `This is a reminder for all staff. Because ${topic.reason}, the ${topic.item} must be ready by ${topic.deadline}. Please ${topic.request} and contact ${topic.contact} if you need help. A brief update will be sent ${time}.`;
    return {
        audioText,
        transcript: `Announcement: ${audioText}`,
        translation: `中文摘要：這是一則員工提醒。因為 ${topic.reason}，${topic.item} 必須在 ${topic.deadline} 前準備好。員工要 ${topic.request}，需要協助可聯絡 ${topic.contact}。`,
        questions: [
            withChineseExplanation({
                id: 'q1',
                question: 'What is the reminder mainly about?',
                options: makeOptions(topic.item, WRONG_ITEMS, 'A', day),
                answerKey: 'A',
                explanation: `The reminder is mainly about the ${topic.item}.`
            }, `題目問公告主旨。音檔說 the ${topic.item} must be ready，因此主題是 ${topic.item}。`, `the ${topic.item} must be ready`, '其他選項不是公告主要內容'),
            withChineseExplanation({
                id: 'q2',
                question: 'Why is this reminder being given?',
                options: makeOptions(topic.reason, WRONG_REASONS, 'B', day),
                answerKey: 'B',
                explanation: `The reminder is being given because ${topic.reason}.`
            }, `題目問提醒原因。音檔說 Because ${topic.reason}，所以答案是 ${topic.reason}。`, `Because ${topic.reason}`, '其他原因沒有在公告中提到'),
            withChineseExplanation({
                id: 'q3',
                question: 'What are staff members asked to do?',
                options: makeOptions(topic.request, WRONG_ACTIONS, 'C', day),
                answerKey: 'C',
                explanation: `Staff members are asked to ${topic.request}.`
            }, `題目問員工被要求做什麼。音檔說 Please ${topic.request}，所以答案是 ${topic.request}。`, `Please ${topic.request}`, '其他動作不是公告要求')
        ]
    };
}

function buildLesson(day) {
    const topic = CONTEXTS[(day - 1) % CONTEXTS.length];
    const time = TIME_OPTIONS[(day + Math.floor((day - 1) / CONTEXTS.length)) % TIME_OPTIONS.length];
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
