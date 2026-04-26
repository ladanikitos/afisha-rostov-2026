// Глобальная база событий для карточек

window.events = [];



const YANDEX_API_KEY = 'AQVNylvtTny9OK1iyHtyGFwGzGdlX4ONyXeSyrAh';

const YANDEX_FOLDER_ID = 'ajets891ge4jmtsd0hpu';



const chatBox = document.getElementById('chat-box');

const userInput = document.getElementById('user-input');

const sendButton = document.getElementById('send-button');



let step = 'start';

let answers = { mood: '', company: '', budget: '', period: '' };



const events = [

    { name: '🧒 Детский спектакль', date: '2026-04-27T11:00', place: 'Театр кукол', price: '500₽', mood: 'с ребёнком', company: 'с семьёй', budget: 'платно', season: 'весна' },

    { name: '🎨 Детский мастер-класс', date: '2026-04-27T12:00', place: 'Дом творчества', price: '300₽', mood: 'с ребёнком', company: 'с семьёй', budget: 'платно', season: 'весна' },

    { name: '🎬 Кино под открытым небом', date: '2026-04-27T20:00', place: 'Парк Горького', price: 'бесплатно', mood: 'спокойно', company: 'любая', budget: 'бесплатно', season: 'весна' },

    { name: '🍜 Гастротур', date: '2026-04-27T13:00', place: 'Набережная', price: '1500₽', mood: 'спокойно', company: 'любая', budget: 'платно', season: 'весна' },

    { name: '🤘 Рок-вечеринка', date: '2026-04-27T21:00', place: 'Клуб «Подземка»', price: '800₽', mood: 'тусить', company: 'с друзьями', budget: 'платно', season: 'весна' },

    { name: '🏋️ Функциональный тренинг', date: '2026-04-27T09:00', place: 'Фитнес-парк', price: 'бесплатно', mood: 'тренировка', company: 'одному', budget: 'бесплатно', season: 'весна' },

    { name: '🎸 Ночные гитары', date: '2026-04-28T19:00', place: 'Клуб «Арена»', price: 'от 1500₽', mood: 'тусить', company: 'любая', budget: 'платно', season: 'весна' },

    { name: '😂 Stand-up вечер', date: '2026-04-28T20:00', place: 'Клуб «Смех»', price: '600₽', mood: 'тусить', company: 'с друзьями', budget: 'платно', season: 'весна' },

    { name: '🍷 Винотека', date: '2026-04-28T18:00', place: 'Ресторан «Тихий Дон»', price: '2000₽', mood: 'спокойно', company: 'вдвоём', budget: 'платно', season: 'весна' },

    { name: '🥊 Бокс на воздухе', date: '2026-04-28T10:00', place: 'Парк Горького', price: 'бесплатно', mood: 'тренировка', company: 'одному', budget: 'бесплатно', season: 'весна' },

    { name: '🤸 Детская йога', date: '2026-04-28T10:00', place: 'Студия «Лотос»', price: '400₽', mood: 'с ребёнком', company: 'с семьёй', budget: 'платно', season: 'весна' },

    { name: '📷 Мастер-класс фото', date: '2026-04-28T16:00', place: 'Фотошкола «Кадр»', price: '900₽', mood: 'культурно', company: 'одному', budget: 'платно', season: 'весна' },

    { name: '🌙 Ночь короткометражек', date: '2026-04-29T21:00', place: 'Кинотеатр «Ростов»', price: '350₽', mood: 'спокойно', company: 'любая', budget: 'платно', season: 'весна' },

    { name: '🎶 Живая музыка', date: '2026-04-29T20:00', place: 'Бар «Винил»', price: 'бесплатно', mood: 'культурно', company: 'любая', budget: 'бесплатно', season: 'весна' },

    { name: '🏛 Лекция об архитектуре', date: '2026-04-29T15:00', place: 'Донская библиотека', price: 'бесплатно', mood: 'культурно', company: 'одному', budget: 'бесплатно', season: 'весна' },

    { name: '🚴 Велотренировка', date: '2026-04-29T10:00', place: 'Парк Горького', price: 'бесплатно', mood: 'тренировка', company: 'с друзьями', budget: 'бесплатно', season: 'весна' },

    { name: '🕺 Танцы на набережной', date: '2026-04-30T19:00', place: 'Набережная', price: 'бесплатно', mood: 'тусить', company: 'с друзьями', budget: 'бесплатно', season: 'весна' },

    { name: '🎭 Вишнёвый сад', date: '2026-04-30T18:00', place: 'Театр драмы', price: 'от 800₽', mood: 'культурно', company: 'любая', budget: 'платно', season: 'весна' },

    { name: '🚲 Велоквест', date: '2026-05-01T11:00', place: 'Парк Горького', price: 'бесплатно', mood: 'тусить', company: 'с друзьями', budget: 'бесплатно', season: 'весна' },

    { name: '🍷 Фестиваль донской кухни', date: '2026-05-01T12:00', place: 'Парк Левобережный', price: 'бесплатно', mood: 'тусить', company: 'с друзьями', budget: 'бесплатно', season: 'весна' },

    { name: '🎻 Симфония весны', date: '2026-05-02T19:00', place: 'Филармония', price: 'от 1200₽', mood: 'культурно', company: 'любая', budget: 'платно', season: 'весна' },

    { name: '🖼 Выставка «Южный модерн»', date: '2026-05-15T10:00', place: 'Музей ИЗО', price: '400₽', mood: 'культурно', company: 'любая', budget: 'платно', season: 'весна' },

    { name: '🎵 Open-air фестиваль', date: '2026-06-15T16:00', place: 'Зелёный театр', price: 'от 2000₽', mood: 'тусить', company: 'с друзьями', budget: 'платно', season: 'лето' },

    { name: '🏖 Пляжная вечеринка', date: '2026-07-05T21:00', place: 'Пляж «Прибой»', price: 'бесплатно', mood: 'тусить', company: 'с друзьями', budget: 'бесплатно', season: 'лето' },

    { name: '🍦 Фестиваль мороженого', date: '2026-07-12T12:00', place: 'Парк Левобережный', price: 'бесплатно', mood: 'с ребёнком', company: 'с семьёй', budget: 'бесплатно', season: 'лето' },

    { name: '🎪 Цирк на воде', date: '2026-07-20T18:00', place: 'Цирк на Набережной', price: 'от 1000₽', mood: 'с ребёнком', company: 'с семьёй', budget: 'платно', season: 'лето' },

    { name: '🌅 Йога на закате', date: '2026-08-01T19:00', place: 'Набережная', price: 'бесплатно', mood: 'спокойно', company: 'одному', budget: 'бесплатно', season: 'лето' },

    { name: '🎬 Летний кинотеатр', date: '2026-08-10T20:00', place: 'Парк Горького', price: 'бесплатно', mood: 'спокойно', company: 'любая', budget: 'бесплатно', season: 'лето' },

    { name: '🚣 Сап-прогулки', date: '2026-08-15T10:00', place: 'Левый берег', price: '800₽', mood: 'тренировка', company: 'одному', budget: 'платно', season: 'лето' },

    { name: '🎆 День города', date: '2026-09-20T12:00', place: 'Весь город', price: 'бесплатно', mood: 'тусить', company: 'любая', budget: 'бесплатно', season: 'осень' },

    { name: '📚 Книжная ярмарка', date: '2026-09-25T10:00', place: 'Публичная библиотека', price: 'бесплатно', mood: 'спокойно', company: 'одному', budget: 'бесплатно', season: 'осень' },

    { name: '🏃 Осенний марафон', date: '2026-09-28T09:00', place: 'Набережная', price: 'бесплатно', mood: 'тренировка', company: 'одному', budget: 'бесплатно', season: 'осень' },

    { name: '🎷 Джазовый фестиваль', date: '2026-10-10T19:00', place: 'Филармония', price: 'от 1500₽', mood: 'культурно', company: 'любая', budget: 'платно', season: 'осень' },

    { name: '🍁 Осенний бал', date: '2026-10-15T18:00', place: 'Дом офицеров', price: '1000₽', mood: 'культурно', company: 'вдвоём', budget: 'платно', season: 'осень' },

    { name: '🧒 Детский праздник урожая', date: '2026-10-18T12:00', place: 'Парк Горького', price: 'бесплатно', mood: 'с ребёнком', company: 'с семьёй', budget: 'бесплатно', season: 'осень' },

    { name: '🎃 Хэллоуин-вечеринка', date: '2026-10-31T21:00', place: 'Клуб «Арена»', price: '1200₽', mood: 'тусить', company: 'с друзьями', budget: 'платно', season: 'осень' },

    { name: '🎨 Ночь искусств', date: '2026-11-04T18:00', place: 'Музеи города', price: 'бесплатно', mood: 'культурно', company: 'любая', budget: 'бесплатно', season: 'осень' },

    { name: '🍷 Винный фестиваль', date: '2026-11-20T18:00', place: 'Ресторан «Тихий Дон»', price: '2500₽', mood: 'спокойно', company: 'вдвоём', budget: 'платно', season: 'осень' },

    { name: '🎄 Новогодняя ярмарка', date: '2026-12-20T10:00', place: 'Площадь Советов', price: 'бесплатно', mood: 'тусить', company: 'любая', budget: 'бесплатно', season: 'зима' },

    { name: '🎅 Детская ёлка', date: '2026-12-25T11:00', place: 'Театр кукол', price: '500₽', mood: 'с ребёнком', company: 'с семьёй', budget: 'платно', season: 'зима' },

    { name: '⛸ Каток на Набережной', date: '2027-01-10T10:00', place: 'Набережная', price: '300₽', mood: 'тусить', company: 'с друзьями', budget: 'платно', season: 'зима' },

    { name: '🎶 Зимний бал', date: '2027-01-20T18:00', place: 'Филармония', price: 'от 2000₽', mood: 'культурно', company: 'вдвоём', budget: 'платно', season: 'зима' },

    { name: '🎿 Лыжная трасса', date: '2027-02-01T09:00', place: 'Парк Левобережный', price: 'бесплатно', mood: 'тренировка', company: 'одному', budget: 'бесплатно', season: 'зима' },

    { name: '☕ Фестиваль горячего шоколада', date: '2027-02-14T12:00', place: 'Парк Горького', price: 'бесплатно', mood: 'спокойно', company: 'любая', budget: 'бесплатно', season: 'зима' },

];



