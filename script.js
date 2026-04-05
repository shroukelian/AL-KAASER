let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlideIndex++;
    if (currentSlideIndex > slides.length) { currentSlideIndex = 1 }
    
    slides[currentSlideIndex - 1].classList.add('active');
    dots[currentSlideIndex - 1].classList.add('active');
    
    setTimeout(showSlides, 5000); // تغيير السلايد كل 5 ثواني
}

showSlides();

// --- تفعيل أنيميشن الظهور عند السكرول ---
const revealElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 }); // يبدأ الأنيميشن لما يظهر 10% من العنصر

    // استهداف كل العناصر التي تحمل كلاس reveal
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el);
    });
};

// تشغيل الوظيفة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', revealElements);

// إضافة تأثير سموث سكرول للينكات المنيو
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function toggleMobileMenu() {
    document.getElementById('side-nav').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
    
    // منع السكرول لما المنيو تفتح
    if (document.getElementById('side-nav').classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}