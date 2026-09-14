import React, { useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';
import './styles.css';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

const courses = [
  { id: 1, title: 'Toán học 11 – Xuất phát sớm', teacher: 'Tổ Toán học', tag: '2K10', desc: 'Hệ thống bài giảng, chuyên đề và bài tập theo chương trình lớp 11.', lessons: 42, chapters: 5 },
  { id: 2, title: 'Vật lí 11 – Nắm chắc bản chất', teacher: 'Bộ môn Vật lí', tag: '2K10', desc: 'Học theo chuyên đề, video bài giảng và luyện tập Vật lí 11.', lessons: 36, chapters: 4 },
  { id: 3, title: 'Tiếng Anh – Grammar & Reading', teacher: 'Bộ môn Tiếng Anh', tag: 'THPT', desc: 'Ngữ pháp trọng tâm và bài đọc luyện tập theo chuyên đề.', lessons: 28, chapters: 6 },
  { id: 4, title: 'Thống kê ứng dụng trong giáo dục', teacher: 'PATHTUDUY', tag: 'ĐẠI HỌC', desc: 'Bài giảng, ví dụ và bài tập thực hành thống kê.', lessons: 18, chapters: 3 },
];

const docs = [
  { title: 'Đề luyện tập Toán 11 – Chương 1', subject: 'Toán', type: 'PDF', meta: '12 trang' },
  { title: 'Phiếu bài tập Vật lí – Dao động', subject: 'Vật lí', type: 'PDF', meta: '8 trang' },
  { title: 'Grammar checklist – Unit 1', subject: 'Tiếng Anh', type: 'PDF', meta: '6 trang' },
  { title: 'Tóm tắt Thống kê giáo dục – Chương 1', subject: 'Đại học', type: 'DOCX', meta: '4 trang' },
];

const exams = [
  { title: 'Đề kiểm tra Toán – Chương 1', subject: 'Toán', time: '45 phút', questions: '20 câu' },
  { title: 'Kiểm tra Vật lí – Dao động', subject: 'Vật lí', time: '50 phút', questions: '25 câu' },
  { title: 'English Grammar Test 01', subject: 'Tiếng Anh', time: '30 phút', questions: '40 câu' },
];

const lessonList = [
  'Khái niệm và các dạng bài cơ bản',
  'Dạng bài 1 – Phương pháp giải',
  'Dạng bài 2 – Bài tập vận dụng',
  'Bài tập tổng hợp',
  'Kiểm tra chương 1',
];

function Header({ page, setPage, adminUnlocked }) {
  return <header className="header"><div className="wrap nav">
    <button className="brand" onClick={() => setPage('home')}>PATHTUDUY</button>
    <nav>
      <button className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Trang chủ</button>
      <button className={page === 'courses' ? 'active' : ''} onClick={() => setPage('courses')}>Khóa học</button>
      <button className={page === 'docs' ? 'active' : ''} onClick={() => setPage('docs')}>Tài liệu</button>
      <button className={page === 'exams' ? 'active' : ''} onClick={() => setPage('exams')}>Thi Online</button>
      <button className={page.startsWith('admin') ? 'active' : ''} onClick={() => setPage('admin')}>Quản trị</button>
    </nav>
    <div className="nav-right"><div className="search"><span>⌕</span><input placeholder="Tìm kiếm..." /></div><button className="login" onClick={() => setPage('login')}>Đăng nhập</button></div>
  </div></header>;
}

function Hero({ setPage }) {
  return <section className="hero wrap"><div className="hero-copy">
    <div className="eyebrow">NỀN TẢNG HỌC TẬP CÁ NHÂN</div>
    <h1>Học đúng trọng tâm.<br /><span>Tiến bộ từng ngày.</span></h1>
    <p>Khóa học, bài giảng, tài liệu và đề thi được sắp xếp thành một hệ thống học tập của riêng bạn.</p>
    <div className="hero-btns"><button className="primary" onClick={() => setPage('courses')}>Khám phá khóa học</button><button className="ghost" onClick={() => setPage('docs')}>Xem tài liệu</button></div>
  </div><div className="hero-card"><div className="mini-label">TIẾN ĐỘ HỌC TẬP</div><div className="big-number">68%</div><div className="progress"><i style={{ width: '68%' }} /></div><div className="muted">12 / 18 bài đã hoàn thành</div><div className="stats"><div><b>04</b><span>Khóa học</span></div><div><b>36</b><span>Tài liệu</span></div><div><b>12</b><span>Đề thi</span></div></div></div></section>;
}

function CourseCard({ c, onOpen }) {
  return <article className="card course"><div className="course-cover"><span>{c.tag}</span><strong>{c.title.split(' – ')[0]}</strong></div><div className="card-body"><div className="kicker">{c.teacher}</div><h3>{c.title}</h3><p>{c.desc}</p><div className="card-meta"><span>{c.chapters} chương · {c.lessons} bài</span><button onClick={onOpen}>Xem khóa học →</button></div></div></article>;
}

function Home({ setPage }) {
  return <><Hero setPage={setPage} /><section className="wrap section"><div className="section-head"><div><div className="eyebrow">ĐƯỢC QUAN TÂM</div><h2>Khóa học nổi bật</h2></div><button className="text-btn" onClick={() => setPage('courses')}>Xem tất cả →</button></div><div className="grid courses-grid">{courses.map(c => <CourseCard key={c.id} c={c} onOpen={() => setPage('courseDetail')} />)}</div></section><section className="feature-band"><div className="wrap feature-grid"><div><div className="eyebrow">MỘT HỆ THỐNG – NHIỀU CÁCH HỌC</div><h2>Tất cả tài nguyên học tập ở một nơi.</h2></div><div className="feature-list"><div>✓ Bài học theo chương</div><div>✓ Tài liệu tải xuống</div><div>✓ Đề thi online</div><div>✓ Theo dõi tiến độ</div></div></div></section></>;
}

function Courses({ setPage }) {
  const [filter, setFilter] = useState('Tất cả');
  const filtered = filter === 'Tất cả' ? courses : courses.filter(c => c.tag === filter);
  return <main className="wrap page"><div className="page-title"><div><div className="eyebrow">KHO HỌC</div><h1>Tất cả khóa học</h1><p className="page-sub">Chọn khóa học để xem chương, bài giảng và tài liệu.</p></div><div className="filters">{['Tất cả', '2K10', 'THPT', 'ĐẠI HỌC'].map(x => <button key={x} className={'filter ' + (filter === x ? 'active' : '')} onClick={() => setFilter(x)}>{x}</button>)}</div></div><div className="grid courses-grid">{filtered.map(c => <CourseCard key={c.id} c={c} onOpen={() => setPage('courseDetail')} />)}</div></main>;
}

function CourseDetail({ setPage }) {
  return <main className="wrap page detail-page"><div className="course-detail-head"><div><div className="eyebrow">KHÓA HỌC · 2K10</div><h1>Toán học 11 – Xuất phát sớm</h1><p>Hệ thống bài giảng, chuyên đề, tài liệu và bài tập theo chương.</p></div><button className="primary" onClick={() => setPage('lesson')}>Vào học</button></div><div className="chapter-list">{[1, 2, 3, 4, 5].map((n) => <div className="chapter" key={n}><div className="chapter-head"><b>Chương {n}</b><span>{n === 1 ? '12' : '8'} bài</span></div>{n === 1 && lessonList.slice(0, 4).map((x, i) => <button className="chapter-lesson" key={x} onClick={() => setPage('lesson')}><span>{String(i + 1).padStart(2, '0')}</span>{x}<em>›</em></button>)}</div>)}</div></main>;
}

function Docs() {
  const [q, setQ] = useState('');
  const filtered = useMemo(() => docs.filter(d => d.title.toLowerCase().includes(q.toLowerCase())), [q]);
  return <main className="wrap page"><div className="page-title"><div><div className="eyebrow">KHO TÀI LIỆU</div><h1>Tài liệu học tập</h1></div><div className="doc-search">⌕ <input value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm tài liệu..." /></div></div><div className="doc-list">{filtered.map(d => <div className="doc-row" key={d.title}><div className="doc-icon">{d.type}</div><div className="doc-main"><h3>{d.title}</h3><span>{d.subject} · {d.meta}</span></div><button className="outline">Xem tài liệu</button></div>)}</div></main>;
}

function Exams() {
  return <main className="wrap page"><div className="page-title"><div><div className="eyebrow">LUYỆN THI</div><h1>Thi Online</h1></div><div className="filters"><button className="filter active">Tất cả</button><button className="filter">Toán</button><button className="filter">Vật lí</button><button className="filter">Tiếng Anh</button></div></div><div className="exam-list">{exams.map((e, i) => <div className="exam-row" key={e.title}><div className="exam-num">0{i + 1}</div><div className="doc-main"><h3>{e.title}</h3><span>{e.subject} · {e.questions} · {e.time}</span></div><button className="primary small">Vào thi</button></div>)}</div></main>;
}

function Lesson() {
  const [locked, setLocked] = useState(true);
  const [code, setCode] = useState('');
  const unlock = () => { if (code === '2026') setLocked(false); else alert('Mã demo chưa đúng. Hãy nhập 2026.'); };
  return <main className="wrap page lesson-page"><div className="lesson-grid"><article><div className="video-placeholder"><div className="play">▶</div><span>VIDEO BÀI GIẢNG</span></div><div className="lesson-kicker">TOÁN HỌC 11 · CHƯƠNG 1 · BÀI 01</div><h1>{lessonList[0]}</h1>{locked ? <div className="lock-box"><div className="lock">🔐</div><h2>Nội dung được bảo vệ</h2><p>Nhập mã truy cập để mở bài học.</p><div className="code-line"><input value={code} onChange={e => setCode(e.target.value)} placeholder="Nhập mã truy cập" /><button className="primary" onClick={unlock}>Mở bài</button></div><small>Demo: mã <b>2026</b></small></div> : <div className="lesson-content"><div className="success">✓ Bài học đã được mở</div><h2>Nội dung bài học</h2><p>Đây là khu vực bạn có thể đặt video, nội dung HTML, PDF và bài tập.</p><div className="resource"><span>📄</span><div><b>Tài liệu bài 01.pdf</b><small>8 trang · 2.4 MB</small></div><button className="outline">Mở</button></div><div className="resource"><span>📝</span><div><b>Bài tập luyện tập 01</b><small>20 câu · 30 phút</small></div><button className="outline">Làm bài</button></div></div>}</article><aside className="sidebar"><div className="side-title">NỘI DUNG KHÓA HỌC</div>{lessonList.map((x, i) => <div className={'side-item ' + (i === 0 ? 'current' : '')} key={x}><span>{String(i + 1).padStart(2, '0')}</span>{x}</div>)}</aside></div></main>;
}


function AdminLogin({ onSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setError('Vui lòng nhập email và mật khẩu.');
      return;
    }
    setLoading(true);
    setError('');
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password
    });
    if (signInError || !data.user) {
      setLoading(false);
      setError(signInError?.message === 'Invalid login credentials' ? 'Email hoặc mật khẩu chưa đúng.' : 'Không thể đăng nhập. Vui lòng thử lại.');
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    setLoading(false);
    if (profileError || profile?.role !== 'admin') {
      await supabase.auth.signOut();
      setError('Tài khoản này không có quyền quản trị.');
      return;
    }

    sessionStorage.setItem('ptd_admin', '1');
    onSuccess();
  }

  return <main className="auth"><div className="auth-card">
    <div className="brand centered">PATHTUDUY</div>
    <div className="eyebrow">KHU VỰC QUẢN TRỊ</div>
    <h1>Đăng nhập quản trị</h1>
    <p>Chỉ tài khoản có quyền <b>admin</b> mới được truy cập khu vực này.</p>
    <input autoFocus value={email} onChange={e=>{setEmail(e.target.value);setError('')}} placeholder="Email quản trị" type="email" onKeyDown={e=>e.key==='Enter' && handleLogin()} />
    <input value={password} onChange={e=>{setPassword(e.target.value);setError('')}} placeholder="Mật khẩu" type="password" onKeyDown={e=>e.key==='Enter' && handleLogin()} />
    {error && <div className="success" style={{color:'#b42318',background:'#fef3f2',borderColor:'#fecdca'}}>{error}</div>}
    <button className="primary full" onClick={handleLogin} disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Vào quản trị'}</button>
    <button className="ghost full" onClick={onBack}>Quay lại website</button>
  </div></main>;
}

