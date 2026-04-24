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

// Selectăm direct imaginea folosind clasa ei
const bannerImg = document.querySelector('.bannerp'); 

if (bannerImg) {
    bannerImg.addEventListener('mousemove', (e) => {
        const { offsetWidth: width, offsetHeight: height } = bannerImg;
        const { offsetX: x, offsetY: y } = e;

        // Efect de translație ușoară
        const moveX = (x / width - 0.5) * 15;
        const moveY = (y / height - 0.5) * 15;

        bannerImg.style.transform = `scale(1.05) translate(${moveX}px, ${moveY}px)`;
        bannerImg.style.transition = 'transform 0.1s ease-out'; // Mișcare fluidă
    });

    bannerImg.addEventListener('mouseleave', () => {
        bannerImg.style.transform = 'scale(1) translate(0, 0)';
        bannerImg.style.transition = 'transform 0.5s ease';
    });
}

const dots = document.querySelectorAll('.dot');
const items = document.querySelectorAll('.testimonial-item');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        // Șterge clasa active de peste tot
        dots.forEach(d => d.classList.remove('active'));
        items.forEach(item => item.classList.remove('active'));

        // Adaugă la cel pe care s-a dat click
        dot.classList.add('active');
        items[index].classList.add('active');
    });
});

 document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
    });
});

 

const form = document.getElementById('consultationForm');

function setError(inputId, errId, show) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errId);

    if (show) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        err.classList.add('visible');
    } else {
        input.classList.remove('invalid');
        input.classList.add('valid');
        err.classList.remove('visible');
    }

    return !show;
}

// Validare live la ieșire din câmp
['nume', 'prenume', 'telefon', 'email'].forEach(id => {
    document.getElementById(id).addEventListener('blur', function () {
        validateField(id);
    });
});

function validateField(id) {
    const val = document.getElementById(id).value.trim();

    if (id === 'nume') return setError('nume', 'err-nume', !val);
    if (id === 'prenume') return setError('prenume', 'err-prenume', !val);
    if (id === 'telefon') return setError('telefon', 'err-telefon', !/^\d{6,}$/.test(val));
    if (id === 'email') return setError('email', 'err-email', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const ok = ['nume', 'prenume', 'telefon', 'email']
        .map(id => validateField(id))
        .every(Boolean);

    if (!ok) return;

    const consultatii = JSON.parse(localStorage.getItem('consultatii') || '[]');

    consultatii.push({
        nume: document.getElementById('nume').value,
        prenume: document.getElementById('prenume').value,
        telefon: document.getElementById('telefon').value,
        email: document.getElementById('email').value,
        data: new Date().toLocaleString()
    });

    localStorage.setItem('consultatii', JSON.stringify(consultatii));

    const json = JSON.stringify(consultatii, null, 4);

    const a = document.createElement("a");
    a.href = "data:text/json;charset=utf-8," + encodeURIComponent(json);
    a.download = "consultatii.json";
    a.click();
});