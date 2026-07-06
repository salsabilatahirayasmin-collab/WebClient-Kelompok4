/* ============================================
   MIND CARE - Mobile App JavaScript
   Single Page Application Logic
   ============================================ */

// ============================================
// DATA & STATE
// ============================================

const MINDCARE = {
    currentUser: null,
    currentPage: 'home',
    onboardingIndex: 0,
    selectedMood: null,
    journalMood: null,
    screeningType: null,
    screeningIndex: 0,
    screeningAnswers: [],
    currentPodcast: null,
    isPlaying: false,
    playerInterval: null,
    playerTime: 0,
};

// Sample Data
const SAMPLE_DATA = {
    psikolog: [
        {
            id: 1,
            name: 'Dr. Sarah Wijaya, M.Psi.',
            specialty: 'Psikolog Klinis',
            type: 'psikolog',
            experience: '12 tahun',
            rating: 4.9,
            reviews: 128,
            bio: 'Spesialisasi dalam terapi kognitif-perilaku (CBT) untuk kecemasan dan depresi. Pendekatan hangat dan empatik.',
            price: 'Rp 250.000/sesi',
            avatar: 'SW',
        },
        {
            id: 2,
            name: 'dr. Andi Pratama, Sp.KJ',
            specialty: 'Psikiater',
            type: 'psikiater',
            experience: '8 tahun',
            rating: 4.8,
            reviews: 95,
            bio: 'Dokter spesialis kejiwaan yang menangani gangguan mood, kecemasan, dan ADHD. Pendekatan holistik.',
            price: 'Rp 350.000/sesi',
            avatar: 'AP',
        },
        {
            id: 3,
            name: 'Maya Putri, S.Psi.',
            specialty: 'Psikolog Anak & Remaja',
            type: 'psikolog',
            experience: '6 tahun',
            rating: 4.7,
            reviews: 73,
            bio: 'Berpengalaman dalam menangani masalah perkembangan anak, remaja, dan keluarga.',
            price: 'Rp 200.000/sesi',
            avatar: 'MP',
        },
        {
            id: 4,
            name: 'dr. Rina Fitriani, Sp.KJ',
            specialty: 'Psikiater Remaja',
            type: 'psikiater',
            experience: '10 tahun',
            rating: 4.9,
            reviews: 112,
            bio: 'Psikiater yang fokus pada kesehatan mental remaja dan dewasa muda.',
            price: 'Rp 300.000/sesi',
            avatar: 'RF',
        },
    ],
    articles: [
        {
            id: 1,
            title: 'Mengenal Kecemasan dan Cara Mengelolanya',
            excerpt: 'Kecemasan adalah respons alami tubuh terhadap stres. Pelajari cara mengelolanya dengan teknik sederhana.',
            category: 'Kecemasan',
            readTime: '5 menit',
            icon: 'fa-heart',
        },
        {
            id: 2,
            title: 'Pentingnya Self-Care untuk Kesehatan Mental',
            excerpt: 'Self-care bukanlah kemewahan, melainkan kebutuhan. Temukan rutinitas self-care yang cocok untukmu.',
            category: 'Self-Care',
            readTime: '4 menit',
            icon: 'fa-spa',
        },
        {
            id: 3,
            title: 'Memahami Depresi pada Remaja',
            excerpt: 'Depresi pada remaja sering tidak terdeteksi. Kenali tanda-tandanya dan cara membantu.',
            category: 'Depresi',
            readTime: '7 menit',
            icon: 'fa-book-open',
        },
        {
            id: 4,
            title: 'Teknik Mindfulness untuk Pemula',
            excerpt: 'Mindfulness dapat membantu mengurangi stres dan meningkatkan kesejahteraan mental.',
            category: 'Mindfulness',
            readTime: '6 menit',
            icon: 'fa-leaf',
        },
    ],
    podcasts: [
        {
            id: 1,
            title: 'Mindful Morning',
            host: 'Dr. Sarah Wijaya',
            duration: '15:30',
            desc: 'Mulai harimu dengan mindfulness dan afirmasi positif.',
            icon: 'fa-sun',
        },
        {
            id: 2,
            title: 'Mengatasi Overthinking',
            host: 'Maya Putri, S.Psi.',
            duration: '22:15',
            desc: 'Tips praktis menghentikan pikiran yang berputar-putar.',
            icon: 'fa-brain',
        },
        {
            id: 3,
            title: 'Parenting & Mental Health',
            host: 'dr. Rina Fitriani',
            duration: '18:45',
            desc: 'Menjaga kesehatan mental sambil mengasuh anak.',
            icon: 'fa-family',
        },
    ],
    forumPosts: [
        {
            id: 1,
            author: 'Anonim',
            category: 'remaja',
            title: 'Tips menghadapi tekanan sekolah?',
            content: 'Aku sering merasa overwhelmed dengan tugas sekolah. Ada tips untuk mengatasinya?',
            likes: 15,
            comments: 7,
            time: '2 jam lalu',
            avatar: 'A',
        },
        {
            id: 2,
            author: 'Bunda Ima',
            category: 'keluarga',
            title: 'Anak susah diajak komunikasi',
            content: 'Anakku remaja dan mulai tertutup. Bagaimana cara mendekatinya tanpa terkesan memaksa?',
            likes: 23,
            comments: 12,
            time: '5 jam lalu',
            avatar: 'BI',
        },
        {
            id: 3,
            author: 'Rizky',
            category: 'dewasa',
            title: 'Work-life balance setelah menikah',
            content: 'Susah banget bagi waktu antara kerja dan keluarga. Ada yang punya pengalaman serupa?',
            likes: 31,
            comments: 18,
            time: '1 hari lalu',
            avatar: 'R',
        },
    ],
};

