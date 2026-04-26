const YANDEX_API_KEY = 'AQVNylvtTny9OK1iyHtyGFwGzGdlX4ONyXeSyrAh';

const YANDEX_FOLDER_ID = 'ajets891ge4jmtsd0hpu';

const YANDEX_API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';



const SYSTEM_PROMPT = `Ты — бот-помощник по афише Ростова-на-Дону на 26 апреля 2026 года.



Актуальные события:

1. Джаз на Дону — 26 апреля, 17:00, Набережная, вход свободный

2. Мастер-класс по донской росписи — 26 апреля, 14:00, Дом ремёсел, ул. Горького, 95, 600₽

3. Концерт «Ночные гитары» — 28 апреля, 19:00, Клуб «Арена», Б. Садовая, 105, от 1500₽

4. Выставка «Южный модерн» — до 15 мая, Музей ИЗО, пр. Чехова, 60, 400₽

5. Фестиваль донской кухни — 1–3 мая, Парк Левобережный, вход свободный

6. Спектакль «Вишнёвый сад» — 30 апреля, 18:00, Театр драмы, от 800₽

7. Кино под открытым небом — 27 апреля, 20:00, Парк Горького, бесплатно

8. Йога на рассвете — 26 апреля, 6:00, пляж «Прибой», Левый берег, 300₽

9. Лекция «Архитектура Ростова» — 29 апреля, 15:00, Донская библиотека, Пушкинская, 175, бесплатно

10. Детский спектакль «Колобок» — 27 апреля, 11:00, Театр кукол, Университетская, 52, 500₽

11. Выставка ретро-автомобилей — 26 апреля, 10:00–20:00, Площадь Советов, бесплатно

12. Концерт «Симфония весны» — 2 мая, 19:00, Филармония, Б. Садовая, 170, от 1200₽



Отвечай кратко, дружелюбно, с эмодзи.`;



const chatBox = document.getElementById('chat-box');

const userInput = document.getElementById('user-input');

const sendButton = document.getElementById('send-button');



let messageHistory = [{ role: 'system', text: SYSTEM_PROMPT }];



function addMessage(text, isBot = false) {

    const div = document.createElement('div');

    div.classList.add('message', isBot ? 'bot-message' : 'user-message');

    div.textContent = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    messageHistory.push({ role: isBot ? 'assistant' : 'user', text });

    if (messageHistory.length > 20) messageHistory = [messageHistory[0], ...messageHistory.slice(-19)];

}



function showTyping() {

    const div = document.createElement('div');

    div.classList.add('typing-indicator');

    div.id = 'typing-indicator';

    div.innerHTML = '<span></span><span></span><span></span>';

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

}



function removeTyping() {

    const el = document.getElementById('typing-indicator');

    if (el) el.remove();

}



async function sendToYandexGPT(userMsg) {

    try {

        const res = await fetch(YANDEX_API_URL, {

            method: 'POST',

            headers: { 'Content-Type': 'application/json', 'Authorization': `Api-Key ${YANDEX_API_KEY}`, 'x-folder-id': YANDEX_FOLDER_ID },

            body: JSON.stringify({

                modelUri: `gpt://${YANDEX_FOLDER_ID}/yandexgpt/latest`,

                completionOptions: { stream: false, temperature: 0.6, maxTokens: 500 },

                messages: messageHistory.map(m => ({ role: m.role, text: m.text }))

            })

        });

        if (!res.ok) throw new Error('API error');

        return (await res.json()).result.alternatives[0].message.text;

    } catch (e) {

        console.error(e);

        const m = userMsg.toLowerCase();

        if (m.includes('спорт') || m.includes('йога')) return 'Йога на рассвете — 26 апреля в 6:00 на пляже «Прибой», 300₽.';

        if (m.includes('дет') || m.includes('колобок')) return 'Детский спектакль «Колобок» — 27 апреля в 11:00, Театр кукол, 500₽.';

        if (m.includes('кино') || m.includes('фильм')) return 'Кино под открытым небом — 27 апреля в 20:00 в Парке Горького, бесплатно!';

        if (m.includes('лекци') || m.includes('архитектур')) return 'Лекция «Архитектура Ростова» — 29 апреля в 15:00, Донская библиотека, бесплатно.';

        if (m.includes('авто') || m.includes('ретро')) return 'Выставка ретро-автомобилей — 26 апреля на Площади Советов, с 10:00 до 20:00, бесплатно!';

        if (m.includes('симфони') || m.includes('филармон')) return 'Концерт «Симфония весны» — 2 мая в 19:00 в Филармонии, от 1200₽.';

        if (m.includes('концерт') || m.includes('музык')) return 'Джаз на Дону — сегодня в 17:00! «Ночные гитары» — 28 апреля, «Симфония весны» — 2 мая.';

        if (m.includes('сегодня') || m.includes('26')) return '26 апреля: Йога в 6:00, Ретро-авто с 10:00, Мастер-класс в 14:00, Джаз в 17:00!';

        if (m.includes('выставк')) return 'Выставки: «Южный модерн» до 15 мая в Музее ИЗО (400₽) и ретро-автомобили сегодня на Площади Советов!';

        if (m.includes('еда') || m.includes('фестиваль')) return 'Фестиваль донской кухни 1–3 мая в Парке Левобережный, вход свободный!';

        if (m.includes('театр') || m.includes('спектакль')) return '«Вишнёвый сад» 30 апреля, «Колобок» 27 апреля. Какой интересует?';

        return 'Могу рассказать о концертах, выставках, театре, кино, спорте и детских событиях. Что интересует?';

    }

}



async function handleSend() {

    const msg = userInput.value.trim();

    if (!msg) return;

    userInput.value = '';

    sendButton.disabled = true;

    userInput.disabled = true;

    addMessage(msg, false);

    showTyping();

    addMessage(await sendToYandexGPT(msg), true);

    removeTyping();

    sendButton.disabled = false;

    userInput.disabled = false;

    userInput.focus();

}



sendButton.addEventListener('click', handleSend);

userInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

messageHistory.push({ role: 'assistant', text: 'Привет! Я бот-помощник по мероприятиям Ростова-на-Дону. Спроси меня о концертах, выставках, театрах, кино, спорте или детских событиях!' });