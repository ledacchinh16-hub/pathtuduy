import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const courses = [
  { id: 1, title: 'Toán học 11 – Xuất phát sớm', teacher: 'PATHTUDUY', tag: '2K10', desc: 'Kiến thức trọng tâm, chuyên đề và bài tập bám chương trình lớp 11.', lessons: 42, color: 'blue' },
  { id: 2, title: 'Vật lí 11 – Nắm chắc bản chất', teacher: 'PATHTUDUY', tag: '2K10', desc: 'Bài giảng, ví dụ và luyện tập Vật lí 11 theo từng chuyên đề.', lessons: 36, color: 'purple' },
  { id: 3, title: 'Tiếng Anh – Grammar & Reading', teacher: 'PATHTUDUY', tag: 'THPT', desc: 'Ngữ pháp trọng tâm và bài đọc luyện tập theo chuyên đề.', lessons: 28, color: 'green' },
  { id: 4, title: 'Thống kê ứng dụng trong giáo dục', teacher: 'PATHTUDUY', tag: 'ĐẠI HỌC', desc: 'Bài giảng, ví dụ và bài tập thực hành thống kê ứng dụng.', lessons: 18, color: 'orange' }
];

const docs = [
  ['Đề luyện tập Toán 11 – Chương 1', 'Toán', 'PDF', '12 trang'],
  ['Phiếu bài tập Vật lí – Dao động', 'Vật lí', 'PDF', '8 trang'],
  ['Grammar checklist – Unit 1', 'Tiếng Anh', 'PDF', '6 trang'],
  ['Tóm tắt Thống kê giáo dục – Chương 1', 'Đại học', 'DOCX', '4 trang']
];

const exams = [
  ['Đề kiểm tra Toán – Chương 1', 'Toán', '45 phút', '20 câu'],
  ['Kiểm tra Vật lí – Dao động', 'Vật lí', '50 phút', '25 câu'],
  ['English Grammar Test 01', 'Tiếng Anh', '30 phút', '40 câu']
];

function Header({ page, setPage }) {
  const nav = [
    ['home', 'Trang chủ'], ['courses', 'Khóa học'], ['docs', 'Tài liệu'], ['exams', 'Thi Online']
  ];
  return <header className="header"><div className="nav-wrap">
    <button className="brand" onClick={() => setPage('home')}>PATHTUDUY</button>
    <nav>{nav.map(([id, label]) => <button key={id} className={page === id ? 'nav-item active' : 'nav-item'} onClick={() => setPage(id)}>{label}</button>)}</nav>
    <div className="nav-right"><div className="search"><span>⌕</span><input placeholder="Tìm kiếm..." /></div><button className="login-btn" onClick={() => setPage('login')}>Đăng nhập</button></div>
  </div></header>
}

function Hero({ setPage }) {
  return <section className="hero wrap"><div className="hero-copy">
    <div className="eyebrow">NỀN TẢNG HỌC TẬP PATHTUDUY</div>
    <h1>Học đúng trọng tâm.<br/><span>Tiến bộ từng ngày.</span></h1>
    <p>Khóa học, bài giảng, tài liệu và đề thi được sắp xếp thành một hệ thống học tập của riêng bạn.</p>
    <div className="hero-actions"><button className="primary" onClick={() => setPage('courses')}>Khám phá khóa học</button><button className="secondary" onClick={() => setPage('docs')}>Xem tài liệu</button></div>
  </div><div className="progress-card"><div className="card-label">TIẾN ĐỘ HỌC TẬP</div><div className="progress-num">68%</div><div className="progress"><span style={{width:'68%'}}/></div><div className="muted">12 / 18 bài đã hoàn thành</div><div className="stats"><div><b>04</b><span>Khóa học</span></div><div><b>36</b><span>Tài liệu</span></div><div><b>12</b><span>Đề thi</span></div></div></div></section>
}

function CourseCard({ course, onClick }) {
  return <article className="course-card" onClick={onClick}><div className={`course-cover ${course.color}`}><span>{course.tag}</span><strong>{course.title.split(' – ')[0]}</strong></div><div className="course-body"><div className="kicker">{course.teacher}</div><h3>{course.title}</h3><p>{course.desc}</p><div className="course-meta"><span>◷ {course.lessons} bài học</span><button>Xem khóa học →</button></div></div></article>
}

