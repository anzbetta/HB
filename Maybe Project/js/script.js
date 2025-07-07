const modal = document.getElementById('imgModal');
const modalImg = modal.querySelector('img');
const btnClose = modal.querySelector('.modal__close');

function openModal(src) {
  modalImg.src = src;
  modal.classList.add('modal--open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('modal--open');
  modalImg.src = '';
  document.body.style.overflow = '';
}

btnClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

const links = document.querySelectorAll('.menu__link[href$=".png"], .heroo__button[href$=".png"]');
links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    openModal(link.href);
  });
});

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = Array.from({ length: 120 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  dx: (Math.random() - 0.5) * 0.6, // було 0.3 — стало 0.6 для швидшого руху
  dy: (Math.random() - 0.5) * 0.6,
}));

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#FFD700';

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    s.x += s.dx;
    s.y += s.dy;

    if (s.x < 0) s.x = canvas.width;
    if (s.x > canvas.width) s.x = 0;
    if (s.y < 0) s.y = canvas.height;
    if (s.y > canvas.height) s.y = 0;
  });

  requestAnimationFrame(animateStars);
}
animateStars();

// посилання на кнопку
const btnCard = document.querySelector('.hero__button');

// елементи оверлея й контейнера
const scrollHint = document.getElementById('scrollHint');
const cardContainer = document.getElementById('cardContainer');

// шлях до картинки
const cardSrc = 'image/photo_2025-07-07_16-48-53.jpg';

// обробник кліку
btnCard.addEventListener('click', e => {
  e.preventDefault();          // блокуємо відкриття у вкладці

  // Показуємо оверлей-підказку
  scrollHint.style.display = 'flex';

  // Якщо картка ще не вставлена – додаємо
  if (!cardContainer.querySelector('img')){
    const img = document.createElement('img');
    img.src = cardSrc;
    img.alt = 'card';
    cardContainer.appendChild(img);
  }

  // слухаємо перший скрол, щоб прибрати підказку
  const onScroll = () => {
    scrollHint.style.display = 'none';
    window.removeEventListener('scroll', onScroll);
  };
  window.addEventListener('scroll', onScroll, { once:true });

  // Автоматично прокрутимо на картинку
  cardContainer.scrollIntoView({ behavior:'smooth' });
});
