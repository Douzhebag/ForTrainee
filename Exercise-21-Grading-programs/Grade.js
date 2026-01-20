function grade(score) {
    const trueScore = Math.round(score);
    if (trueScore > 100) {
        console.log(`เกรดจะคำนวณคะแนน 0-100`);
    } else if (trueScore >= 80) {
        console.log(`คุณได้ ${trueScore}: Grade A`);
    } else if (trueScore < 80 && trueScore >= 70) {
        console.log(`คุณได้ ${trueScore}: Garde B`);
    } else if (trueScore < 70 && trueScore >= 60) {
        console.log(`คุณได้ ${trueScore}: Grade C`);
    } else if (trueScore < 60 && trueScore >= 50) {
        console.log(`คุณได้ ${trueScore}: Grade D`);
    } else if (trueScore < 50 && trueScore >= 0) {
        console.log(`คุณได้ ${trueScore}: Grade F`);
    } else if (Number.isNaN(trueScore)) {
        console.log(`กรุณากรอกตัวเลขเท่านั้น`);
    } else {
        console.log(`เกรดจะคำนวณคะแนน 0-100 `);
    }
}
grade();
