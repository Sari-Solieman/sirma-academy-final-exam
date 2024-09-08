export default function parseDate(dateString) {

    const formats = [
        'DD-MM-YYYY', 'DD/MM/YYYY', 'DD.MM.YYYY',
        'YYYY-MM-DD', 'YYYY/MM/DD', 'YYYY.MM.DD',
        'MM-DD-YYYY', 'MM/DD/YYYY', 'MM.DD.YYYY',
        'MM-DD-YY', 'MM/DD/YY', 'MM.DD.YY',
        'YYYY-MM-DD', 'MM/DD/YYYY',
    ];

    const parseWithFormat = (dateString, format) => {
        const formatParts = format.split(/[-/.]/);
        const dateParts = dateString.split(/[-/.]/);

        const formatMap = {};
        formatParts.forEach((part, index) => {
            formatMap[part] = dateParts[index];
        });

        const year = formatMap['YYYY'] || formatMap['YY'];
        const month = formatMap['MM'];
        const day = formatMap['DD'];

        const fullYear = year.length === 2 ? `20${year}` : year;

        const parsedDate = new Date(fullYear, month - 1, day);

        return parsedDate.getFullYear() === parseInt(fullYear, 10) && parsedDate.getMonth() + 1 === parseInt(month, 10) && parsedDate.getDate() === parseInt(day, 10)
            ? parsedDate
            : null;
    };

    for (const format of formats) {
        const parsedDate = parseWithFormat(dateString, format);
        if (parsedDate) {
            return parsedDate;
        }
    }

    console.error('Unable to parse date:', dateString);
    return null;
};
