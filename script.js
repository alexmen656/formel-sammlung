// Unit System
let unitSystem = {
    length: 'm',
    time: 's',
    mass: 'kg',
    velocity: 'm/s'
};

// Unit conversion factors (to SI units)
const unitConversions = {
    length: {
        'm': 1,
        'km': 1000,
        'cm': 0.01,
        'mm': 0.001
    },
    time: {
        's': 1,
        'min': 60,
        'h': 3600
    },
    mass: {
        'kg': 1,
        'g': 0.001,
        't': 1000
    },
    velocity: {
        'm/s': 1,
        'km/h': 1/3.6
    }
};

// Tab Switching
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    const clickedButton = document.querySelector(`[data-tab="${tabName}"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
    
    // Hide search results
    document.getElementById('searchResults').classList.remove('show');
}

// Unit System Functions
function toggleUnitMenu() {
    const menu = document.getElementById('unitMenu');
    menu.classList.toggle('show');
}

function updateUnitSystem() {
    unitSystem.length = document.getElementById('unit_length').value;
    unitSystem.time = document.getElementById('unit_time').value;
    unitSystem.mass = document.getElementById('unit_mass').value;
    unitSystem.velocity = document.getElementById('unit_velocity').value;
    
    updateUnitIndicator();
}

function updateUnitIndicator() {
    const indicator = document.getElementById('unitIndicator');
    const isSI = unitSystem.length === 'm' && 
                 unitSystem.time === 's' && 
                 unitSystem.mass === 'kg' &&
                 unitSystem.velocity === 'm/s';
    
    if (isSI) {
        indicator.textContent = 'SI';
        indicator.style.background = 'rgba(0, 113, 227, 0.8)';
    } else {
        indicator.textContent = 'Custom';
        indicator.style.background = 'rgba(255, 149, 0, 0.8)';
    }
}

function resetUnits() {
    document.getElementById('unit_length').value = 'm';
    document.getElementById('unit_time').value = 's';
    document.getElementById('unit_mass').value = 'kg';
    document.getElementById('unit_velocity').value = 'm/s';
    updateUnitSystem();
}

// Unit Conversion Helper
function convertToSI(value, unitType) {
    const currentUnit = unitSystem[unitType];
    return value * unitConversions[unitType][currentUnit];
}

function convertFromSI(value, unitType) {
    const currentUnit = unitSystem[unitType];
    return value / unitConversions[unitType][currentUnit];
}

function getUnitLabel(unitType) {
    return unitSystem[unitType];
}

// Search Functionality
const searchIndex = [
    { title: 'Geschwindigkeit', formula: 'v = s/t', description: 'Durchschnittsgeschwindigkeit', tab: 'translation', keywords: ['geschwindigkeit', 'velocity', 'weg', 'zeit'] },
    { title: 'Beschleunigung', formula: 'a = Δv/Δt', description: 'Änderung der Geschwindigkeit', tab: 'translation', keywords: ['beschleunigung', 'acceleration'] },
    { title: 'Kraft', formula: 'F = m·a', description: 'Newton\'sches Bewegungsgesetz', tab: 'translation', keywords: ['kraft', 'force', 'newton', 'masse'] },
    { title: 'Impuls', formula: 'p = m·v', description: 'Impuls = Masse × Geschwindigkeit', tab: 'translation', keywords: ['impuls', 'momentum'] },
    { title: 'Kinetische Energie', formula: 'E_kin = ½·m·v²', description: 'Bewegungsenergie', tab: 'translation', keywords: ['energie', 'energy', 'kinetisch', 'kinetic'] },
    { title: 'Arbeit', formula: 'W = F·s', description: 'Arbeit = Kraft × Weg', tab: 'translation', keywords: ['arbeit', 'work'] },
    { title: 'Leistung', formula: 'P = W/t', description: 'Leistung = Arbeit / Zeit', tab: 'translation', keywords: ['leistung', 'power', 'watt'] },
    { title: 'Winkelgeschwindigkeit', formula: 'ω = φ/t', description: 'Rotation', tab: 'rotation', keywords: ['winkelgeschwindigkeit', 'angular', 'rotation', 'omega'] },
    { title: 'Winkelbeschleunigung', formula: 'α = Δω/Δt', description: 'Änderung der Winkelgeschwindigkeit', tab: 'rotation', keywords: ['winkelbeschleunigung', 'angular acceleration', 'alpha'] },
    { title: 'Drehmoment', formula: 'M = I·α', description: 'Drehmoment = Trägheitsmoment × Winkelbeschleunigung', tab: 'rotation', keywords: ['drehmoment', 'torque', 'moment'] },
    { title: 'Drehimpuls', formula: 'L = I·ω', description: 'Drehimpuls = Trägheitsmoment × Winkelgeschwindigkeit', tab: 'rotation', keywords: ['drehimpuls', 'angular momentum'] },
    { title: 'Trägheitsmoment', formula: 'I = Σm·r²', description: 'Widerstand gegen Drehbeschleunigung', tab: 'rotation', keywords: ['trägheitsmoment', 'moment of inertia', 'inertia'] },
    { title: 'Rotationsenergie', formula: 'E_rot = ½·I·ω²', description: 'Kinetische Energie der Rotation', tab: 'rotation', keywords: ['rotationsenergie', 'rotational energy'] },
    { title: 'Freier Fall', formula: 's = ½·g·t²', description: 'Bewegung unter Erdanziehung', tab: 'mechanik', keywords: ['fall', 'freier fall', 'gravitation', 'g'] },
    { title: 'Gewichtskraft', formula: 'F_G = m·g', description: 'Gewichtskraft auf der Erde', tab: 'mechanik', keywords: ['gewicht', 'weight', 'schwerkraft', 'gravitation'] },
    { title: 'Federkraft', formula: 'F = D·s', description: 'Hookesches Gesetz', tab: 'mechanik', keywords: ['feder', 'spring', 'hooke'] },
    { title: 'Dichte', formula: 'ρ = m/V', description: 'Dichte = Masse / Volumen', tab: 'mechanik', keywords: ['dichte', 'density', 'rho'] },
    { title: 'Druck', formula: 'p = F/A', description: 'Druck = Kraft / Fläche', tab: 'mechanik', keywords: ['druck', 'pressure', 'pascal'] },
    { title: 'Potentielle Energie', formula: 'E_pot = m·g·h', description: 'Lageenergie', tab: 'energie', keywords: ['potentielle energie', 'potential energy', 'lageenergie', 'höhe'] },
    { title: 'Hubarbeit', formula: 'W_Hub = m·g·h', description: 'Arbeit zum Heben', tab: 'energie', keywords: ['hubarbeit', 'lifting work', 'heben'] },
    { title: 'Spannenergie', formula: 'E_Spann = ½·D·s²', description: 'Energie einer gespannten Feder', tab: 'energie', keywords: ['spannenergie', 'elastic energy', 'feder'] },
    { title: 'Wirkungsgrad', formula: 'η = W_nutz/W_zu', description: 'Verhältnis Nutzenergie zu zugeführter Energie', tab: 'energie', keywords: ['wirkungsgrad', 'efficiency', 'eta'] },
    { title: 'Wärmekapazität', formula: 'Q = c·m·ΔT', description: 'Wärmemenge für Temperaturänderung', tab: 'energie', keywords: ['wärme', 'heat', 'temperatur', 'kapazität'] },
    { title: 'Brechungsgesetz', formula: 'n₁·sin(α) = n₂·sin(β)', description: 'Snellius\'sches Brechungsgesetz', tab: 'optik', keywords: ['brechung', 'refraction', 'snellius', 'licht'] },
    { title: 'Linsengleichung', formula: '1/f = 1/g + 1/b', description: 'Abbildung durch dünne Linse', tab: 'optik', keywords: ['linse', 'lens', 'brennweite', 'focal'] },
    { title: 'Abbildungsmaßstab', formula: 'V = B/G = b/g', description: 'Vergrößerung', tab: 'optik', keywords: ['vergrößerung', 'magnification', 'abbildung'] }
];

function performSearch(query) {
    const resultsDiv = document.getElementById('searchResults');
    
    if (!query || query.trim().length < 2) {
        resultsDiv.classList.remove('show');
        return;
    }
    
    const searchTerm = query.toLowerCase().trim();
    const results = searchIndex.filter(item => {
        return item.title.toLowerCase().includes(searchTerm) ||
               item.formula.toLowerCase().includes(searchTerm) ||
               item.description.toLowerCase().includes(searchTerm) ||
               item.keywords.some(keyword => keyword.includes(searchTerm));
    });
    
    if (results.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">Keine Ergebnisse gefunden</div>';
        resultsDiv.classList.add('show');
        return;
    }
    
    let html = `<h4>${results.length} Ergebnis${results.length !== 1 ? 'se' : ''} gefunden</h4>`;
    
    results.forEach(result => {
        html += `
            <div class="search-result-item" onclick="goToFormula('${result.tab}')">
                <h5>${result.title}</h5>
                <p>${result.description}</p>
                <div class="formula-preview">${result.formula}</div>
            </div>
        `;
    });
    
    resultsDiv.innerHTML = html;
    resultsDiv.classList.add('show');
}

function goToFormula(tabName) {
    showTab(tabName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close unit menu when clicking outside
document.addEventListener('click', function(event) {
    const unitSelector = document.querySelector('.unit-selector');
    const unitMenu = document.getElementById('unitMenu');
    
    if (unitSelector && !unitSelector.contains(event.target)) {
        unitMenu.classList.remove('show');
    }
});

// Update all placeholder texts when units change
function updateAllPlaceholders() {
    // Update placeholders for length inputs
    const lengthInputs = [
        'mech_s', 'trans_s', 'work_s', 'work_distance', 
        'lift_h', 'pot_h', 'spring_s', 'spring_energy_s'
    ];
    lengthInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            const currentPlaceholder = input.placeholder;
            const match = currentPlaceholder.match(/(.+)\((.*)\)/);
            if (match) {
                input.placeholder = `${match[1]}(${getUnitLabel('length')})`;
            }
        }
    });
    
    // Update placeholders for time inputs
    const timeInputs = [
        'mech_t', 'trans_t', 'trans_time', 'unif_t', 'fall_t',
        'power_t', 'power_time', 'rot_t', 'rot_dt'
    ];
    timeInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            const currentPlaceholder = input.placeholder;
            const match = currentPlaceholder.match(/(.+)\((.*)\)/);
            if (match) {
                input.placeholder = `${match[1]}(${getUnitLabel('time')})`;
            }
        }
    });
    
    // Update placeholders for mass inputs
    const massInputs = [
        'newton_m', 'weight_m', 'density_m', 'lift_m', 'pot_m',
        'kin_m', 'kin_mass', 'imp_mass', 'trans_mass', 'heat_m'
    ];
    massInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            const currentPlaceholder = input.placeholder;
            const match = currentPlaceholder.match(/(.+)\((.*)\)/);
            if (match) {
                input.placeholder = `${match[1]}(${getUnitLabel('mass')})`;
            }
        }
    });
    
    // Update placeholders for velocity inputs
    const velocityInputs = [
        'unif_v', 'trans_dv', 'imp_vel', 'kin_vel'
    ];
    velocityInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            const currentPlaceholder = input.placeholder;
            const match = currentPlaceholder.match(/(.+)\((.*)\)/);
            if (match) {
                input.placeholder = `${match[1]}(${getUnitLabel('velocity')})`;
            }
        }
    });
}

// Override updateUnitSystem to also update placeholders
const originalUpdateUnitSystem = updateUnitSystem;
updateUnitSystem = function() {
    originalUpdateUnitSystem();
    updateAllPlaceholders();
};

// Helper function to display results
function showResult(elementId, result) {
    const resultDiv = document.getElementById(elementId);
    resultDiv.innerHTML = result;
    resultDiv.classList.add('show');
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        resultDiv.classList.remove('show');
    }, 10000);
}

// Translation Calculations

function calculateVelocity() {
    const s = parseFloat(document.getElementById('trans_s').value);
    const t = parseFloat(document.getElementById('trans_t').value);
    
    if (isNaN(s) || isNaN(t) || t === 0) {
        showResult('velocity_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const v = s / t;
    showResult('velocity_result', `✓ Geschwindigkeit: v = ${v.toFixed(3)} m/s`);
}

function calculateAcceleration() {
    const dv = parseFloat(document.getElementById('trans_dv').value);
    const dt = parseFloat(document.getElementById('trans_dt').value);
    
    if (isNaN(dv) || isNaN(dt) || dt === 0) {
        showResult('acceleration_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const a = dv / dt;
    showResult('acceleration_result', `✓ Beschleunigung: a = ${a.toFixed(3)} m/s²`);
}

function calculateUniformAcceleration() {
    const v0 = parseFloat(document.getElementById('trans_v0').value);
    const a = parseFloat(document.getElementById('trans_a').value);
    const t = parseFloat(document.getElementById('trans_time').value);
    
    if (isNaN(v0) || isNaN(a) || isNaN(t)) {
        showResult('uniform_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const v = v0 + a * t;
    const s = v0 * t + 0.5 * a * t * t;
    
    let result = `✓ Endgeschwindigkeit: v = ${v.toFixed(3)} m/s<br>`;
    result += `✓ Zurückgelegte Strecke: s = ${s.toFixed(3)} m`;
    
    showResult('uniform_result', result);
}

function calculateForce() {
    const m = parseFloat(document.getElementById('trans_mass').value);
    const a = parseFloat(document.getElementById('trans_accel').value);
    
    if (isNaN(m) || isNaN(a)) {
        showResult('force_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const F = m * a;
    showResult('force_result', `✓ Kraft: F = ${F.toFixed(3)} N`);
}

function calculateMomentum() {
    const m = parseFloat(document.getElementById('imp_mass').value);
    const v = parseFloat(document.getElementById('imp_vel').value);
    
    if (isNaN(m) || isNaN(v)) {
        showResult('momentum_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const p = m * v;
    showResult('momentum_result', `✓ Impuls: p = ${p.toFixed(3)} kg·m/s`);
}

function calculateKineticEnergy() {
    const m = parseFloat(document.getElementById('kin_mass').value);
    const v = parseFloat(document.getElementById('kin_vel').value);
    
    if (isNaN(m) || isNaN(v)) {
        showResult('kinetic_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const E = 0.5 * m * v * v;
    showResult('kinetic_result', `✓ Kinetische Energie: E<sub>kin</sub> = ${E.toFixed(3)} J`);
}

function calculateWork() {
    const F = parseFloat(document.getElementById('work_force').value);
    const s = parseFloat(document.getElementById('work_distance').value);
    const angle = parseFloat(document.getElementById('work_angle').value);
    
    if (isNaN(F) || isNaN(s) || isNaN(angle)) {
        showResult('work_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const angleRad = angle * Math.PI / 180;
    const W = F * s * Math.cos(angleRad);
    showResult('work_result', `✓ Arbeit: W = ${W.toFixed(3)} J`);
}

function calculatePower() {
    const W = parseFloat(document.getElementById('power_work').value);
    const t = parseFloat(document.getElementById('power_time').value);
    
    if (isNaN(W) || isNaN(t) || t === 0) {
        showResult('power_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const P = W / t;
    showResult('power_result', `✓ Leistung: P = ${P.toFixed(3)} W`);
}

// Rotation Calculations

function calculateAngularVelocity() {
    const phi = parseFloat(document.getElementById('rot_phi').value);
    const t = parseFloat(document.getElementById('rot_t').value);
    
    if (isNaN(phi) || isNaN(t) || t === 0) {
        showResult('angular_velocity_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const omega = phi / t;
    const T = (2 * Math.PI) / omega;
    const f = 1 / T;
    
    let result = `✓ Winkelgeschwindigkeit: ω = ${omega.toFixed(3)} rad/s<br>`;
    result += `✓ Periode: T = ${T.toFixed(3)} s<br>`;
    result += `✓ Frequenz: f = ${f.toFixed(3)} Hz`;
    
    showResult('angular_velocity_result', result);
}

function calculateAngularAcceleration() {
    const dw = parseFloat(document.getElementById('rot_dw').value);
    const dt = parseFloat(document.getElementById('rot_dt').value);
    
    if (isNaN(dw) || isNaN(dt) || dt === 0) {
        showResult('angular_acceleration_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const alpha = dw / dt;
    showResult('angular_acceleration_result', `✓ Winkelbeschleunigung: α = ${alpha.toFixed(3)} rad/s²`);
}

function calculateConversion() {
    const omega = parseFloat(document.getElementById('conv_omega').value);
    const r = parseFloat(document.getElementById('conv_radius').value);
    
    if (isNaN(omega) || isNaN(r)) {
        showResult('conversion_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const v = omega * r;
    const az = omega * omega * r;
    
    let result = `✓ Bahngeschwindigkeit: v = ${v.toFixed(3)} m/s<br>`;
    result += `✓ Zentripetalbeschleunigung: a<sub>z</sub> = ${az.toFixed(3)} m/s²`;
    
    showResult('conversion_result', result);
}

function calculateInertia() {
    const type = document.getElementById('inertia_type').value;
    const m = parseFloat(document.getElementById('inertia_mass').value);
    const r = parseFloat(document.getElementById('inertia_radius').value);
    
    if (isNaN(m) || isNaN(r)) {
        showResult('inertia_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    let I;
    let formula;
    
    switch(type) {
        case 'point':
            I = m * r * r;
            formula = 'I = m·r²';
            break;
        case 'disk':
            I = 0.5 * m * r * r;
            formula = 'I = ½·m·r²';
            break;
        case 'hollow':
            I = m * r * r;
            formula = 'I = m·r²';
            break;
        case 'sphere':
            I = 0.4 * m * r * r;
            formula = 'I = ⅖·m·r²';
            break;
        case 'rod':
            I = (1/12) * m * r * r;
            formula = 'I = 1/12·m·l²';
            break;
        default:
            I = 0;
            formula = '';
    }
    
    let result = `✓ Trägheitsmoment: I = ${I.toFixed(6)} kg·m²<br>`;
    result += `Formel: ${formula}`;
    
    showResult('inertia_result', result);
}

function calculateTorque() {
    const I = parseFloat(document.getElementById('torque_inertia').value);
    const alpha = parseFloat(document.getElementById('torque_alpha').value);
    
    if (isNaN(I) || isNaN(alpha)) {
        showResult('torque_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const M = I * alpha;
    showResult('torque_result', `✓ Drehmoment: M = ${M.toFixed(3)} N·m`);
}

function calculateAngularMomentum() {
    const I = parseFloat(document.getElementById('ang_mom_inertia').value);
    const omega = parseFloat(document.getElementById('ang_mom_omega').value);
    
    if (isNaN(I) || isNaN(omega)) {
        showResult('angular_momentum_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const L = I * omega;
    showResult('angular_momentum_result', `✓ Drehimpuls: L = ${L.toFixed(3)} kg·m²/s`);
}

function calculateRotationalEnergy() {
    const I = parseFloat(document.getElementById('rot_energy_inertia').value);
    const omega = parseFloat(document.getElementById('rot_energy_omega').value);
    
    if (isNaN(I) || isNaN(omega)) {
        showResult('rotational_energy_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const E = 0.5 * I * omega * omega;
    showResult('rotational_energy_result', `✓ Rotationsenergie: E<sub>rot</sub> = ${E.toFixed(3)} J`);
}

function calculateRotationalWork() {
    const M = parseFloat(document.getElementById('rot_work_torque').value);
    const phi = parseFloat(document.getElementById('rot_work_angle').value);
    
    if (isNaN(M) || isNaN(phi)) {
        showResult('rotational_work_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const W = M * phi;
    showResult('rotational_work_result', `✓ Rotationsarbeit: W = ${W.toFixed(3)} J`);
}

function calculateRotationalPower() {
    const M = parseFloat(document.getElementById('rot_power_torque').value);
    const omega = parseFloat(document.getElementById('rot_power_omega').value);
    
    if (isNaN(M) || isNaN(omega)) {
        showResult('rotational_power_result', '⚠️ Bitte gültige Werte eingeben!');
        return;
    }
    
    const P = M * omega;
    showResult('rotational_power_result', `✓ Rotationsleistung: P = ${P.toFixed(3)} W`);
}

// Mechanik Calculations (5./6. Klasse AHS)

function calculateBasicVelocity() {
    const s_input = parseFloat(document.getElementById('mech_s').value);
    const t_input = parseFloat(document.getElementById('mech_t').value);
    
    if (isNaN(s_input) || isNaN(t_input) || t_input === 0) {
        showResult('mech_velocity_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    // Convert to SI units
    const s = convertToSI(s_input, 'length');
    const t = convertToSI(t_input, 'time');
    
    // Calculate in SI
    const v_si = s / t;
    
    // Convert back to selected units
    const v_output = convertFromSI(v_si, 'velocity');
    const v_kmh = v_si * 3.6;
    
    let result = `Geschwindigkeit: v = ${v_output.toFixed(3)} ${getUnitLabel('velocity')}<br>`;
    result += `Das entspricht: v = ${v_kmh.toFixed(2)} km/h`;
    showResult('mech_velocity_result', result);
}

function calculateUniformMotion() {
    const v_input = parseFloat(document.getElementById('unif_v').value);
    const t_input = parseFloat(document.getElementById('unif_t').value);
    
    if (isNaN(v_input) || isNaN(t_input)) {
        showResult('unif_motion_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    // Convert to SI
    const v = convertToSI(v_input, 'velocity');
    const t = convertToSI(t_input, 'time');
    
    // Calculate
    const s_si = v * t;
    
    // Convert back
    const s = convertFromSI(s_si, 'length');
    showResult('unif_motion_result', `Zurückgelegter Weg: s = ${s.toFixed(3)} ${getUnitLabel('length')}`);
}

function calculateFreeFall() {
    const t = parseFloat(document.getElementById('fall_t').value);
    
    if (isNaN(t)) {
        showResult('fall_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const g = 9.81;
    const v = g * t;
    const s = 0.5 * g * t * t;
    
    let result = `Endgeschwindigkeit: v = ${v.toFixed(2)} m/s<br>`;
    result += `Fallstrecke: s = ${s.toFixed(2)} m`;
    showResult('fall_result', result);
}

function calculateNewtonForce() {
    const m_input = parseFloat(document.getElementById('newton_m').value);
    const a_input = parseFloat(document.getElementById('newton_a').value);
    
    if (isNaN(m_input) || isNaN(a_input)) {
        showResult('newton_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    // Convert to SI
    const m = convertToSI(m_input, 'mass');
    // Acceleration is always in m/s² (derived unit)
    const a = a_input / (unitConversions.length[unitSystem.length] / (unitConversions.time[unitSystem.time] ** 2));
    
    const F = m * a;
    showResult('newton_result', `Kraft: F = ${F.toFixed(3)} N`);
}

function calculateWeight() {
    const m_input = parseFloat(document.getElementById('weight_m').value);
    
    if (isNaN(m_input)) {
        showResult('weight_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const m = convertToSI(m_input, 'mass');
    const g = 9.81;
    const F = m * g;
    showResult('weight_result', `Gewichtskraft: F<sub>G</sub> = ${F.toFixed(2)} N (bei m = ${m_input} ${getUnitLabel('mass')})`);
}

function calculateSpringForce() {
    const D = parseFloat(document.getElementById('spring_d').value);
    const s = parseFloat(document.getElementById('spring_s').value);
    
    if (isNaN(D) || isNaN(s)) {
        showResult('spring_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const F = D * s;
    showResult('spring_result', `Federkraft: F = ${F.toFixed(3)} N`);
}

function calculateDensity() {
    const m = parseFloat(document.getElementById('density_m').value);
    const V = parseFloat(document.getElementById('density_v').value);
    
    if (isNaN(m) || isNaN(V) || V === 0) {
        showResult('density_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const rho = m / V;
    const rho_gcm3 = rho / 1000;
    
    let result = `Dichte: ρ = ${rho.toFixed(2)} kg/m³<br>`;
    result += `Das entspricht: ρ = ${rho_gcm3.toFixed(3)} g/cm³`;
    showResult('density_result', result);
}

function calculatePressure() {
    const F = parseFloat(document.getElementById('pressure_f').value);
    const A = parseFloat(document.getElementById('pressure_a').value);
    
    if (isNaN(F) || isNaN(A) || A === 0) {
        showResult('pressure_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const p = F / A;
    const p_bar = p / 100000;
    
    let result = `Druck: p = ${p.toFixed(2)} Pa<br>`;
    result += `Das entspricht: p = ${p_bar.toFixed(5)} bar`;
    showResult('pressure_result', result);
}

// Energie & Wärme Calculations

function calculateBasicWork() {
    const F = parseFloat(document.getElementById('work_f').value);
    const s = parseFloat(document.getElementById('work_s').value);
    
    if (isNaN(F) || isNaN(s)) {
        showResult('basic_work_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const W = F * s;
    showResult('basic_work_result', `Arbeit: W = ${W.toFixed(3)} J`);
}

function calculateLiftWork() {
    const m = parseFloat(document.getElementById('lift_m').value);
    const h = parseFloat(document.getElementById('lift_h').value);
    
    if (isNaN(m) || isNaN(h)) {
        showResult('lift_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const g = 9.81;
    const W = m * g * h;
    showResult('lift_result', `Hubarbeit: W<sub>Hub</sub> = ${W.toFixed(2)} J`);
}

function calculatePotentialEnergy() {
    const m = parseFloat(document.getElementById('pot_m').value);
    const h = parseFloat(document.getElementById('pot_h').value);
    
    if (isNaN(m) || isNaN(h)) {
        showResult('pot_energy_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const g = 9.81;
    const E = m * g * h;
    showResult('pot_energy_result', `Potentielle Energie: E<sub>pot</sub> = ${E.toFixed(2)} J`);
}

function calculateKinEnergy() {
    const m = parseFloat(document.getElementById('kin_m').value);
    const v = parseFloat(document.getElementById('kin_v').value);
    
    if (isNaN(m) || isNaN(v)) {
        showResult('kin_energy_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const E = 0.5 * m * v * v;
    showResult('kin_energy_result', `Kinetische Energie: E<sub>kin</sub> = ${E.toFixed(2)} J`);
}

function calculateSpringEnergy() {
    const D = parseFloat(document.getElementById('spring_energy_d').value);
    const s = parseFloat(document.getElementById('spring_energy_s').value);
    
    if (isNaN(D) || isNaN(s)) {
        showResult('spring_energy_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const E = 0.5 * D * s * s;
    showResult('spring_energy_result', `Spannenergie: E<sub>Spann</sub> = ${E.toFixed(3)} J`);
}

function calculateBasicPower() {
    const W = parseFloat(document.getElementById('power_w').value);
    const t = parseFloat(document.getElementById('power_t').value);
    
    if (isNaN(W) || isNaN(t) || t === 0) {
        showResult('basic_power_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const P = W / t;
    showResult('basic_power_result', `Leistung: P = ${P.toFixed(3)} W`);
}

function calculateEfficiency() {
    const W_nutz = parseFloat(document.getElementById('eff_nutz').value);
    const W_zu = parseFloat(document.getElementById('eff_zu').value);
    
    if (isNaN(W_nutz) || isNaN(W_zu) || W_zu === 0) {
        showResult('efficiency_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const eta = W_nutz / W_zu;
    const eta_percent = eta * 100;
    
    let result = `Wirkungsgrad: η = ${eta.toFixed(4)}<br>`;
    result += `Das entspricht: η = ${eta_percent.toFixed(2)}%`;
    showResult('efficiency_result', result);
}

function calculateHeat() {
    const c = parseFloat(document.getElementById('heat_c').value);
    const m = parseFloat(document.getElementById('heat_m').value);
    const dT = parseFloat(document.getElementById('heat_dt').value);
    
    if (isNaN(c) || isNaN(m) || isNaN(dT)) {
        showResult('heat_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const Q = c * m * dT;
    const Q_kJ = Q / 1000;
    
    let result = `Wärmemenge: Q = ${Q.toFixed(2)} J<br>`;
    result += `Das entspricht: Q = ${Q_kJ.toFixed(2)} kJ`;
    showResult('heat_result', result);
}

// Optik Calculations

function calculateSnell() {
    const n1 = parseFloat(document.getElementById('snell_n1').value);
    const alpha = parseFloat(document.getElementById('snell_alpha').value);
    const n2 = parseFloat(document.getElementById('snell_n2').value);
    
    if (isNaN(n1) || isNaN(alpha) || isNaN(n2)) {
        showResult('snell_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const alpha_rad = alpha * Math.PI / 180;
    const sin_beta = (n1 * Math.sin(alpha_rad)) / n2;
    
    if (Math.abs(sin_beta) > 1) {
        showResult('snell_result', 'Totalreflexion! Kein Brechungswinkel möglich.');
        return;
    }
    
    const beta_rad = Math.asin(sin_beta);
    const beta = beta_rad * 180 / Math.PI;
    
    showResult('snell_result', `Brechungswinkel: β = ${beta.toFixed(2)}°`);
}

function calculateLens() {
    const f = parseFloat(document.getElementById('lens_f').value);
    const g = parseFloat(document.getElementById('lens_g').value);
    
    if (isNaN(f) || isNaN(g) || f === 0) {
        showResult('lens_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const b = (f * g) / (g - f);
    const V = Math.abs(b / g);
    
    let result = `Bildweite: b = ${b.toFixed(2)} cm<br>`;
    result += `Vergrößerung: V = ${V.toFixed(2)}`;
    
    if (b > 0) {
        result += '<br>Das Bild ist reell und umgekehrt.';
    } else {
        result += '<br>Das Bild ist virtuell und aufrecht.';
    }
    
    showResult('lens_result', result);
}

function calculateMagnification() {
    const b = parseFloat(document.getElementById('mag_b').value);
    const g = parseFloat(document.getElementById('mag_g').value);
    
    if (isNaN(b) || isNaN(g) || g === 0) {
        showResult('magnification_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const V = Math.abs(b / g);
    
    let result = `Abbildungsmaßstab: V = ${V.toFixed(3)}`;
    
    if (V > 1) {
        result += '<br>Das Bild ist vergrößert.';
    } else if (V < 1) {
        result += '<br>Das Bild ist verkleinert.';
    } else {
        result += '<br>Das Bild ist gleich groß.';
    }
    
    showResult('magnification_result', result);
}

// Add Enter key support for all input fields
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.calculator input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const button = this.parentElement.querySelector('button');
                if (button) button.click();
            }
        });
    });
    
    // Initialize all graphs
    initializeGraphs();
});

// Graph Storage
let charts = {};

// Initialize all graphs
function initializeGraphs() {
    initUniformMotionGraph();
    initAcceleratedMotionGraph();
    initFreeFallGraph();
    initEnergyGraph();
    initSpringGraph();
    initRotationGraph();
    initAngularAccelGraph();
    initHeatGraph();
}

// Chart.js default configuration
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
Chart.defaults.color = '#1d1d1f';

// Uniform Motion Graph
function initUniformMotionGraph() {
    const ctx = document.getElementById('uniformMotionChart');
    if (!ctx) return;
    
    charts.uniformMotion = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 's(t) - Weg',
                borderColor: '#0071e3',
                backgroundColor: 'rgba(0, 113, 227, 0.1)',
                tension: 0,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Gleichförmige Bewegung',
                    font: { size: 16, weight: '600' }
                },
                legend: { display: true }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Zeit t (s)' }
                },
                y: {
                    title: { display: true, text: 'Weg s (m)' }
                }
            }
        }
    });
    updateUniformMotionGraph();
}

function updateUniformMotionGraph() {
    if (!charts.uniformMotion) return;
    
    const v = parseFloat(document.getElementById('graph_uniform_v').value) || 10;
    const tmax = parseFloat(document.getElementById('graph_uniform_tmax').value) || 10;
    
    const data = [];
    for (let t = 0; t <= tmax; t += tmax / 50) {
        data.push({ x: t, y: v * t });
    }
    
    charts.uniformMotion.data.datasets[0].data = data;
    charts.uniformMotion.update();
}

// Accelerated Motion Graph
function initAcceleratedMotionGraph() {
    const ctx = document.getElementById('acceleratedMotionChart');
    if (!ctx) return;
    
    charts.acceleratedMotion = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 's(t) - Weg',
                    borderColor: '#0071e3',
                    backgroundColor: 'rgba(0, 113, 227, 0.1)',
                    tension: 0.3,
                    yAxisID: 'y',
                    fill: true
                },
                {
                    label: 'v(t) - Geschwindigkeit',
                    borderColor: '#00c896',
                    backgroundColor: 'rgba(0, 200, 150, 0.1)',
                    tension: 0,
                    yAxisID: 'y1',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Gleichmäßig beschleunigte Bewegung',
                    font: { size: 16, weight: '600' }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Zeit t (s)' }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'Weg s (m)' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: 'Geschwindigkeit v (m/s)' },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
    updateAcceleratedMotionGraph();
}

function updateAcceleratedMotionGraph() {
    if (!charts.acceleratedMotion) return;
    
    const v0 = parseFloat(document.getElementById('graph_accel_v0').value) || 0;
    const a = parseFloat(document.getElementById('graph_accel_a').value) || 2;
    const tmax = parseFloat(document.getElementById('graph_accel_tmax').value) || 10;
    
    const dataS = [];
    const dataV = [];
    for (let t = 0; t <= tmax; t += tmax / 50) {
        dataS.push({ x: t, y: v0 * t + 0.5 * a * t * t });
        dataV.push({ x: t, y: v0 + a * t });
    }
    
    charts.acceleratedMotion.data.datasets[0].data = dataS;
    charts.acceleratedMotion.data.datasets[1].data = dataV;
    charts.acceleratedMotion.update();
}

// Free Fall Graph
function initFreeFallGraph() {
    const ctx = document.getElementById('freeFallChart');
    if (!ctx) return;
    
    charts.freeFall = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'h(t) - Höhe',
                borderColor: '#ff3b30',
                backgroundColor: 'rgba(255, 59, 48, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Freier Fall',
                    font: { size: 16, weight: '600' }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Zeit t (s)' }
                },
                y: {
                    title: { display: true, text: 'Höhe h (m)' }
                }
            }
        }
    });
    updateFreeFallGraph();
}

function updateFreeFallGraph() {
    if (!charts.freeFall) return;
    
    const h0 = parseFloat(document.getElementById('graph_fall_h0').value) || 100;
    const g = 9.81;
    const tmax = Math.sqrt(2 * h0 / g);
    
    const data = [];
    for (let t = 0; t <= tmax; t += tmax / 50) {
        const h = h0 - 0.5 * g * t * t;
        if (h >= 0) data.push({ x: t, y: h });
    }
    
    charts.freeFall.data.datasets[0].data = data;
    charts.freeFall.update();
}

// Energy Graph
function initEnergyGraph() {
    const ctx = document.getElementById('energyChart');
    if (!ctx) return;
    
    charts.energy = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'E_pot - Potentielle Energie',
                    borderColor: '#ff3b30',
                    backgroundColor: 'rgba(255, 59, 48, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'E_kin - Kinetische Energie',
                    borderColor: '#0071e3',
                    backgroundColor: 'rgba(0, 113, 227, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'E_ges - Gesamtenergie',
                    borderColor: '#00c896',
                    backgroundColor: 'rgba(0, 200, 150, 0.1)',
                    tension: 0,
                    fill: false,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Energieumwandlung beim freien Fall',
                    font: { size: 16, weight: '600' }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Höhe h (m)' }
                },
                y: {
                    title: { display: true, text: 'Energie E (J)' }
                }
            }
        }
    });
    updateEnergyGraph();
}

function updateEnergyGraph() {
    if (!charts.energy) return;
    
    const m = parseFloat(document.getElementById('graph_energy_m').value) || 10;
    const h0 = parseFloat(document.getElementById('graph_energy_h0').value) || 50;
    const g = 9.81;
    const E_ges = m * g * h0;
    
    const dataPot = [];
    const dataKin = [];
    const dataGes = [];
    
    for (let h = h0; h >= 0; h -= h0 / 50) {
        const E_pot = m * g * h;
        const E_kin = E_ges - E_pot;
        dataPot.push({ x: h, y: E_pot });
        dataKin.push({ x: h, y: E_kin });
        dataGes.push({ x: h, y: E_ges });
    }
    
    charts.energy.data.datasets[0].data = dataPot;
    charts.energy.data.datasets[1].data = dataKin;
    charts.energy.data.datasets[2].data = dataGes;
    charts.energy.update();
}

// Spring Graph
function initSpringGraph() {
    const ctx = document.getElementById('springChart');
    if (!ctx) return;
    
    charts.spring = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'F(s) - Federkraft',
                    borderColor: '#0071e3',
                    backgroundColor: 'rgba(0, 113, 227, 0.1)',
                    tension: 0,
                    yAxisID: 'y',
                    fill: true
                },
                {
                    label: 'E(s) - Spannenergie',
                    borderColor: '#ff9500',
                    backgroundColor: 'rgba(255, 149, 0, 0.1)',
                    tension: 0.3,
                    yAxisID: 'y1',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Federkraft und Spannenergie',
                    font: { size: 16, weight: '600' }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Auslenkung s (m)' }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'Kraft F (N)' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: 'Energie E (J)' },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
    updateSpringGraph();
}

function updateSpringGraph() {
    if (!charts.spring) return;
    
    const D = parseFloat(document.getElementById('graph_spring_d').value) || 100;
    const smax = parseFloat(document.getElementById('graph_spring_smax').value) || 0.5;
    
    const dataF = [];
    const dataE = [];
    
    for (let s = 0; s <= smax; s += smax / 50) {
        dataF.push({ x: s, y: D * s });
        dataE.push({ x: s, y: 0.5 * D * s * s });
    }
    
    charts.spring.data.datasets[0].data = dataF;
    charts.spring.data.datasets[1].data = dataE;
    charts.spring.update();
}

// Rotation Graph
function initRotationGraph() {
    const ctx = document.getElementById('rotationChart');
    if (!ctx) return;
    
    charts.rotation = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'φ(t) - Winkel',
                borderColor: '#af52de',
                backgroundColor: 'rgba(175, 82, 222, 0.1)',
                tension: 0,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Gleichförmige Rotation',
                    font: { size: 16, weight: '600' }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Zeit t (s)' }
                },
                y: {
                    title: { display: true, text: 'Winkel φ (rad)' }
                }
            }
        }
    });
    updateRotationGraph();
}

function updateRotationGraph() {
    if (!charts.rotation) return;
    
    const omega = parseFloat(document.getElementById('graph_rot_omega').value) || 2;
    const tmax = parseFloat(document.getElementById('graph_rot_tmax').value) || 10;
    
    const data = [];
    for (let t = 0; t <= tmax; t += tmax / 50) {
        data.push({ x: t, y: omega * t });
    }
    
    charts.rotation.data.datasets[0].data = data;
    charts.rotation.update();
}

// Angular Acceleration Graph
function initAngularAccelGraph() {
    const ctx = document.getElementById('angularAccelChart');
    if (!ctx) return;
    
    charts.angularAccel = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'φ(t) - Winkel',
                    borderColor: '#af52de',
                    backgroundColor: 'rgba(175, 82, 222, 0.1)',
                    tension: 0.3,
                    yAxisID: 'y',
                    fill: true
                },
                {
                    label: 'ω(t) - Winkelgeschwindigkeit',
                    borderColor: '#ff2d55',
                    backgroundColor: 'rgba(255, 45, 85, 0.1)',
                    tension: 0,
                    yAxisID: 'y1',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Rotation mit konstanter Winkelbeschleunigung',
                    font: { size: 16, weight: '600' }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Zeit t (s)' }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'Winkel φ (rad)' }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: 'Winkelgeschw. ω (rad/s)' },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
    updateAngularAccelGraph();
}

function updateAngularAccelGraph() {
    if (!charts.angularAccel) return;
    
    const omega0 = parseFloat(document.getElementById('graph_ang_omega0').value) || 0;
    const alpha = parseFloat(document.getElementById('graph_ang_alpha').value) || 1;
    const tmax = parseFloat(document.getElementById('graph_ang_tmax').value) || 10;
    
    const dataPhi = [];
    const dataOmega = [];
    
    for (let t = 0; t <= tmax; t += tmax / 50) {
        dataPhi.push({ x: t, y: omega0 * t + 0.5 * alpha * t * t });
        dataOmega.push({ x: t, y: omega0 + alpha * t });
    }
    
    charts.angularAccel.data.datasets[0].data = dataPhi;
    charts.angularAccel.data.datasets[1].data = dataOmega;
    charts.angularAccel.update();
}

// Heat Graph
function initHeatGraph() {
    const ctx = document.getElementById('heatChart');
    if (!ctx) return;
    
    charts.heat = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Q(ΔT) - Wärmemenge',
                borderColor: '#ff3b30',
                backgroundColor: 'rgba(255, 59, 48, 0.1)',
                tension: 0,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Erwärmung von Wasser',
                    font: { size: 16, weight: '600' }
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    title: { display: true, text: 'Temperaturänderung ΔT (K)' }
                },
                y: {
                    title: { display: true, text: 'Wärmemenge Q (J)' }
                }
            }
        }
    });
    updateHeatGraph();
}

function updateHeatGraph() {
    if (!charts.heat) return;
    
    const m = parseFloat(document.getElementById('graph_heat_m').value) || 1;
    const dtmax = parseFloat(document.getElementById('graph_heat_dtmax').value) || 100;
    const c = 4180; // J/(kg·K) for water
    
    const data = [];
    for (let dt = 0; dt <= dtmax; dt += dtmax / 50) {
        data.push({ x: dt, y: c * m * dt });
    }
    
    charts.heat.data.datasets[0].data = data;
    charts.heat.update();
}

// ============================================
// UNIT CONVERTER FUNCTIONS
// ============================================

// Length Converter
const lengthFactors = {
    'm': 1,
    'km': 1000,
    'dm': 0.1,
    'cm': 0.01,
    'mm': 0.001,
    'μm': 1e-6,
    'nm': 1e-9
};

function convertLength() {
    const input = parseFloat(document.getElementById('length_input').value);
    const from = document.getElementById('length_from').value;
    const to = document.getElementById('length_to').value;
    
    if (isNaN(input)) {
        document.getElementById('length_output').value = '';
        return;
    }
    
    // Convert to meters (base unit), then to target unit
    const meters = input * lengthFactors[from];
    const result = meters / lengthFactors[to];
    
    document.getElementById('length_output').value = formatNumber(result);
}

// Time Converter
const timeFactors = {
    's': 1,
    'min': 60,
    'h': 3600,
    'd': 86400,
    'ms': 0.001,
    'μs': 1e-6
};

function convertTime() {
    const input = parseFloat(document.getElementById('time_input').value);
    const from = document.getElementById('time_from').value;
    const to = document.getElementById('time_to').value;
    
    if (isNaN(input)) {
        document.getElementById('time_output').value = '';
        return;
    }
    
    const seconds = input * timeFactors[from];
    const result = seconds / timeFactors[to];
    
    document.getElementById('time_output').value = formatNumber(result);
}

// Mass Converter
const massFactors = {
    'kg': 1,
    'g': 0.001,
    'mg': 1e-6,
    't': 1000,
    'μg': 1e-9
};

function convertMass() {
    const input = parseFloat(document.getElementById('mass_input').value);
    const from = document.getElementById('mass_from').value;
    const to = document.getElementById('mass_to').value;
    
    if (isNaN(input)) {
        document.getElementById('mass_output').value = '';
        return;
    }
    
    const kilograms = input * massFactors[from];
    const result = kilograms / massFactors[to];
    
    document.getElementById('mass_output').value = formatNumber(result);
}

// Velocity Converter
const velocityFactors = {
    'm/s': 1,
    'km/h': 1/3.6,
    'km/s': 1000,
    'cm/s': 0.01
};

function convertVelocity() {
    const input = parseFloat(document.getElementById('velocity_input').value);
    const from = document.getElementById('velocity_from').value;
    const to = document.getElementById('velocity_to').value;
    
    if (isNaN(input)) {
        document.getElementById('velocity_output').value = '';
        return;
    }
    
    const metersPerSecond = input * velocityFactors[from];
    const result = metersPerSecond / velocityFactors[to];
    
    document.getElementById('velocity_output').value = formatNumber(result);
}

// Area Converter
const areaFactors = {
    'm²': 1,
    'km²': 1e6,
    'cm²': 1e-4,
    'mm²': 1e-6,
    'ha': 10000,
    'a': 100
};

function convertArea() {
    const input = parseFloat(document.getElementById('area_input').value);
    const from = document.getElementById('area_from').value;
    const to = document.getElementById('area_to').value;
    
    if (isNaN(input)) {
        document.getElementById('area_output').value = '';
        return;
    }
    
    const squareMeters = input * areaFactors[from];
    const result = squareMeters / areaFactors[to];
    
    document.getElementById('area_output').value = formatNumber(result);
}

// Volume Converter
const volumeFactors = {
    'm³': 1,
    'dm³': 0.001,
    'cm³': 1e-6,
    'mm³': 1e-9,
    'l': 0.001,
    'ml': 1e-6
};

function convertVolume() {
    const input = parseFloat(document.getElementById('volume_input').value);
    const from = document.getElementById('volume_from').value;
    const to = document.getElementById('volume_to').value;
    
    if (isNaN(input)) {
        document.getElementById('volume_output').value = '';
        return;
    }
    
    const cubicMeters = input * volumeFactors[from];
    const result = cubicMeters / volumeFactors[to];
    
    document.getElementById('volume_output').value = formatNumber(result);
}

// Temperature Converter
function convertTemperature() {
    const input = parseFloat(document.getElementById('temp_input').value);
    const from = document.getElementById('temp_from').value;
    const to = document.getElementById('temp_to').value;
    
    if (isNaN(input)) {
        document.getElementById('temp_output').value = '';
        return;
    }
    
    let celsius;
    
    // Convert to Celsius first
    switch(from) {
        case '°C':
            celsius = input;
            break;
        case 'K':
            celsius = input - 273.15;
            break;
        case '°F':
            celsius = (input - 32) * 5/9;
            break;
    }
    
    // Convert from Celsius to target
    let result;
    switch(to) {
        case '°C':
            result = celsius;
            break;
        case 'K':
            result = celsius + 273.15;
            break;
        case '°F':
            result = celsius * 9/5 + 32;
            break;
    }
    
    document.getElementById('temp_output').value = formatNumber(result);
}

// Energy Converter
const energyFactors = {
    'J': 1,
    'kJ': 1000,
    'MJ': 1e6,
    'Ws': 1,
    'kWh': 3.6e6,
    'cal': 4.184,
    'kcal': 4184
};

function convertEnergy() {
    const input = parseFloat(document.getElementById('energy_input').value);
    const from = document.getElementById('energy_from').value;
    const to = document.getElementById('energy_to').value;
    
    if (isNaN(input)) {
        document.getElementById('energy_output').value = '';
        return;
    }
    
    const joules = input * energyFactors[from];
    const result = joules / energyFactors[to];
    
    document.getElementById('energy_output').value = formatNumber(result);
}

// Pressure Converter
const pressureFactors = {
    'Pa': 1,
    'kPa': 1000,
    'bar': 100000,
    'mbar': 100,
    'atm': 101325,
    'mmHg': 133.322
};

function convertPressure() {
    const input = parseFloat(document.getElementById('pressure_input').value);
    const from = document.getElementById('pressure_from').value;
    const to = document.getElementById('pressure_to').value;
    
    if (isNaN(input)) {
        document.getElementById('pressure_output').value = '';
        return;
    }
    
    const pascals = input * pressureFactors[from];
    const result = pascals / pressureFactors[to];
    
    document.getElementById('pressure_output').value = formatNumber(result);
}

// Helper function to format numbers nicely
function formatNumber(num) {
    if (Math.abs(num) < 0.001 || Math.abs(num) > 1e6) {
        return num.toExponential(6);
    } else if (Math.abs(num) < 1) {
        return num.toFixed(8).replace(/\.?0+$/, '');
    } else {
        return num.toFixed(6).replace(/\.?0+$/, '');
    }
}

// ============================================
// PDF EXPORT FUNCTION
// ============================================

function exportToPDF() {
    const pdfContent = document.getElementById('pdfContent');
    
    // Build PDF content with all formulas (excluding calculators, converters, and graphs)
    let htmlContent = `
        <!-- Translation -->
        <div class="pdf-section">
            <h3>Translationsbewegung</h3>
            
            <h4>Grundlegende Größen</h4>
            
            <div class="pdf-formula-item">
                <h5>Geschwindigkeit</h5>
                <div class="pdf-formula">v = s/t = ds/dt</div>
                <p class="pdf-description">Durchschnittsgeschwindigkeit bzw. Momentangeschwindigkeit</p>
                <p class="pdf-unit">Einheit: [v] = m/s</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Beschleunigung</h5>
                <div class="pdf-formula">a = Δv/Δt = dv/dt</div>
                <p class="pdf-description">Änderung der Geschwindigkeit pro Zeit</p>
                <p class="pdf-unit">Einheit: [a] = m/s²</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Gleichmäßig beschleunigte Bewegung</h5>
                <div class="pdf-formula">v = v₀ + a·t</div>
                <div class="pdf-formula">s = v₀·t + ½·a·t²</div>
                <div class="pdf-formula">v² = v₀² + 2·a·s</div>
                <p class="pdf-description">Bewegung mit konstanter Beschleunigung</p>
            </div>
            
            <h4>Dynamik</h4>
            
            <div class="pdf-formula-item">
                <h5>Newton'sches Bewegungsgesetz</h5>
                <div class="pdf-formula">F = m·a</div>
                <p class="pdf-description">Kraft = Masse × Beschleunigung</p>
                <p class="pdf-unit">Einheit: [F] = N (Newton) = kg·m/s²</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Impuls</h5>
                <div class="pdf-formula">p = m·v</div>
                <p class="pdf-description">Impuls = Masse × Geschwindigkeit</p>
                <p class="pdf-unit">Einheit: [p] = kg·m/s</p>
            </div>
            
            <h4>Energie und Arbeit</h4>
            
            <div class="pdf-formula-item">
                <h5>Kinetische Energie</h5>
                <div class="pdf-formula">E<sub>kin</sub> = ½·m·v²</div>
                <p class="pdf-description">Bewegungsenergie</p>
                <p class="pdf-unit">Einheit: [E] = J (Joule) = kg·m²/s²</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Arbeit</h5>
                <div class="pdf-formula">W = F·s·cos(α)</div>
                <p class="pdf-description">Arbeit = Kraft × Weg × Kosinus des Winkels</p>
                <p class="pdf-unit">Einheit: [W] = J (Joule)</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Leistung</h5>
                <div class="pdf-formula">P = W/t = F·v</div>
                <p class="pdf-description">Leistung = Arbeit / Zeit</p>
                <p class="pdf-unit">Einheit: [P] = W (Watt) = J/s</p>
            </div>
        </div>
        
        <!-- Rotation -->
        <div class="pdf-section">
            <h3>Rotationsbewegung</h3>
            
            <h4>Grundlegende Größen</h4>
            
            <div class="pdf-formula-item">
                <h5>Winkelgeschwindigkeit</h5>
                <div class="pdf-formula">ω = φ/t = dφ/dt = 2π/T = 2π·f</div>
                <p class="pdf-description">Änderung des Drehwinkels pro Zeit</p>
                <p class="pdf-unit">Einheit: [ω] = rad/s</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Winkelbeschleunigung</h5>
                <div class="pdf-formula">α = Δω/Δt = dω/dt</div>
                <p class="pdf-description">Änderung der Winkelgeschwindigkeit pro Zeit</p>
                <p class="pdf-unit">Einheit: [α] = rad/s²</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Zusammenhang Translation ↔ Rotation</h5>
                <div class="pdf-formula">v = ω·r</div>
                <div class="pdf-formula">a<sub>t</sub> = α·r</div>
                <div class="pdf-formula">a<sub>z</sub> = ω²·r = v²/r</div>
                <p class="pdf-description">Bahngeschwindigkeit, Tangentialbeschleunigung, Zentripetalbeschleunigung</p>
            </div>
            
            <h4>Dynamik der Rotation</h4>
            
            <div class="pdf-formula-item">
                <h5>Trägheitsmoment</h5>
                <div class="pdf-formula">I = Σm<sub>i</sub>·r<sub>i</sub>²</div>
                <p class="pdf-description">Widerstand gegen Drehbeschleunigung</p>
                <p class="pdf-unit">Einheit: [I] = kg·m²</p>
                <p class="pdf-description" style="margin-top: 10px;"><strong>Spezielle Fälle:</strong></p>
                <p class="pdf-description">• Punktmasse: I = m·r²</p>
                <p class="pdf-description">• Vollzylinder/Scheibe: I = ½·m·r²</p>
                <p class="pdf-description">• Hohlzylinder: I = m·r²</p>
                <p class="pdf-description">• Vollkugel: I = ⅖·m·r²</p>
                <p class="pdf-description">• Stab (Mitte): I = 1/12·m·l²</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Drehmoment</h5>
                <div class="pdf-formula">M = I·α = F·r·sin(α)</div>
                <p class="pdf-description">Drehmoment = Trägheitsmoment × Winkelbeschleunigung</p>
                <p class="pdf-unit">Einheit: [M] = N·m</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Drehimpuls</h5>
                <div class="pdf-formula">L = I·ω</div>
                <p class="pdf-description">Drehimpuls = Trägheitsmoment × Winkelgeschwindigkeit</p>
                <p class="pdf-unit">Einheit: [L] = kg·m²/s</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Rotationsenergie</h5>
                <div class="pdf-formula">E<sub>rot</sub> = ½·I·ω²</div>
                <p class="pdf-description">Kinetische Energie der Rotation</p>
                <p class="pdf-unit">Einheit: [E] = J</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Rotationsarbeit</h5>
                <div class="pdf-formula">W = M·φ</div>
                <p class="pdf-description">Arbeit = Drehmoment × Drehwinkel</p>
                <p class="pdf-unit">Einheit: [W] = J</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Rotationsleistung</h5>
                <div class="pdf-formula">P = M·ω</div>
                <p class="pdf-description">Leistung = Drehmoment × Winkelgeschwindigkeit</p>
                <p class="pdf-unit">Einheit: [P] = W</p>
            </div>
        </div>
        
        <!-- Vergleich -->
        <div class="pdf-section">
            <h3>Vergleich: Translation ↔ Rotation</h3>
            
            <table class="pdf-comparison-table">
                <thead>
                    <tr>
                        <th>Größe</th>
                        <th>Translation</th>
                        <th>Rotation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Position</td>
                        <td>s (Weg)</td>
                        <td>φ (Winkel)</td>
                    </tr>
                    <tr>
                        <td>Geschwindigkeit</td>
                        <td>v = ds/dt</td>
                        <td>ω = dφ/dt</td>
                    </tr>
                    <tr>
                        <td>Beschleunigung</td>
                        <td>a = dv/dt</td>
                        <td>α = dω/dt</td>
                    </tr>
                    <tr>
                        <td>Trägheit</td>
                        <td>m (Masse)</td>
                        <td>I (Trägheitsmoment)</td>
                    </tr>
                    <tr>
                        <td>Kraft/Moment</td>
                        <td>F = m·a</td>
                        <td>M = I·α</td>
                    </tr>
                    <tr>
                        <td>Impuls</td>
                        <td>p = m·v</td>
                        <td>L = I·ω</td>
                    </tr>
                    <tr>
                        <td>Energie</td>
                        <td>E<sub>kin</sub> = ½·m·v²</td>
                        <td>E<sub>rot</sub> = ½·I·ω²</td>
                    </tr>
                    <tr>
                        <td>Arbeit</td>
                        <td>W = F·s</td>
                        <td>W = M·φ</td>
                    </tr>
                    <tr>
                        <td>Leistung</td>
                        <td>P = F·v</td>
                        <td>P = M·ω</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Mechanik -->
        <div class="pdf-section">
            <h3>Mechanik (5./6. Klasse AHS)</h3>
            
            <h4>Bewegung</h4>
            
            <div class="pdf-formula-item">
                <h5>Geschwindigkeit</h5>
                <div class="pdf-formula">v = s/t</div>
                <p class="pdf-description">Durchschnittsgeschwindigkeit = Weg / Zeit</p>
                <p class="pdf-unit">Einheit: [v] = m/s</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Gleichförmige Bewegung</h5>
                <div class="pdf-formula">s = v·t</div>
                <p class="pdf-description">Zurückgelegter Weg bei konstanter Geschwindigkeit</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Freier Fall</h5>
                <div class="pdf-formula">v = g·t</div>
                <div class="pdf-formula">s = ½·g·t²</div>
                <div class="pdf-formula">v² = 2·g·s</div>
                <p class="pdf-description">Bewegung unter Erdanziehung (g ≈ 9,81 m/s²)</p>
            </div>
            
            <h4>Kräfte</h4>
            
            <div class="pdf-formula-item">
                <h5>Newton'sches Gesetz</h5>
                <div class="pdf-formula">F = m·a</div>
                <p class="pdf-description">Kraft = Masse × Beschleunigung</p>
                <p class="pdf-unit">Einheit: [F] = N (Newton)</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Gewichtskraft</h5>
                <div class="pdf-formula">F<sub>G</sub> = m·g</div>
                <p class="pdf-description">Gewichtskraft auf der Erde</p>
                <p class="pdf-unit">g ≈ 9,81 m/s²</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Federkraft (Hooke'sches Gesetz)</h5>
                <div class="pdf-formula">F = D·s</div>
                <p class="pdf-description">F = Federkraft, D = Federkonstante, s = Auslenkung</p>
                <p class="pdf-unit">Einheit: [D] = N/m</p>
            </div>
            
            <h4>Eigenschaften der Materie</h4>
            
            <div class="pdf-formula-item">
                <h5>Dichte</h5>
                <div class="pdf-formula">ρ = m/V</div>
                <p class="pdf-description">Dichte = Masse / Volumen</p>
                <p class="pdf-unit">Einheit: [ρ] = kg/m³ oder g/cm³</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Druck</h5>
                <div class="pdf-formula">p = F/A</div>
                <p class="pdf-description">Druck = Kraft / Fläche</p>
                <p class="pdf-unit">Einheit: [p] = Pa (Pascal) = N/m²</p>
            </div>
        </div>
        
        <!-- Energie & Wärme -->
        <div class="pdf-section">
            <h3>Energie & Wärme</h3>
            
            <h4>Mechanische Energie</h4>
            
            <div class="pdf-formula-item">
                <h5>Arbeit</h5>
                <div class="pdf-formula">W = F·s</div>
                <p class="pdf-description">Arbeit = Kraft × Weg (in Kraftrichtung)</p>
                <p class="pdf-unit">Einheit: [W] = J (Joule)</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Hubarbeit</h5>
                <div class="pdf-formula">W<sub>Hub</sub> = m·g·h</div>
                <p class="pdf-description">Arbeit zum Heben eines Körpers</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Potentielle Energie (Lageenergie)</h5>
                <div class="pdf-formula">E<sub>pot</sub> = m·g·h</div>
                <p class="pdf-description">Energie aufgrund der Höhe</p>
                <p class="pdf-unit">Einheit: [E] = J</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Kinetische Energie (Bewegungsenergie)</h5>
                <div class="pdf-formula">E<sub>kin</sub> = ½·m·v²</div>
                <p class="pdf-description">Energie aufgrund der Bewegung</p>
                <p class="pdf-unit">Einheit: [E] = J</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Spannenergie</h5>
                <div class="pdf-formula">E<sub>Spann</sub> = ½·D·s²</div>
                <p class="pdf-description">Energie einer gespannten Feder</p>
                <p class="pdf-unit">Einheit: [E] = J</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Leistung</h5>
                <div class="pdf-formula">P = W/t</div>
                <p class="pdf-description">Leistung = Arbeit / Zeit</p>
                <p class="pdf-unit">Einheit: [P] = W (Watt) = J/s</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Wirkungsgrad</h5>
                <div class="pdf-formula">η = W<sub>nutz</sub>/W<sub>zu</sub></div>
                <p class="pdf-description">Verhältnis von Nutzenergie zu zugeführter Energie</p>
                <p class="pdf-unit">η ist dimensionslos (oft in % angegeben)</p>
            </div>
            
            <h4>Wärmelehre</h4>
            
            <div class="pdf-formula-item">
                <h5>Wärmekapazität</h5>
                <div class="pdf-formula">Q = c·m·ΔT</div>
                <p class="pdf-description">Wärmemenge für Temperaturänderung</p>
                <p class="pdf-description">c = spezifische Wärmekapazität, m = Masse, ΔT = Temperaturänderung</p>
                <p class="pdf-unit">Einheit: [Q] = J, [c] = J/(kg·K)</p>
                <p class="pdf-description" style="margin-top: 10px;"><strong>Beispiele:</strong></p>
                <p class="pdf-description">• Wasser: c = 4180 J/(kg·K)</p>
                <p class="pdf-description">• Eisen: c = 450 J/(kg·K)</p>
                <p class="pdf-description">• Aluminium: c = 900 J/(kg·K)</p>
            </div>
        </div>
        
        <!-- Optik -->
        <div class="pdf-section">
            <h3>Optik</h3>
            
            <div class="pdf-formula-item">
                <h5>Brechungsgesetz (Snellius)</h5>
                <div class="pdf-formula">n₁·sin(α) = n₂·sin(β)</div>
                <p class="pdf-description">Gesetz der Lichtbrechung beim Übergang zwischen Medien</p>
                <p class="pdf-description">n = Brechungsindex, α = Einfallswinkel, β = Brechungswinkel</p>
                <p class="pdf-unit">n ist dimensionslos</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Linsengleichung</h5>
                <div class="pdf-formula">1/f = 1/g + 1/b</div>
                <p class="pdf-description">Abbildung durch dünne Linse</p>
                <p class="pdf-description">f = Brennweite, g = Gegenstandsweite, b = Bildweite</p>
                <p class="pdf-unit">Alle Größen in gleicher Einheit (m oder cm)</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Abbildungsmaßstab</h5>
                <div class="pdf-formula">V = B/G = b/g</div>
                <p class="pdf-description">Vergrößerung = Bildgröße / Gegenstandsgröße = Bildweite / Gegenstandsweite</p>
                <p class="pdf-unit">V ist dimensionslos</p>
            </div>
            
            <div class="pdf-formula-item">
                <h5>Brechkraft</h5>
                <div class="pdf-formula">D = 1/f</div>
                <p class="pdf-description">Brechkraft = 1 / Brennweite (f in Meter einsetzen!)</p>
                <p class="pdf-unit">Einheit: [D] = dpt (Dioptrie), 1 dpt = 1/m</p>
            </div>
        </div>
    `;
    
    pdfContent.innerHTML = htmlContent;
    
    // Configure PDF options
    const opt = {
        margin: [15, 15, 15, 15],
        filename: 'Physik_Formelsammlung.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    // Generate PDF
    const pdfView = document.getElementById('pdfView');
    pdfView.style.display = 'block';
    
    html2pdf().set(opt).from(pdfView).save().then(() => {
        pdfView.style.display = 'none';
        alert('PDF erfolgreich erstellt und heruntergeladen!');
    });
}
