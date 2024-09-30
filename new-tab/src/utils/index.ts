export const toggleTheme = () => {
	const theme = document.body.getAttribute("theme-mode");
	if (theme === "dark") {
		document.body.setAttribute("theme-mode", "light");
	} else {
		document.body.setAttribute("theme-mode", "dark");
	}
};
