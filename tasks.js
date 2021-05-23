// TASK 1

button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 1'));
    console.log('Listener 1');
});

button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 2'));
    console.log('Listener 2');
});

/*
    1. Обработчики зарегистрировались в Web API, синхронный код отработал, выполнилась перерисовка.

        Callback queue: []
        Jobs queue: []
        Вывод: []

    2. Кнопка нажата, event loop отловил событие клика, Web API закидывает в callback queue 2 анонимные функции - по одной с каждого обработчика.
    
        Callback queue: [anonymous, anonymous]
        Jobs queue: []
        Вывод: []

    3. Стек готов взять новую задачу. Микрозадач нет, стек забирает макрозадачу из callback queue и выполняет её.

        Promise.resolve().then(() => console.log('Microtask 1')) добавляет в очередь микрозадач анонимную функцию.
        Синхронный код выводит в консоль 'Listener 1'. Анонимная функция отработала.
        
        Callback queue: [anonymous]
        Jobs queue: [anonymous]
        Вывод: [`Listener 1`]

    4. Стек проверяет очередь микрозадач, берёт оттуда анонимную функцию и выполняет.
        Синхронный код выводит в консоль 'Microtask 1'.
        Анонимная функция отработала, очередь микрозадач пуста. Выполнилась перерисовка.
        
        Callback queue: [anonymous]
        Jobs queue: []
        Вывод: [`Listener 1`, `Microtask 1`]

    5. Стек готов взять новую задачу. Микрозадач нет, стек забирает макрозадачу из callback queue и выполняет её.

        Promise.resolve().then(() => console.log('Microtask 2')) добавляет в очередь микрозадач анонимную функцию.
        Синхронный код выводит в консоль 'Listener 2'. Анонимная функция отработала.
        
        Callback queue: []
        Jobs queue: [anonymous]
        Вывод: [`Listener 1`, `Microtask 1`, `Listener 2`]
    
    6. Стек проверяет очередь микрозадач, берёт оттуда анонимную функцию и выполняет.
        Синхронный код выводит в консоль 'Microtask 2'.
        Анонимная функция отработала, очередь микрозадач пуста. Выполнилась перерисовка.
        
        Callback queue: []
        Jobs queue: []
        Вывод: [`Listener 1`, `Microtask 1`, `Listener 2`, `Microtask 2`]
*/


// TASK 2

button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 1'));
    console.log('Listener 1');
});

button.addEventListener('click', () => {
    Promise.resolve().then(() => console.log('Microtask 2'));
    console.log('Listener 2');
});

button.click();

/*
    Разница в том, что метод click() попадает в стек и поочерёдно выполняет "поверх" себя 2 анонимные функции - по одной с каждого обработчика, не давая стеку очиститься, пока не отработают обе.

    Эти функции также добавляют свои микрозадачи в jobs queue, но event loop не приступает к ним, пока метод click() не завершит свою работу и не выведет в консоль результат обеих анонимных функций-обработчиков:
    [`Listener 1`, `Listener 2`]

    Они были двумя отдельными макрозадачами, в промежутке между которыми выполнялась очередь микрозадач, а теперь скомпанованы в одну макрозадачу "обёрткой" в виде метода click(), и только после завершения его работы event loop примется за выполнение микрозадач, которые выведут свои сообщения в консоль и дополнят результат:

    [`Listener 1`, `Listener 2`, `Microtask 1`, `Microtask 2`]
*/