// Screening Questions
const SCREENING = {
    phq9: {
        title: 'PHQ-9 (Depresi)',
        questions: [
            'Kurang minat atau kesenangan dalam melakukan sesuatu',
            'Merasa sedih, murung, atau putus asa',
            'Sulit tidur atau terlalu banyak tidur',
            'Merasa lelah atau kurang energi',
            'Nafsu makan berkurang atau makan berlebihan',
            'Merasa buruk tentang diri sendiri atau merasa gagal',
            'Sulit berkonsentrasi (membaca koran, menonton TV)',
            'Bergerak atau berbicara sangat lambat, atau sebaliknya gelisah',
            'Pikiran untuk menyakiti diri sendiri atau lebih baik mati',
        ],
        options: [
            { text: 'Tidak pernah', score: 0 },
            { text: 'Beberapa hari', score: 1 },
            { text: 'Lebih dari seminggu', score: 2 },
            { text: 'Hampir setiap hari', score: 3 },
        ],
        interpret: (score) => {
            if (score <= 4) return { level: 'Minimal', icon: 'success', desc: 'Skor Anda menunjukkan tingkat depresi yang minimal. Terus jaga kesehatan mental Anda dengan baik.' };
            if (score <= 9) return { level: 'Ringan', icon: 'warning', desc: 'Skor Anda menunjukkan depresi ringan. Pertimbangkan untuk berbicara dengan konselor atau psikolog.' };
            if (score <= 14) return { level: 'Sedang', icon: 'warning', desc: 'Skor Anda menunjukkan depresi sedang. Disarankan untuk berkonsultasi dengan psikolog profesional.' };
            if (score <= 19) return { level: 'Sedang-Berat', icon: 'danger', desc: 'Skor Anda menunjukkan depresi sedang hingga berat. Segera cari bantuan profesional.' };
            return { level: 'Berat', icon: 'danger', desc: 'Skor Anda menunjukkan depresi berat. Sangat disarankan untuk segera berkonsultasi dengan psikiater.' };
        },
    },
    gad7: {
        title: 'GAD-7 (Kecemasan)',
        questions: [
            'Merasa gugup, cemas, atau tegang',
            'Tidak bisa berhenti khawatir atau mengontrol kekhawatiran',
            'Terlalu khawatir tentang berbagai hal',
            'Sulit untuk rileks',
            'Merasa gelisah sehingga sulit duduk diam',
            'Mudah tersinggung atau marah',
            'Merasa takut seolah sesuatu yang buruk akan terjadi',
        ],
        options: [
            { text: 'Tidak pernah', score: 0 },
            { text: 'Beberapa hari', score: 1 },
            { text: 'Lebih dari seminggu', score: 2 },
            { text: 'Hampir setiap hari', score: 3 },
        ],
        interpret: (score) => {
            if (score <= 4) return { level: 'Minimal', icon: 'success', desc: 'Skor Anda menunjukkan tingkat kecemasan yang minimal. Pertahankan kebiasaan sehat Anda.' };
            if (score <= 9) return { level: 'Ringan', icon: 'warning', desc: 'Skor Anda menunjukkan kecemasan ringan. Teknik relaksasi dan mindfulness mungkin membantu.' };
            if (score <= 14) return { level: 'Sedang', icon: 'warning', desc: 'Skor Anda menunjukkan kecemasan sedang. Disarankan untuk berkonsultasi dengan profesional.' };
            return { level: 'Berat', icon: 'danger', desc: 'Skor Anda menunjukkan kecemasan berat. Segera cari bantuan dari psikolog atau psikiater.' };
        },
    },
};

// Chatbot Responses
const CHATBOT_RESPONSES = [
    {
        keywords: ['halo', 'hai', 'hi', 'hey', 'pagi', 'siang', 'malam'],
        response: 'Halo! 👋 Ada yang bisa aku bantu hari ini? Ceritakan apa yang kamu rasakan.',
    },
    {
        keywords: ['sedih', 'menangis', 'sendiri', 'kesepian', 'hampa'],
        response: 'Aku turut sedih mendengarnya 🫂. Ingatlah bahwa tidak apa-apa untuk merasa sedih. Coba ceritakan lebih detail apa yang membuatmu merasa seperti itu?',
    },
    {
        keywords: ['cemas', 'khawatir', 'takut', 'panik', 'gelisah'],
        response: 'Kecemasan memang terasa tidak nyaman. Coba tarik napas dalam-dalam... hembuskan perlahan. Ingin kita coba latihan pernapasan bersama? Atau ceritakan apa yang membuatmu cemas?',
    },
    {
        keywords: ['stres', 'lelah', 'burnout', 'capek', 'overwhelm'],
        response: 'Kedengarannya kamu sedang melalui masa yang berat. Istirahat sejenak itu penting, ya. Coba lakukan hal kecil yang kamu nikmati, seperti minum teh hangat atau mendengarkan musik. Ingin cerita lebih lanjut?',
    },
    {
        keywords: ['marah', 'kesal', 'jengkel', 'frustrasi'],
        response: 'Merasa marah itu wajar. Yang penting adalah bagaimana kita menyalurkannya dengan sehat. Coba tarik napas, hitung 1-10, dan hembuskan perlahan. Ada yang ingin kamu bicarakan?',
    },
    {
        keywords: ['tidur', 'insomnia', 'mimpi buruk', 'sulit tidur'],
        response: 'Masalah tidur memang mengganggu. Coba buat rutinitas tidur yang nyaman: matikan gadget 1 jam sebelum tidur, baca buku, atau dengarkan musik yang menenangkan. Ingin tips lainnya?',
    },
    {
        keywords: ['makan', 'nafsu makan', 'berat badan'],
        response: 'Perubahan nafsu makan bisa terkait dengan kondisi mental. Cobalah makan dalam porsi kecil tapi sering, dan pilih makanan yang kamu sukai. Jika berlanjut, mungkin perlu konsultasi lebih lanjut.',
    },
    {
        keywords: ['motivasi', 'semangat', 'malas', 'tidak berguna'],
        response: 'Kadang kita memang kehilangan semangat. Itu manusiawi. Mulailah dari hal kecil: bangun, minum air, buka jendela. Satu langkah kecil tetap sebuah kemajuan. Kamu berharga! 💪',
    },
    {
        keywords: ['teman', 'sahabat', 'pertemanan', 'sosial'],
        response: 'Hubungan sosial memang kompleks. Yang terpenting adalah kamu dikelilingi orang-orang yang mendukungmu. Ingin curhat tentang masalah pertemanan?',
    },
    {
        keywords: ['keluarga', 'orang tua', 'rumah', 'ortu'],
        response: 'Keluarga bisa menjadi sumber dukungan sekaligus tantangan. Komunikasi yang terbuka dan jujur adalah kunci. Ada masalah keluarga yang ingin kamu diskusikan?',
    },
    {
        keywords: ['sekolah', 'kuliah', 'belajar', 'ujian', 'nilai'],
        response: 'Tekanan akademik memang berat. Ingat bahwa nilai bukan segalanya. Yang penting kamu sudah berusaha. Coba buat jadwal belajar yang teratur dan jangan lupa istirahat! 📚',
    },
    {
        keywords: ['kerja', 'kantor', 'karir', 'atasan', 'rekan kerja'],
        response: 'Lingkungan kerja yang sehat penting untuk kesehatan mental. Jika ada masalah, coba komunikasikan dengan baik. Jangan ragu untuk mencari dukungan dari HR atau konselor.',
    },
    {
        keywords: ['cinta', 'pacar', 'putus', 'patah hati', 'relationship'],
        response: 'Patah hati memang menyakitkan. Beri dirimu waktu untuk berduka dan menyembuhkan. Ingat, kamu berharga dan pantas dicintai. 💔✨',
    },
    {
        keywords: ['terima kasih', 'makasih', 'thanks'],
        response: 'Sama-sama! Senang bisa membantu 😊 Ingat, aku selalu di sini kapanpun kamu butuh teman bicara.',
    },
    {
        keywords: ['bye', 'dadah', 'sampai jumpa', 'daah'],
        response: 'Sampai jumpa! Jaga dirimu baik-baik ya. Ingat, kamu tidak sendiri. 🌻',
    },
];

