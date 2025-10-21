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
});
