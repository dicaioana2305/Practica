document.addEventListener('DOMContentLoaded', () => {
    
    // Selectăm toate butoanele de consultanță
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Vă mulțumim pentru interes! Un consultant EstateGroup vă va contacta în cel mai scurt timp.');
        });
    });

    // Efect de schimbare fundal navbar la scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 5%';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.padding = '20px 5%';
            navbar.style.background = '#ffffff';
        }
    });

    // Animație simplă pentru apariția cardurilor
    const cards = document.querySelectorAll('.card');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
// Efect de hover pe carduri
const propertyCards = document.querySelectorAll('.property-card');

propertyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.02)';
        card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('propertySlider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let counter = 0;

    nextBtn.addEventListener('click', () => {
        const cardWidth = document.querySelector('.property-card').offsetWidth + 30; // lățime + gap
        const maxScroll = slider.scrollWidth - slider.parentElement.offsetWidth;

        if (Math.abs(counter) < maxScroll) {
            counter -= cardWidth;
            slider.style.transform = `translateX(${counter}px)`;
        } else {
            // Opțional: Revine la început dacă ajunge la final
            counter = 0;
            slider.style.transform = `translateX(0px)`;
        }
    });

    prevBtn.addEventListener('click', () => {
        const cardWidth = document.querySelector('.property-card').offsetWidth + 30;

        if (counter < 0) {
            counter += cardWidth;
            slider.style.transform = `translateX(${counter}px)`;
        }
    });
});