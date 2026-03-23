// AI 입학사정관 — v2

const students = [
  { name: '김민수', num: 7, done: true, warn: true },
  { name: '박지영', num: 1, done: true, warn: true },
  { name: '이준호', num: 3, done: true, warn: true },
  { name: '최서연', num: 5, done: false, warn: true },
  { name: '정하늘', num: 9, done: true, warn: false },
  { name: '한소희', num: 11, done: true, warn: false },
  { name: '윤도현', num: 13, done: false, warn: false },
  { name: '서예진', num: 15, done: true, warn: false },
  { name: '강태우', num: 17, done: true, warn: false },
  { name: '임수빈', num: 19, done: false, warn: false },
  { name: '조현우', num: 21, done: true, warn: false },
  { name: '송민경', num: 23, done: true, warn: false },
  { name: '오재원', num: 25, done: false, warn: false },
  { name: '배수지', num: 27, done: true, warn: false },
  { name: '황인준', num: 29, done: true, warn: false },
  { name: '나유진', num: 2, done: false, warn: false },
  { name: '문성훈', num: 4, done: true, warn: false },
  { name: '양지은', num: 6, done: true, warn: false },
  { name: '권혁민', num: 8, done: false, warn: false },
  { name: '류하은', num: 10, done: false, warn: false },
  { name: '장우진', num: 12, done: true, warn: false },
  { name: '신보라', num: 14, done: true, warn: false },
  { name: '홍승기', num: 16, done: false, warn: false },
  { name: '안채원', num: 18, done: true, warn: false },
  { name: '유정호', num: 20, done: false, warn: false },
  { name: '전미래', num: 22, done: true, warn: false },
  { name: '고태양', num: 24, done: false, warn: false },
  { name: '성하린', num: 26, done: true, warn: false },
  { name: '노건우', num: 28, done: false, warn: false },
  { name: '차민지', num: 30, done: true, warn: false },
  { name: '허준영', num: 31, done: false, warn: false },
  { name: '봉수아', num: 32, done: true, warn: false },
];

function navigate(page) {
  if (page === 'landing') {
    document.getElementById('page-landing').classList.add('active');
    document.getElementById('app-shell').style.display = 'none';
    document.querySelectorAll('.app-page').forEach(p => p.classList.remove('active'));
    return;
  }
  document.getElementById('page-landing').classList.remove('active');
  document.getElementById('app-shell').style.display = 'flex';
  document.querySelectorAll('.app-page').forEach(p => p.classList.remove('active'));
  const t = document.getElementById('page-' + page);
  if (t) t.classList.add('active');
  document.querySelectorAll('.nav-item').forEach(i => i.classList.toggle('active', i.dataset.page === page));
}

function studentRow(s, i, onclick) {
  const statusColor = s.warn ? 'bg-amber-400' : (s.done ? 'bg-mint-400' : 'bg-coral-400');
  const statusText = s.warn ? '경고' : (s.done ? '완료' : '미완료');
  const statusBg = s.warn ? 'bg-amber-50 text-amber-600' : (s.done ? 'bg-mint-50 text-mint-600' : 'bg-coral-50 text-coral-600');
  const avatarBg = s.done ? 'from-brand-400 to-brand-600' : 'from-gray-300 to-gray-400';
  return `<div class="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 cursor-pointer transition ${i===0?'bg-brand-50':''}" onclick="${onclick||''}">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 bg-gradient-to-br ${avatarBg} rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">${s.name.charAt(0)}</div>
      <div><div class="text-sm font-bold">${s.name}</div><div class="text-xs text-gray-400">${s.num}번</div></div>
    </div>
    <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${statusBg}">${statusText}</span>
  </div>`;
}

function studentCompact(s, i) {
  return `<div class="flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer text-sm transition ${i===0?'bg-brand-50 text-brand-700 font-bold':'hover:bg-slate-50 text-gray-600'}">
    <div class="w-7 h-7 ${i===0?'bg-brand-600':'bg-gray-200'} rounded-lg flex items-center justify-center text-xs font-bold ${i===0?'text-white':'text-gray-500'}">${s.name.charAt(0)}</div>
    <span>${s.name}</span>
  </div>`;
}

function studentWithStatus(s, i) {
  return `<div class="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer text-sm transition ${i===0?'bg-brand-50 text-brand-700 font-bold':'hover:bg-slate-50 text-gray-600'}">
    <div class="flex items-center gap-2.5">
      <div class="w-7 h-7 ${i===0?'bg-brand-600':'bg-gray-200'} rounded-lg flex items-center justify-center text-xs font-bold ${i===0?'text-white':'text-gray-500'}">${s.name.charAt(0)}</div>
      <span>${s.name}</span>
    </div>
    <span class="w-2.5 h-2.5 rounded-full ${s.done?'bg-mint-400':'bg-coral-400'}"></span>
  </div>`;
}

// Sample extended data for report/classmanage
const studentExtended = [
  { name: '김민수', num: 7, gpa: 1.8, mock: 94, major: '물리학과', target: '서울대 물리천문학부', done: true, warn: true, prob: 62 },
  { name: '박지영', num: 1, gpa: 2.1, mock: 88, major: '화학과', target: '연세대 화학과', done: true, warn: true, prob: 71 },
  { name: '이준호', num: 3, gpa: 1.5, mock: 96, major: '수학과', target: '서울대 수리과학부', done: true, warn: false, prob: 85 },
  { name: '최서연', num: 5, gpa: 2.3, mock: 82, major: '생명과학과', target: 'KAIST 생명과학과', done: false, warn: false, prob: 55 },
  { name: '정하늘', num: 9, gpa: 1.9, mock: 91, major: '화학공학과', target: '고려대 화공생명', done: true, warn: false, prob: 72 },
  { name: '한소희', num: 11, gpa: 2.0, mock: 89, major: '전자공학과', target: '성균관대 전자전기', done: true, warn: false, prob: 68 },
  { name: '윤도현', num: 13, gpa: 2.5, mock: 78, major: '기계공학과', target: '한양대 기계공학', done: false, warn: false, prob: 52 },
  { name: '서예진', num: 15, gpa: 1.7, mock: 93, major: '물리학과', target: 'KAIST 물리학과', done: true, warn: false, prob: 78 },
];

