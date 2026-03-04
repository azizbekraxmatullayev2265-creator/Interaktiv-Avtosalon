/* =============================================
   APEX MOTORS — Virtual Showroom
   script.js
   ============================================= */

/* ============================================
   CAR DATA
   ============================================ */
const cars = [
  {
    id: 'mercedes',
    brand: 'Mercedes-Benz',
    model: 'AMG GT 63 S',
    basePrice: 145000,
    hp: 630,
    speed: '3.2s',
    topSpeed: '315',
    colors: ['#1a1a2e', '#C0392B', '#ECF0F1', '#2C3E50', '#1E8449'],
    colorNames: ['Gece Mavisi', 'Qip-qizil', 'Platina Oq', 'Grafitli Qora', 'British Racing'],
    options: [
      { name: 'Sport Plus Paketi',  desc: 'Aktiv aerodinamika + Launching Control', price: 12000, checked: false },
      { name: 'Night Drive Paketi', desc: 'MBUX + AR HUD + kuchaytirilgan farlar',  price: 8500,  checked: false },
      { name: 'Burmester 3D Audio', desc: '31 dinamik, 1560W sound system',          price: 6200,  checked: false },
      { name: 'Keramik Tormozlar',  desc: 'Sport keramika - ultra yengil',           price: 9800,  checked: false },
      { name: 'Carbon Fiber Salon', desc: "To'liq karbon fiber bezatish",            price: 7400,  checked: false },
    ]
  },
  {
    id: 'bmw',
    brand: 'BMW',
    model: 'M8 Competition',
    basePrice: 135000,
    hp: 625,
    speed: '3.0s',
    topSpeed: '305',
    colors: ['#2C3E50', '#1ABC9C', '#E74C3C', '#F39C12', '#FDFEFE'],
    colorNames: ['Dravit Grey', 'Aventurin Green', 'Melbourne Red', 'Manuka Gold', 'Alpine White'],
    options: [
      { name: "M Driver's Package",    desc: 'Top Speed 305 km/s + M telemetri',         price: 2500,  checked: false },
      { name: 'Executive Package',     desc: 'Comfort Acces + Soft Close eshiklar',       price: 5800,  checked: false },
      { name: 'Bowers & Wilkins Audio',desc: 'Diamond surround sound system',             price: 5200,  checked: false },
      { name: 'Carbon M Package',      desc: 'Carbon hood + roof + mirror caps',          price: 11000, checked: false },
      { name: 'Merino Leather Salon',  desc: 'Premium Merino teri + ambient light',       price: 4900,  checked: false },
    ]
  },
  {
    id: 'audi',
    brand: 'Audi',
    model: 'RS e-tron GT',
    basePrice: 142000,
    hp: 637,
    speed: '2.9s',
    topSpeed: '250',
    colors: ['#117A65', '#2E4057', '#E8E8E8', '#7D3C98', '#1B2631'],
    colorNames: ['Tactical Green', 'Kemora Grey', 'Ice Silver', 'Ascari Blue', 'Mythos Black'],
    options: [
      { name: 'RS Sport Paketi',    desc: 'Aktiv aerodinamika + RS spesifik tuning',  price: 9500,  checked: false },
      { name: 'Bang & Olufsen 3D',  desc: '710W premium audio + 3D sound',            price: 7100,  checked: false },
      { name: 'Towing Package',     desc: 'Adaptiv air suspension + trailer',         price: 3200,  checked: false },
      { name: 'Night Vision Plus',  desc: 'Infraqizil kamera + pedestrian detect',    price: 4400,  checked: false },
      { name: 'Carbon Atlas Paketi',desc: 'Atlas teri + carbon mozaika bezak',        price: 8600,  checked: false },
    ]
  }
];

/* ============================================
   SVG CAR GENERATORS
   ============================================ */

/**
 * Adjusts a hex color brightness by adding `amount` to each RGB channel.
 * @param {string} hex  - e.g. "#1a1a2e"
 * @param {number} amount - positive = lighter, negative = darker
 */
function adjustColor(hex, amount) {
  try {
    const num = parseInt(hex.slice(1), 16);
    const r   = Math.min(255, (num >> 16)         + amount);
    const g   = Math.min(255, ((num >> 8) & 0xff) + amount);
    const b   = Math.min(255, (num & 0xff)        + amount);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  } catch (e) { return hex; }
}