const DEFAULT_RESPONSE = 'Terima kasih sudah berbagi. Ceritakan lebih lanjut, aku di sini untuk mendengarkan. 🌻';

// ============================================
// UTILITY FUNCTIONS
// ============================================

function getToday() {
    return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatTime(dateStr) {
    const date = new Date(dateStr);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang';
    if (hour < 18) return 'Selamat sore';
    return 'Selamat malam';
}

function getMoodEmoji(mood) {
    const emojis = { great: '😄', good: '🙂', neutral: '😐', bad: '😔', terrible: '😢' };
    return emojis[mood] || '😐';
}

function getMoodLabel(mood) {
    const labels = { great: 'Sangat Baik', good: 'Baik', neutral: 'Netral', bad: 'Buruk', terrible: 'Sangat Buruk' };
    return labels[mood] || 'Netral';
}

function getMoodScore(mood) {
    const scores = { great: 5, good: 4, neutral: 3, bad: 2, terrible: 1 };
    return scores[mood] || 3;
}

// ============================================
// LOCAL STORAGE
// ============================================

function saveData(key, data) {
    try {
        localStorage.setItem('mindcare_' + key, JSON.stringify(data));
    } catch (e) {
        console.warn('Failed to save data:', e);
    }
}

function loadData(key, defaultValue = null) {
    try {
        const data = localStorage.getItem('mindcare_' + key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

// ============================================
// TOAST NOTIFICATION
// ============================================

function showToast(message, duration = 2500) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

// ============================================
// NAVIGATION
// ============================================

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById('page-' + page);
    if (targetPage) {
        targetPage.classList.add('active');
        MINDCARE.currentPage = page;
    }

    // Update bottom nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.page === page);
    });

    // Pages that show bottom nav
    const bottomNavPages = ['home', 'journal', 'chatbot', 'screening', 'profile', 'konseling', 'komunitas', 'artikel', 'pantauan'];
    const hiddenNavPages = ['welcome', 'login'];
    const bottomNav = document.getElementById('bottomNav');
    
    if (hiddenNavPages.includes(page)) {
        bottomNav.style.display = 'none';
    } else if (bottomNavPages.includes(page)) {
        bottomNav.style.display = 'flex';
    } else {
        bottomNav.style.display = 'flex';
    }

    // Update top navigation bar
    const topNav = document.getElementById('topNav');
    const topNavBack = document.getElementById('topNavBack');
    const topNavBrand = document.getElementById('topNavBrand');
    const topNavTitle = document.getElementById('topNavTitle');
    const topNavNotif = document.getElementById('topNavNotif');

    // Page title mapping
    const pageTitles = {
        home: 'Beranda',
        journal: 'Jurnal Harian',
        chatbot: 'AI Assistant',
        screening: 'Screening Mental',
        konseling: 'Konseling',
        komunitas: 'Komunitas',
        artikel: 'Artikel & Podcast',
        pantauan: 'Pantauan Orang Tua',
        profile: 'Profil',
    };

    // Pages where top nav is visible
    const topNavPages = ['home', 'journal', 'chatbot', 'screening', 'konseling', 'komunitas', 'artikel', 'pantauan', 'profile'];

    if (hiddenNavPages.includes(page)) {
        topNav.classList.remove('visible');
    } else if (topNavPages.includes(page)) {
        topNav.classList.add('visible');
        
        // Set title
        topNavTitle.textContent = pageTitles[page] || 'MindCare';
        topNavTitle.classList.remove('hidden');
        
        // On home page: show brand, hide back button
        if (page === 'home') {
            topNavBrand.classList.remove('hidden');
            topNavBack.classList.add('hidden');
            topNavTitle.classList.add('hidden');
        } else {
            topNavBrand.classList.add('hidden');
            topNavBack.classList.remove('hidden');
            topNavTitle.classList.remove('hidden');
        }
    }

    // Update page classes for layout
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('has-top-nav', 'has-bottom-nav');
    });
    if (targetPage) {
        if (topNavPages.includes(page)) {
            targetPage.classList.add('has-top-nav');
        }
        if (bottomNavPages.includes(page)) {
            targetPage.classList.add('has-bottom-nav');
        }
    }

    // Scroll to top
    if (targetPage) {
        targetPage.scrollTop = 0;
    }

    // Page-specific initialization
    switch (page) {
        case 'home':
            initHome();
            break;
        case 'journal':
            initJournal();
            break;
        case 'konseling':
            initKonseling();
            break;
        case 'komunitas':
            initKomunitas();
            break;
        case 'artikel':
            initArtikel();
            break;
        case 'profile':
            initProfile();
            break;
    }
}