window.events = events;



function addMessage(text, isBot = false, buttons = null) {

    const div = document.createElement('div');

    div.classList.add('message', isBot ? 'bot-message' : 'user-message');

    div.innerHTML = text.replace(/\n/g, '<br>');

    if (buttons && isBot) {

        const bc = document.createElement('div');

        bc.classList.add('chat-buttons');

        buttons.forEach(b => {

            const btn = document.createElement('button');

            btn.classList.add('chat-btn');

            btn.textContent = b.label;

            btn.addEventListener('click', () => { addMessage(b.label, false); handleMessage(b.value); });

            bc.appendChild(btn);

        });

        div.appendChild(bc);

    }

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

}



function showTyping() {

    const d = document.createElement('div');

    d.classList.add('typing-indicator');

    d.id = 'typing-indicator';

    d.innerHTML = '<span></span><span></span><span></span>';

    chatBox.appendChild(d);

    chatBox.scrollTop = chatBox.scrollHeight;

}

function removeTyping() { const e = document.getElementById('typing-indicator'); if (e) e.remove(); }

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }



function getDateRange(period) {

    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

    if (period === 'сегодня') return { start: today, end: tomorrow };

    if (period === 'завтра') return { start: tomorrow, end: new Date(tomorrow.getTime() + 86400000) };

    if (period === 'выходные') {

        const weekendEnd = new Date(today); weekendEnd.setDate(today.getDate() + (7 - today.getDay()));

        return { start: today, end: weekendEnd };

    }

    return null;

}



