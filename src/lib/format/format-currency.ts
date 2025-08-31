export const formatCurrency = (value: string) => {
	const numericValue = value.replace(/\D/g, "");
	if (!numericValue) return "";

	return new Intl.NumberFormat("pt-AO", {
		style: "currency",
		currency: "AOA",
		minimumFractionDigits: 0,
	}).format(Number.parseInt(numericValue));
};
