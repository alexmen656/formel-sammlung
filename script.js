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
    event.target.classList.add('active');
}

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
    const s = parseFloat(document.getElementById('mech_s').value);
    const t = parseFloat(document.getElementById('mech_t').value);
    
    if (isNaN(s) || isNaN(t) || t === 0) {
        showResult('mech_velocity_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const v = s / t;
    const v_kmh = v * 3.6;
    let result = `Geschwindigkeit: v = ${v.toFixed(3)} m/s<br>`;
    result += `Das entspricht: v = ${v_kmh.toFixed(2)} km/h`;
    showResult('mech_velocity_result', result);
}

function calculateUniformMotion() {
    const v = parseFloat(document.getElementById('unif_v').value);
    const t = parseFloat(document.getElementById('unif_t').value);
    
    if (isNaN(v) || isNaN(t)) {
        showResult('unif_motion_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const s = v * t;
    showResult('unif_motion_result', `Zurückgelegter Weg: s = ${s.toFixed(3)} m`);
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
    const m = parseFloat(document.getElementById('newton_m').value);
    const a = parseFloat(document.getElementById('newton_a').value);
    
    if (isNaN(m) || isNaN(a)) {
        showResult('newton_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const F = m * a;
    showResult('newton_result', `Kraft: F = ${F.toFixed(3)} N`);
}

function calculateWeight() {
    const m = parseFloat(document.getElementById('weight_m').value);
    
    if (isNaN(m)) {
        showResult('weight_result', 'Bitte gültige Werte eingeben!');
        return;
    }
    
    const g = 9.81;
    const F = m * g;
    showResult('weight_result', `Gewichtskraft: F<sub>G</sub> = ${F.toFixed(2)} N`);
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
