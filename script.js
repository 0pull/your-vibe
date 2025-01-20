// Получаем элементы кнопок и фона
const buttons = document.querySelectorAll('.button');
const background = document.querySelector('.background');

// Цвета для фона
const colors = {
    green: '#32cd32', // Зеленый
    blue: '#1e90ff',  // Морской синий
    red: '#ff4500'    // Яркий красный
};

// Обработчики событий для кнопок
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        const color = button.classList[1]; // green, blue или red
        background.style.setProperty('--bg-color', colors[color]); // Меняем цвет фона
    });

    button.addEventListener('mouseleave', () => {
        background.style.setProperty('--bg-color', '#8a2be2'); // Возвращаем фиолетовый
    });
});

// Создаем символы для фона
function createSymbol() {
    const symbol = document.createElement('div');
    symbol.classList.add('symbol');
    symbol.innerHTML = '✧';
    symbol.style.position = 'absolute';
    symbol.style.left = `${Math.random() * 100}%`;
    symbol.style.top = `${Math.random() * 100}%`;
    symbol.style.fontSize = `${Math.random() * 20 + 10}px`;
    symbol.style.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
    symbol.style.opacity = Math.random();
    background.appendChild(symbol);

    // Анимация символов
    const duration = Math.random() * 10 + 5;
    symbol.animate(
        [
            { transform: 'scale(1)', opacity: 0 },
            { transform: 'scale(1.5)', opacity: 1 },
            { transform: 'scale(1)', opacity: 0 }
        ],
        {
            duration: duration * 1000,
            iterations: Infinity
        }
    );
}

// Создаем несколько символов
for (let i = 0; i < 50; i++) {
    createSymbol();
}