// ============================================
// WELCOME / ONBOARDING
// ============================================

function initOnboarding() {
    const slides = document.getElementById('onboardingSlides');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.getElementById('onboardingNext');
    const skipBtn = document.getElementById('onboardingSkip');

    function goToSlide(index) {
        MINDCARE.onboardingIndex = index;
        slides.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        nextBtn.textContent = index === 2 ? 'Mulai' : 'Lanjut';
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
        });
    });

    nextBtn.addEventListener('click', () => {
        if (MINDCARE.onboardingIndex < 2) {
            goToSlide(MINDCARE.onboardingIndex + 1);
        } else {
            navigateTo('login');
        }
    });

    skipBtn.addEventListener('click', () => {
        navigateTo('login');
    });
}

// ============================================
// AUTH (LOGIN / REGISTER)
// ============================================

function initAuth() {
    // Tab switching
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('form-' + tab.dataset.tab).classList.add('active');
            // Clear errors
            document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
            document.querySelectorAll('.form-group input').forEach(el => el.classList.remove('error'));
        });
    });

    // Login
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
    document.querySelectorAll('#form-login input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleLogin();
        });
    });

    // Register
    document.getElementById('registerBtn').addEventListener('click', handleRegister);
    document.querySelectorAll('#form-register input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleRegister();
        });
    });
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    let valid = true;

    // Reset errors
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-group input').forEach(el => el.classList.remove('error'));

    if (!email) {
        document.getElementById('loginEmailError').textContent = 'Email harus diisi';
        document.getElementById('loginEmail').classList.add('error');
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('loginEmailError').textContent = 'Email tidak valid';
        document.getElementById('loginEmail').classList.add('error');
        valid = false;
    }

    if (!password) {
        document.getElementById('loginPasswordError').textContent = 'Password harus diisi';
        document.getElementById('loginPassword').classList.add('error');
        valid = false;
    } else if (password.length < 6) {
        document.getElementById('loginPasswordError').textContent = 'Password minimal 6 karakter';
        document.getElementById('loginPassword').classList.add('error');
        valid = false;
    }

    if (valid) {
        // Check registered users
        const users = loadData('users', []);
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            MINDCARE.currentUser = user;
            saveData('currentUser', user);
            showToast('Selamat datang kembali, ' + user.name + '!');
            navigateTo('home');
        } else {
            // Auto-login with demo account
            const demoUser = { name: email.split('@')[0], email: email };
            MINDCARE.currentUser = demoUser;
            saveData('currentUser', demoUser);
            showToast('Selamat datang, ' + demoUser.name + '!');
            navigateTo('home');
        }
    }
}

function handleRegister() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    let valid = true;

    // Reset errors
    document.querySelectorAll('#form-register .error-msg').forEach(el => el.textContent = '');
    document.querySelectorAll('#form-register .form-group input').forEach(el => el.classList.remove('error'));

    if (!name) {
        document.getElementById('regNameError').textContent = 'Nama harus diisi';
        document.getElementById('regName').classList.add('error');
        valid = false;
    }

    if (!email) {
        document.getElementById('regEmailError').textContent = 'Email harus diisi';
        document.getElementById('regEmail').classList.add('error');
        valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('regEmailError').textContent = 'Email tidak valid';
        document.getElementById('regEmail').classList.add('error');
        valid = false;
    }

    if (!password) {
        document.getElementById('regPasswordError').textContent = 'Password harus diisi';
        document.getElementById('regPassword').classList.add('error');
        valid = false;
    } else if (password.length < 6) {
        document.getElementById('regPasswordError').textContent = 'Password minimal 6 karakter';
        document.getElementById('regPassword').classList.add('error');
        valid = false;
    }

    if (password !== confirm) {
        document.getElementById('regConfirmError').textContent = 'Password tidak cocok';
        document.getElementById('regConfirm').classList.add('error');
        valid = false;
    }

    if (valid) {
        const users = loadData('users', []);
        if (users.find(u => u.email === email)) {
            document.getElementById('regEmailError').textContent = 'Email sudah terdaftar';
            document.getElementById('regEmail').classList.add('error');
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        saveData('users', users);

        MINDCARE.currentUser = newUser;
        saveData('currentUser', newUser);
        showToast('Pendaftaran berhasil! Selamat datang, ' + name + '!');
        navigateTo('home');
    }
}

// ============================================
// HOME DASHBOARD
// ============================================

function initHome() {
    // Set greeting
    const userName = MINDCARE.currentUser ? MINDCARE.currentUser.name : 'Pengguna';
    document.getElementById('userName').textContent = userName;
    document.getElementById('greetingText').textContent = getGreeting() + '! Semoga harimu menyenangkan!';

    // Load today's mood
    const todayMood = loadData('mood_' + getToday(), null);
    if (todayMood) {
        document.getElementById('moodToday').style.display = 'block';
        document.getElementById('moodTodayText').textContent = getMoodEmoji(todayMood) + ' ' + getMoodLabel(todayMood);
        document.querySelectorAll('#moodSelector .mood-option').forEach(btn => {
            btn.classList.toggle('selected', btn.dataset.mood === todayMood);
        });
    } else {
        document.getElementById('moodToday').style.display = 'none';
    }

    // Load streak
    updateStreak();

    // Load articles
    renderHomeArticles();

    // Mood selector
    document.querySelectorAll('#moodSelector .mood-option').forEach(btn => {
        btn.onclick = () => selectMood(btn.dataset.mood);
    });
}

function selectMood(mood) {
    // Update UI
    document.querySelectorAll('#moodSelector .mood-option').forEach(btn => {
        btn.classList.toggle('selected', btn.dataset.mood === mood);
    });

    // Save to localStorage
    saveData('mood_' + getToday(), mood);

    // Show today's mood
    document.getElementById('moodToday').style.display = 'block';
    document.getElementById('moodTodayText').textContent = getMoodEmoji(mood) + ' ' + getMoodLabel(mood);

    // Update streak
    updateStreak();

    showToast('Mood tercatat: ' + getMoodLabel(mood));
}