function getMercedesSVG(color) {
  const roof = adjustColor(color, 20);
  return `
  <svg width="300" height="160" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="150" cy="120" rx="115" ry="8" fill="rgba(0,0,0,0.3)"/>
    <path d="M30 100 L35 80 L60 55 L100 45 L140 40 L180 42 L220 50 L255 68 L270 100 Z"
          fill="${color}" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <path d="M70 80 L90 52 L130 44 L170 44 L210 52 L230 72 L220 80 Z"
          fill="${roof}" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
    <!-- Windows -->
    <path d="M85 78 L100 54 L128 48 L128 78 Z"   fill="rgba(150,210,255,0.35)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <path d="M133 78 L133 48 L165 48 L165 78 Z"  fill="rgba(150,210,255,0.35)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <path d="M170 78 L170 50 L198 56 L215 72 L215 78 Z" fill="rgba(150,210,255,0.35)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <!-- AMG Grille -->
    <path d="M38 88 L38 100 L65 100 L68 88 Z" fill="#111" stroke="${color}" stroke-width="0.5"/>
    <line x1="41" y1="92" x2="62" y2="92" stroke="${color}" stroke-width="0.7" opacity="0.8"/>
    <line x1="40" y1="96" x2="63" y2="96" stroke="${color}" stroke-width="0.7" opacity="0.6"/>
    <!-- Headlight -->
    <path d="M36 85 L48 85 L52 92 L36 92 Z" fill="rgba(255,240,200,0.9)" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <!-- Rear light -->
    <path d="M255 80 L268 82 L268 100 L252 100 Z" fill="#C0392B" opacity="0.9"/>
    <!-- Hood lines -->
    <line x1="68"  y1="78" x2="35"  y2="100" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
    <line x1="231" y1="78" x2="265" y2="100" stroke="rgba(255,255,255,0.1)"  stroke-width="1"/>
    <!-- Door lines -->
    <line x1="130" y1="46" x2="130" y2="100" stroke="rgba(0,0,0,0.3)" stroke-width="0.8"/>
    <line x1="170" y1="46" x2="170" y2="100" stroke="rgba(0,0,0,0.3)" stroke-width="0.8"/>
    <!-- Front wheel -->
    <g class="wheel" style="transform-origin: 75px 112px">
      <circle cx="75" cy="112" r="22" fill="#111" stroke="#333" stroke-width="1.5"/>
      <circle cx="75" cy="112" r="15" fill="#1a1a1a" stroke="#555" stroke-width="1"/>
      <circle cx="75" cy="112" r="5"  fill="#e8b143"/>
      <line x1="75" y1="97"  x2="75" y2="127" stroke="#444" stroke-width="1.5"/>
      <line x1="60" y1="112" x2="90" y2="112" stroke="#444" stroke-width="1.5"/>
      <line x1="65" y1="101" x2="85" y2="123" stroke="#444" stroke-width="1.2"/>
      <line x1="85" y1="101" x2="65" y2="123" stroke="#444" stroke-width="1.2"/>
    </g>
    <!-- Rear wheel -->
    <g class="wheel" style="transform-origin: 225px 112px">
      <circle cx="225" cy="112" r="22" fill="#111" stroke="#333" stroke-width="1.5"/>
      <circle cx="225" cy="112" r="15" fill="#1a1a1a" stroke="#555" stroke-width="1"/>
      <circle cx="225" cy="112" r="5"  fill="#e8b143"/>
      <line x1="225" y1="97"  x2="225" y2="127" stroke="#444" stroke-width="1.5"/>
      <line x1="210" y1="112" x2="240" y2="112" stroke="#444" stroke-width="1.5"/>
      <line x1="215" y1="101" x2="235" y2="123" stroke="#444" stroke-width="1.2"/>
      <line x1="235" y1="101" x2="215" y2="123" stroke="#444" stroke-width="1.2"/>
    </g>
    <path d="M40 100 L260 100 L265 102 L35 102 Z" fill="rgba(255,255,255,0.06)"/>
  </svg>`;
}

