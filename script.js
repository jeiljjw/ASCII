// Get DOM elements
const asciiChar = document.getElementById('asciiChar');
const hexValue = document.getElementById('hexValue');
const codeInput = document.getElementById('codeInput');
const charOutput = document.getElementById('charOutput');


// ASCII code conversion function
function convertToAscii(text) {
    if (text.length === 0) {
        return { hex: '' };
    }
    const hexCodes = [];
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        hexCodes.push(code.toString(16).toUpperCase());
    }
    return {
        hex: hexCodes.join(' ')
    };
}

// Convert hex codes to ASCII characters
function convertFromAscii(hexCodes) {
    if (!hexCodes.trim()) {
        return '';
    }
    const codeArray = hexCodes.trim().split(/\s+/);
    const chars = [];
    for (const code of codeArray) {
        // 16진수로 파싱 (0x 접두사 유무 상관없음)
        const num = parseInt(code, 16);
        if (!isNaN(num) && num >= 0 && num <= 127) {
            chars.push(String.fromCharCode(num));
        }
    }
    return chars.join('');
}




// Input event listeners for real-time updates
asciiChar.addEventListener('input', () => {
    const char = asciiChar.value;
    if (char.length > 0) {
        const asciiCodes = convertToAscii(char);
        hexValue.value = asciiCodes.hex;
    } else {
        hexValue.value = '';
    }
});

// Code input event listener
codeInput.addEventListener('input', () => {
    const codes = codeInput.value;
    if (codes.trim()) {
        const chars = convertFromAscii(codes);
        charOutput.value = chars;
    } else {
        charOutput.value = '';
    }
});

// Copy to clipboard when result fields are clicked
hexValue.addEventListener('click', () => {
    if (hexValue.value) {
        navigator.clipboard.writeText(hexValue.value);
    }
});

charOutput.addEventListener('click', () => {
    if (charOutput.value) {
        navigator.clipboard.writeText(charOutput.value);
    }
});

// Initial value setup
window.addEventListener('load', () => {
    asciiChar.value = 'ABC';

    // 초기 변환
    const asciiCodes = convertToAscii('ABC');
    hexValue.value = asciiCodes.hex;

    // 역변환 초기 값
    codeInput.value = '41 42 43';
    charOutput.value = convertFromAscii('41 42 43');

    // PWA Service Worker 등록
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker 등록 성공:', registration);
            })
            .catch(error => {
                console.log('Service Worker 등록 실패:', error);
            });
    }
});