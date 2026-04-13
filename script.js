document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. تشغيل السلايدر (Hero Slider) ---
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    function showSlides() {
        if (slides.length === 0) return; // تأمين الكود لو مفيش سلايدر

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlideIndex++;
        if (currentSlideIndex > slides.length) { currentSlideIndex = 1 }
        
        if (slides[currentSlideIndex - 1]) slides[currentSlideIndex - 1].classList.add('active');
        if (dots[currentSlideIndex - 1]) dots[currentSlideIndex - 1].classList.add('active');
        
        setTimeout(showSlides, 5000);
    }
    showSlides();

    // --- 2. أنيميشن الظهور عند السكرول (Reveal) ---
    const revealElements = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
            observer.observe(el);
        });
    };
    revealElements();

    // --- 3. إصلاح السموث سكرول (منع الأيرور الأحمر) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // لو اللينك # بس أو فاضي، اخرج عشان ميعملش Error
            if (href === "#" || href === "") return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 4. التعامل مع لينكات الإيميل ---
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = "mailto:info@alkaaser.ae";
        });
    });

});

// --- 5. وظيفة المنيو للموبايل ---
function toggleMobileMenu() {
    const sideNav = document.getElementById('side-nav');
    const overlay = document.getElementById('overlay');
    if(sideNav && overlay) {
        sideNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sideNav.classList.contains('active') ? 'hidden' : 'auto';
    }
}

// --- 6. وظيفة تفاصيل منتجات الطاقة (Modal) ---
function showProductDetails(id) {
    const product = energyProducts[id];
    const modal = document.getElementById('details-modal');
    const contentArea = document.getElementById('modal-content-area');

    if(product && modal && contentArea) {
        contentArea.innerHTML = `
            <div class="modal-content-wrap">
                <span class="modal-tag">${product.tag}</span>
                <h2>${product.title}</h2>
                <p>${product.desc}</p>
                <button class="btn-gold-pro" style="margin-top:30px; width:100%;" onclick="closeProductDetails()">إغلاق</button>
            </div>
        `;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeProductDetails() {
    const modal = document.getElementById('details-modal');
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// بيانات منتجات الطاقة
const energyProducts = {
    'oil': { title: 'تجارة النفط الخام', tag: 'قطاع التجارة الدولية', desc: 'نعمل كشريك موثوق في توريد النفط والغاز...' },
    'diesel': { title: 'تجارة الديزل', tag: 'باسيفيك للديزل', desc: 'متخصصون في توريد وقود الديزل بجودة عالية...' },
    'lng': { title: 'الغاز المسال', tag: 'الغاز والبيئة', desc: 'توفير حلول الغاز الطبيعي المسال كوقود نظيف...' },
    'jetfuel': { title: 'وقود الطائرات', tag: 'الخدمات اللوجستية', desc: 'تأمين إمدادات وقود الطائرات وفق المعايير الدولية...' },
    'solar': { title: 'الطاقة الشمسية', tag: 'الاستدامة', desc: 'حلول الطاقة المتجددة وتصميم أنظمة طاقة ذكية...' }
};