function AdminHome({ setPage }) {
  const items = [
    { page: 'adminCourses', title: 'Khóa học', kicker: 'NỘI DUNG', desc: 'Thêm, sửa và quản lý khóa học.' },
    { page: 'adminLessons', title: 'Bài học', kicker: 'BÀI HỌC', desc: 'Quản lý chương, bài và nội dung.' },
    { page: 'adminDocs', title: 'Tài liệu', kicker: 'TÀI LIỆU', desc: 'Quản lý PDF và tài liệu học tập.' },
    { page: 'adminCodes', title: 'Mã truy cập', kicker: 'BẢO MẬT', desc: 'Tạo và quản lý mã mở khóa bài học.' },
  ];
  return <main className="wrap page">
    <div className="page-title"><div><div className="eyebrow">QUẢN TRỊ PATHTUDUY</div><h1>Bảng điều khiển</h1><p className="page-sub">Khu vực quản lý nội dung website.</p></div></div>
    <div className="grid courses-grid">{items.map(item => <div className="card" key={item.page}><div className="card-body"><div className="kicker">{item.kicker}</div><h3>{item.title}</h3><p>{item.desc}</p><button className="primary" onClick={() => setPage(item.page)}>Quản lý</button></div></div>)}</div>
  </main>;
}

function AdminCourses() {
  const [items, setItems] = useState(courses.map(c => ({...c})));
  const [title, setTitle] = useState('');
  const add = () => { const t=title.trim(); if(!t) return; setItems(prev => [...prev,{id:Date.now(),title:t,teacher:'PATHTUDUY',tag:'THPT',desc:'Khóa học mới.',lessons:0,chapters:0}]); setTitle(''); };
  return <main className="wrap page">
    <div className="page-title"><div><div className="eyebrow">QUẢN TRỊ · KHÓA HỌC</div><h1>Quản lý khóa học</h1><p className="page-sub">Tạo và chỉnh sửa danh sách khóa học ngay trên trình duyệt.</p></div></div>
    <div className="card admin-form"><div className="card-body"><h3>Thêm khóa học</h3><div className="code-line"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Tên khóa học mới"/><button className="primary" onClick={add}>Thêm</button></div></div></div>
    <div className="admin-table">{items.map(c => <div className="admin-row" key={c.id}><div><b>{c.title}</b><span>{c.teacher} · {c.tag}</span></div><button className="outline" onClick={()=>alert('Bản 1.0: chức năng sửa sẽ được kết nối ở bước database.')}>Sửa</button></div>)}</div>
  </main>;
}

