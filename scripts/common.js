function copyToClipboard(about, text) {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = text;

    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea)

    alert(about + "를 복사했습니다.")
}