function getBMWSVG(color) {
  const roof = adjustColor(color, 18);
  return `
  <svg width="300" height="160" viewBox="0 0 300 160" fill="none">
    <ellipse cx="150" cy="120" rx="115" ry="8" fill="rgba(0,0,0,0.3)"/>
    <path d="M25 100 L28 78 L55 50 L100 40 L155 38 L200 40 L240 55 L268 78 L272 100 Z"
          fill="${color}" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <path d="M65 78 L80 48 L130 38 L180 40 L220 55 L245 78 Z"
          fill="${roof}" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
    <!-- Windows -->
    <path d="M78 76 L92 50 L124 42 L124 76 Z"  fill="rgba(150,210,255,0.35)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <path d="M128 76 L128 42 L162 42 L162 76 Z" fill="rgba(150,210,255,0.35)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <path d="M166 76 L166 44 L200 52 L222 70 L222 76 Z" fill="rgba(150,210,255,0.35)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <!-- BMW Kidney Grille -->
    <path d="M32 82 L34 70 L50 68 L52 82 Z" fill="#0a0a0a" stroke="#0066cc" stroke-width="1"/>
    <path d="M56 82 L58 70 L74 68 L72 82 Z" fill="#0a0a0a" stroke="#0066cc" stroke-width="1"/>
    <rect x="33" y="69" width="18" height="12" rx="2" fill="none" stroke="#0066cc" stroke-width="0.5"/>
    <rect x="57" y="69" width="15" height="12" rx="2" fill="none" stroke="#0066cc" stroke-width="0.5"/>
    <!-- Angel Eye headlight -->
    <ellipse cx="45" cy="82" rx="12" ry="6" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
    <ellipse cx="45" cy="82" rx="7"  ry="4" fill="rgba(255,240,200,0.8)"/>
    <!-- Rear -->
    <path d="M252 72 L268 76 L270 100 L248 100 Z" fill="#C0392B" opacity="0.85"/>
    <!-- Door lines -->
    <line x1="125" y1="42" x2="125" y2="100" stroke="rgba(0,0,0,0.3)" stroke-width="0.8"/>
    <line x1="163" y1="44" x2="163" y2="100" stroke="rgba(0,0,0,0.3)" stroke-width="0.8"/>
    <!-- Front wheel -->
    <g class="wheel" style="transform-origin: 80px 112px">
      <circle cx="80" cy="112" r="21" fill="#0d0d0d" stroke="#2a2a2a" stroke-width="1.5"/>
      <circle cx="80" cy="112" r="14" fill="#151515" stroke="#444"   stroke-width="1"/>
      <circle cx="80" cy="112" r="5"  fill="#0066cc"/>
      <line x1="80" y1="98"  x2="80" y2="126" stroke="#333" stroke-width="2"/>
      <line x1="66" y1="112" x2="94" y2="112" stroke="#333" stroke-width="2"/>
      <line x1="70" y1="102" x2="90" y2="122" stroke="#333" stroke-width="1.5"/>
      <line x1="90" y1="102" x2="70" y2="122" stroke="#333" stroke-width="1.5"/>
    </g>
    <!-- Rear wheel -->
    <g class="wheel" style="transform-origin: 225px 112px">
      <circle cx="225" cy="112" r="21" fill="#0d0d0d" stroke="#2a2a2a" stroke-width="1.5"/>
      <circle cx="225" cy="112" r="14" fill="#151515" stroke="#444"   stroke-width="1"/>
      <circle cx="225" cy="112" r="5"  fill="#0066cc"/>
      <line x1="225" y1="98"  x2="225" y2="126" stroke="#333" stroke-width="2"/>
      <line x1="211" y1="112" x2="239" y2="112" stroke="#333" stroke-width="2"/>
      <line x1="215" y1="102" x2="235" y2="122" stroke="#333" stroke-width="1.5"/>
      <line x1="235" y1="102" x2="215" y2="122" stroke="#333" stroke-width="1.5"/>
    </g>
    <path d="M30 100 L268 100 L270 102 L28 102 Z" fill="rgba(255,255,255,0.05)"/>
  </svg>`;
}

