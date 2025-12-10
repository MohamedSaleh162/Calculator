// // 1. نمسك العناصر اللي هنتعامل معاها من الصفحة
// const screen = document.querySelector(".screen");
// const buttons = document.querySelectorAll("button");

// // متغير عشان نخزن فيه العملية الحسابية
// let currentInput = "";

// // 2. نلف على كل الزراير ونضيف ليها "مستمع حدث" (Event Listener)
// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const value = button.innerText;

//     // حالة 1: لو داس على زرار المسح الكامل (AC)
//     if (value === "AC") {
//       currentInput = "";
//       screen.innerText = "0";
//     }
//     // حالة 2: لو داس على زرار الحذف (Del)
//     else if (value === "Del") {
//       // بنشيل آخر حرف من النص
//       currentInput = currentInput.toString().slice(0, -1);
//       // لو النص فضي خالص نرجع الصفر، غير كده نعرض النص الجديد
//       screen.innerText = currentInput === "" ? "0" : currentInput;
//     }
//     // حالة 3: لو داس على علامة يساوي (=) عشان يحسب النتيجة
//     else if (value === "=") {
//       try {
//         // بنبدل علامات الضرب والقسمة عشان يفهمها الكود (× لـ *) و (÷ لـ /)
//         let calculation = currentInput.replace(/×/g, "*").replace(/÷/g, "/");

//         // دالة eval بتحسب العملية الرياضية اللي في النص
//         // (ملحوظة: في المشاريع الكبيرة بنستخدم طرق أأمن، بس هنا تمام)
//         const result = eval(calculation);

//         screen.innerText = result;
//         currentInput = result; // بنخلي النتيجة هي البداية للعملية الجاية
//       } catch (error) {
//         screen.innerText = "Error"; // لو المعادلة غلط (مثلاً: 5++)
//         currentInput = "";
//       }
//     }
//     // حالة 4: لو داس على أي رقم أو علامة تانية (+ - * / .)
//     else {
//       // عشان منكتبش أصفار كتير في الأول (زي 0005)
//       if (currentInput === "" && value === "0") {
//         return;
//       }

//       // بنضيف القيمة الجديدة للنص الحالي
//       currentInput += value;
//       screen.innerText = currentInput;
//     }
//   });
// });

const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');

let currentInput = ""; 

// دالة وظيفتها تظبط حجم الخط بناء على عدد الأرقام
function adjustFontSize(text) {
    const length = text.length;
    
    if (length < 10) {
        screen.style.fontSize = "2.5rem"; // الحجم الطبيعي
    } else if (length < 15) {
        screen.style.fontSize = "1.8rem"; // تصغير متوسط
    } else {
        screen.style.fontSize = "1.2rem"; // تصغير قوي للأرقام الكتيرة
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (value === 'AC') {
            currentInput = "";
            screen.innerText = "0";
            adjustFontSize("0"); // نرجع الحجم الطبيعي
        } 
        else if (value === 'Del') {
            currentInput = currentInput.toString().slice(0, -1);
            // لو النص فضي نعرض صفر
            const textToShow = currentInput === "" ? "0" : currentInput;
            screen.innerText = textToShow;
            
            // نظبط الخط بعد الحذف
            adjustFontSize(textToShow);
        } 
        else if (value === '=') {
            try {
                let calculation = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
                const result = eval(calculation).toString(); // نحول النتيجة لنص
                
                screen.innerText = result;
                currentInput = result;
                
                // نظبط الخط للنتيجة النهائية
                adjustFontSize(result);
            } catch (error) {
                screen.innerText = "Error";
                currentInput = "";
                adjustFontSize("Error");
            }
        } 
        else {
            if (currentInput === "" && value === "0") return; 
            
            currentInput += value;
            screen.innerText = currentInput;
            
            // نظبط الخط بعد إضافة رقم جديد
            adjustFontSize(currentInput);
        }
    });
});