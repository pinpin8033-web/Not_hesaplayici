# 📘 KBÜ Not Hesaplayıcı

Bu proje Karabük Üniversitesi not hesaplama kurallarına uygun olarak geliştirilmiştir. Öğrencinin vize, final/bütünleme notlarına göre **başarı notu**, **harf notu** ve **geçme durumu** hesaplanır.

---

## ⚖️ Kurallar ve Hesaplama

### Ağırlıklandırma
* Vize/Ara Sınav: **%40**
* Final/Bütünleme: **%60**
* **Not:** Bütünleme girilmişse, Final yerine kullanılır.

### Başarısızlık Durumları
* **F1 (Devamsızlık):** Devam şartını sağlamama.
* **F2 (Sınava Girmedi):** Sınav hakkı varken sınava girmeme.
* **F3 (Kaldı):** Sınav notu **< 50** veya Başarı Notu **< 60** ise.

---

## 🛠️ Kullanım

1.  `index.html` dosyasını tarayıcıda açın.
2.  Notları ve devam/sınav durumlarını girin.
3.  "Hesapla" butonuna basın veya **Enter** tuşunu kullanın.

---

## ✅ Test Sonuçları (Beklenen)

* Vize: 70, Final: 60 → Başarı: 64.00 → **C, Geçti**
* Vize: 95, Final: 48 → Başarı: 66.80 → **F3, Kaldı** (Final < 50)
* Devam: Hayır → **F1, Kaldı**

---

## 🔗 Canlı Demo

[https://pinpin8033-web.github.io/Not_hesaplayici/]