function getAudiSVG(color) {
  const roof = adjustColor(color, 15);
  return `
  <svg width="300" height="160" viewBox="0 0 300 160" fill="none">
    <ellipse cx="150" cy="120" rx="120" ry="8" fill="rgba(0,0,0,0.3)"/>
    <path d="M20 100 L22 85 L45 60 L90 45 L150 40 L210 45 L255 62 L275 85 L278 100 Z"
          fill="${color}" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <path d="M60 82 L78 52 L130 40 L175 40 L220 54 L240 76 L240 82 Z"
          fill="${roof}" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/>
    <!-- Windows -->
    <path d="M75 80 L90 54 L122 44 L122 80 Z"  fill="rgba(150,210,255,0.3)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <path d="M126 80 L126 44 L160 44 L160 80 Z" fill="rgba(150,210,255,0.3)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <path d="M164 80 L164 46 L195 54 L218 72 L218 80 Z" fill="rgba(150,210,255,0.3)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <!-- Audi Singleframe -->
    <ellipse cx="52" cy="88" rx="20" ry="14" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    <ellipse cx="52" cy="88" rx="14" ry="9"  fill="#111"  stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
    <!-- Matrix LED -->
    <rect x="30" y="80" width="20" height="4" rx="2" fill="rgba(255,240,200,0.9)"/>
    <rect x="30" y="86" width="16" height="3" rx="1.5" fill="rgba(200,200,255,0.7)"/>
    <!-- Rear LED bar -->
    <rect x="255" y="76" width="18" height="24" rx="2" fill="#C0392B" opacity="0.8"/>
    <rect x="257" y="78" width="4"  height="20" rx="1" fill="#FF6B6B" opacity="0.6"/>
    <!-- Door lines -->
    <line x1="122" y1="44" x2="122" y2="100" stroke="rgba(0,0,0,0.25)" stroke-width="0.8"/>
    <line x1="162" y1="44" x2="162" y2="100" stroke="rgba(0,0,0,0.25)" stroke-width="0.8"/>
    <!-- Body crease -->
    <path d="M25 88 L270 88" stroke="rgba(255,255,255,0.08)" stroke-width="0.8"/>
    <!-- Front wheel -->
    <g class="wheel" style="transform-origin: 78px 110px">
      <circle cx="78" cy="110" r="23" fill="#0a0a0a" stroke="#222"   stroke-width="1.5"/>
      <circle cx="78" cy="110" r="16" fill="#131313" stroke="#3a3a3a" stroke-width="1"/>
      <circle cx="78" cy="110" r="4"  fill="#888"/>
      <line x1="78" y1="94"  x2="78" y2="126" stroke="#333" stroke-width="2"/>
      <line x1="62" y1="110" x2="94" y2="110" stroke="#333" stroke-width="2"/>
      <line x1="67" y1="99"  x2="89" y2="121" stroke="#333" stroke-width="1.5"/>
      <line x1="89" y1="99"  x2="67" y2="121" stroke="#333" stroke-width="1.5"/>
    </g>
    <!-- Rear wheel -->
    <g class="wheel" style="transform-origin: 225px 110px">
      <circle cx="225" cy="110" r="23" fill="#0a0a0a" stroke="#222"   stroke-width="1.5"/>
      <circle cx="225" cy="110" r="16" fill="#131313" stroke="#3a3a3a" stroke-width="1"/>
      <circle cx="225" cy="110" r="4"  fill="#888"/>
      <line x1="225" y1="94"  x2="225" y2="126" stroke="#333" stroke-width="2"/>
      <line x1="209" y1="110" x2="241" y2="110" stroke="#333" stroke-width="2"/>
      <line x1="214" y1="99"  x2="236" y2="121" stroke="#333" stroke-width="1.5"/>
      <line x1="236" y1="99"  x2="214" y2="121" stroke="#333" stroke-width="1.5"/>
    </g>
    <path d="M22 100 L276 100 L278 102 L20 102 Z" fill="rgba(255,255,255,0.04)"/>
  </svg>`;
}

/* Map car id → SVG generator function */
const svgGenerators = {
  mercedes: getMercedesSVG,
  bmw:      getBMWSVG,
  audi:     getAudiSVG
};

/* ============================================
   STATE
   ============================================ */
const selectedColors = {};
cars.forEach(c => (selectedColors[c.id] = 0));

let currentCar    = null;
let showInterior  = false;

/* ============================================
   RENDER CAR CARDS
   ============================================ */
