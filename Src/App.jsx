import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Star, Download, Phone, Mail, BookOpen, Video, FileText, Users } from 'lucide-react';

// ============== UTILS ==============
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// ============== HOOKS ==============
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return isVisible;
};

// ============== DATA (Placeholders) ==============
const fetchLessons = async () => {
  return [
    { id: 1, title: 'الدرس الأول: مقدمة في الرياضيات', subject: 'رياضيات', level: 'الثانية باكالوريا', description: 'درس تمهيدي شامل', thumbnail: '📐', videosCount: 3, filesCount: 2 },
    { id: 2, title: 'الدرس الثاني: المعادلات التفاضلية', subject: 'رياضيات', level: 'الثانية باكالوريا', description: 'شرح مفصل للمعادلات', thumbnail: '📊', videosCount: 5, filesCount: 3 },
    { id: 3, title: 'الدرس الثالث: الهندسة الفضائية', subject: 'رياضيات', level: 'الأولى باكالوريا', description: 'الأشكال الهندسية المعقدة', thumbnail: '📏', videosCount: 4, filesCount: 2 },
    { id: 4, title: 'الدرس الرابع: الإحصاء والاحتمالات', subject: 'رياضيات', level: 'الثانية باكالوريا', description: 'مبادئ الإحصاء', thumbnail: '📈', videosCount: 6, filesCount: 4 }
  ];
};

