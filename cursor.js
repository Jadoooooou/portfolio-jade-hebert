// Effet curseur
const cursor = document.createElement('div');
cursor.classList.add('cursor');
cursor.textContent = 'copier';
document.body.appendChild(cursor);

// Suivi de la souris
document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

const copyMail = document.querySelectorAll('.mail');

copyMail.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
    document.body.style.cursor = 'none';
  });
  btn.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
    document.body.style.cursor = 'auto';
  });
});

copyMail.forEach(btn => {
  btn.addEventListener('click', () => {
    const mailText = btn.textContent;
    navigator.clipboard.writeText(mailText)
      .then(() => {
        btn.textContent = "C'est copié :)";
        setTimeout(() => {
          btn.textContent = mailText;
        }, 1800);
      })
  });
});