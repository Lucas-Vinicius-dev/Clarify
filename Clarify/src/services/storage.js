// Funções para gerenciar o localStorage de forma centralizada

export function createItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function readItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

export function removeItem(key) {
    localStorage.removeItem(key);
}