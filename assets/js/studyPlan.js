// Three-month commute-first TOEIC study plan.

import { DB } from './db.js';
import { ICONS } from './state.js';
import { t } from './i18n.js?v=1.14.5';
import { getListeningLessonForDay } from './listeningPack.js?v=1.14.5';
import { getReadingLessonForDay } from './readingPack.js?v=1.14.5';

const DAY_MS = 86400000;
const PLAN_DAYS = 84;
const DEFAULT_CURRENT_SCORE = 300;
const DEFAULT_TARGET_SCORE = 600;
const SCORE_OPTIONS = [250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900];

const SETTINGS = {
    startDate: 'study_plan_start_date',
    completions: 'study_plan_completions',
    commuteMode: 'study_plan_commute_mode',
    currentScore: 'study_plan_current_score',
    targetScore: 'study_plan_target_score',
    profileReady: 'study_plan_profile_ready',
    listeningAnswers: 'study_plan_listening_answers',
    readingAnswers: 'study_plan_reading_answers'
};

const COMMUTE_MODES = [
    { id: 'short', minutes: 20, labelKey: 'planCommuteShort', descKey: 'planCommuteShortDesc' },
    { id: 'standard', minutes: 35, labelKey: 'planCommuteStandard', descKey: 'planCommuteStandardDesc' },
    { id: 'full', minutes: 50, labelKey: 'planCommuteFull', descKey: 'planCommuteFullDesc' }
];

const MODE_MINUTES = {
    short: [8, 6, 6],
    standard: [12, 8, 10, 5],
    full: [15, 10, 15, 5, 5]
};

const SATURDAY_MINUTES = {
    short: { listen: 6, miniTest: 8, reading: 6, repair: 0, vocabRepair: 0 },
    standard: { listen: 10, miniTest: 15, reading: 10, repair: 0, vocabRepair: 0 },
    full: { listen: 12, miniTest: 18, reading: 12, repair: 5, vocabRepair: 3 }
};

const SUNDAY_MINUTES = {
    short: { listen: 6, weeklyReview: 8, reading: 6, preview: 0 },
    standard: { listen: 10, weeklyReview: 10, reading: 10, preview: 5 },
    full: { listen: 12, weeklyReview: 15, reading: 12, preview: 11 }
};

const MODE_QUESTION_COUNTS = {
    short: { listening: 4, reading: 4 },
    standard: { listening: 6, reading: 6 },
    full: { listening: 10, reading: 10 }
};

const WEEK_PLANS = [
    {
        title: '診斷與基本盤',
        score: '300 -> 330',
        focus: '確認弱點，補回 TOEIC 最常見的辦公室、交通與人物動作題。',
        listening: 'Part 1 圖片題與 Part 2 問答語氣',
        reading: '基本句型、名詞片語與動詞時態',
        vocab: '辦公室、交通、購物高頻字',
        review: '把錯題分成聽錯音、不懂字、句構卡住三類',
        topics: ['TOEIC office announcement and commuting', 'TOEIC basic business email']
    },
    {
        title: '高頻單字與短句聽力',
        score: '330 -> 360',
        focus: '先把常見單字聽熟，降低 Part 2 與短閱讀的卡頓。',
        listening: 'Part 2 wh-question、yes/no 與選項陷阱',
        reading: '介系詞、連接詞與簡短信件',
        vocab: '會議、行程、訂位、出差單字',
        review: '每天保留 5 個聽不清楚的句子',
        topics: ['TOEIC meeting schedule and business travel', 'TOEIC reservation and itinerary']
    },
    {
        title: 'Part 2 反應速度',
        score: '360 -> 390',
        focus: '訓練聽到第一個疑問詞就預測答案方向。',
        listening: 'Part 2 疑問詞、間接回答與同音干擾',
        reading: '形容詞、副詞與比較級',
        vocab: '餐廳、客服、付款、維修單字',
        review: '錯題只寫一句原因，避免複習變拖延',
        topics: ['TOEIC customer service phone call', 'TOEIC restaurant complaint']
    },
    {
        title: 'Part 3 場景聽力',
        score: '390 -> 420',
        focus: '用地點、角色、目的三個線索抓住對話主軸。',
        listening: 'Part 3 對話主旨、地點與下一步行動',
        reading: '代名詞指涉與信件目的',
        vocab: '部門協作、採購、報價、庫存單字',
        review: '每題標記 who / where / next action',
        topics: ['TOEIC purchasing and inventory discussion', 'TOEIC project coordination']
    },
    {
        title: '文法補洞',
        score: '420 -> 450',
        focus: '把 Part 5 最常掉分的詞性、時態、連接詞整理成固定反射。',
        listening: 'Part 3 關鍵轉折與語氣',
        reading: 'Part 5 詞性、時態、主動被動',
        vocab: '招募、人資、訓練、公司政策單字',
        review: '建立自己的 10 條文法錯題規則',
        topics: ['TOEIC company training policy', 'TOEIC recruitment email']
    },
    {
        title: '閱讀速度',
        score: '450 -> 480',
        focus: '練習先看題目再掃讀，避免每篇都從頭翻到尾。',
        listening: 'Part 4 短公告開頭定位',
        reading: 'Part 6 文章脈絡與句子插入',
        vocab: '廣告、折扣、活動、公告單字',
        review: '記錄每篇閱讀花費時間',
        topics: ['TOEIC promotional announcement', 'TOEIC event notice and discount']
    },
    {
        title: 'Part 4 公告與簡報',
        score: '480 -> 510',
        focus: '抓住公告目的、對象與行動要求。',
        listening: 'Part 4 announcement、talk、recorded message',
        reading: 'Part 7 單篇文章定位',
        vocab: '物流、交貨、品質、售後服務單字',
        review: '錯題補回原文證據句',
        topics: ['TOEIC delivery delay announcement', 'TOEIC product quality notice']
    },
    {
        title: 'Part 7 單篇閱讀',
        score: '510 -> 535',
        focus: '穩定拿下主旨題、細節題與同義轉換題。',
        listening: 'Part 3/4 圖表題與數字資訊',
        reading: 'Part 7 email、memo、notice',
        vocab: '財務、帳單、合約、保險單字',
        review: '把題目答案和原文對應位置畫上線',
        topics: ['TOEIC invoice and payment reminder', 'TOEIC contract renewal notice']
    },
    {
        title: '雙篇與轉述',
        score: '535 -> 560',
        focus: '處理雙篇閱讀與同義字改寫，開始建立考試耐力。',
        listening: 'Part 3/4 同義轉述與目的題',
        reading: 'Part 7 雙篇文章交叉比對',
        vocab: '市場、銷售、客戶回饋、調查單字',
        review: '每天整理 5 組同義轉換',
        topics: ['TOEIC customer survey results', 'TOEIC sales performance update']
    },
    {
        title: '限時整合',
        score: '560 -> 580',
        focus: '開始用時間壓力練答題節奏，練穩會寫的題目。',
        listening: '聽力四大題混合練習',
        reading: 'Part 5/6/7 限時小組合',
        vocab: '科技、設備、系統、維護單字',
        review: '錯題優先處理可修正的粗心與時間問題',
        topics: ['TOEIC equipment maintenance notice', 'TOEIC software system update']
    },
    {
        title: '模考與錯題回補',
        score: '580 -> 600',
        focus: '用模考找最後漏洞，把錯題整理成可重複複習的清單。',
        listening: '完整聽力節奏與錯題重聽',
        reading: '完整閱讀分配與跳題策略',
        vocab: '前十週錯題單字回補',
        review: '只補最常錯的三種題型',
        topics: ['TOEIC full test review business topics', 'TOEIC weak point repair']
    },
    {
        title: '考前穩定輸出',
        score: '600+',
        focus: '減少新內容，維持手感，讓分數穩定落在 600 以上。',
        listening: '精聽錯題與高頻場景複習',
        reading: '閱讀限時與答案證據回看',
        vocab: 'SRS 熟練度未滿的單字',
        review: '確認考前流程、睡眠與答題順序',
        topics: ['TOEIC final review workplace communication', 'TOEIC test day strategy']
    }
];