function updateStreak() {
    const moods = loadData('moods', {});
    const today = getToday();
    let streak = 0;
    let currentDate = new Date();

    // Count consecutive days with mood data
    while (true) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (moods[dateStr] || loadData('mood_' + dateStr, null)) {
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            break;
        }
    }

    document.getElementById('streakCount').textContent = streak;

    // Render streak days
    const streakContainer = document.getElementById('streakDays');
    streakContainer.innerHTML = '';
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const todayIndex = new Date().getDay();

    for (let i = 6; i >= 0; i--) {
        const dayDate = new Date();
        dayDate.setDate(dayDate.getDate() - i);
        const dateStr = dayDate.toISOString().split('T')[0];
        const hasMood = loadData('mood_' + dateStr, null) !== null;
        const isToday = i === 0;

        const dayEl = document.createElement('span');
        dayEl.className = 'streak-day';
        if (hasMood) dayEl.classList.add('active');
        if (isToday) dayEl.classList.add('today');
        dayEl.textContent = days[dayDate.getDay()];
        streakContainer.appendChild(dayEl);
    }
}

function renderHomeArticles() {
    const container = document.getElementById('homeArticles');
    container.innerHTML = '';

    SAMPLE_DATA.articles.slice(0, 3).forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.onclick = () => showArticleDetail(article.id);
        card.innerHTML = `
            <div class="article-card-img">
                <i class="fas ${article.icon}"></i>
            </div>
            <div class="article-card-content">
                <h4>${article.title}</h4>
                <p>${article.excerpt}</p>
                <div class="article-card-meta">
                    <span>${article.category}</span>
                    <span>•</span>
                    <span>${article.readTime}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// ============================================
// JOURNAL
// ============================================

function initJournal() {
    // Mood selector
    document.querySelectorAll('#journalMoodSelector .mood-option').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('#journalMoodSelector .mood-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            MINDCARE.journalMood = btn.dataset.mood;
        };
    });

    // Save journal
    document.getElementById('saveJournalBtn').onclick = saveJournal;

    // Load journals
    renderJournals();
}

function saveJournal() {
    const text = document.getElementById('journalInput').value.trim();
    if (!text) {
        showToast('Tulis sesuatu terlebih dahulu!');
        return;
    }

    if (!MINDCARE.journalMood) {
        showToast('Pilih mood kamu!');
        return;
    }

    const journals = loadData('journals', []);
    journals.unshift({
        id: Date.now(),
        text: text,
        mood: MINDCARE.journalMood,
        date: new Date().toISOString(),
    });
    saveData('journals', journals);

    // Also save mood for this date
    saveData('mood_' + getToday(), MINDCARE.journalMood);

    document.getElementById('journalInput').value = '';
    document.querySelectorAll('#journalMoodSelector .mood-option').forEach(b => b.classList.remove('selected'));
    MINDCARE.journalMood = null;

    renderJournals();
    showToast('Jurnal berhasil disimpan! 📝');
}

function renderJournals() {
    const container = document.getElementById('journalList');
    const journals = loadData('journals', []);

    if (journals.length === 0) {
        container.innerHTML = '<p class="text-center text-muted" style="padding: 2rem;">Belum ada jurnal. Mulai tulis perasaanmu!</p>';
        return;
    }

    container.innerHTML = '';
    journals.forEach(entry => {
        const el = document.createElement('div');
        el.className = 'journal-entry';
        el.innerHTML = `
            <div class="journal-entry-header">
                <span class="journal-entry-date">${formatDate(entry.date)} • ${formatTime(entry.date)}</span>
                <span class="journal-entry-mood">${getMoodEmoji(entry.mood)}</span>
            </div>
            <p class="journal-entry-text">${entry.text}</p>
        `;
        container.appendChild(el);
    });
}

// ============================================
// KONSELING
// ============================================

function initKonseling() {
    renderPsikolog(SAMPLE_DATA.psikolog);

    // Search
    document.getElementById('psikologSearch').oninput = (e) => {
        filterPsikolog();
    };

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterPsikolog();
        };
    });
}

function filterPsikolog() {
    const search = document.getElementById('psikologSearch').value.toLowerCase();
    const filter = document.querySelector('.filter-tab.active').dataset.filter;

    let filtered = SAMPLE_DATA.psikolog;
    if (filter !== 'all') {
        filtered = filtered.filter(p => p.type === filter);
    }
    if (search) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(search) ||
            p.specialty.toLowerCase().includes(search)
        );
    }

    renderPsikolog(filtered);
}

function renderPsikolog(list) {
    const container = document.getElementById('psikologList');

    if (list.length === 0) {
        container.innerHTML = '<p class="text-center text-muted" style="padding: 2rem;">Tidak ada psikolog ditemukan.</p>';
        return;
    }

    container.innerHTML = '';
    list.forEach(p => {
        const card = document.createElement('div');
        card.className = 'psikolog-card';
        card.onclick = () => showPsikologDetail(p.id);
        card.innerHTML = `
            <div class="psikolog-avatar">${p.avatar}</div>
            <div class="psikolog-info">
                <h4>${p.name}</h4>
                <p class="specialty">${p.specialty}</p>
                <p class="experience">${p.experience} pengalaman</p>
                <div class="psikolog-rating">
                    <i class="fas fa-star"></i>
                    <span>${p.rating} (${p.reviews} ulasan)</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function showPsikologDetail(id) {
    const p = SAMPLE_DATA.psikolog.find(p => p.id === id);
    if (!p) return;

    const container = document.getElementById('psikologDetail');
    container.innerHTML = `
        <div style="text-align:center;margin-bottom:var(--space-lg);">
            <div class="psikolog-avatar" style="width:80px;height:80px;font-size:2rem;margin:0 auto var(--space-md);">${p.avatar}</div>
            <h3>${p.name}</h3>
            <p class="specialty">${p.specialty}</p>
            <div class="psikolog-rating" style="justify-content:center;">
                <i class="fas fa-star"></i>
                <span>${p.rating} (${p.reviews} ulasan)</span>
            </div>
        </div>
        <p style="color:var(--gray-600);line-height:1.6;margin-bottom:var(--space-md);">${p.bio}</p>
        <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-lg);">
            <div>
                <small style="color:var(--gray-400);">Pengalaman</small>
                <p style="font-weight:600;">${p.experience}</p>
            </div>
            <div style="text-align:right;">
                <small style="color:var(--gray-400);">Biaya</small>
                <p style="font-weight:600;color:var(--sage);">${p.price}</p>
            </div>
        </div>
        <button class="btn btn-primary btn-full" onclick="openBooking(${p.id})">
            <i class="fas fa-calendar-check"></i> Booking Sesi
        </button>
    `;

    document.getElementById('psikologModal').classList.add('show');
}

function openBooking(id) {
    closeModal('psikologModal');
    // Set min date to today
    const today = getToday();
    document.getElementById('bookingDate').min = today;
    document.getElementById('bookingDate').value = today;
    document.getElementById('bookingModal').classList.add('show');

    document.getElementById('confirmBookingBtn').onclick = () => {
        const date = document.getElementById('bookingDate').value;
        const time = document.getElementById('bookingTime').value;
        const type = document.getElementById('bookingType').value;

        if (!date) {
            showToast('Pilih tanggal booking');
            return;
        }

        const bookings = loadData('bookings', []);
        bookings.push({
            id: Date.now(),
            psikologId: id,
            date: date,
            time: time,
            type: type,
            createdAt: new Date().toISOString(),
        });
        saveData('bookings', bookings);

        closeModal('bookingModal');
        showToast('Booking berhasil! Kami akan menghubungimu. ✅');
    };
}

// ============================================
// MODAL
// ============================================

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
}