function AdminLessons() {
  const [items,setItems]=useState(lessonList.slice(0,4));
  const [title,setTitle]=useState('');
  const add=()=>{const t=title.trim();if(!t)return;setItems(p=>[...p,t]);setTitle('');};
  return <main className="wrap page"><div className="page-title"><div><div className="eyebrow">QUẢN TRỊ · BÀI HỌC</div><h1>Quản lý bài học</h1><p className="page-sub">Thêm bài học vào Chương 1.</p></div></div><div className="card admin-form"><div className="card-body"><h3>Thêm bài học</h3><div className="code-line"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Tên bài học mới"/><button className="primary" onClick={add}>Thêm</button></div></div></div><div className="admin-table">{items.map((x,i)=><div className="admin-row" key={x}><div><b>{String(i+1).padStart(2,'0')} · {x}</b><span>Toán học 11 · Chương 1</span></div><button className="outline" onClick={()=>alert('Bản 1.0: chức năng chỉnh sửa sẽ kết nối database sau.')}>Sửa</button></div>)}</div></main>;
}

function AdminDocs() {
  const [items,setItems]=useState(docs.map(d=>({...d})));
  const [title,setTitle]=useState('');
  const add=()=>{const t=title.trim();if(!t)return;setItems(p=>[...p,{title:t,subject:'Chưa phân loại',type:'PDF',meta:'Chưa có file'}]);setTitle('');};
  return <main className="wrap page"><div className="page-title"><div><div className="eyebrow">QUẢN TRỊ · TÀI LIỆU</div><h1>Quản lý tài liệu</h1><p className="page-sub">Đây là bước đầu để quản lý danh mục tài liệu.</p></div></div><div className="card admin-form"><div className="card-body"><h3>Thêm tài liệu</h3><div className="code-line"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Tên tài liệu"/><button className="primary" onClick={add}>Thêm</button></div><small>Upload file thật sẽ được kết nối sau khi có kho lưu trữ.</small></div></div><div className="admin-table">{items.map(d=><div className="admin-row" key={d.title}><div><b>{d.title}</b><span>{d.subject} · {d.type} · {d.meta}</span></div><button className="outline">Chi tiết</button></div>)}</div></main>;
}

