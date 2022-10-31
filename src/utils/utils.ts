// ====================================================================================================================
const INVALID_DATE_MSG = 'Invalid Date';

// ====================================================================================================================
export function normalizeDateString(date: string): string {
	// проверим что дата нормальная
	const dateObj = new Date(date);

	if (dateObj.toString() === INVALID_DATE_MSG) {
		return INVALID_DATE_MSG;
	}

	try {
		return dateObj.toISOString().split('T')[0];
	} catch (_) {
		return INVALID_DATE_MSG;
	}
}

// ====================================================================================================================
