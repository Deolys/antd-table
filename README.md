<h1 align="center"> User management app</h1>

Приложение, позволяющее визуализировать и редактировать данные пользователей (полный перечень CRUD операций).

## Основные формы

1. Таблица пользователей. Заголовки: 

   - id - уникальный идентификатор пользователя (ключ)
   - login - логин
   - password - пароль
   - name - имя пользователя
   - type - тип пользователя
   - last_visit_date - дата последнего визита

   Каждая строка таблицы содержит кнопку для перехода на страницу редактирования. Информацию о выбранных пользователях можно удалить. 

2. Форма с фильтрами. Фильтры: 

   - По имени пользователя
   - По типу пользователя
   - По дате последнего визита (дата с)
   - По дате последнего визита (дата по)
  
    Фильтрация происходит по нажатию кнопки асинхронно с отображением индикатора загрузки.

3. Форма для добавления и редактирования пользователя. Поля формы:
   - Имя
   - Логин
   - Пароль
   - Тип пользователя

   Содержит проверку на заполнение всех полей, а также на использование уникального логина при создании или редактировании пользователя.


## Использованные технологии

[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![state manager: effector](https://img.shields.io/badge/state_manager-effector-ee7e34.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?logo=ant-design&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![ESLint](https://img.shields.io/badge/ESLint-4B3263?logo=eslint&logoColor=white)](#)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](#)


## Начало работы
1. **Клонирование репозитория**

```sh
  git clone https://github.com/Deolys/antd-table.git
```

2. **Установка зависимостей**

```bash
npm install
```

3. **Запуск**

```bash
npm run dev
```

