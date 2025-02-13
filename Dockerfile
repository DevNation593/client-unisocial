# Dockerfile
# Stage 1: Dependencias y build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia archivos de configuración
COPY package*.json ./
COPY tsconfig*.json ./
COPY .env.local ./
COPY next.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Instala dependencias
RUN npm ci

# Copia el código fuente
COPY src ./src
COPY public ./public

# Construye la aplicación
RUN npm run build

# Stage 2: Imagen de producción
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Crea un usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia los archivos necesarios desde el builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Establece los permisos correctos
RUN chown -R nextjs:nodejs /app

# Cambia al usuario no-root
USER nextjs

# Expone el puerto
EXPOSE 3000

# Define variables de entorno
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]

# .dockerignore
.git
.gitignore
.next
node_modules
npm-debug.log
README.md
.env*
.dockerignore
Dockerfile
docker-compose*
*.log