function findEvents(mood, company, budget, period) {

    let filtered = [...events];

    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const seasons = ['весна', 'лето', 'осень', 'зима'];

    

    if (period && seasons.includes(period)) {

        filtered = filtered.filter(e => e.season === period);

    } else if (period && ['сегодня', 'завтра', 'выходные'].includes(period)) {

        const range = getDateRange(period);

        filtered = filtered.filter(e => { const d = new Date(e.date); return d >= range.start && d < range.end; });

    }

    

    if (!period || period === 'весь год') {

        filtered = filtered.filter(e => { const d = new Date(e.date); return d >= today; });

    }

    

    if (company) filtered = filtered.filter(e => e.company === company || e.company === 'любая');

    if (budget === 'бесплатно') filtered = filtered.filter(e => e.budget === 'бесплатно');

    else if (budget === 'недорого') filtered = filtered.filter(e => e.price.includes('бесплатно') || e.price.includes('300') || e.price.includes('350') || e.price.includes('400') || e.price.includes('500') || e.price.includes('600'));

    

    return filtered.length === 0 ? [] : filtered.slice(0, 5);

}



function formatResult(list) {

    if (list.length === 0) return '😔 На этот период пока нет событий.\n\nПопробуй выбрать другие параметры!';

    let r = '🎯 Вот что я подобрал:\n\n';

    list.forEach((e, i) => {

        const d = new Date(e.date);

        const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

        const hours = String(d.getHours()).padStart(2, '0');

        const minutes = String(d.getMinutes()).padStart(2, '0');

        const timeStr = (hours === '00' && minutes === '00') ? '' : `, ${hours}:${minutes}`;

        r += `${i+1}. ${e.name} <span class="chat-fav" data-event="${e.name}" style="cursor:pointer;color:#888;font-size:1.2rem;">☆</span>\n   📅 ${d.getDate()} ${months[d.getMonth()]}${timeStr}\n   📍 ${e.place}\n   💰 ${e.price}\n\n`;

    });

    r += '✨ Хочешь новую подборку?';

    return r;

}