function renderCards() {
  const grid = document.getElementById('carsGrid');
  grid.innerHTML = '';

  cars.forEach(car => {
    const colorIdx = selectedColors[car.id];
    const color    = car.colors[colorIdx];

    const card = document.createElement('div');
    card.className = 'car-card';
    card.innerHTML = `
      <div class="car-visual">
        <div class="car-shadow"></div>
        <div class="car-svg-container">
          ${svgGenerators[car.id](color)}
        </div>
        <div class="color-strip">
          ${car.colors.map((c, i) => `
            <div
              class="color-dot ${i === colorIdx ? 'active' : ''}"
              style="background:${c}"
              onclick="changeColor('${car.id}', ${i}, event)"
              title="${car.colorNames[i]}"
            ></div>
          `).join('')}
        </div>
      </div>
      <div class="car-info">
        <div class="car-brand">${car.brand}</div>
        <div class="car-name">${car.model}</div>
        <div class="car-specs">
          <div class="spec">
            <span class="spec-val">${car.hp}</span>
            <span class="spec-label">Ot Kuchi</span>
          </div>
          <div class="spec">
            <span class="spec-val">${car.speed}</span>
            <span class="spec-label">0–100</span>
          </div>
          <div class="spec">
            <span class="spec-val">${car.topSpeed}</span>
            <span class="spec-label">Max km/s</span>
          </div>
        </div>
        <div class="car-price-row">
          <div class="car-price">$${car.basePrice.toLocaleString()}</div>
          <button class="configure-btn" onclick="openModal('${car.id}')">
            Sozlash →
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ============================================
   COLOR CHANGE (cards)
   ============================================ */
function changeColor(carId, idx, event) {
  event.stopPropagation();
  selectedColors[carId] = idx;
  renderCards();
  if (currentCar && currentCar.id === carId) updateModalPreview();
}

/* ============================================
   MODAL — OPEN / CLOSE
   ============================================ */
function openModal(carId) {
  currentCar   = cars.find(c => c.id === carId);
  showInterior = false;

  document.getElementById('modalBrand').textContent = currentCar.brand;
  document.getElementById('modalName').textContent  = currentCar.model;

  updateModalPreview();
  renderOptions();
  updateTotal();

  document.getElementById('interiorView').classList.remove('visible');
  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = '';
  currentCar = null;
  // Reset all option checkboxes
  cars.forEach(c => c.options.forEach(o => (o.checked = false)));
}

/* Click outside modal to close */
document.getElementById('modalOverlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

/* ============================================
   MODAL — PREVIEW & COLOR PICKER
   ============================================ */
function updateModalPreview() {
  const colorIdx = selectedColors[currentCar.id];
  const color    = currentCar.colors[colorIdx];
  const container = document.getElementById('previewSvgContainer');

  container.innerHTML = `
    <div style="animation: float 3s ease-in-out infinite;">
      ${svgGenerators[currentCar.id](color)}
    </div>`;

  // Rebuild modal color dots
  const picker = document.getElementById('modalColorPicker');
  picker.innerHTML = currentCar.colors.map((c, i) => `
    <div
      class="modal-color-dot ${i === colorIdx ? 'active' : ''}"
      style="background:${c}"
      onclick="changeModalColor(${i})"
      title="${currentCar.colorNames[i]}"
    ></div>
  `).join('');
}

function changeModalColor(idx) {
  selectedColors[currentCar.id] = idx;
  updateModalPreview();
  renderCards(); // sync card color too
}

/* ============================================
   MODAL — OPTIONS & PRICE
   ============================================ */
function renderOptions() {
  const list = document.getElementById('optionsList');
  list.innerHTML = currentCar.options.map((opt, i) => `
    <div class="option-item ${opt.checked ? 'checked' : ''}" onclick="toggleOption(${i})">
      <div class="option-check">
        <div class="option-check-inner"></div>
      </div>
      <div class="option-details">
        <div class="option-name">${opt.name}</div>
        <div class="option-desc">${opt.desc}</div>
      </div>
      <div class="option-price">+$${opt.price.toLocaleString()}</div>
    </div>
  `).join('');
}

function toggleOption(i) {
  currentCar.options[i].checked = !currentCar.options[i].checked;
  renderOptions();
  updateTotal();
}

function updateTotal() {
  const extras = currentCar.options.reduce((sum, o) => sum + (o.checked ? o.price : 0), 0);
  const total  = currentCar.basePrice + extras;
  const el     = document.getElementById('totalPrice');
  el.textContent  = '$' + total.toLocaleString();
  el.style.textShadow = extras > 0
    ? '0 0 60px rgba(232,177,67,0.6)'
    : '0 0 40px rgba(232,177,67,0.4)';
}

/* ============================================
   MODAL — INTERIOR TOGGLE
   ============================================ */
function toggleInterior() {
  showInterior = !showInterior;
  document.getElementById('interiorView').classList.toggle('visible', showInterior);
}

/* ============================================
   ORDER
   ============================================ */
function placeOrder() {
  const extras = currentCar.options.reduce((sum, o) => sum + (o.checked ? o.price : 0), 0);
  const total  = currentCar.basePrice + extras;
  const model  = currentCar.model;
  closeModal();
  showToast(`${model} — $${total.toLocaleString()} — Buyurtma qabul!`);
}

/* ============================================
   TOAST NOTIFICATION
   ============================================ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = '✓ ' + msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

/* Smooth lagging ring */
function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* Scale cursor on interactive elements */
document.addEventListener('mouseover', e => {
  if (e.target.closest('button, .color-dot, .modal-color-dot, .option-item, .car-card')) {
    cursorDot.style.transform  = 'translate(-50%,-50%) scale(2)';
    cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)';
    cursorRing.style.opacity   = '1';
  }
});

document.addEventListener('mouseout', e => {
  if (e.target.closest('button, .color-dot, .modal-color-dot, .option-item, .car-card')) {
    cursorDot.style.transform  = 'translate(-50%,-50%) scale(1)';
    cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorRing.style.opacity   = '0.6';
  }
});

/* ============================================
   INIT
   ============================================ */
renderCards();
