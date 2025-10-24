document.addEventListener('DOMContentLoaded', () => {
  // Test suite à une erreur de console
  console.log("cursor.js chargé !");

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

  // Fonction qui (ré)attache les événements quand le DOM change
  function initMailHover() {
    const copyMail = document.querySelectorAll('.mail');
    if (copyMail.length === 0) {
      console.warn("Aucun .mail trouvé (Vue n'a peut-être pas encore monté)");
      return;
    }

    copyMail.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        cursor.style.opacity = 1;
        document.body.style.cursor = 'none';
      });
      btn.addEventListener('mouseleave', () => {
        cursor.style.opacity = 0;
        document.body.style.cursor = 'auto';
      });
      btn.addEventListener('click', () => {
        const mailText = btn.textContent;
        navigator.clipboard.writeText(mailText)
          .then(() => {
            btn.textContent = "C'est copié :)";
            setTimeout(() => {
              btn.textContent = mailText;
            }, 1800);
          });
      });
    });
  }

  // Attendre un peu que Vue load
  setTimeout(initMailHover, 1000);
});