async function handleMessage(text) {

    if (!text) return;

    showTyping();

    await sleep(400);

    if (text === 'сброс') {

        step = 'start'; answers = { mood: '', company: '', budget: '', period: '' };

        removeTyping();

        addMessage('🔄 Начинаем заново! Какое настроение?', true, [

            { label: '🎉 Потусить', value: 'тусить' }, { label: '🧘 Спокойно', value: 'спокойно' }, { label: '🎨 Культурно', value: 'культурно' },

            { label: '🧒 С ребёнком', value: 'с ребёнком' }, { label: '💪 Тренировка', value: 'тренировка' }

        ]);

        return;

    }

    if (step === 'start' || step === 'mood') {

        const moods = ['тусить','спокойно','культурно','с ребёнком','тренировка'];

        if (moods.includes(text)) {

            answers.mood = text; step = 'period';

            const p = {'тусить':'🎉 Отлично!','спокойно':'🧘 Хороший выбор!','культурно':'🎨 Прекрасно!','с ребёнком':'🧒 Супер!','тренировка':'💪 Спорт — сила!'};

            removeTyping();

            addMessage(p[text], true);

            addMessage('📅 На какой период?', true, [

                { label: '📍 Сегодня', value: 'сегодня' }, { label: '📍 Завтра', value: 'завтра' }, { label: '📍 Выходные', value: 'выходные' },

                { label: '🌸 Весна', value: 'весна' }, { label: '☀️ Лето', value: 'лето' }, { label: '🍂 Осень', value: 'осень' },

                { label: '❄️ Зима', value: 'зима' }, { label: '🌍 Весь год', value: 'весь год' }

            ]);

            return;

        }

        step = 'mood';

        removeTyping();

        addMessage('😊 Выбери настроение:', true, [

            { label: '🎉 Потусить', value: 'тусить' }, { label: '🧘 Спокойно', value: 'спокойно' }, { label: '🎨 Культурно', value: 'культурно' },

            { label: '🧒 С ребёнком', value: 'с ребёнком' }, { label: '💪 Тренировка', value: 'тренировка' }

        ]);

        return;

    }

    if (step === 'period') {

        const periods = ['сегодня','завтра','выходные','весна','лето','осень','зима','весь год'];

        if (periods.includes(text)) {

            answers.period = text === 'весь год' ? '' : text; step = 'company';

            removeTyping();

            addMessage('❓ С кем идёшь?', true, [

                { label: '🧍 Один/одна', value: 'одному' }, { label: '👫 Вдвоём', value: 'вдвоём' },

                { label: '👥 С друзьями', value: 'с друзьями' }, { label: '👨‍👩‍👧 С семьёй', value: 'с семьёй' }

            ]);

            return;

        }

        removeTyping();

        addMessage('📅 Выбери период:', true, [

            { label: '📍 Сегодня', value: 'сегодня' }, { label: '📍 Завтра', value: 'завтра' }, { label: '📍 Выходные', value: 'выходные' },

            { label: '🌸 Весна', value: 'весна' }, { label: '☀️ Лето', value: 'лето' }, { label: '🍂 Осень', value: 'осень' },

            { label: '❄️ Зима', value: 'зима' }, { label: '🌍 Весь год', value: 'весь год' }

        ]);

        return;

    }

    if (step === 'company') {

        const companies = ['одному','вдвоём','с друзьями','с семьёй'];

        if (companies.includes(text)) {

            answers.company = text; step = 'budget';

            removeTyping();

            addMessage('💰 Какой бюджет?', true, [

                { label: '🆓 Бесплатно', value: 'бесплатно' }, { label: '💸 Недорого', value: 'недорого' }, { label: '💎 Не важно', value: 'любой' }

            ]);

            return;

        }

        removeTyping();

        addMessage('🤔 Выбери компанию:', true, [

            { label: '🧍 Один/одна', value: 'одному' }, { label: '👫 Вдвоём', value: 'вдвоём' },

            { label: '👥 С друзьями', value: 'с друзьями' }, { label: '👨‍👩‍👧 С семьёй', value: 'с семьёй' }

        ]);

        return;

    }

    if (step === 'budget') {

        const budgets = ['бесплатно','недорого','любой'];

        if (budgets.includes(text)) {

            answers.budget = text; step = 'start';

            const list = findEvents(answers.mood, answers.company, answers.budget, answers.period);

            removeTyping();

            addMessage(formatResult(list), true, [{ label: '🔄 Новая подборка', value: 'сброс' }]);

            answers = { mood: '', company: '', budget: '', period: '' };

            return;

        }

        removeTyping();

        addMessage('🤔 Выбери бюджет:', true, [

            { label: '🆓 Бесплатно', value: 'бесплатно' }, { label: '💸 Недорого', value: 'недорого' }, { label: '💎 Не важно', value: 'любой' }

        ]);

        return;

    }

    step = 'mood';

    removeTyping();

    addMessage('🎯 Выбери настроение:', true, [

        { label: '🎉 Потусить', value: 'тусить' }, { label: '🧘 Спокойно', value: 'спокойно' }, { label: '🎨 Культурно', value: 'культурно' },

        { label: '🧒 С ребёнком', value: 'с ребёнком' }, { label: '💪 Тренировка', value: 'тренировка' }

    ]);

}



