// Price proposal 2026-10-11. Tuition: NB Divers x 1.1 (DSD: owner price). eLearning: OW 300,000, others by Hana Plaza ratio.
// Donghae: same as NB. Jeju: OW referral like NB (theory + pool here, sea paid to the local center). MSD: NB x 1.1.
// Source table: planning/pricing/R17_nb-pricing-and-gbp-proposal.md. Awaiting owner approval.
// tuition: per person, includes sea instruction days. sea: Donghae fee per person (transport, dives, insurance).
window.GBP_PRICES = {
  asOf: '2026-10-11',
  status: '',
  courses: [
    { id: 'dsd', name: '체험 다이빙', desc: '하루, 물속 첫 호흡', days: '1일',
      tuition: { 1: 100000, 2: 70000, 3: 50000 }, elearning: 0, pool: { 1: 1, 2: 1, 3: 1 }, seaDays: 0 },
    { id: 'ow', name: '오픈워터', desc: '첫 자격증. 수영장에서 바다까지', days: '4~6일',
      tuition: { 1: 1320000, 2: 830000, 3: 660000 }, elearning: 306000, pool: { 1: 2, 2: 3, 3: 4 }, seaDays: 2,
      referral: { 1: 660000, 2: 500000, 3: 440000 } },
    { id: 'aow', name: '어드밴스드 오픈워터', desc: '수심과 수중 항법', days: '2.5일',
      tuition: { 1: 830000, 2: 420000, 3: 280000 }, elearning: 276000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 2 },
    { id: 'rescue', name: '레스큐 다이버', desc: '다른 다이버를 돕는 법', days: '2~4일',
      tuition: { 1: 840000, 2: 660000, 3: 660000 }, elearning: 293000, pool: { 1: 0, 2: 1, 3: 2 }, seaDays: 2 },
    { id: 'react', name: '리액티베이트', desc: '쉬었다가 다시 시작', days: '1일',
      tuition: { 1: 330000, 2: 170000, 3: 110000 }, elearning: 130000, pool: { 1: 1, 2: 1, 3: 1 }, seaDays: 0 },
    { id: 'nitrox', name: '나이트록스', desc: '더 긴 바닥 시간', days: '1일',
      tuition: { 1: 330000, 2: 170000, 3: 110000 }, elearning: 250000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'deep', name: '딥 다이버', desc: '40m까지', days: '2일',
      tuition: { 1: 660000, 2: 330000, 3: 220000 }, elearning: 210000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 2 },
    { id: 'wreck', name: '난파선 다이버', desc: '난파선 탐사', days: '2일',
      tuition: { 1: 660000, 2: 330000, 3: 220000 }, elearning: 210000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 2 },
    { id: 'dry', name: '드라이슈트', desc: '사계절 다이빙', days: '2일',
      tuition: { 1: 660000, 2: 330000, 3: 220000 }, elearning: 210000, pool: { 1: 1, 2: 1, 3: 1 }, seaDays: 1 },
    { id: 'ppb', name: '중성부력', desc: '떠 있는 자세 다듬기', days: '1일',
      tuition: { 1: 330000, 2: 170000, 3: 110000 }, elearning: 210000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 1 },
    { id: 'nav', name: '수중 항법', desc: '나침반과 지형으로 길 찾기', days: '2일',
      tuition: { 1: 660000, 2: 330000, 3: 220000 }, elearning: 210000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 2 },
    { id: 'sidemount', name: '사이드마운트', desc: '옆으로 메는 실린더', days: '2일',
      tuition: { 1: 660000, 2: 330000, 3: 220000 }, elearning: 210000, pool: { 1: 1, 2: 1, 3: 1 }, seaDays: 1 },
    { id: 'efr', group: '응급처치', name: 'EFR 일차·이차 처치', desc: 'CPR과 응급처치', days: '하루',
      tuition: { 1: 330000, 2: 170000, 3: 110000 }, elearning: 179000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'c4c', group: '응급처치', name: '어린이 응급처치', desc: '어린이·영아 CPR', days: '반나절',
      tuition: { 1: 170000, 2: 90000, 3: 60000 }, elearning: 142000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'cpraed', group: '응급처치', name: 'CPR & AED', desc: 'CPR과 자동심장충격기', days: '반나절',
      tuition: { 1: 170000, 2: 90000, 3: 60000 }, elearning: null, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'eop', group: '응급처치', name: '산소 응급처치', desc: '응급 산소 공급', days: '반나절',
      tuition: { 1: 170000, 2: 90000, 3: 60000 }, elearning: 161000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'efr_eop', group: '응급처치', name: '묶음 · EFR + 산소', desc: '1.5일', days: '1.5일',
      tuition: { 1: 450000, 2: 240000, 3: 160000 }, elearning: 340000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'efr_c4c', group: '응급처치', name: '묶음 · EFR + 어린이', desc: '1.5일', days: '1.5일',
      tuition: { 1: 450000, 2: 240000, 3: 160000 }, elearning: 321000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'efr_full', group: '응급처치', name: '묶음 · EFR + 어린이 + 산소', desc: '2일', days: '2일',
      tuition: { 1: 610000, 2: 320000, 3: 210000 }, elearning: 482000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'cpr_eop', group: '응급처치', name: '묶음 · CPR & AED + 산소', desc: '1일', days: '1일',
      tuition: { 1: 310000, 2: 170000, 3: 110000 }, elearning: null, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'refresher', group: '응급처치', name: 'EFR 리프레셔', desc: '24개월마다 다시', days: '반나절',
      tuition: { 1: 170000, 2: 90000, 3: 60000 }, elearning: 0, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'efri', group: '응급처치', name: 'EFR 강사 과정', desc: '응급처치를 가르치는 사람으로', days: '2일',
      tuition: { 1: 900000, 2: 700000, 3: 600000 }, elearning: 346000, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 },
    { id: 'tec', group: '테크니컬', name: '테크니컬 (텍 40·45·50)', desc: '1:1 상담 뒤 견적', days: '—',
      tuition: null, elearning: null, pool: { 1: 0, 2: 0, 3: 0 }, seaDays: 0 }
  ],
  formats: {
    1: { label: '1:1', who: '온전히 나에게 맞춘 수업' },
    2: { label: '1:2', who: '둘이 함께' },
    3: { label: '1:3', who: '작은 팀으로' }
  },
  sea: {
    east: { name: '동해', desc: '교통·다이빙·보험 포함',
      perPerson: { 1: { 1: 613000, 2: 368000, 3: 286000 }, 2: { 1: 1227000, 2: 736000, 3: 573000 } } },
    jeju: { name: '제주', desc: '바다는 현지 센터에서 (위탁)', referral: true, quote: '상담' },
    abroad: { name: '해외', desc: '지역별 별도 견적', quote: '별도 견적' }
  },
  msd: { full: 2110000, owd: 1680000, aowd: 1570000, individual: 3250000 },
  onsite: {
    poolPerSession: 32000,   // 시설 입장료 예시(서울 잠실). 시설마다 다름
    rentalPoolDay: 20000,    // 시설 공용 장비, 풀 1일
    rentalSeaDay: 30000      // 시설 공용 장비, 바다 1일
  }
};
