/*Ключ шифрования вставляется в адресной строке*/
//const secretKey = '?2DBC574DACA52689A24FB60E835F8C19A36400830DF7350859DD32D1ABAAEC5D'; //слово пароль в SHA256

/*Скрипт в виде строки который нужно зашифровать, let b и let e; отмечают начало и конец скрипта*/
//const scriptNew = "let b; console.log('Выполнено!'); console.log('Выполнено!'); console.log('Выполнено!'); let e;";

/*Зашифрованный скрипт*/
const scriptCode = 'U1cwYiEOF1crLzAuWVcYVFYmGhPRlNCJ0InQjtG+0IXQhtCI0bgZZBgCYVBZWkNfVFYeKClQGxLQotGz0IrQh9G/0bnQhtCP0boQZmt6YSYsWzdQXiFsL1pQHGPRk9CI0b7Qi9CJ0IvQjdCE0b8TE295FlwgTBNQfQ==';

/*Функция шифрования методом XOR, принимает текст и ключ*/
function simpleEncryptDecrypt(input, secret) {
  let output = '';
  for (let i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) ^ secret.charCodeAt(i % secret.length));
  }
  return output;
}

/*Сперва шифруем методом XOR потом кодируем в Base64*/
//const scriptCode = btoa(unescape(encodeURIComponent(simpleEncryptDecrypt(scriptNew, secretKey))));
//console.log(scriptCode);

/*Сперва  декодируем из Base64 потом расшифровываем взяв ключ из строки запроса*/
const script = simpleEncryptDecrypt(decodeURIComponent(escape(window.atob(scriptCode))), window.location.search);
//console.log(script);

/*Проверяем правильность расшифровки скрипта по начальной и конечной команде, если верно то выполняем скрипт*/
if(/^(let b).*(let e;)$/.test(script))eval(script);

