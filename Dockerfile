# Build stage
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/library/node:22-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN yarn config set registry https://registry.npmmirror.com && \
    yarn install --frozen-lockfile

COPY . .
RUN yarn build

# Production stage
FROM swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/library/nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