// Close modal on backdrop click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
});

// ============================================
// CHATBOT AI
// ============================================

function initChatbot() {
    document.getElementById('chatSendBtn').onclick = sendChatMessage;
    document.getElementById('chatInput').onkeypress = (e) => {
        if (e.key === 'Enter') sendChatMessage();
    };

    document.getElementById('chatQuickMood').onclick = () => {
        const quickMessages = [
            'Aku merasa sedih hari ini',
            'Aku merasa cemas',
            'Aku stres dengan pekerjaan',
            'Aku butuh motivasi',
        ];
        const msg = quickMessages[Math.floor(Math.random() * quickMessages.length)];
        document.getElementById('chatInput').value = msg;
        sendChatMessage();
    };
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    // Add user message
    addChatMessage(text, 'user');
    input.value = '';

    // Simulate typing delay
    setTimeout(() => {
        const response = getChatbotResponse(text);
        addChatMessage(response, 'bot');
    }, 800 + Math.random() * 600);
}

function addChatMessage(text, sender) {
    const container = document.getElementById('chatMessages');
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ' + sender;

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    bubble.innerHTML = `
        <div class="bubble-content">
            <p>${text}</p>
        </div>
        <span class="bubble-time">${timeStr}</span>
    `;

    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
}

function getChatbotResponse(message) {
    const lower = message.toLowerCase();

    // Check for crisis keywords
    if (lower.includes('bunuh diri') || lower.includes('menyakiti diri') || lower.includes('mati') && lower.includes('ingin')) {
        return '🚨 Jika kamu memiliki pikiran untuk menyakiti diri sendiri, segera hubungi bantuan profesional:\n\n📞 Hotline Kesehatan Mental: 119 (ext 8)\n📞 Yayasan Pulih: 021-788-425-80\n📞 Into The Light: 0811-1234-123\n\nKamu tidak sendiri. Ada orang-orang yang peduli dan siap membantu. 💙';
    }

    // Find matching response
    for (const item of CHATBOT_RESPONSES) {
        for (const keyword of item.keywords) {
            if (lower.includes(keyword)) {
                return item.response;
            }
        }
    }

    return DEFAULT_RESPONSE;
}

// ============================================
// SCREENING MENTAL
// ============================================

function startScreening(type) {
    MINDCARE.screeningType = type;
    MINDCARE.screeningIndex = 0;
    MINDCARE.screeningAnswers = [];

    document.getElementById('screeningIntro').style.display = 'none';
    document.getElementById('screeningQuiz').style.display = 'block';
    document.getElementById('screeningResult').style.display = 'none';

    renderScreeningQuestion();
}

function renderScreeningQuestion() {
    const screening = SCREENING[MINDCARE.screeningType];
    const index = MINDCARE.screeningIndex;
    const total = screening.questions.length;

    // Progress
    document.getElementById('screeningProgress').style.width = ((index + 1) / total * 100) + '%';
    document.getElementById('screeningProgressText').textContent = `${index + 1}/${total}`;

    // Question
    document.getElementById('screeningQuestion').textContent = `${index + 1}. ${screening.questions[index]}`;

    // Options
    const optionsContainer = document.getElementById('screeningOptions');
    optionsContainer.innerHTML = '';

    screening.options.forEach((opt, i) => {
        const option = document.createElement('div');
        option.className = 'screening-option';
        if (MINDCARE.screeningAnswers[index] === i) {
            option.classList.add('selected');
        }
        option.innerHTML = `
            <div class="radio-circle"></div>
            <span class="option-text">${opt.text}</span>
        `;
        option.onclick = () => {
            document.querySelectorAll('.screening-option').forEach(o => o.classList.remove('selected'));
            option.classList.add('selected');
            MINDCARE.screeningAnswers[index] = i;
        };
        optionsContainer.appendChild(option);
    });

    // Nav buttons
    document.getElementById('screeningPrev').style.display = index === 0 ? 'none' : 'block';
    document.getElementById('screeningNext').textContent = index === total - 1 ? 'Lihat Hasil' : 'Selanjutnya';
}

function nextQuestion() {
    const screening = SCREENING[MINDCARE.screeningType];
    const index = MINDCARE.screeningIndex;

    if (MINDCARE.screeningAnswers[index] === undefined) {
        showToast('Pilih salah satu jawaban!');
        return;
    }

    if (index < screening.questions.length - 1) {
        MINDCARE.screeningIndex++;
        renderScreeningQuestion();
    } else {
        showScreeningResult();
    }
}

