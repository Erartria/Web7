const adjective = [
    'good',
    'funny',
    'cosy',
    'expensive',
    'cheap',
    'quirky',
    'stupid',
    'smart',
    'deaf'
]
const noun = [
    'Telephone',
    'Human',
    'House',
    'Hero',
    'Herdsman',
    'Warlock'
]

const verb = [
    'is',
    'shows',
    'adds',
    'pours',
    'drinks',
    'eats',
    'puts on'
]

const btn = document.querySelector('#submit')
const field = document.querySelector('#field')
const chat = document.createElement('div')
const createChat = function (userName, img) {
    let chat_header = document.createElement('div')
    let user = document.createElement('div')
    let user_img = document.createElement('img')
    user.className = 'chat_user'
    user_img.className = 'user_img'
    chat_header.className = 'chat_header'
    chat.className = 'chat'
    user.innerText = userName
    user_img.src = img
    user_img.width = 100
    user_img.height = 100
    user_img.alt = 'User\'s Photo'
    chat_header.prepend(user_img, user)
    chat.prepend(chat_header)
    document.body.prepend(chat)
}
const calculate = function (str) {
    let regex = /^\d\d*[\+-\/\*()\s]/
    if (regex.test(str)) {
        try {
            return eval(str)
        } catch {
            return false
        }
    }
    return  false
}
const getRandomWord = function (words) {
    return words[Math.floor(Math.random() * words.length)];
};
const sendMessage = function (message_content, user, time) {
    let message = document.createElement('div')
    let content = document.createElement('div')
    let context = document.createElement('div')
    let send_time = document.createElement('div')
    let s_user = document.createElement('div');
    let info = document.createElement('div')
    let full_time = document.createElement('time')
    let send_date = document.createElement('div')

    info.className = 'info'
    context.className = 'context'
    message.className = 'message'
    full_time.className = 'full_time'
    content.className = 'content'
    send_time.className = 'send_time'
    send_date.className = 'send_date'
    s_user.className = 'user'

    context.innerText = message_content
    full_time.dateTime = time
    send_date.innerText = time.getDate() + '.' + time.getMonth()
    send_time.innerText =  time.getHours() + ':' + time.getMinutes()
    s_user.innerText = user
    if (user === 'You') {
        message.style.cursor = 'pointer';
    }
    info.append(send_date, send_time, full_time)
    content.append(context, info)
    message.append(s_user, content)
    chat.append(message)
    return message
}
createChat('BOT', 'img/Gallery/Code-1.jpg')
btn.addEventListener('click', function () {
    let f_value = field.value
    let str = f_value.replace(/\s+/g, '');
    

    if (str !== '') {
        sendMessage(f_value, 'You', new Date())
            .addEventListener('click', function () {

                if (this.classList.contains('selected')) {
                    this.firstChild.remove()
                    this.classList.remove('selected')
                } else {
                    let remove_btn = document.createElement('a')
                    remove_btn.className = 'remove_btn'
                    remove_btn.innerHTML = 'x'
                    this.classList.add('selected')
                    remove_btn.addEventListener('click', function () {
                        chat.removeChild(this.parentElement)
                    })
                    this.prepend(remove_btn)
                }
            })
        let bot_text = getRandomWord(noun) + ' ' + getRandomWord(verb) + ' ' + getRandomWord(adjective) + ' ' + getRandomWord(noun).toLowerCase()

        let calculation = calculate(chat.lastChild.childNodes[1].childNodes[0].textContent)
        if (calculation !== false)
            sendMessage('Calculated: ' + calculation , chat.firstChild.lastChild.textContent, new Date())
        else
            sendMessage(bot_text, chat.firstChild.lastChild.textContent, new Date())
        location.href = '#submit'
    }
})

document.addEventListener('keydown', function (evt) {
    if (evt.code === 'Enter') {
        btn.click()
    }
})

