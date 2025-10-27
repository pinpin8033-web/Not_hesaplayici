document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('note-form');
    const inputIds = ['yilIci', 'final', 'butunleme'];
    const inputs = inputIds.map(id => document.getElementById(id));
    const [yilIciEl, finalEl] = inputs;
    const resultCard = document.getElementById('result-card');

    const getHarf = (b) => {
        if (b >= 90) return 'A1';
        if (b >= 80) return 'A2';
        if (b >= 70) return 'B1';
        if (b >= 65) return 'B2';
        if (b >= 60) return 'C';
        return 'F3'; 
    };
    
    const displayResult = (b, h, d, a) => {
        document.getElementById('basari-notu').textContent = b.toFixed(2);
        document.getElementById('harf-notu').textContent = h;
        document.getElementById('durum').textContent = d;
        document.getElementById('aciklama').textContent = a;
        document.getElementById('durum').className = d === 'Geçti' ? 'passed' : 'failed';
        resultCard.style.display = 'block';
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        inputs.forEach(el => el.style.border = '1px solid #ccc');
        
        const yilIci = parseFloat(yilIciEl.value || 0);
        const final = parseFloat(finalEl.value || 0);
        const butunleme = parseFloat(inputs[2].value || 0);
        
        // Hata Kontrolleri
        if (yilIciEl.value.trim() === '') { yilIciEl.style.border = '2px solid red'; return displayResult(0, 'N/A', 'Hata', 'Vize gerekli.'); }
        for (const el of inputs) {
            const val = parseFloat(el.value);
            if (el.value.trim() !== '' && (isNaN(val) || val < 0 || val > 100)) {
                el.style.border = '2px solid red';
                return displayResult(0, 'N/A', 'Hata', '0-100 sayısal değer girin.');
            }
        }

        const devam = document.querySelector('input[name="devamDurumu"]:checked').value;
        const sinav = document.querySelector('input[name="sinavDurumu"]:checked').value;
        
        // F1 ve F2 Kontrolü
        if (devam === 'devamsiz') return displayResult(0, 'F1', 'Kaldı', 'Devamsızlık (F1).');
        if (sinav === 'hayir') return displayResult(0, 'F2', 'Kaldı', 'Sınava girilmedi (F2).');
        
        // Hesaplama
        const sinavNotu = (butunleme > 0) ? butunleme : final;
        if (sinavNotu === 0 && finalEl.value.trim() === '' && inputs[2].value.trim() === '') {
            finalEl.style.border = '2px solid red';
            return displayResult(0, 'N/A', 'Hata', 'Final/Bütünleme notu gerekli.');
        }

        const basari = (0.40 * yilIci) + (0.60 * sinavNotu);
        let harf = '', durum = 'Kaldı', aciklama = '';
        
        // F3 ve Geçti Kontrolü
        if (sinavNotu < 50) {
            harf = 'F3'; aciklama = `Sınav notu (${sinavNotu}) < 50 (F3).`;
        } else if (basari < 60) {
            harf = 'F3'; aciklama = `Başarı notu (${basari.toFixed(2)}) < 60 (F3).`;
        } else {
            harf = getHarf(basari);
            durum = 'Geçti';
            aciklama = `${harf} belirlendi. Geçti.`;
        }

        displayResult(basari, harf, durum, aciklama);
    });

    // Sıfırlama ve Enter Olayları
    document.getElementById('reset-btn').addEventListener('click', () => {
        form.reset();
        resultCard.style.display = 'none';
        inputs.forEach(el => el.style.border = '1px solid #ccc');
    });
    form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); document.getElementById('calculate-btn').click(); }
    });
});