function prevQuestion() {
    if (MINDCARE.screeningIndex > 0) {
        MINDCARE.screeningIndex--;
        renderScreeningQuestion();
    }
}

function showScreeningResult() {
    const screening = SCREENING[MINDCARE.screeningType];
    let totalScore = 0;

    MINDCARE.screeningAnswers.forEach((answerIndex) => {
        if (answerIndex !== undefined) {
            totalScore += screening.options[answerIndex].score;
        }
    });

    const result = screening.interpret(totalScore);

    document.getElementById('screeningQuiz').style.display = 'none';
    document.getElementById('screeningResult').style.display = 'block';

    const iconEl = document.getElementById('resultIcon');
    iconEl.className = 'result-icon ' + result.icon;
    iconEl.innerHTML = result.icon === 'success' ? '<i class="fas fa-check-circle"></i>' :
                       result.icon === 'warning' ? '<i class="fas fa-exclamation-triangle"></i>' :
                       '<i class="fas fa-times-circle"></i>';

    document.getElementById('resultTitle').textContent = screening.title;
    document.getElementById('resultScore').textContent = `Skor: ${totalScore} - ${result.level}`;
    document.getElementById('resultDesc').textContent = result.desc;

    // Save screening result
    const results = loadData('screening_results', []);
    results.unshift({
        type: MINDCARE.screeningType,
        score: totalScore,
        level: result.level,
        date: new Date().toISOString(),
    });
    saveData('screening_results', results);
}

function resetScreening() {
    document.getElementById('screeningIntro').style.display = 'block';
    document.getElementById('screeningQuiz').style.display = 'none';
    document.getElementById('screeningResult').style.display = 'none';
    MINDCARE.screeningType = null;
    MINDCARE.screeningIndex = 0;
    MINDCARE.screeningAnswers = [];
}

// ============================================
// KOMUNITAS
// ============================================

function initKomunitas() {
    renderForumPosts('all');

    // Category filter
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderForumPosts(btn.dataset.category);
        };
    });

    // New post FAB
    document.getElementById('newPostFab').onclick = () => {
        document.getElementById('postModal').classList.add('show');
    };

    // Submit post
    document.getElementById('submitPostBtn').onclick = submitPost;
}

function renderForumPosts(category) {
    const container = document.getElementById('forumPosts');
    const posts = loadData('forum_posts', SAMPLE_DATA.forumPosts);

    const filtered = category === 'all' ? posts : posts.filter(p => p.category === category);

    if (filtered.length === 0) {
        container.innerHTML = '<p class="text-center text-muted" style="padding:2rem;">Belum ada postingan di kategori ini.</p>';
        return;
    }

    container.innerHTML = '';
    filtered.forEach(post => {
        const el = document.createElement('div');
        el.className = 'forum-post';
        el.innerHTML = `
            <div class="forum-post-header">
                <div class="forum-post-avatar">${post.avatar}</div>
                <span class="forum-post-author">${post.author}</span>
                <span class="forum-post-category">${post.category}</span>
            </div>
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            <div class="forum-post-footer">
                <span><i class="fas fa-heart"></i> ${post.likes}</span>
                <span><i class="fas fa-comment"></i> ${post.comments}</span>
                <span>${post.time}</span>
            </div>
        `;
        container.appendChild(el);
    });
}

function submitPost() {
    const category = document.getElementById('postCategory').value;
    const title = document.getElementById('postTitle').value.trim();
    const content = document.getElementById('postContent').value.trim();

    if (!title || !content) {
        showToast('Judul dan isi postingan harus diisi!');
        return;
    }

    const posts = loadData('forum_posts', SAMPLE_DATA.forumPosts);
    posts.unshift({
        id: Date.now(),
        author: MINDCARE.currentUser ? MINDCARE.currentUser.name : 'Anonim',
        category: category,
        title: title,
        content: content,
        likes: 0,
        comments: 0,
        time: 'Baru saja',
        avatar: (MINDCARE.currentUser ? MINDCARE.currentUser.name : 'A').charAt(0).toUpperCase(),
    });
    saveData('forum_posts', posts);

    document.getElementById('postTitle').value = '';
    document.getElementById('postContent').value = '';
    closeModal('postModal');

    renderForumPosts(document.querySelector('.category-btn.active').dataset.category);
    showToast('Postingan berhasil dibuat! 🎉');
}

// ============================================
// ARTIKEL & PODCAST
// ============================================

function initArtikel() {
    // Tab switching
    document.querySelectorAll('.content-tab').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.content-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab + 'Tab').classList.add('active');
        };
    });

    // Render articles
    renderArtikelList(SAMPLE_DATA.articles);

    // Search articles
    document.getElementById('artikelSearch').oninput = (e) => {
        const search = e.target.value.toLowerCase();
        const filtered = SAMPLE_DATA.articles.filter(a =>
            a.title.toLowerCase().includes(search) ||
            a.excerpt.toLowerCase().includes(search)
        );
        renderArtikelList(filtered);
    };

    // Render podcasts
    renderPodcastList();

    // Player controls
    document.getElementById('playerPlayBtn').onclick = togglePlayer;
}

