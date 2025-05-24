export const convertToFarsiDigits = (num: number | string | null | undefined): string => {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    if (num === null || num === undefined) {
        return '';
    }

    if (typeof num === 'string') {
        return num.replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
    } else {
        let temp: string;
        if (num < 0) {
            temp = Math.abs(num).toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]) + '-';
        } else {
            temp = Math.abs(num).toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
        }
        return temp;
    }
};

export const convertStringToInteger=(str:string)=> {  
    const result = parseInt(str, 10); // Base 10  
    return isNaN(result) ? null : result; // Return null for NaN  
}  

export function formatPersianDate(curDay: number, curMonth: number, curYear: number): string {
    const persianDays = [
      "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"
    ];
    const persianMonths = [
      "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
      "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
    ];
  
    // curDay: 0 (یکشنبه) to 6 (شنبه)
    // curMonth: 1 (فروردین) to 12 (اسفند)
    const dayName = persianDays[curDay % 7];
    const monthName = persianMonths[(curMonth - 1) % 12];
  
    return convertToFarsiDigits(`${dayName}، ${curDay} ${monthName} ${curYear}`);
  }

  export const convertPersianDate = (dateStr: string): string => {
    const persianToEnglish = {
      '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
      '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9'
    };
    return dateStr
      .replace(/[۰-۹]/g, d => persianToEnglish[d as keyof typeof persianToEnglish])
      .split('/')
      .map(part => part.padStart(2, '0'))
      .join('/');
  };

  export const formatNumberWithCommas = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };