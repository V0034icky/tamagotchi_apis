document.addEventListener('click', e => {
  const heart = e.target.closest('.heart-icon');
  if (!heart) return;
  heart.classList.toggle('active');
});
