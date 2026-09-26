# desktop-backend

Базовый HTTP-сервер на Node.js и Express.

## Запуск

```bash
npm install
cp .env.example .env
npm run dev
```

Продакшен:

```bash
npm start
```

## Роуты

| Метод | Путь | Описание |
| --- | --- | --- |
| GET | `/` | Статус сервиса |
| GET | `/api` | Информация об API |
| GET | `/api/health` | Health-check |
| POST | `/api/auth/register` | Регистрация (`email`, `password`, `name`) |
| POST | `/api/auth/login` | Вход (`email`, `password`) |
| GET | `/api/auth/me` | Текущий пользователь (Bearer token) |
| GET | `/api/users` | Список пользователей (Bearer token) |
| GET | `/api/users/:id` | Пользователь по id (Bearer token) |