let deps = {
    switchTab: null,
    setPracticeMode: null,
    setTargetScore: null,
    setArticleTopic: null
};

let planState = {
    loaded: false,
    startDate: '',
    completions: {},
    commuteMode: 'standard',
    currentScore: null,
    targetScore: null,
    profileReady: false,
    listeningAnswers: {},
    readingAnswers: {}
};

let eventsBound = false;

function escapeHtml(text) {
    return String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getLocalMidnight(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getISODate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function parseISODate(iso) {
    const parts = String(iso || '').split('-').map(Number);
    if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return getLocalMidnight(next);
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function normalizeScore(value, fallback) {
    const score = Number(value);
    if (!Number.isFinite(score)) return fallback;
    return clamp(Math.round(score / 10) * 10, 10, 990);
}

function getCurrentScore() {
    return normalizeScore(planState.currentScore, DEFAULT_CURRENT_SCORE);
}

function getTargetScore() {
    return normalizeScore(planState.targetScore, DEFAULT_TARGET_SCORE);
}

function getWeekScoreRange(weekIndex) {
    const current = getCurrentScore();
    const target = getTargetScore();
    const start = Math.round(current + ((target - current) * weekIndex / 12));
    const end = weekIndex >= 11
        ? target
        : Math.round(current + ((target - current) * (weekIndex + 1) / 12));
    return `${start} -> ${end}`;
}

function getWeekPlan(weekIndex) {
    const safeIndex = clamp(weekIndex, 0, WEEK_PLANS.length - 1);
    const targetScore = getTargetScore();
    const baseWeek = WEEK_PLANS[safeIndex];
    return {
        ...baseWeek,
        focus: safeIndex === 11
            ? baseWeek.focus.replace('600 以上', `${targetScore} 以上`)
            : baseWeek.focus,
        score: getWeekScoreRange(safeIndex)
    };
}

function renderScoreOptions(selectedScore) {
    const selected = normalizeScore(selectedScore, DEFAULT_CURRENT_SCORE);
    return SCORE_OPTIONS.map((score) => (
        `<option value="${score}" ${score === selected ? 'selected' : ''}>${score}</option>`
    )).join('');
}

function formatPlanDate(date) {
    return new Intl.DateTimeFormat('zh-TW', {
        month: 'numeric',
        day: 'numeric',
        weekday: 'short'
    }).format(date);
}

function getStartDate() {
    return parseISODate(planState.startDate) || getLocalMidnight(new Date());
}

function getCurrentPlanInfo(today = new Date()) {
    const start = getStartDate();
    const todayMidnight = getLocalMidnight(today);
    const rawDay = Math.floor((todayMidnight - start) / DAY_MS) + 1;
    const dayIndex = clamp(rawDay, 1, PLAN_DAYS);
    const weekIndex = clamp(Math.floor((dayIndex - 1) / 7), 0, WEEK_PLANS.length - 1);
    const currentDate = addDays(start, dayIndex - 1);
    return {
        start,
        today: todayMidnight,
        currentDate,
        rawDay,
        dayIndex,
        weekIndex,
        dayInWeek: ((dayIndex - 1) % 7) + 1,
        week: getWeekPlan(weekIndex)
    };
}

function taskKey(dayIndex, taskId) {
    return `d${dayIndex}:${taskId}`;
}

function getActionLabel(action) {
    if (action === 'listening') return t('planOpenListening');
    if (action === 'reading') return t('planOpenReading');
    if (action === 'article') return t('planOpenArticle');
    if (action === 'vocab') return t('planOpenVocab');
    if (action === 'exam') return t('planOpenExam');
    if (action === 'history') return t('planOpenHistory');
    if (action === 'speaking') return t('planOpenSpeaking');
    return t('planOpenTask');
}

function buildWeekdayTasks(week, modeId) {
    const minutes = MODE_MINUTES[modeId] || MODE_MINUTES.standard;
    const tasks = [
        {
            id: 'listen',
            label: '去程聽力',
            title: week.listening,
            detail: '先聽一次抓主旨，再跟讀 5 句。',
            action: 'listening',
            topic: week.topics[0]
        },
        {
            id: 'vocab',
            label: '站立單字',
            title: week.vocab,
            detail: '新增 8 個單字，回顧 SRS 到期字。',
            action: 'vocab'
        },
        {
            id: 'reading',
            label: '回程閱讀',
            title: week.reading,
            detail: '用手機讀短篇，答案一定回到原文找證據。',
            action: 'reading',
            topic: week.topics[1] || week.topics[0]
        },
        {
            id: 'review',
            label: '錯題收尾',
            title: week.review,
            detail: '只寫一句錯因，讓明天可以快速重看。',
            action: 'history'
        },
        {
            id: 'speak',
            label: '影子跟讀',
            title: '用今天句子做 5 分鐘口說跟讀',
            detail: '專注重音、停頓與句尾語氣。',
            action: 'speaking'
        }
    ];
    return tasks.slice(0, minutes.length).map((task, index) => ({
        ...task,
        minutes: minutes[index],
        actionLabel: getActionLabel(task.action)
    }));
}

function buildSaturdayTasks(week, modeId) {
    const minutes = SATURDAY_MINUTES[modeId] || SATURDAY_MINUTES.standard;
    return [
        {
            id: 'listen',
            label: '週末聽力',
            title: week.listening,
            detail: '先完成上方聽力包，再重聽錯題句。',
            minutes: minutes.listen,
            action: 'listening',
            actionLabel: getActionLabel('listening')
        },
        {
            id: 'mini-test',
            label: '週末模考',
            title: `${week.title} 小模考`,
            detail: '用限時題檢查本週弱點。',
            minutes: minutes.miniTest,
            action: 'exam',
            actionLabel: getActionLabel('exam')
        },
        {
            id: 'reading',
            label: '週末閱讀',
            title: week.reading,
            detail: '完成上方閱讀題組，練 Part 5/6/7 的定位速度。',
            minutes: minutes.reading,
            action: 'reading',
            actionLabel: getActionLabel('reading')
        },
        {
            id: 'repair',
            label: '錯題回補',
            title: week.review,
            detail: '挑最痛的 3 題重新聽或重讀。',
            minutes: minutes.repair,
            action: 'history',
            actionLabel: getActionLabel('history')
        },
        {
            id: 'vocab-repair',
            label: '單字加固',
            title: '把錯題字加入 SRS',
            detail: '只收真正會再遇到的字。',
            minutes: minutes.vocabRepair,
            action: 'vocab',
            actionLabel: getActionLabel('vocab')
        }
    ].filter((task) => task.minutes > 0);
}

function buildSundayTasks(dayIndex, week, modeId) {
    const nextWeek = getWeekPlan(Math.min(WEEK_PLANS.length - 1, Math.floor(dayIndex / 7)));
    const minutes = SUNDAY_MINUTES[modeId] || SUNDAY_MINUTES.standard;
    return [
        {
            id: 'listen',
            label: '聽力回補',
            title: week.listening,
            detail: '用上方聽力包做精聽，確認每題解析都看懂。',
            minutes: minutes.listen,
            action: 'listening',
            actionLabel: getActionLabel('listening')
        },
        {
            id: 'weekly-review',
            label: '週回顧',
            title: `整理第 ${Math.ceil(dayIndex / 7)} 週錯題`,
            detail: week.review,
            minutes: minutes.weeklyReview,
            action: 'history',
            actionLabel: getActionLabel('history')
        },
        {
            id: 'reading',
            label: '閱讀回補',
            title: week.reading,
            detail: '完成上方閱讀題組，把每題答案證據圈回原文。',
            minutes: minutes.reading,
            action: 'reading',
            actionLabel: getActionLabel('reading')
        },
        {
            id: 'preview',
            label: '下週預習',
            title: nextWeek.title,
            detail: `先看主題：${nextWeek.focus}`,
            minutes: minutes.preview,
            action: 'reading',
            topic: nextWeek.topics[0],
            actionLabel: getActionLabel('reading')
        }
    ].filter((task) => task.minutes > 0);
}

function buildDailyTasks(dayIndex, date = addDays(getStartDate(), dayIndex - 1), modeId = planState.commuteMode) {
    const week = getWeekPlan(clamp(Math.floor((dayIndex - 1) / 7), 0, WEEK_PLANS.length - 1));
    const day = date.getDay();
    if (day === 6) return buildSaturdayTasks(week, modeId);
    if (day === 0) return buildSundayTasks(dayIndex, week, modeId);
    return buildWeekdayTasks(week, modeId);
}

function getAllTaskKeys(modeId = planState.commuteMode) {
    const start = getStartDate();
    const keys = [];
    for (let day = 1; day <= PLAN_DAYS; day += 1) {
        const date = addDays(start, day - 1);
        buildDailyTasks(day, date, modeId).forEach((task) => keys.push(taskKey(day, task.id)));
    }
    return keys;
}

function isTaskComplete(key) {
    return !!planState.completions[key];
}

function isDayComplete(dayIndex, modeId = planState.commuteMode) {
    const date = addDays(getStartDate(), dayIndex - 1);
    const tasks = buildDailyTasks(dayIndex, date, modeId);
    return tasks.length > 0 && tasks.every((task) => isTaskComplete(taskKey(dayIndex, task.id)));
}

function getCompletionStats(info) {
    const allKeys = getAllTaskKeys();
    const doneCount = allKeys.filter((key) => isTaskComplete(key)).length;
    const progressPct = allKeys.length ? Math.round((doneCount / allKeys.length) * 100) : 0;
    const todayTasks = buildDailyTasks(info.dayIndex, info.currentDate);
    const todayDone = todayTasks.filter((task) => isTaskComplete(taskKey(info.dayIndex, task.id))).length;
    const weekStart = info.weekIndex * 7 + 1;
    let weekTotal = 0;
    let weekDone = 0;
    for (let day = weekStart; day < weekStart + 7 && day <= PLAN_DAYS; day += 1) {
        const tasks = buildDailyTasks(day, addDays(info.start, day - 1));
        weekTotal += tasks.length;
        weekDone += tasks.filter((task) => isTaskComplete(taskKey(day, task.id))).length;
    }
    return {
        doneCount,
        totalCount: allKeys.length,
        progressPct,
        todayTasks,
        todayDone,
        weekDone,
        weekTotal
    };
}

function getStreak(info) {
    if (!isDayComplete(info.dayIndex)) return 0;
    let streak = 0;
    for (let day = info.dayIndex; day >= 1; day -= 1) {
        if (!isDayComplete(day)) break;
        streak += 1;
    }
    return streak;
}

function renderCommuteModes() {
    return COMMUTE_MODES.map((mode) => {
        const active = mode.id === planState.commuteMode;
        return `
            <button class="plan-mode-btn ${active ? 'active' : ''}" type="button" data-plan-mode="${mode.id}" aria-pressed="${active}">
                <span>${escapeHtml(t(mode.labelKey))}</span>
                <small>${escapeHtml(t(mode.descKey))}</small>
            </button>
        `;
    }).join('');
}

function getModeQuestionCounts(modeId = planState.commuteMode) {
    return MODE_QUESTION_COUNTS[modeId] || MODE_QUESTION_COUNTS.standard;
}

function getModeQuestionTotals(modeId = planState.commuteMode) {
    const config = getModeQuestionCounts(modeId);
    const listening = config.listening;
    const reading = config.reading;
    return { listening, reading, total: listening + reading };
}

function markModeQuestion(question, lesson, bonus = false) {
    return {
        ...question,
        id: bonus ? `bonus-${lesson.id}-${question.id}` : question.id,
        isBonus: bonus,
        bonusDay: bonus ? lesson.day : null,
        sourcePart: lesson.part || question.part || ''
    };
}

function getWrappedPlanDay(dayIndex, offset = 0) {
    const start = Number.isFinite(Number(dayIndex)) ? Math.floor(Number(dayIndex)) : 1;
    const raw = start + offset;
    return ((raw - 1) % PLAN_DAYS) + 1;
}

function collectModeQuestions(dayIndex, count, getLesson) {
    const primaryLesson = getLesson(dayIndex);
    if (!primaryLesson) return { lesson: null, groups: [], questions: [] };
    const groups = [];
    let remaining = Math.max(0, Number(count) || 0);
    let offset = 0;

    while (remaining > 0 && offset < PLAN_DAYS) {
        const lesson = getLesson(getWrappedPlanDay(dayIndex, offset));
        const pool = Array.isArray(lesson?.questions) ? lesson.questions : [];
        const take = Math.min(remaining, pool.length);
        if (take > 0) {
            const isBonus = offset > 0;
            const questions = pool
                .slice(0, take)
                .map((question) => markModeQuestion(question, lesson, isBonus));
            groups.push({ lesson, questions, isBonus });
            remaining -= take;
        }
        offset += 1;
    }

    return {
        lesson: primaryLesson,
        groups,
        questions: groups.flatMap((group) => group.questions)
    };
}

function getModeListeningQuestions(dayIndex, modeId = planState.commuteMode) {
    const config = getModeQuestionCounts(modeId);
    return collectModeQuestions(dayIndex, config.listening, getListeningLessonForDay);
}

function getModeReadingQuestions(dayIndex, modeId = planState.commuteMode) {
    const config = getModeQuestionCounts(modeId);
    return collectModeQuestions(dayIndex, config.reading, getReadingLessonForDay);
}

function renderTask(task, info) {
    const key = taskKey(info.dayIndex, task.id);
    const complete = isTaskComplete(key);
    const action = task.action
        ? `<button class="plan-task-action" type="button" data-plan-start="${escapeHtml(task.action)}" data-plan-topic="${escapeHtml(task.topic || '')}">${escapeHtml(task.actionLabel || getActionLabel(task.action))}</button>`
        : '';
    return `
        <div class="plan-task ${complete ? 'is-complete' : ''}">
            <button class="plan-check-btn" type="button" data-plan-toggle="${key}" aria-label="${escapeHtml(t('planToggleTask'))}">
                ${complete ? ICONS.check : ''}
            </button>
            <div class="plan-task-main">
                <div class="plan-task-top">
                    <span class="plan-task-label">${escapeHtml(task.label)}</span>
                    <span class="plan-task-minutes">${escapeHtml(String(task.minutes))} ${escapeHtml(t('planMinutes'))}</span>
                </div>
                <div class="plan-task-title">${escapeHtml(task.title)}</div>
                <div class="plan-task-detail">${escapeHtml(task.detail)}</div>
            </div>
            ${action}
        </div>
    `;
}

function listeningAnswerKey(lessonId, questionId) {
    return `${lessonId}:${questionId}`;
}

function getListeningAnswer(lessonId, questionId) {
    return planState.listeningAnswers[listeningAnswerKey(lessonId, questionId)] || '';
}

function getListeningStats(lesson, questions = Array.isArray(lesson?.questions) ? lesson.questions : []) {
    const answered = questions.filter((question) => getListeningAnswer(lesson.id, question.id)).length;
    const correct = questions.filter((question) => getListeningAnswer(lesson.id, question.id) === question.answerKey).length;
    return { answered, correct, total: questions.length };
}

function renderAnswerExplanation(question) {
    const options = Array.isArray(question?.options) ? question.options : [];
    const correctOption = options.find((option) => option.key === question.answerKey);
    const wrongItems = options.filter((option) => option.key !== question.answerKey);
    const zhExplanation = question.zhExplanation || question.explanation || '';
    return `
        <div class="plan-answer-explanation">
            <div class="plan-answer-section">
                <strong>${escapeHtml(t('planAnswerZhExplanation'))}</strong>
                <p>${escapeHtml(zhExplanation)}</p>
                ${correctOption ? `<p class="plan-answer-correct">${escapeHtml(t('planAnswerCorrectOption', { key: correctOption.key, answer: correctOption.text }))}</p>` : ''}
            </div>
            <div class="plan-answer-section">
                <strong>${escapeHtml(t('planWrongOptionsTitle'))}</strong>
                <ul class="plan-wrong-option-list">
                    ${wrongItems.map((option) => {
                        const reason = question.wrongExplanations?.[option.key]
                            || t('planWrongOptionDefault', { option: option.text });
                        return `
                            <li>
                                <span>${escapeHtml(option.key)}</span>
                                <p>${escapeHtml(reason)}</p>
                            </li>
                        `;
                    }).join('')}
                </ul>
            </div>
        </div>
    `;
}

function renderListeningQuestion(lesson, question, index) {
    const selected = getListeningAnswer(lesson.id, question.id);
    const questionLabel = question.isBonus
        ? t('planBonusQuestion', { number: index + 1, day: question.bonusDay })
        : t('planListeningQuestion', { number: index + 1 });
    return `
        <div class="plan-listening-question">
            <div class="plan-listening-question-title">
                <span>${escapeHtml(questionLabel)}</span>
                <strong>${escapeHtml(question.question)}</strong>
            </div>
            <div class="plan-listening-options">
                ${question.options.map((option) => {
                    const isSelected = selected === option.key;
                    const isAnswer = selected && option.key === question.answerKey;
                    const isWrong = isSelected && option.key !== question.answerKey;
                    const stateClass = isAnswer ? 'is-correct' : isWrong ? 'is-wrong' : isSelected ? 'is-selected' : '';
                    return `
                        <button class="plan-listening-option ${stateClass}" type="button"
                            data-listening-lesson="${escapeHtml(lesson.id)}"
                            data-listening-question="${escapeHtml(question.id)}"
                            data-listening-answer="${escapeHtml(option.key)}">
                            <span>${escapeHtml(option.key)}</span>
                            <strong>${escapeHtml(option.text)}</strong>
                        </button>
                    `;
                }).join('')}
            </div>
            ${selected ? renderAnswerExplanation(question) : ''}
        </div>
    `;
}

function renderListeningGroup(answerLesson, group, startIndex) {
    const lesson = group.lesson;
    return `
        <div class="plan-listening-group ${group.isBonus ? 'is-bonus' : ''}">
            <div class="plan-listening-group-head">
                <div>
                    <span>${escapeHtml(group.isBonus ? t('planStrictBonusListening', { day: lesson.day }) : t('planStrictMainListening'))}</span>
                    <strong>${escapeHtml(lesson.title)}</strong>
                </div>
                <small>${escapeHtml(t('planListeningPartLabel', { part: lesson.part }))}</small>
            </div>
            <div class="plan-listening-player">
                <button class="plan-listening-play-btn" type="button" data-listening-play="${escapeHtml(lesson.id)}">
                    ${ICONS.speaker}
                    <span>${escapeHtml(t('planListeningReplay'))}</span>
                </button>
                <audio class="plan-listening-audio" controls preload="metadata" src="${escapeHtml(lesson.audioFile)}"></audio>
            </div>
            <div class="plan-listening-keywords">
                ${lesson.keywords.map((word) => `<span>${escapeHtml(word)}</span>`).join('')}
            </div>
            <div class="plan-listening-questions">
                ${group.questions.map((question, index) => renderListeningQuestion(answerLesson, question, startIndex + index)).join('')}
            </div>
            <details class="plan-listening-transcript">
                <summary>${escapeHtml(t('planListeningTranscript'))}</summary>
                <pre>${escapeHtml(lesson.transcript)}</pre>
                <pre>${escapeHtml(lesson.translation)}</pre>
            </details>
        </div>
    `;
}

function renderListeningDrill(info) {
    const { lesson, groups, questions } = getModeListeningQuestions(info.dayIndex);
    if (!lesson) return '';
    const stats = getListeningStats(lesson, questions);
    const listenKey = taskKey(info.dayIndex, 'listen');
    const completed = isTaskComplete(listenKey);
    const canComplete = stats.total > 0 && stats.answered === stats.total;
    const completeLabel = completed ? t('planListeningCompleted') : t('planListeningComplete');
    return `
        <section class="plan-listening-card" id="planListeningCard">
            <div class="plan-listening-head">
                <div>
                    <p class="plan-kicker">${escapeHtml(t('planListeningPackKicker', { day: lesson.day, week: lesson.week, level: lesson.level }))}</p>
                    <h3>${escapeHtml(lesson.title)}</h3>
                    <span>${escapeHtml(t('planListeningPartLabel', { part: lesson.part }))}</span>
                </div>
                <div class="plan-listening-score ${completed ? 'is-complete' : ''}">
                    <strong>${stats.correct}/${stats.total}</strong>
                    <small>${escapeHtml(t('planListeningScore'))}</small>
                </div>
            </div>
            <p class="plan-listening-status hidden" data-listening-status></p>
            ${groups.map((group, groupIndex) => {
                const startIndex = groups.slice(0, groupIndex).reduce((sum, item) => sum + item.questions.length, 0);
                return renderListeningGroup(lesson, group, startIndex);
            }).join('')}
            <div class="plan-listening-actions">
                <p>${escapeHtml(canComplete ? t('planListeningReady') : t('planListeningNeedAnswers', { count: stats.total }))}</p>
                <button class="plan-task-action plan-listening-complete-btn" type="button" data-listening-complete="${info.dayIndex}" ${canComplete ? '' : 'disabled'}>
                    ${escapeHtml(completeLabel)}
                </button>
            </div>
        </section>
    `;
}

function readingAnswerKey(lessonId, questionId) {
    return `${lessonId}:${questionId}`;
}

function getReadingAnswer(lessonId, questionId) {
    return planState.readingAnswers[readingAnswerKey(lessonId, questionId)] || '';
}

function getReadingStats(lesson, questions = Array.isArray(lesson?.questions) ? lesson.questions : []) {
    const answered = questions.filter((question) => getReadingAnswer(lesson.id, question.id)).length;
    const correct = questions.filter((question) => getReadingAnswer(lesson.id, question.id) === question.answerKey).length;
    return { answered, correct, total: questions.length };
}

function emptyMetric(label, type = 'mixed') {
    return { label, type, answered: 0, correct: 0, total: 0 };
}

function addMetric(map, key, label, type, answered, correct, total) {
    if (!map[key]) map[key] = emptyMetric(label, type);
    map[key].answered += answered;
    map[key].correct += correct;
    map[key].total += total;
}

function getAccuracy(correct, answered) {
    return answered ? Math.round((correct / answered) * 100) : 0;
}

function getWeaknessTip(label) {
    const tips = {
        'Part 1': '先看人物、物品、地點，再聽動作和狀態。',
        'Part 2': '先抓疑問詞與句尾語氣，避免被同音字或重複字騙走。',
        'Part 3': '每題固定標記 who、where、next action，答案多半是同義轉述。',
        'Part 4': '開頭先抓公告目的，時間、地點、動作要邊聽邊記。',
        'Part 5': '優先補詞性、時態、主被動，看到空格先判斷需要什麼詞。',
        'Part 6': '每格都回前後句找線索，不要只看單句文法。',
        'Part 7': '先讀題目關鍵字，再回原文找人名、日期、目的與下一步。'
    };
    return tips[label] || '維持每天混合練習，錯題務必回到原句找原因。';
}

function getWeeklyMockStats(info) {
    const weekStart = info.weekIndex * 7 + 1;
    const weekEnd = Math.min(PLAN_DAYS, weekStart + 6);
    const groupMap = {};
    const summary = {
        days: weekEnd - weekStart + 1,
        answered: 0,
        correct: 0,
        total: 0,
        listeningAnswered: 0,
        listeningCorrect: 0,
        listeningTotal: 0,
        readingAnswered: 0,
        readingCorrect: 0,
        readingTotal: 0
    };

    for (let day = weekStart; day <= weekEnd; day += 1) {
        const { lesson: listeningLesson, questions: listeningQuestions } = getModeListeningQuestions(day);
        listeningQuestions.forEach((question) => {
            const answer = getListeningAnswer(listeningLesson.id, question.id);
            const answered = answer ? 1 : 0;
            const correct = answer === question.answerKey ? 1 : 0;
            summary.total += 1;
            summary.answered += answered;
            summary.correct += correct;
            summary.listeningTotal += 1;
            summary.listeningAnswered += answered;
            summary.listeningCorrect += correct;
            const part = question.sourcePart || listeningLesson.part;
            addMetric(groupMap, `listening:${part}`, part, 'listening', answered, correct, 1);
        });

        const { lesson: readingLesson, questions: readingQuestions } = getModeReadingQuestions(day);
        readingQuestions.forEach((question) => {
            const answer = getReadingAnswer(readingLesson.id, question.id);
            const answered = answer ? 1 : 0;
            const correct = answer === question.answerKey ? 1 : 0;
            summary.total += 1;
            summary.answered += answered;
            summary.correct += correct;
            summary.readingTotal += 1;
            summary.readingAnswered += answered;
            summary.readingCorrect += correct;
            addMetric(groupMap, `reading:${question.part}`, question.part, 'reading', answered, correct, 1);
        });
    }

    const groups = Object.values(groupMap)
        .map((group) => ({
            ...group,
            accuracy: getAccuracy(group.correct, group.answered)
        }))
        .sort((a, b) => {
            if (b.answered !== a.answered) return b.answered - a.answered;
            return a.label.localeCompare(b.label);
        });

    const answeredGroups = groups.filter((group) => group.answered > 0);
    const weakGroup = answeredGroups.length
        ? [...answeredGroups].sort((a, b) => {
            if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
            if (b.answered !== a.answered) return b.answered - a.answered;
            return a.label.localeCompare(b.label);
        })[0]
        : null;

    return {
        ...summary,
        accuracy: getAccuracy(summary.correct, summary.answered),
        listeningAccuracy: getAccuracy(summary.listeningCorrect, summary.listeningAnswered),
        readingAccuracy: getAccuracy(summary.readingCorrect, summary.readingAnswered),
        groups,
        weakGroup
    };
}

function renderReadingQuestion(lesson, question, index) {
    const selected = getReadingAnswer(lesson.id, question.id);
    const partLabel = question.isBonus
        ? `${t('planBonusQuestion', { number: index + 1, day: question.bonusDay })} ・ ${question.part}`
        : `${question.part} ・ ${question.skill}`;
    return `
        <div class="plan-reading-question">
            <div class="plan-reading-question-title">
                <span>${escapeHtml(partLabel)}</span>
                <strong>${escapeHtml(t('planReadingQuestion', { number: index + 1 }))}</strong>
            </div>
            ${question.passage ? `<pre class="plan-reading-passage">${escapeHtml(question.passage)}</pre>` : ''}
            <p class="plan-reading-prompt">${escapeHtml(question.question)}</p>
            <div class="plan-reading-options">
                ${question.options.map((option) => {
                    const isSelected = selected === option.key;
                    const isAnswer = selected && option.key === question.answerKey;
                    const isWrong = isSelected && option.key !== question.answerKey;
                    const stateClass = isAnswer ? 'is-correct' : isWrong ? 'is-wrong' : isSelected ? 'is-selected' : '';
                    return `
                        <button class="plan-reading-option ${stateClass}" type="button"
                            data-reading-lesson="${escapeHtml(lesson.id)}"
                            data-reading-question="${escapeHtml(question.id)}"
                            data-reading-answer="${escapeHtml(option.key)}">
                            <span>${escapeHtml(option.key)}</span>
                            <strong>${escapeHtml(option.text)}</strong>
                        </button>
                    `;
                }).join('')}
            </div>
            ${selected ? renderAnswerExplanation(question) : ''}
        </div>
    `;
}

function renderReadingDrill(info) {
    const { lesson, questions } = getModeReadingQuestions(info.dayIndex);
    if (!lesson) return '';
    const stats = getReadingStats(lesson, questions);
    const readingKey = taskKey(info.dayIndex, 'reading');
    const completed = isTaskComplete(readingKey);
    const canComplete = stats.total > 0 && stats.answered === stats.total;
    const completeLabel = completed ? t('planReadingCompleted') : t('planReadingComplete');
    return `
        <section class="plan-reading-card" id="planReadingCard">
            <div class="plan-reading-head">
                <div>
                    <p class="plan-kicker">${escapeHtml(t('planReadingPackKicker', { day: lesson.day, week: lesson.week, level: lesson.level }))}</p>
                    <h3>${escapeHtml(lesson.title)}</h3>
                    <span>${escapeHtml(lesson.focus)}</span>
                </div>
                <div class="plan-reading-score ${completed ? 'is-complete' : ''}">
                    <strong>${stats.correct}/${stats.total}</strong>
                    <small>${escapeHtml(t('planReadingScore'))}</small>
                </div>
            </div>
            <div class="plan-reading-questions">
                ${questions.map((question, index) => renderReadingQuestion(lesson, question, index)).join('')}
            </div>
            <div class="plan-reading-actions">
                <p>${escapeHtml(canComplete ? t('planReadingReady') : t('planReadingNeedAnswers', { count: stats.total }))}</p>
                <button class="plan-task-action plan-reading-complete-btn" type="button" data-reading-complete="${info.dayIndex}" ${canComplete ? '' : 'disabled'}>
                    ${escapeHtml(completeLabel)}
                </button>
            </div>
        </section>
    `;
}

function renderWeeklyAnalytics(info) {
    const stats = getWeeklyMockStats(info);
    const weakLabel = stats.weakGroup?.label || t('planWeaknessNone');
    const weakTip = stats.weakGroup
        ? getWeaknessTip(stats.weakGroup.label)
        : t(stats.answered ? 'planWeaknessKeepGoing' : 'planWeaknessNoData');
    const groupRows = stats.groups
        .filter((group) => group.total > 0)
        .map((group) => {
            const answeredText = `${group.correct}/${group.answered || 0}`;
            const pct = group.answered ? `${group.accuracy}%` : '-';
            return `
                <div class="plan-analytics-row ${group.answered ? '' : 'is-empty'}">
                    <span>${escapeHtml(group.label)}</span>
                    <strong>${escapeHtml(answeredText)}</strong>
                    <em>${escapeHtml(pct)}</em>
                </div>
            `;
        }).join('');
    return `
        <section class="plan-analytics-card">
            <div class="plan-section-heading">
                <div>
                    <p class="plan-kicker">${escapeHtml(t('planAnalyticsKicker', { week: info.weekIndex + 1 }))}</p>
                    <h3>${escapeHtml(t('planAnalyticsTitle'))}</h3>
                </div>
                <span class="plan-pill">${stats.correct}/${stats.answered || 0}</span>
            </div>
            <div class="plan-analytics-summary">
                <div>
                    <span>${escapeHtml(t('planAnalyticsAccuracy'))}</span>
                    <strong>${stats.answered ? `${stats.accuracy}%` : '-'}</strong>
                </div>
                <div>
                    <span>${escapeHtml(t('planAnalyticsAnswered'))}</span>
                    <strong>${stats.answered}/${stats.total}</strong>
                </div>
                <div>
                    <span>${escapeHtml(t('planAnalyticsListening'))}</span>
                    <strong>${stats.listeningAnswered ? `${stats.listeningAccuracy}%` : '-'}</strong>
                </div>
                <div>
                    <span>${escapeHtml(t('planAnalyticsReading'))}</span>
                    <strong>${stats.readingAnswered ? `${stats.readingAccuracy}%` : '-'}</strong>
                </div>
            </div>
            <div class="plan-weakness-panel">
                <span>${escapeHtml(t('planWeaknessTitle'))}</span>
                <strong>${escapeHtml(weakLabel)}</strong>
                <p>${escapeHtml(weakTip)}</p>
            </div>
            <div class="plan-analytics-breakdown">
                ${groupRows}
            </div>
        </section>
    `;
}

function renderRoadmap(currentWeekIndex) {
    return WEEK_PLANS.map((_, index) => {
        const week = getWeekPlan(index);
        const current = index === currentWeekIndex;
        const done = index < currentWeekIndex;
        const status = current ? t('planWeekCurrent') : done ? t('planWeekDone') : t('planWeekUpcoming');
        return `
            <div class="plan-week-card ${current ? 'current' : ''} ${done ? 'done' : ''}">
                <div class="plan-week-meta">
                    <span>${escapeHtml(t('planWeekLabel', { week: index + 1 }))}</span>
                    <span>${escapeHtml(status)}</span>
                </div>
                <h4>${escapeHtml(week.title)}</h4>
                <div class="plan-week-score">${escapeHtml(week.score)}</div>
                <p>${escapeHtml(week.focus)}</p>
            </div>
        `;
    }).join('');
}

function renderPlanSummary(info, stats, streak) {
    const daysLeft = Math.max(0, PLAN_DAYS - info.dayIndex);
    const progressDeg = Math.round(stats.progressPct * 3.6);
    const currentScore = getCurrentScore();
    const targetScore = getTargetScore();
    return `
        <section class="plan-hero">
            <div class="plan-hero-main">
                <p class="plan-kicker">${escapeHtml(t('planKicker', { current: currentScore, target: targetScore }))}</p>
                <h2>${escapeHtml(t('planTitle'))}</h2>
                <p>${escapeHtml(t('planSubtitle', { current: currentScore, target: targetScore }))}</p>
            </div>
            <div class="plan-progress-ring" style="--progress-deg: ${progressDeg}deg;">
                <span>${stats.progressPct}%</span>
                <small>${escapeHtml(t('planTotalProgress'))}</small>
            </div>
        </section>

        <section class="plan-score-strip">
            <div>
                <span>${escapeHtml(t('planStartScore'))}</span>
                <strong>${currentScore}</strong>
            </div>
            <div>
                <span>${escapeHtml(t('planTodayDay', { day: info.dayIndex }))}</span>
                <strong>${escapeHtml(info.week.score)}</strong>
            </div>
            <div>
                <span>${escapeHtml(t('planTargetScore'))}</span>
                <strong>${targetScore}</strong>
            </div>
        </section>

        <section class="plan-stats-grid">
            <div class="plan-stat">
                <span>${escapeHtml(t('planCurrentWeek'))}</span>
                <strong>${info.weekIndex + 1}/12</strong>
            </div>
            <div class="plan-stat">
                <span>${escapeHtml(t('planWeekProgress'))}</span>
                <strong>${stats.weekDone}/${stats.weekTotal}</strong>
            </div>
            <div class="plan-stat">
                <span>${escapeHtml(t('planStreak'))}</span>
                <strong>${streak}</strong>
            </div>
            <div class="plan-stat">
                <span>${escapeHtml(t('planDaysLeft'))}</span>
                <strong>${daysLeft}</strong>
            </div>
        </section>
    `;
}

function renderToday(info, stats) {
    const totalMinutes = stats.todayTasks.reduce((sum, task) => sum + task.minutes, 0);
    const questionTotals = getModeQuestionTotals();
    return `
        <section class="plan-section">
            <div class="plan-section-heading">
                <div>
                    <p class="plan-kicker">${escapeHtml(formatPlanDate(info.currentDate))}</p>
                    <h3>${escapeHtml(t('planTodayTitle'))}</h3>
                </div>
                <span class="plan-pill">${stats.todayDone}/${stats.todayTasks.length}</span>
            </div>
            <div class="plan-focus-panel">
                <div>
                    <span>${escapeHtml(t('planWeekLabel', { week: info.weekIndex + 1 }))}</span>
                    <strong>${escapeHtml(info.week.title)}</strong>
                </div>
                <p>${escapeHtml(info.week.focus)}</p>
            </div>
            <div class="plan-mode-switch" role="group" aria-label="${escapeHtml(t('planCommuteMode'))}">
                ${renderCommuteModes()}
            </div>
            <div class="plan-total-time">
                ${escapeHtml(t('planTodayMinutes', { minutes: totalMinutes }))}
                <span>${escapeHtml(t('planModeQuestionSummary', {
                    listening: questionTotals.listening,
                    reading: questionTotals.reading,
                    total: questionTotals.total
                }))}</span>
            </div>
            ${renderListeningDrill(info)}
            ${renderReadingDrill(info)}
            <div class="plan-task-list">
                ${stats.todayTasks.map((task) => renderTask(task, info)).join('')}
            </div>
        </section>
    `;
}

function renderMilestones(info) {
    const milestoneWeeks = [4, 8, 12];
    return `
        <section class="plan-section">
            <div class="plan-section-heading">
                <div>
                    <p class="plan-kicker">${escapeHtml(t('planMilestoneKicker'))}</p>
                    <h3>${escapeHtml(t('planMilestoneTitle'))}</h3>
                </div>
                <div class="plan-heading-actions">
                    <button class="plan-reset-btn" type="button" data-plan-edit-profile>${escapeHtml(t('planEditProfile'))}</button>
                    <button class="plan-reset-btn" type="button" data-plan-reset>${escapeHtml(t('planReset'))}</button>
                </div>
            </div>
            <div class="plan-milestone-list">
                ${milestoneWeeks.map((weekNo) => {
                    const reached = info.weekIndex + 1 >= weekNo;
                    const week = getWeekPlan(weekNo - 1);
                    return `
                        <div class="plan-milestone ${reached ? 'reached' : ''}">
                            <span>${weekNo}</span>
                            <div>
                                <strong>${escapeHtml(week.score)}</strong>
                                <p>${escapeHtml(week.focus)}</p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </section>
    `;
}

function renderProfileSetup() {
    const currentScore = getCurrentScore();
    const targetScore = getTargetScore();
    return `
        <section class="plan-setup-card">
            <p class="plan-kicker">${escapeHtml(t('planSetupKicker'))}</p>
            <h2>${escapeHtml(t('planSetupTitle'))}</h2>
            <p>${escapeHtml(t('planSetupDesc'))}</p>
            <div class="plan-setup-grid">
                <label class="plan-setup-field">
                    <span>${escapeHtml(t('planCurrentScoreInput'))}</span>
                    <select id="planCurrentScoreSelect" class="topic-input">
                        ${renderScoreOptions(currentScore)}
                    </select>
                </label>
                <label class="plan-setup-field">
                    <span>${escapeHtml(t('planTargetScoreInput'))}</span>
                    <select id="planTargetScoreSelect" class="topic-input">
                        ${renderScoreOptions(targetScore)}
                    </select>
                </label>
            </div>
            <p class="plan-setup-error hidden" id="planSetupError"></p>
            <button class="generate-btn plan-setup-submit" type="button" data-plan-save-profile>${escapeHtml(t('planBuildCustomPlan'))}</button>
        </section>
    `;
}

export function renderStudyPlan() {
    const root = document.getElementById('studyPlanApp');
    if (!root) return;
    if (!planState.loaded) {
        root.innerHTML = `<div class="plan-loading">${escapeHtml(t('loadingGenerating'))}</div>`;
        return;
    }
    if (!planState.profileReady) {
        root.innerHTML = renderProfileSetup();
        return;
    }
    const info = getCurrentPlanInfo();
    const stats = getCompletionStats(info);
    const streak = getStreak(info);
    root.innerHTML = `
        ${renderPlanSummary(info, stats, streak)}
        ${renderToday(info, stats)}
        ${renderWeeklyAnalytics(info)}
        ${renderMilestones(info)}
        <section class="plan-section plan-roadmap">
            <div class="plan-section-heading">
                <div>
                    <p class="plan-kicker">${escapeHtml(t('planRoadmapKicker'))}</p>
                    <h3>${escapeHtml(t('planRoadmapTitle'))}</h3>
                </div>
                <span class="plan-pill">${stats.doneCount}/${stats.totalCount}</span>
            </div>
            <div class="plan-week-grid">
                ${renderRoadmap(info.weekIndex)}
            </div>
        </section>
    `;
}

async function savePlanState() {
    await DB.setSetting(SETTINGS.startDate, planState.startDate);
    await DB.setSetting(SETTINGS.completions, planState.completions);
    await DB.setSetting(SETTINGS.commuteMode, planState.commuteMode);
    await DB.setSetting(SETTINGS.currentScore, planState.currentScore);
    await DB.setSetting(SETTINGS.targetScore, planState.targetScore);
    await DB.setSetting(SETTINGS.profileReady, planState.profileReady);
    await DB.setSetting(SETTINGS.listeningAnswers, planState.listeningAnswers);
    await DB.setSetting(SETTINGS.readingAnswers, planState.readingAnswers);
}

async function loadPlanState() {
    const savedStart = await DB.getSetting(SETTINGS.startDate);
    const savedCompletions = await DB.getSetting(SETTINGS.completions);
    const savedMode = await DB.getSetting(SETTINGS.commuteMode);
    const savedCurrentScore = await DB.getSetting(SETTINGS.currentScore);
    const savedTargetScore = await DB.getSetting(SETTINGS.targetScore);
    const savedProfileReady = await DB.getSetting(SETTINGS.profileReady);
    const savedListeningAnswers = await DB.getSetting(SETTINGS.listeningAnswers);
    const savedReadingAnswers = await DB.getSetting(SETTINGS.readingAnswers);
    planState.startDate = savedStart || getISODate(getLocalMidnight(new Date()));
    planState.completions = savedCompletions && typeof savedCompletions === 'object' ? savedCompletions : {};
    planState.commuteMode = COMMUTE_MODES.some((mode) => mode.id === savedMode) ? savedMode : 'standard';
    planState.currentScore = savedCurrentScore ? normalizeScore(savedCurrentScore, DEFAULT_CURRENT_SCORE) : DEFAULT_CURRENT_SCORE;
    planState.targetScore = savedTargetScore ? normalizeScore(savedTargetScore, DEFAULT_TARGET_SCORE) : DEFAULT_TARGET_SCORE;
    planState.profileReady = savedProfileReady === true;
    planState.listeningAnswers = savedListeningAnswers && typeof savedListeningAnswers === 'object' ? savedListeningAnswers : {};
    planState.readingAnswers = savedReadingAnswers && typeof savedReadingAnswers === 'object' ? savedReadingAnswers : {};
    planState.loaded = true;
    if (!savedStart) await DB.setSetting(SETTINGS.startDate, planState.startDate);
}

async function toggleTask(key) {
    planState.completions = {
        ...planState.completions,
        [key]: !planState.completions[key]
    };
    if (!planState.completions[key]) delete planState.completions[key];
    await DB.setSetting(SETTINGS.completions, planState.completions);
    renderStudyPlan();
}

async function setCommuteMode(modeId) {
    if (!COMMUTE_MODES.some((mode) => mode.id === modeId)) return;
    planState.commuteMode = modeId;
    await DB.setSetting(SETTINGS.commuteMode, modeId);
    renderStudyPlan();
}

async function saveProfileFromForm() {
    const currentEl = document.getElementById('planCurrentScoreSelect');
    const targetEl = document.getElementById('planTargetScoreSelect');
    const errorEl = document.getElementById('planSetupError');
    const currentScore = normalizeScore(currentEl?.value, DEFAULT_CURRENT_SCORE);
    const targetScore = normalizeScore(targetEl?.value, DEFAULT_TARGET_SCORE);
    if (targetScore <= currentScore) {
        if (errorEl) {
            errorEl.textContent = t('planSetupScoreError');
            errorEl.classList.remove('hidden');
        }
        return;
    }
    planState.currentScore = currentScore;
    planState.targetScore = targetScore;
    planState.profileReady = true;
    planState.startDate = getISODate(getLocalMidnight(new Date()));
    planState.completions = {};
    planState.listeningAnswers = {};
    planState.readingAnswers = {};
    await savePlanState();
    deps.setTargetScore?.(targetScore);
    renderStudyPlan();
}

function editProfile() {
    planState.profileReady = false;
    renderStudyPlan();
}

async function resetPlan() {
    if (!confirm(t('planResetConfirm'))) return;
    planState.startDate = getISODate(getLocalMidnight(new Date()));
    planState.completions = {};
    planState.listeningAnswers = {};
    planState.readingAnswers = {};
    await savePlanState();
    renderStudyPlan();
}

function playListeningAudio(button) {
    const card = button.closest('.plan-listening-card');
    const group = button.closest('.plan-listening-group');
    const audio = group?.querySelector('.plan-listening-audio') || card?.querySelector('.plan-listening-audio');
    const status = card?.querySelector('[data-listening-status]');
    if (!audio) return;
    if (status) {
        status.textContent = t('planListeningPreparing');
        status.classList.remove('hidden');
    }
    audio.currentTime = 0;
    const playPromise = audio.play();
    if (playPromise?.then) {
        playPromise
            .then(() => {
                if (status) status.textContent = t('planListeningPlaying');
            })
            .catch((error) => {
                if (status) status.textContent = t('planListeningPlaybackHint');
                console.error('Listening audio playback failed:', error);
            });
    }
}

async function chooseListeningAnswer(button) {
    const lessonId = button.dataset.listeningLesson;
    const questionId = button.dataset.listeningQuestion;
    const answer = button.dataset.listeningAnswer;
    if (!lessonId || !questionId || !answer) return;
    planState.listeningAnswers = {
        ...planState.listeningAnswers,
        [listeningAnswerKey(lessonId, questionId)]: answer
    };
    await DB.setSetting(SETTINGS.listeningAnswers, planState.listeningAnswers);
    renderStudyPlan();
    document.getElementById('planListeningCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function completeListening(dayIndex) {
    const day = Number(dayIndex);
    if (!Number.isFinite(day)) return;
    const key = taskKey(day, 'listen');
    planState.completions = {
        ...planState.completions,
        [key]: true
    };
    await DB.setSetting(SETTINGS.completions, planState.completions);
    renderStudyPlan();
    document.getElementById('planListeningCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function chooseReadingAnswer(button) {
    const lessonId = button.dataset.readingLesson;
    const questionId = button.dataset.readingQuestion;
    const answer = button.dataset.readingAnswer;
    if (!lessonId || !questionId || !answer) return;
    planState.readingAnswers = {
        ...planState.readingAnswers,
        [readingAnswerKey(lessonId, questionId)]: answer
    };
    await DB.setSetting(SETTINGS.readingAnswers, planState.readingAnswers);
    renderStudyPlan();
    document.getElementById('planReadingCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function completeReading(dayIndex) {
    const day = Number(dayIndex);
    if (!Number.isFinite(day)) return;
    const key = taskKey(day, 'reading');
    planState.completions = {
        ...planState.completions,
        [key]: true
    };
    await DB.setSetting(SETTINGS.completions, planState.completions);
    renderStudyPlan();
    document.getElementById('planReadingCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function startPracticeFromTask(button) {
    const action = button.dataset.planStart;
    const topic = button.dataset.planTopic || '';
    const targetScore = getTargetScore();
    if (action === 'listening') {
        document.getElementById('planListeningCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelector('.plan-listening-audio')?.focus({ preventScroll: true });
        return;
    }
    if (action === 'reading') {
        document.getElementById('planReadingCard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }
    if (action === 'article') {
        deps.setTargetScore?.(targetScore);
        deps.setArticleTopic?.(topic);
        deps.setPracticeMode?.('article');
        deps.switchTab?.('practice');
        document.getElementById('customTopic')?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    if (action === 'vocab') {
        deps.switchTab?.('vocab');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    if (action === 'exam') {
        deps.setTargetScore?.(targetScore);
        deps.setPracticeMode?.('exam');
        deps.switchTab?.('practice');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    if (action === 'speaking') {
        deps.setTargetScore?.(targetScore);
        deps.setPracticeMode?.('speaking');
        deps.switchTab?.('practice');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    if (action === 'history') {
        deps.switchTab?.('history');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function bindStudyPlanEvents() {
    if (eventsBound) return;
    const root = document.getElementById('studyPlanApp');
    if (!root) return;
    eventsBound = true;
    root.addEventListener('click', (event) => {
        const target = event.target instanceof Element ? event.target : event.target?.parentElement;
        if (!target) return;
        const toggleBtn = target.closest('[data-plan-toggle]');
        if (toggleBtn) {
            toggleTask(toggleBtn.dataset.planToggle).catch((error) => console.error('Toggle plan task failed:', error));
            return;
        }
        const modeBtn = target.closest('[data-plan-mode]');
        if (modeBtn) {
            setCommuteMode(modeBtn.dataset.planMode).catch((error) => console.error('Set commute mode failed:', error));
            return;
        }
        const resetBtn = target.closest('[data-plan-reset]');
        if (resetBtn) {
            resetPlan().catch((error) => console.error('Reset plan failed:', error));
            return;
        }
        const editProfileBtn = target.closest('[data-plan-edit-profile]');
        if (editProfileBtn) {
            editProfile();
            return;
        }
        const saveProfileBtn = target.closest('[data-plan-save-profile]');
        if (saveProfileBtn) {
            saveProfileFromForm().catch((error) => console.error('Save plan profile failed:', error));
            return;
        }
        const listeningPlayBtn = target.closest('[data-listening-play]');
        if (listeningPlayBtn) {
            playListeningAudio(listeningPlayBtn);
            return;
        }
        const listeningAnswerBtn = target.closest('[data-listening-answer]');
        if (listeningAnswerBtn) {
            chooseListeningAnswer(listeningAnswerBtn).catch((error) => console.error('Save listening answer failed:', error));
            return;
        }
        const listeningCompleteBtn = target.closest('[data-listening-complete]');
        if (listeningCompleteBtn && !listeningCompleteBtn.disabled) {
            completeListening(listeningCompleteBtn.dataset.listeningComplete).catch((error) => console.error('Complete listening failed:', error));
            return;
        }
        const readingAnswerBtn = target.closest('[data-reading-answer]');
        if (readingAnswerBtn) {
            chooseReadingAnswer(readingAnswerBtn).catch((error) => console.error('Save reading answer failed:', error));
            return;
        }
        const readingCompleteBtn = target.closest('[data-reading-complete]');
        if (readingCompleteBtn && !readingCompleteBtn.disabled) {
            completeReading(readingCompleteBtn.dataset.readingComplete).catch((error) => console.error('Complete reading failed:', error));
            return;
        }
        const startBtn = target.closest('[data-plan-start]');
        if (startBtn) startPracticeFromTask(startBtn);
    });
}

export async function initStudyPlan(nextDeps = {}) {
    deps = { ...deps, ...nextDeps };
    await loadPlanState();
    bindStudyPlanEvents();
    renderStudyPlan();
}