function onSend() {

    const m = userInput.value.trim(); if (!m) return;

    userInput.value = ''; addMessage(m, false); handleMessage(m.toLowerCase());

}

sendButton.addEventListener('click', onSend);

userInput.addEventListener('keypress', e => { if (e.key === 'Enter') onSend(); });



addMessage('👋 Привет! Я помогу найти событие в Ростове! 🔥', true);

addMessage('Выбери настроение — и начнём! 👇', true, [

    { label: '🎉 Потусить', value: 'тусить' }, { label: '🧘 Спокойно', value: 'спокойно' }, { label: '🎨 Культурно', value: 'культурно' },

    { label: '🧒 С ребёнком', value: 'с ребёнком' }, { label: '💪 Тренировка', value: 'тренировка' }

]);



function refreshFavoritesUI() {

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    const favList = document.getElementById('fav-list');

    if (!favList) return;

    if (favorites.length === 0) {

        favList.innerHTML = '<p style="color:#888;font-size:.8rem;">Нет избранных событий</p>';

    } else {

        favList.innerHTML = favorites.map(f =>

            `<div class="fav-item">${f} <button onclick="removeFromFav('${f.replace(/'/g, "\\'")}')">✕</button></div>`

        ).join('');

    }

}



function removeFromFav(eventName) {

    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    favorites = favorites.filter(f => f !== eventName);

    localStorage.setItem('favorites', JSON.stringify(favorites));

    refreshFavoritesUI();

    document.querySelectorAll('.fav-star').forEach(star => {

        if (star.dataset.event === eventName) { star.textContent = '☆'; star.classList.remove('active'); star.style.color = '#888'; }

    });

    document.querySelectorAll('.chat-fav').forEach(star => {

        if (star.dataset.event === eventName) { star.textContent = '☆'; star.style.color = '#888'; }

    });

}



