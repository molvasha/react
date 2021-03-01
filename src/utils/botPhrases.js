const botAnswers = [
  'Отстань, я робот',
  'Кто такая Сири????!!!',
  'Поговорите лучше с Алисой',
  'Прекрасная погода',
  'Который час?',
  'Я не понимаю тебя',
  'Кто здесь?!',
  'Откуда ты это знаешь?',
];

export default () => botAnswers[Math.floor(botAnswers.length * Math.random())];