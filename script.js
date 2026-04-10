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

// بيانات المنتجات التفصيلية (مستخرجة من ملف الـ PDF والبروفايل)
const energyProducts = {
    'oil': {
        title: 'تجارة النفط الخام',
        tag: 'قطاع التجارة الدولية',
        desc: 'نعمل كشريك موثوق في سلسلة توريد النفط والغاز، حيث نوفر منتجات عالية الجودة لمختلف التطبيقات الصناعية عبر شبكة توريد عالمية تضمن كفاءة الوصول والاستدامة.'
    },
    'diesel': {
        title: 'تجارة الديزل (باسيفيك)',
        tag: 'باسيفيك لتجارة الديزل',
        desc: 'متخصصون في توريد وتوزيع وقود الديزل بجودة عالية، مع التركيز على تلبية احتياجات قطاعات النقل والإنشاءات والطاقة في دولة الإمارات العربية المتحدة.'
    },
    'lng': {
        title: 'الغاز الطبيعي المسال (LNG)',
        tag: 'الغاز المسال والبيئة',
        desc: 'نساهم في توفير حلول الغاز الطبيعي المسال كوقود نظيف ومستدام، مما يدعم توجهات الدولة في تقليل الانبعاثات الكربونية وتحقيق أمن الطاقة.'
    },
    'jetfuel': {
        title: 'وقود الطائرات',
        tag: 'الخدمات اللوجستية للطيران',
        desc: 'نعمل على تأمين إمدادات وقود الطائرات وفق المعايير الدولية الصارمة، لخدمة قطاع الطيران المتنامي وربط الأسواق العالمية بكفاءة.'
    },
    'solar': {
        title: 'الطاقة الشمسية والنظيفة',
        tag: 'Eco Sustainability',
        desc: 'نبتكر في حلول الطاقة المتجددة من خلال "بوابة السواعد الخضراء"، عبر تصميم أنظمة طاقة شمسية ذكية تساهم في خفض التكاليف التشغيلية وحماية البيئة.'
    }
};

function showProductDetails(id) {
    const product = energyProducts[id];
    const modal = document.getElementById('details-modal');
    const contentArea = document.getElementById('modal-content-area');

    contentArea.innerHTML = `
        <div class="modal-content-wrap">
            <span class="modal-tag">${product.tag}</span>
            <h2>${product.title}</h2>
            <p>${product.desc}</p>
            <button class="btn-gold-pro" style="margin-top:30px; width:100%;" onclick="closeProductDetails()">إغلاق</button>
        </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // منع سكرول الصفحة خلف النافذة
}

function closeProductDetails() {
    document.getElementById('details-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}


function showSlides() {
    // السطر ده هو اللي هيحل الأيرور (لو مفيش سلايدات في الصفحة، اخرج من الوظيفة)
    if (slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlideIndex++;
    if (currentSlideIndex > slides.length) { currentSlideIndex = 1 }
    
    // التأكد من أن العنصر موجود قبل الوصول لخصائصه
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
    
    setTimeout(showSlides, 5000);
}

// تشغيل الوظيفة
showSlides();

// وظيفة الدفع (للتجربة)
function handlePayment() {
    alert("سيتم توجيهك الآن لبوابة الدفع الآمنة لسداد 500 درهم رسوم التسجيل.");
}

document.addEventListener('DOMContentLoaded', function() {
    // ابحث عن كل اللينكات اللي بتودي للايميل
    const contactLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // منع المتصفح من التصرف العادي
            e.preventDefault();
            // فتح تطبيق الإيميل يدوياً
            window.location.href = "mailto:info@alkaaser.ae";
        });
    });
});