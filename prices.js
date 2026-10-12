/* =====================================================================
   ملف الأسعار — R2 بلايستيشن (عبدو باز)
   ده الملف الوحيد اللي بتعدّل فيه الأسعار والأصناف.
   بعد أي تعديل: غيّر رقم النسخة تحت، وارفع الملف مكان القديم.
   ===================================================================== */

const APP_VERSION = 'نسخة 9';

// سعر الساعة وسعر الماتش
const PRICES = Object.freeze({
  hour:  Object.freeze({ single: 25,  multi: 40 }),
  match: Object.freeze({ single: 7.5, multi: 15 })
});

/* ---------------------------------------------------------------------
   قايمة الكانتين — عشان تضيف صنف جديد انسخ سطر كامل والصقه تحته وغيّر:
     id    : كلمة إنجليزي بدون مسافات ومش بتتكرر (مثال: birell)
     name  : الاسم اللي هيظهر للواد
     price : السعر بالجنيه
   ولو عايز تشيل صنف امسح سطره بس. خلي بالك من الفاصلة في آخر كل سطر
   ما عدا آخر سطر.
   --------------------------------------------------------------------- */
const MENU = Object.freeze([
  { id: 'sting',          name: 'ستينج',                price: 20, img: 'sting.jpg' },
  { id: 'fayrouz',        name: 'فيروز',                price: 20, img: 'fayrouz.png' },
  { id: 'pepsi',          name: 'بيبسي',                price: 15, img: 'pepsi.png' },
  { id: 'fanta',          name: 'ميرندا',               price: 15, img: 'fanta.png' },
  { id: 'seven',          name: 'سفن أب',               price: 15, img: 'sevenup.jpg' },
  { id: 'indomie_cooked', name: 'إندومي جاهز',          price: 15, img: 'indomie_cup.jpg' },
  { id: 'indomie_box',    name: 'إندومي كيسين',         price: 25, img: 'indomie_box.png' },
  { id: 'indomie_bag',    name: 'كيس إندومي',           price: 10, img: 'indomie_bag.jpg' }
].map(Object.freeze));
