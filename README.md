# fera.db
Küçük, hatasız, okunması ve değiştirilmesi kolay bir database modülüdür. Diğer modüllerde alınan hataların bu modülde çıkmaması üzerine kurulmuştur yani asıl amacı kullanıcıyı memnun etmektir, hız değildir. 

## Yükelemek İçin
```npm
npm install fera.db
```

## Dikkat
Bu modül node.js 12 ve üzeri sürümlerde daha sağlıklı çalışır.

## Güncelleme
- set() fonksiyonunda ki glitch giderildi.

# Kullanım
```js
const db = require("fera.db");

// Veri tabanına nesne ayarlama:
db.set("test", "deneme")
db.set("test", { "Ceza": 2, "Sebep": "Deneme"})

// Veri tabanından veri çekme:
db.get("test")
db.fetch("test")

// Veriyi silme:
db.delete("test")

// Veriye sayı ekleme çıkarma: 
// Not: Sadece sayısal verilere ekleme çıkarma yapabilirsiniz.
db.add("test.ceza", 1) // Ekleme
db.subtract("test.ceza", 1) // Çıkarma

// Veri tabanında verinin olup olmadığını kontrol etme:
db.has("test")

// Veri tabanındaki verinin ne türde olduğunu kontrol ettirme:
db.type("test.Sebep")

// Veri tabanına array sıkıştırmak veya geri çıkarmak:
db.push("test.name", ["Fera","Zack", "Suzuya", "Vallens", "Ahmet"]) // Sıkıştırır
db.pull("test.name", "Suzuya") // Çıkarır

// Veri tabanın hepsini bir değere aktarma:
const feradb = db.all()

// Veri tabanın backupını almak:
// Not: Dosya türünü yazmayınız sadece adını yazmanız yeterli.
db.backup("<Dosya İsmi>")
db.backup("fera")

// Veri tabanındaki tüm veriyi silmek:
db.deleteAll()
```

## İletişim
`Zack#7802`