function Home({ setPage }) {
  return <><Hero setPage={setPage}/><section className="wrap section"><div className="section-head"><div><div className="eyebrow">ĐƯỢC QUAN TÂM</div><h2>Khóa học nổi bật</h2></div><button className="text-btn" onClick={() => setPage('courses')}>Xem tất cả →</button></div><div className="grid4">{courses.map(c => <CourseCard key={c.id} course={c} onClick={() => setPage(`course-${c.id}`)} />)}</div></section><section className="feature"><div className="wrap feature-grid"><div><div className="eyebrow">HỆ THỐNG HỌC TẬP</div><h2>Một nơi để học, luyện tập và kiểm tra.</h2><p>Từ khóa học đến tài liệu và đề thi, tất cả đều nằm trong một hệ thống.</p></div><div className="feature-list"><div><b>01</b><span><strong>Khóa học</strong><small>Chương → bài học → tài liệu</small></span></div><div><b>02</b><span><strong>Tài liệu</strong><small>Kho đề và tài liệu theo môn</small></span></div><div><b>03</b><span><strong>Thi Online</strong><small>Làm bài và xem kết quả</small></span></div></div></div></section></>
}

function Courses({ setPage }) {
  return <main className="wrap page"><div className="page-title"><div><div className="eyebrow">KHÓA HỌC</div><h1>Khóa học của PATHTUDUY</h1><p>Chọn môn học và bắt đầu từ bài học đầu tiên.</p></div><button className="secondary">Bộ lọc ▾</button></div><div className="grid2">{courses.map(c => <CourseCard key={c.id} course={c} onClick={() => setPage(`course-${c.id}`)}/>)}</div></main>
}

function CourseDetail({ id, setPage }) {
  const c = courses.find(x => x.id === id) || courses[0];
  return <main className="wrap page"><button className="back" onClick={() => setPage('courses')}>← Quay lại khóa học</button><div className="detail-head"><div className={`detail-cover ${c.color}`}><span>{c.tag}</span><strong>{c.title}</strong></div><div><div className="eyebrow">{c.teacher}</div><h1>{c.title}</h1><p>{c.desc}</p><button className="primary" onClick={() => setPage('lesson')}>Học bài đầu tiên</button></div></div><div className="lesson-layout"><div><div className="chapter"><div><b>Chương 1</b><span>12 bài học</span></div><span>⌃</span></div>{['Giới thiệu chuyên đề','Bài giảng trọng tâm','Ví dụ minh họa','Bài tập luyện tập','Kiểm tra chương'].map((x,i)=><button key={x} className="lesson-row" onClick={() => setPage('lesson')}><span className="lesson-num">{String(i+1).padStart(2,'0')}</span><span>{x}</span><span>{i===0?'▶':'🔒'}</span></button>)}</div><aside className="side-card"><div className="card-label">THÔNG TIN KHÓA HỌC</div><b>{c.lessons} bài học</b><span>Tiến độ 68%</span><div className="progress"><span style={{width:'68%'}}/></div><button className="primary full" onClick={() => setPage('lesson')}>Tiếp tục học</button></aside></div></main>
}

function Lesson({ setPage }) {
  const [locked,setLocked]=useState(true); const [code,setCode]=useState(''); const [msg,setMsg]=useState('');
  const unlock=()=>{if(code==='2026'){setLocked(false);setMsg('Mở bài thành công.')}else setMsg('Mã chưa đúng. Hãy thử lại.');};
  return <main className="wrap page"><button className="back" onClick={() => setPage('courses')}>← Quay lại</button><div className="lesson-page"><div className="lesson-main"><div className="video"><div className="play">▶</div><span>VIDEO BÀI GIẢNG</span></div><div className="lesson-top"><div><div className="eyebrow">TOÁN HỌC 11</div><h1>Giới thiệu chuyên đề</h1></div><span className="pill">Bài 01</span></div>{locked?<div className="lock-box"><div className="lock-icon">🔒</div><h2>Nội dung được bảo vệ</h2><p>Nhập mã truy cập để mở bài học này.</p><input value={code} onChange={e=>setCode(e.target.value)} placeholder="Nhập mã truy cập"/><button className="primary" onClick={unlock}>Mở bài</button>{msg&&<small className={locked?'error':'success'}>{msg}</small>}</div>:<div className="content-box"><h2>Nội dung bài học</h2><p>Đây là khu vực nội dung của bài học. Bạn có thể đặt video, tài liệu PDF, ghi chú và bài tập ở đây.</p><div className="resource"><span>📄</span><div><b>Tài liệu bài học 01.pdf</b><small>PDF · 12 trang</small></div><button>Tải xuống</button></div></div>}</div><aside className="playlist"><div className="card-label">NỘI DUNG KHÓA HỌC</div>{['Giới thiệu chuyên đề','Bài giảng trọng tâm','Ví dụ minh họa','Bài tập luyện tập','Kiểm tra chương'].map((x,i)=><button key={x} className={i===0?'playlist-row current':'playlist-row'}><span>{String(i+1).padStart(2,'0')}</span>{x}<em>{i===0?'▶':'🔒'}</em></button>)}</aside></div></main>
}

