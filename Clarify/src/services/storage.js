// Funções para gerenciar o localStorage de forma centralizada

/**
 * Cria ou atualiza um item no localStorage
 * @param {string} key - A chave do item
 * @param {*} value - O valor a ser armazenado (será convertido para JSON)
 */
export function createItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Lê um item do localStorage
 * @param {string} key - A chave do item
 * @returns {*} O valor armazenado ou null se não existir
 */
export function readItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

/**
 * Remove um item do localStorage
 * @param {string} key - A chave do item a ser removido
 */
export function removeItem(key) {
    localStorage.removeItem(key);
}