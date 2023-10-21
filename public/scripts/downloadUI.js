const downloadUI = (link) => {
	console.log('download link:', link)
	return `
		<a href="/download/${link}" class="content__download download download--disabled">download</a>
		<button onclick="back('info', 'download')" class="form__submit content__back">back to download page</button>
	`
}