function Docs(){return <main className="wrap page"><div className="page-title"><div><div className="eyebrow">KHO TÀI LIỆU</div><h1>Tài liệu</h1><p>Tìm kiếm tài liệu học tập theo môn học.</p></div></div><div className="toolbar"><div className="search big"><span>⌕</span><input placeholder="Tìm tài liệu..."/></div><button className="secondary">Môn học ▾</button><button className="secondary">Loại file ▾</button></div><div className="table-card">{docs.map((d,i)=><div className="doc-row" key={i}><div className="doc-icon">{d[2]==='PDF'?'PDF':'DOC'}</div><div className="doc-info"><b>{d[0]}</b><span>{d[1]} · {d[3]}</span></div><span className="doc-type">{d[2]}</span><button className="text-btn">Xem →</button></div>)}</div></main>}

function Exams(){return <main className="wrap page"><div className="page-title"><div><div className="eyebrow">THI ONLINE</div><h1>Đề thi & kiểm tra</h1><p>Luyện tập theo môn, thời lượng và số câu.</p></div></div><div className="toolbar"><div className="search big"><span>⌕</span><input placeholder="Tìm đề thi..."/></div><button className="secondary">Môn học ▾</button><button className="secondary">Thời lượng ▾</button></div><div className="table-card">{exams.map((e,i)=><div className="exam-row" key={i}><div><div className="kicker">{e[1]}</div><b>{e[0]}</b><span>{e[2]} · {e[3]}</span></div><button className="primary small">Vào thi</button></div>)}</div></main>}

function Login(){const [mode,setMode]=useState('login');return <main className="auth-page"><div className="auth-card"><button className="brand auth-brand">PATHTUDUY</button><div className="eyebrow">TÀI KHOẢN</div><h1>{mode==='login'?'Đăng nhập':'Tạo tài khoản'}</h1><p>{mode==='login'?'Tiếp tục học tập trên PATHTUDUY.':'Tạo tài khoản để lưu tiến độ học tập.'}</p><input placeholder="Email"/><input placeholder="Mật khẩu" type="password"/><button className="primary full">{mode==='login'?'Đăng nhập':'Đăng ký'}</button><button className="switch" onClick={()=>setMode(mode==='login'?'register':'login')}>{mode==='login'?'Chưa có tài khoản? Đăng ký':'Đã có tài khoản? Đăng nhập'}</button></div></main>}

function App(){const [page,setPage]=useState('home'); const content=useMemo(()=>{if(page==='home')return <Home setPage={setPage}/>; if(page==='courses')return <Courses setPage={setPage}/>; if(page==='docs')return <Docs/>; if(page==='exams')return <Exams/>; if(page==='login')return <Login/>; if(page==='lesson')return <Lesson setPage={setPage}/>; if(page.startsWith('course-')) return <CourseDetail id={Number(page.split('-')[1])} setPage={setPage}/>; return <Home setPage={setPage}/>},[page]); return <><Header page={page} setPage={setPage}/>{content}<footer><div className="wrap footer-in"><b>PATHTUDUY</b><span>© 2026 PATHTUDUY. Hệ thống học tập cá nhân.</span></div></footer></>}

createRoot(document.getElementById('root')).render(<App/>);
