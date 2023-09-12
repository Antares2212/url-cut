# Используем Node.js в качестве базового образа
FROM node:14 AS builder

# Указываем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Сборка проекта
RUN npm run build

# Отдельный этап для production зависимостей
FROM node:14-alpine

WORKDIR /app

# Устанавливаем только production зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем скомпилированный код из предыдущего этапа
COPY --from=builder /app/dist ./dist

# Устанавливаем переменные окружения
ENV PORT=3000

# Открываем порт, на котором будет работать сервер
EXPOSE $PORT

# Запускаем сервер
CMD ["node", "dist/main"]