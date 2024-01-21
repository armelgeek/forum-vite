export const displayDate = (timestamp:any) => {
  const date = new Date(timestamp);

  const monthNames = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // return day + ' ' + monthNames[monthIndex] + ' ' + year;
  return ` ${day} ${monthNames[monthIndex]} ${year}`;
};

export const displayMoney = (n:any) => {
  const format = new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
  });

  // or use toLocaleString()
  return format.format(n);
};

export const calculateTotal = (arr:any) => {
  if (!arr || arr?.length === 0) return 0;

  const total = arr.reduce((acc:any, val:any) => acc + val, 0);

  return total;
};


function strOp(str:string) {
  return str.toString().replace(/\s/g, "").toLowerCase();
}

export const checkHasExistText = (text:string, textCheck:string) => {
  if (strOp(text).includes(strOp(textCheck))) {
    return true;
  }
};
export const displayShortMonth = (timestamp:any) => {
  const date = new Date(timestamp);

  const monthNames = [
    "Jan.",
    "Févr.",
    "Mars",
    "Avr.",
    "Mai",
    "Juin.",
    "Juill.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov",
    "Déc.",
  ];

  const monthIndex = date.getMonth();
  return `${monthNames[monthIndex]}`;
};

export function formatRelativeDate(dateString:string,startText:string = 'Il y a') {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60000) { // moins d'une minute
    return `${startText} < 1 minute`;
  } else if (diff < 3600000) { // moins d'une heure
    const minutes = Math.floor(diff / 60000);
    return `${startText} ${minutes} ${minutes > 1 ? "minutes" : "minute"}`;
  } else if (diff < 86400000) { // moins d'un jour
    const hours = Math.floor(diff / 3600000);
    return `${startText} ${hours} ${hours > 1 ? "heures" : "heure"}`;
  } else if (diff < 2592000000) { // moins d'un mois
    const days = Math.floor(diff / 86400000);
    return `${startText} ${days} ${days > 1 ? "jours" : "jour"}`;
  } else if (diff < 31536000000) { // moins d'une année
    const months = Math.floor(diff / 2592000000);
    return `${startText} ${months} ${months > 1 ? "mois" : "mois"}`;
  } else { // plus d'un an
    const years = Math.floor(diff / 31536000000);
    return `${startText} ${years} ${years > 1 ? "années" : "année"}`;
  }
}