chatBox.addEventListener('click', function(e) {

    if (e.target.classList.contains('chat-fav')) {

        const eventName = e.target.dataset.event;

        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

        if (favorites.includes(eventName)) {

            favorites = favorites.filter(f => f !== eventName);

            e.target.textContent = '☆';

            e.target.style.color = '#888';

        } else {

            favorites.push(eventName);

            e.target.textContent = '⭐';

            e.target.style.color = '#ffcc00';

        }

        localStorage.setItem('favorites', JSON.stringify(favorites));

        refreshFavoritesUI();

        document.querySelectorAll('.fav-star').forEach(star => {

            if (star.dataset.event === eventName) {

                star.textContent = favorites.includes(eventName) ? '⭐' : '☆';

                star.style.color = favorites.includes(eventName) ? '#ffcc00' : '#888';

                if (favorites.includes(eventName)) star.classList.add('active');

                else star.classList.remove('active');

            }

        });

    }

});



document.addEventListener('DOMContentLoaded', refreshFavoritesUI);



async function getWeather() {

    const url = 'https://api.open-meteo.com/v1/forecast?latitude=47.2221&longitude=39.7203&current=temperature_2m,weather_code&forecast_days=1';

    try { const r = await fetch(url); if (!r.ok) throw new Error('err'); updateWeatherUI(await r.json()); }

    catch { document.getElementById('weather-desc').textContent = 'Погода недоступна'; }

}

function updateWeatherUI(d) {

    document.getElementById('weather-temp').textContent = `${Math.round(d.current.temperature_2m)}°C`;

    const c = d.current.weather_code; let desc='', emoji='🌤';

    if (c===0){desc='Ясно';emoji='☀️'}else if(c<=3){desc='Переменная облачность';emoji='⛅'}else if(c<=48){desc='Облачно';emoji='☁️'}else if(c<=57){desc='Морось';emoji='🌦'}else if(c<=67){desc='Дождь';emoji='🌧'}else if(c<=77){desc='Снег';emoji='❄️'}else if(c<=82){desc='Ливень';emoji='🌧'}else if(c<=86){desc='Снегопад';emoji='❄️'}else if(c<=99){desc='Гроза';emoji='⛈'}else{desc='Туман';emoji='🌫'}

    document.getElementById('weather-desc').textContent = `Сейчас: ${desc}`;

    document.getElementById('weather-icon').textContent = emoji;

}

getWeather();

setInterval(getWeather, 1800000);