function reportRow(s) {
  const probColor = s.prob >= 70 ? 'text-mint-600' : (s.prob >= 40 ? 'text-brand-600' : 'text-coral-500');
  const probLabel = s.prob >= 70 ? '안정' : (s.prob >= 40 ? '적정' : '소신');
  return `<tr class="hover:bg-slate-50">
    <td class="px-4 py-3 font-medium">${s.num}</td>
    <td class="px-4 py-3 font-bold">${s.name}</td>
    <td class="px-4 py-3">${s.gpa}</td>
    <td class="px-4 py-3">${s.mock}%</td>
    <td class="px-4 py-3 text-gray-500">${s.major}</td>
    <td class="px-4 py-3">${s.done ? '<span class="bg-mint-50 text-mint-600 px-2 py-0.5 rounded text-xs font-bold">완료</span>' : '<span class="bg-coral-50 text-coral-500 px-2 py-0.5 rounded text-xs font-bold">미완료</span>'}</td>
    <td class="px-4 py-3 font-black ${probColor}">${s.prob}% <span class="text-xs font-medium text-gray-400">${probLabel}</span></td>
    <td class="px-4 py-3">${s.warn ? '<span class="bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-xs font-bold">⚠</span>' : ''}</td>
  </tr>`;
}

function classmanageRow(s) {
  return `<tr class="hover:bg-slate-50">
    <td class="px-4 py-3 font-medium">${s.num}</td>
    <td class="px-4 py-3 font-bold">${s.name}</td>
    <td class="px-4 py-3">${s.gpa}</td>
    <td class="px-4 py-3">${s.mock}%</td>
    <td class="px-4 py-3 text-gray-500">${s.major}</td>
    <td class="px-4 py-3 text-gray-500">${s.target}</td>
    <td class="px-4 py-3">${s.done ? '<span class="bg-mint-50 text-mint-600 px-2 py-0.5 rounded text-xs font-bold">완료</span>' : '<span class="bg-coral-50 text-coral-500 px-2 py-0.5 rounded text-xs font-bold">미완료</span>'}</td>
    <td class="px-4 py-3 text-center"><button class="bg-brand-50 text-brand-600 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-brand-100" onclick="alert('${s.name} 학생 프로필을 수정합니다.\\n\\n내신: ${s.gpa}\\n모의고사: ${s.mock}%\\n희망전공: ${s.major}\\n목표대학: ${s.target}\\n\\n(실제 서비스에서는 편집 모달이 열립니다)')">편집</button></td>
  </tr>`;
}

function initAll() {
  const d = document.getElementById('dashboard-student-list');
  if(d) d.innerHTML = students.map((s,i) => studentRow(s,i,"navigate('record')")).join('');

  const g = document.getElementById('grading-student-list');
  if(g) g.innerHTML = students.map((s,i) => studentCompact(s,i)).join('');

  const r = document.getElementById('record-student-list');
  if(r) r.innerHTML = students.map((s,i) => studentWithStatus(s,i)).join('');

  const rt = document.getElementById('report-table-body');
  if(rt) rt.innerHTML = studentExtended.map(s => reportRow(s)).join('');

  const cm = document.getElementById('classmanage-table-body');
  if(cm) cm.innerHTML = studentExtended.map(s => classmanageRow(s)).join('');
}

// Record tabs (세특/창체/행발)
function initRecordTabs() {
  document.querySelectorAll('.record-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.record-tab').forEach(t => {
        t.classList.remove('bg-white', 'text-brand-700', 'shadow-sm');
        t.classList.add('text-gray-500');
      });
      tab.classList.add('bg-white', 'text-brand-700', 'shadow-sm');
      tab.classList.remove('text-gray-500');

      document.querySelectorAll('.record-tab-content').forEach(c => c.classList.add('hidden'));
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if(target) target.classList.remove('hidden');
    });
  });
}

// Memo tags
function initMemoTags() {
  document.querySelectorAll('.memo-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      document.querySelectorAll('.memo-tag').forEach(t => {
        t.classList.remove('active-memo-tag', 'bg-blue-100', 'text-blue-700');
        t.classList.add('bg-gray-100', 'text-gray-500');
      });
      tag.classList.add('active-memo-tag', 'bg-blue-100', 'text-blue-700');
      tag.classList.remove('bg-gray-100', 'text-gray-500');
    });
  });
}

// Byte counter
function initByteCounter() {
  const ta = document.getElementById('setuek-textarea');
  const counter = document.getElementById('byte-counter');
  const bar = document.getElementById('byte-bar');
  if (!ta || !counter) return;
  function update() {
    const bytes = new Blob([ta.value]).size;
    const pct = Math.min((bytes / 1500) * 100, 100);
    const over = bytes > 1500;
    counter.innerHTML = `<span class="${over?'text-coral-500':'text-brand-600'}">${bytes.toLocaleString()}</span> / 1,500 Byte`;
    if(bar) { bar.style.width = pct+'%'; bar.className = `h-2.5 rounded-full transition-all ${over?'bg-coral-500':'bg-brand-500'}`; }
  }
  ta.addEventListener('input', update);
}

document.addEventListener('DOMContentLoaded', () => {
  navigate('landing');
  initAll();
  initRecordTabs();
  initMemoTags();
  initByteCounter();
});
