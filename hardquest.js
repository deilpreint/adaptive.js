import CRC32 from 'crc-32';

const make = () => []; // Создаем пустой массив для хранения записей

const set = (map, key, value) => {
    const hash = CRC32.str(key);
    const index = hash >>> 0; // Преобразуем в беззнаковый 32-битный индекс
    
    // Проверка коллизии: слот занят другим ключом
    if (map[index] && map[index][0] !== key) {
        return false;
    }
    
    map[index] = [key, value]; // Записываем/обновляем данные
    return true;
};

const get = (map, key, defaultValue = null) => {
    const hash = CRC32.str(key);
    const index = hash >>> 0;
    
    // Проверяем существование и совпадение ключа
    if (map[index] && map[index][0] === key) {
        return map[index][1];
    }
    return defaultValue;
};

// Тестовый пример
const map = make();
let result = get(map, "key");
console.log(result); // null

set(map, "name", "Alice");
console.log(get(map, "name")); // "Alice"
console.log(get(map, "age", 25)); // 25