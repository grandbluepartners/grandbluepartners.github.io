// Calculator v3: NB-style steps (course, people, eLearning, sea, gear) with a summary panel.
// Prices come from prices.js. Nothing is preselected except eLearning (included, as in NB).
(function () {
  var P = window.GBP_PRICES;
  // Nothing is preselected (전자상거래법 제21조의2: no pre-ticked options, no partial totals).
  var state = { course: null, n: null, elearning: null, sea: null, gear: null };
  var won = function (v) { return v.toLocaleString('ko-KR') + '원'; };
  var $ = function (id) { return document.getElementById(id); };

  function courseById(id) {
    for (var i = 0; i < P.courses.length; i++) if (P.courses[i].id === id) return P.courses[i];
    return null;
  }

  function button(opts) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'opt' + (opts.row ? ' row' : '');
    b.setAttribute('aria-pressed', opts.pressed ? 'true' : 'false');
    if (opts.disabled) b.disabled = true;
    var left = '<span><span class="t">' + opts.t + '</span>' + (opts.d ? '<span class="d" style="display:block">' + opts.d + '</span>' : '') + '</span>';
    if (opts.row) b.innerHTML = left + '<span class="meta">' + (opts.meta || '') + '</span>';
    else b.innerHTML = '<span class="t">' + opts.t + '</span>' + (opts.d ? '<span class="d">' + opts.d + '</span>' : '') + (opts.p ? '<span class="p">' + opts.p + '</span>' : '');
    b.addEventListener('click', opts.onClick);
    return b;
  }

  function fill(el, nodes) { el.innerHTML = ''; nodes.forEach(function (n) { el.appendChild(n); }); }

  function renderOptions() {
    var c = courseById(state.course);

    var lastGroup = '';
    fill($('opt-course'), [].concat.apply([], P.courses.map(function (co) {
      var ready = !!co.tuition && !co.status;
      var nodes = [];
      var g = co.group || '다이빙';
      if (g !== lastGroup) {
        var h = document.createElement('div');
        h.className = 'opt-group';
        h.textContent = g;
        nodes.push(h);
        lastGroup = g;
      }
      nodes.push(button({
        row: true, t: co.name, d: co.desc, meta: ready ? co.days : (co.status || '1:1 상담'),
        pressed: state.course === co.id, disabled: !ready,
        onClick: function () { state.course = co.id; if (!co.seaDays) state.sea = null; render(); }
      }));
      return nodes;
    })));

    fill($('opt-format'), [1, 2, 3].map(function (n) {
      var f = P.formats[n];
      var price = c && c.tuition ? won(c.tuition[n]) : '';
      return button({ t: f.label, d: f.who, p: price, pressed: state.n === n, onClick: function () { state.n = n; render(); } });
    }));

    $('step-elearning').style.display = c && !c.elearning && c.elearning !== null ? 'none' : '';
    fill($('opt-elearning'), [
      button({ t: '포함', d: '처음 시작하는 경우', pressed: state.elearning === 'yes', onClick: function () { state.elearning = 'yes'; render(); } }),
      button({ t: '빼기', d: '이미 등록한 경우', pressed: state.elearning === 'no', onClick: function () { state.elearning = 'no'; render(); } })
    ]);

    $('step-sea').style.display = c && !c.seaDays ? 'none' : '';
    $('step-gear').style.display = c && !needsGear(c) ? 'none' : '';
    fill($('opt-sea'), ['east', 'jeju', 'abroad'].map(function (k) {
      var s = P.sea[k];
      return button({ t: s.name, d: s.desc, pressed: state.sea === k, onClick: function () { state.sea = k; render(); } });
    }));

    fill($('opt-gear'), [
      button({ t: '렌털', d: '현장에서 빌림', pressed: state.gear === 'rent', onClick: function () { state.gear = 'rent'; render(); } }),
      button({ t: '본인 장비', d: '가진 장비로', pressed: state.gear === 'own', onClick: function () { state.gear = 'own'; render(); } })
    ]);
  }

  function needsGear(c) {
    return !!(c.seaDays || c.pool[1] || c.pool[2] || c.pool[3]);
  }

  function line(k, s, v, muted) {
    return '<div class="line"><span class="k">' + k + (s ? '<span class="s">' + s + '</span>' : '') + '</span><span class="v' + (muted ? ' muted' : '') + '">' + v + '</span></div>';
  }

  function renderSummary() {
    var c = courseById(state.course);
    var n = state.n;
    var html = '';
    var pay = 0;
    var pending = 0;

    if (!c || !n) {
      $('lines').innerHTML = '<div class="line"><span class="k" style="color:var(--ink3);font-weight:500">과정과 인원을 고르면 여기에 쌓입니다</span></div>';
      $('total').textContent = '–';
      $('mbar-total').textContent = '–';
      $('total-sub').textContent = '과정과 인원을 고르세요';
      return;
    }

    html += '<div class="grp">결제</div>';
    var referral = state.sea === 'jeju' && c.referral;
    var t = referral ? c.referral[n] : c.tuition[n];
    pay += t;
    html += line(c.name + ' 교육비', P.formats[n].label + ' · 1인' + (referral ? ' · 이론·수영장' : ''), won(t));

    var needEl = c.elearning !== 0;
    if (needEl && !state.elearning) {
      html += line('eLearning', '포함 또는 빼기 선택', '–', true);
    } else if (state.elearning === 'yes') {
      if (c.elearning === null) { html += line('eLearning', '라이선스 신청비 포함', '상담', true); pending++; }
      else { pay += c.elearning; html += line('eLearning', '라이선스 신청비 포함', won(c.elearning)); }
    } else if (state.elearning === 'no') {
      html += line('eLearning', '이미 등록', '0원');
    }

    if (c.seaDays) {
      if (!state.sea) {
        html += line('바다', '동해·제주·해외 중 선택', '–', true);
      } else if (state.sea === 'east') {
        var east = P.sea.east.perPerson[c.seaDays][n];
        pay += east;
        html += line('동해 ' + c.seaDays + '일', P.sea.east.desc + ' · ' + P.formats[n].label, won(east));
      } else if (referral) {
        html += line('제주 바다', '현지 다이브센터에서 마치고 현지에 직접 결제', '현지 결제', true);
      } else {
        html += line(P.sea[state.sea].name, state.sea === 'jeju' ? '이 과정은 상담에서 안내' : P.sea[state.sea].desc, P.sea[state.sea].quote, true);
        pending++;
      }
    }

    html += '<div class="grp">현장 결제</div>';
    var onsite = 0;
    var sessions = c.pool[n];
    if (sessions) {
      onsite += P.onsite.poolPerSession * sessions;
      html += line('수영장 입장료', sessions + '회 · 시설 요금 예시', won(P.onsite.poolPerSession * sessions));
    }
    if (state.gear === 'rent') {
      var seaRent = state.sea === 'east' ? c.seaDays : 0;
      var rent = P.onsite.rentalPoolDay * sessions + P.onsite.rentalSeaDay * seaRent;
      onsite += rent;
      html += line('장비 렌털', '풀 ' + sessions + '일' + (seaRent ? ' · 바다 ' + seaRent + '일' : '') + ' · 시설 공용 장비', won(rent));
    } else if (!needsGear(c)) {
      // land course: no gear line
    } else if (state.gear === 'own') {
      html += line('장비 렌털', '본인 장비', '0원');
    } else {
      html += line('장비', '렌털 또는 본인 장비', '–', true);
    }

    $('lines').innerHTML = html;
    var missing = [];
    if (needEl && !state.elearning) missing.push('eLearning');
    if (c.seaDays && !state.sea) missing.push('바다');
    if (needsGear(c) && !state.gear) missing.push('장비');
    if (missing.length) {
      $('total').textContent = '–';
      $('mbar-total').textContent = '–';
      $('total-sub').textContent = missing.join(', ') + '까지 고르면 1인 합계가 나옵니다';
      return;
    }
    var all = pay + onsite;
    $('total').textContent = won(all);
    $('mbar-total').textContent = won(all);
    var sub = '스마트스토어 결제 ' + won(pay) + (onsite ? ' · 현장 결제 ' + won(onsite) : '');
    if (referral) sub += ' · 제주 바다는 현지 결제(합계 제외)';
    if (pending) sub += ' · 상담 견적 ' + pending + '개(합계 제외)';
    $('total-sub').textContent = sub;
  }

  function render() {
    renderOptions();
    renderSummary();
    $('demo-badge').textContent = P.status || '';
    $('demo-badge').style.display = P.status ? '' : 'none';
  }

  render();
})();