function renderArtikelList(articles) {
    const container = document.getElementById('artikelList');

    if (articles.length === 0) {
        container.innerHTML = '<p class="text-center text-muted" style="padding:2rem;">Tidak ada artikel ditemukan.</p>';
        return;
    }

    container.innerHTML = '';
    articles.forEach(article => {
        const card = document.createElement('div');
        card.className = 'article-card';
        card.onclick = () => showArticleDetail(article.id);
        card.innerHTML = `
            <div class="article-card-img">
                <i class="fas ${article.icon}"></i>
            </div>
            <div class="article-card-content">
                <h4>${article.title}</h4>
                <p>${article.excerpt}</p>
                <div class="article-card-meta">
                    <span>${article.category}</span>
                    <span>•</span>
                    <span>${article.readTime}</span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function showArticleDetail(id) {
    const article = SAMPLE_DATA.articles.find(a => a.id === id);
    if (!article) return;

    const container = document.getElementById('artikelDetail');
    container.innerHTML = `
        <div style="text-align:center;margin-bottom:var(--space-lg);">
            <div style="width:80px;height:80px;border-radius:50%;background:var(--sage-light);display:flex;align-items:center;justify-content:center;margin:0 auto var(--space-md);font-size:2rem;color:var(--sage);">
                <i class="fas ${article.icon}"></i>
            </div>
            <h3>${article.title}</h3>
            <div style="display:flex;gap:var(--space-sm);justify-content:center;margin-top:var(--space-sm);font-size:var(--text-sm);color:var(--gray-500);">
                <span>${article.category}</span>
                <span>•</span>
                <span>${article.readTime}</span>
            </div>
        </div>
        <div style="color:var(--gray-600);line-height:1.8;">
            <p>${article.excerpt}</p>
            <br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <br>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div style="margin-top:var(--space-lg);">
            <button class="btn btn-outline btn-full" onclick="closeModal('artikelModal')">
                <i class="fas fa-arrow-left"></i> Kembali
            </button>
        </div>
    `;

    document.getElementById('artikelModal').classList.add('show');
}

function renderPodcastList() {
    const container = document.getElementById('podcastList');
    container.innerHTML = '';

    SAMPLE_DATA.podcasts.forEach(podcast => {
        const card = document.createElement('div');
        card.className = 'podcast-card';
        card.onclick = () => playPodcast(podcast.id);
        card.innerHTML = `
            <div class="podcast-thumb">
                <i class="fas ${podcast.icon}"></i>
            </div>
            <div class="podcast-info">
                <h4>${podcast.title}</h4>
                <p>${podcast.host}</p>
                <span class="podcast-duration">${podcast.duration}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

function playPodcast(id) {
    const podcast = SAMPLE_DATA.podcasts.find(p => p.id === id);
    if (!podcast) return;

    MINDCARE.currentPodcast = podcast;
    document.getElementById('podcastPlayer').style.display = 'block';
    document.getElementById('playerTitle').textContent = podcast.title;
    document.getElementById('playerStatus').textContent = 'Memutar...';
    document.getElementById('playerPlayBtn').innerHTML = '<i class="fas fa-pause"></i>';
    MINDCARE.isPlaying = true;

    // Simulate playback
    if (MINDCARE.playerInterval) clearInterval(MINDCARE.playerInterval);
    MINDCARE.playerTime = 0;

    MINDCARE.playerInterval = setInterval(() => {
        MINDCARE.playerTime++;
        const mins = Math.floor(MINDCARE.playerTime / 60);
        const secs = MINDCARE.playerTime % 60;
        document.getElementById('playerTime').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

        // Simulate progress
        const durationParts = podcast.duration.split(':');
        const totalSecs = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
        const progress = Math.min((MINDCARE.playerTime / totalSecs) * 100, 100);
        document.getElementById('playerProgress').style.width = progress + '%';

        if (progress >= 100) {
            clearInterval(MINDCARE.playerInterval);
            document.getElementById('playerPlayBtn').innerHTML = '<i class="fas fa-play"></i>';
            document.getElementById('playerStatus').textContent = 'Selesai';
            MINDCARE.isPlaying = false;
        }
    }, 1000);

    showToast('Memutar: ' + podcast.title);
}

function togglePlayer() {
    if (!MINDCARE.currentPodcast) return;

    if (MINDCARE.isPlaying) {
        clearInterval(MINDCARE.playerInterval);
        document.getElementById('playerPlayBtn').innerHTML = '<i class="fas fa-play"></i>';
        document.getElementById('playerStatus').textContent = 'Dijeda';
        MINDCARE.isPlaying = false;
    } else {
        // Resume
        const podcast = MINDCARE.currentPodcast;
        document.getElementById('playerPlayBtn').innerHTML = '<i class="fas fa-pause"></i>';
        document.getElementById('playerStatus').textContent = 'Memutar...';
        MINDCARE.isPlaying = true;

        MINDCARE.playerInterval = setInterval(() => {
            MINDCARE.playerTime++;
            const mins = Math.floor(MINDCARE.playerTime / 60);
            const secs = MINDCARE.playerTime % 60;
            document.getElementById('playerTime').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;

            const durationParts = podcast.duration.split(':');
            const totalSecs = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
            const progress = Math.min((MINDCARE.playerTime / totalSecs) * 100, 100);
            document.getElementById('playerProgress').style.width = progress + '%';

            if (progress >= 100) {
                clearInterval(MINDCARE.playerInterval);
                document.getElementById('playerPlayBtn').innerHTML = '<i class="fas fa-play"></i>';
                document.getElementById('playerStatus').textContent = 'Selesai';
                MINDCARE.isPlaying = false;
            }
        }, 1000);
    }
}

// ============================================
// PROFILE
// ============================================

function initProfile() {
    if (MINDCARE.currentUser) {
        document.getElementById('profileName').textContent = MINDCARE.currentUser.name;
        document.getElementById('profileEmail').textContent = MINDCARE.currentUser.email;
    }

    document.getElementById('logoutBtn').onclick = () => {
        localStorage.removeItem('mindcare_currentUser');
        MINDCARE.currentUser = null;
        showToast('Berhasil keluar');
        navigateTo('login');
    };
}

// ============================================
// BOTTOM NAVIGATION
// ============================================

function initBottomNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            navigateTo(item.dataset.page);
        });
    });
}

// ============================================
// NOTIFICATION BUTTONS
// ============================================

document.getElementById('notifBtn')?.addEventListener('click', () => {
    showToast('Tidak ada notifikasi baru');
});

document.getElementById('topNavNotif')?.addEventListener('click', () => {
    showToast('Tidak ada notifikasi baru');
});

// ============================================
// INITIALIZATION
// ============================================

function initApp() {
    // Check if user is logged in
    const savedUser = loadData('currentUser', null);
    if (savedUser) {
        MINDCARE.currentUser = savedUser;
    }

    // Initialize components
    initOnboarding();
    initAuth();
    initChatbot();
    initBottomNav();

    // Start at welcome or home
    if (savedUser) {
        navigateTo('home');
    } else {
        navigateTo('welcome');
    }
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);