const fetchLessonDetails = async (id) => {
  return {
    id,
    title: 'الدرس الأول: مقدمة في الرياضيات',
    description: 'هذا الدرس يقدم مقدمة شاملة في أساسيات الرياضيات للمستوى الثانوي، يشمل شرحاً مفصلاً للمفاهيم الأساسية مع أمثلة تطبيقية وتمارين محلولة.',
    videos: [
      { id: 1, title: 'الجزء الأول', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube' },
      { id: 2, title: 'الجزء الثاني', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube' }
    ],
    files: [
      { id: 1, name: 'ملخص الدرس.pdf', size: '2.5 MB', url: '#' },
      { id: 2, name: 'تمارين إضافية.pdf', size: '1.8 MB', url: '#' }
    ]
  };
};

const fetchFiles = async () => {
  return [
    { id: 1, name: 'ملخص الدروس - السنة الثانية باكالوريا.pdf', category: 'ملخصات', size: '3.2 MB', downloads: 245, url: '#' },
    { id: 2, name: 'تمارين محلولة - الرياضيات.pdf', category: 'تمارين', size: '4.1 MB', downloads: 312, url: '#' },
    { id: 3, name: 'امتحانات سابقة مع التصحيح.pdf', category: 'امتحانات', size: '5.5 MB', downloads: 428, url: '#' },
    { id: 4, name: 'دروس الهندسة الفضائية.pdf', category: 'دروس', size: '2.8 MB', downloads: 189, url: '#' }
  ];
};

const fetchVideos = async () => {
  return [
    { id: 1, title: 'شرح المعادلات من الدرجة الثانية', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube', views: '1.2K' },
    { id: 2, title: 'حل تمارين الاحتمالات', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', platform: 'youtube', views: '890' },
    { id: 3, title: 'نصائح للنجاح في الامتحان', url: 'https://www.tiktok.com/embed/v2/7234567890123456789', platform: 'tiktok', views: '2.5K' }
  ];
};

const fetchReviews = async () => {
  return [
    { id: 1, student: 'أحمد المنصوري', rating: 5, comment: 'أستاذ ممتاز، شرحه واضح ومبسط. استفدت كثيراً من دروسه.', date: '2024-11-15' },
    { id: 2, student: 'فاطمة الزهراء', rating: 5, comment: 'الدروس منظمة جداً والأستاذ متفاني في عمله. شكراً جزيلاً!', date: '2024-11-10' },
    { id: 3, student: 'يوسف العلوي', rating: 4, comment: 'شرح ممتاز وملفات مفيدة. أنصح بشدة بمتابعة دروسه.', date: '2024-11-05' },
    { id: 4, student: 'مريم السعدي', rating: 5, comment: 'أفضل أستاذ! ساعدني كثيراً في فهم المواد الصعبة.', date: '2024-10-28' }
  ];
};

// ============== COMPONENTS ==============
const Button = ({ children, variant = 'primary', onClick, className = '', icon }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-purple-900 to-indigo-900 text-white hover:from-purple-800 hover:to-indigo-800',
    secondary: 'bg-purple-100 text-purple-900 hover:bg-purple-200',
    outline: 'border-2 border-purple-900 text-purple-900 hover:bg-purple-50'
  };

  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${variants[variant]} ${className}`}
    >
      {icon && icon}
      {children}
    </button>
  );
};

const Card = ({ children, className = '', hover = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
        hover ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

const Input = ({ label, type = 'text', placeholder, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-purple-900 font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-600 focus:outline-none transition-colors"
      />
    </div>
  );
};

const Textarea = ({ label, placeholder, value, onChange, required = false, rows = 4 }) => {
  return (
    <div className="mb-4">
      <label className="block text-purple-900 font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-600 focus:outline-none transition-colors resize-none"
      />
    </div>
  );
};

// ============== LAYOUT ==============
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'الرئيسية', page: 'home' },
    { name: 'الدروس', page: 'lessons' },
    { name: 'الملفات', page: 'files' },
    { name: 'الفيديوهات', page: 'videos' },
    { name: 'التقييمات', page: 'reviews' },
    { name: 'من أنا', page: 'about' },
    { name: 'تواصل', page: 'contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-full flex items-center justify-center">
              <BookOpen className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-purple-900">الأستاذ محمد</h1>
              <p className="text-xs text-purple-600">أستاذ الرياضيات</p>
            </div>
          </div>

          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === item.page
                    ? 'bg-purple-900 text-white'
                    : 'text-purple-900 hover:bg-purple-50'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-purple-900">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                setCurrentPage(item.page);
                setIsOpen(false);
              }}
              className={`w-full text-right px-6 py-3 font-semibold transition-all ${
                currentPage === item.page
                  ? 'bg-purple-900 text-white'
                  : 'text-purple-900 hover:bg-purple-50'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">الأستاذ محمد</h3>
            <p className="text-purple-200">
              أستاذ الرياضيات للمستوى الثانوي، متخصص في التدريس والتكوين التربوي.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-purple-200">
              <li className="hover:text-white cursor-pointer transition-colors">الدروس</li>
              <li className="hover:text-white cursor-pointer transition-colors">الملفات</li>
              <li className="hover:text-white cursor-pointer transition-colors">الفيديوهات</li>
              <li className="hover:text-white cursor-pointer transition-colors">التواصل</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="space-y-3 text-purple-200">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+212 600 000 000</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>teacher@example.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-200">
          <p>© 2024 الأستاذ محمد. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

// ============== PAGES ==============
const HomePage = ({ setCurrentPage, setSelectedLesson }) => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchLessons().then(setLessons);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div data-animate id="hero-text" className="space-y-6 animate-fadeIn">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                مرحباً بكم في
                <span className="block text-purple-300">منصة الأستاذ محمد</span>
              </h1>
              <p className="text-xl text-purple-100">
                أستاذ الرياضيات المتخصص في التعليم الثانوي. نقدم دروساً مبسطة وشاملة لمساعدتك على التفوق.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => setCurrentPage('lessons')} icon={<BookOpen size={20} />}>
                  استكشف الدروس
                </Button>
                <Button variant="outline" className="bg-white/10 border-white text:white hover:bg:white/20" onClick={() => setCurrentPage('contact')}>
                  تواصل معنا
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">📚</div>
                  <p className="text-2xl font-semibold">التعليم بشغف</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen size={40} />, number: '50+', label: 'درس' },
              { icon: <Video size={40} />, number: '100+', label: 'فيديو' },
              { icon: <FileText size={40} />, number: '30+', label: 'ملف PDF' },
              { icon: <Users size={40} />, number: '500+', label: 'طالب' }
            ].map((stat, idx) => (
              <Card key={idx} className="text-center" hover={false}>
                <div className="text-purple-600 flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-purple-900 mb-2">{stat.number}</div>
                <div className="text-purple-600 font-semibold">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-900 mb-4">الدروس المميزة</h2>
            <p className="text-xl text-purple-600">اكتشف أحدث الدروس والشروحات</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lessons.slice(0, 4).map((lesson) => (
              <Card key={lesson.id} onClick={() => {
                setSelectedLesson(lesson.id);
                setCurrentPage('lesson-details');
              }}>
                <div className="text-6xl mb-4 text-center">{lesson.thumbnail}</div>
                <h3 className="text-lg font-bold text-purple-900 mb-2">{lesson.title}</h3>
                <p className="text-purple-600 text-sm mb-4">{lesson.description}</p>
                <div className="flex justify-between text-sm text-purple-500">
                  <span>🎥 {lesson.videosCount}</span>
                  <span>📄 {lesson.filesCount}</span>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button onClick={() => setCurrentPage('lessons')}>
              عرض جميع الدروس
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">هل لديك استفسار؟</h2>
          <p className="text-xl text-purple-100 mb-8">
            نحن هنا لمساعدتك. تواصل معنا الآن وسنجيب على جميع أسئلتك.
          </p>
          <Button variant="outline" className="bg-white text-purple-900 hover:bg-purple-50" onClick={() => setCurrentPage('contact')}>
            تواصل معنا الآن
          </Button>
        </div>
      </section>
    </div>
  );
};

const LessonsPage = ({ setCurrentPage, setSelectedLesson }) => {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLessons().then(setLessons);
  }, []);

  const filteredLessons = filter === 'all' 
    ? lessons 
    : lessons.filter(l => l.level === filter);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-900 mb-4">جميع الدروس</h1>
          <p className="text-xl text-purple-600">اختر الدرس المناسب لمستواك</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'الثانية باكالوريا', 'الأولى باكالوريا'].map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                filter === level
                  ? 'bg-purple-900 text-white'
                  : 'bg-white text-purple-900 hover:bg-purple-100'
              }`}
            >
              {level === 'all' ? 'الكل' : level}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} onClick={() => {
              setSelectedLesson(lesson.id);
              setCurrentPage('lesson-details');
            }}>
              <div className="text-7xl mb-4 text-center">{lesson.thumbnail}</div>
              <div className="mb-2">
                <span className="bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-sm font-semibold">...