function AdminCodes() {
  const [items,setItems]=useState([{id:1,code:'2026',lesson:'Khái niệm và các dạng bài cơ bản',status:'Đang hoạt động'}]);
  const [code,setCode]=useState('');
  const add=()=>{const c=code.trim();if(!c)return;setItems(p=>[...p,{id:Date.now(),code:c,lesson:'Bài học mới',status:'Đang hoạt động'}]);setCode('');};
  return <main className="wrap page"><div className="page-title"><div><div className="eyebrow">QUẢN TRỊ · BẢO MẬT</div><h1>Mã truy cập</h1><p className="page-sub">Tạo mã mở khóa bài học.</p></div></div><div className="card admin-form"><div className="card-body"><h3>Tạo mã mới</h3><div className="code-line"><input value={code} onChange={e=>setCode(e.target.value)} placeholder="Ví dụ: PATH-2026-001"/><button className="primary" onClick={add}>Tạo mã</button></div></div></div><div className="admin-table">{items.map(x=><div className="admin-row" key={x.id}><div><b>{x.code}</b><span>{x.lesson} · {x.status}</span></div><button className="outline" onClick={()=>navigator.clipboard?.writeText(x.code)}>Sao chép</button></div>)}</div></main>;
}

function Login({ setPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password) {
      setError('Vui lòng nhập email và mật khẩu.');
      return;
    }
    setLoading(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
    setLoading(false);
    if (signInError) {
      setError(signInError.message === 'Invalid login credentials' ? 'Email hoặc mật khẩu chưa đúng.' : 'Không thể đăng nhập. Vui lòng thử lại.');
      return;
    }
    setPage('home');
  }

  return <main className="auth"><div className="auth-card"><div className="brand centered">PATHTUDUY</div><h1>Đăng nhập</h1><p>Đăng nhập để học tập và theo dõi tiến độ.</p><input value={email} onChange={e=>{setEmail(e.target.value);setError('')}} placeholder="Email" type="email" /><input value={password} onChange={e=>{setPassword(e.target.value);setError('')}} placeholder="Mật khẩu" type="password" /><button className="primary full" onClick={handleLogin} disabled={loading}>{loading ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>{error && <div className="success" style={{color:'#b42318',background:'#fef3f2',borderColor:'#fecdca'}}>{error}</div>}<div className="auth-foot">Chưa có tài khoản? <b>Liên hệ quản trị viên để được cấp tài khoản.</b></div></div></main>;
}

function Footer() { return <footer><div className="wrap footer-grid"><div><div className="brand">PATHTUDUY</div><p>Nền tảng học tập của riêng bạn.</p></div><div><b>Khám phá</b><span>Khóa học</span><span>Tài liệu</span><span>Thi Online</span></div><div><b>Hỗ trợ</b><span>Điều khoản</span><span>Chính sách</span><span>Liên hệ</span></div></div></footer>; }

function App() {
  const [page, setPage] = useState('home');
  const [adminUnlocked, setAdminUnlocked] = useState(() => sessionStorage.getItem('ptd_admin') === '1');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        sessionStorage.removeItem('ptd_admin');
        setAdminUnlocked(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        sessionStorage.removeItem('ptd_admin');
        setAdminUnlocked(false);
      }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  function goAdmin() {
    setPage(adminUnlocked ? 'admin' : 'adminLogin');
  }

  let content;
  if (page === 'home') content = <Home setPage={setPage} />;
  else if (page === 'courses') content = <Courses setPage={setPage} />;
  else if (page === 'courseDetail') content = <CourseDetail setPage={setPage} />;
  else if (page === 'docs') content = <Docs />;
  else if (page === 'exams') content = <Exams />;
  else if (page === 'lesson') content = <Lesson />;
  else if (page === 'adminLogin') content = <AdminLogin onSuccess={() => { setAdminUnlocked(true); setPage('admin'); }} onBack={() => setPage('home')} />;
  else if (page.startsWith('admin') && !adminUnlocked) content = <AdminLogin onSuccess={() => { setAdminUnlocked(true); setPage('admin'); }} onBack={() => setPage('home')} />;
  else if (page === 'admin') content = <AdminHome setPage={setPage} />;
  else if (page === 'adminCourses') content = <AdminCourses />;
  else if (page === 'adminLessons') content = <AdminLessons />;
  else if (page === 'adminDocs') content = <AdminDocs />;
  else if (page === 'adminCodes') content = <AdminCodes />;
  else content = <Login setPage={setPage} />;

  return <><Header page={page} setPage={(next) => next === 'admin' ? goAdmin() : setPage(next)} adminUnlocked={adminUnlocked} />{content}<Footer /></>;
}

createRoot(document.getElementById('root')).render(<App />);
