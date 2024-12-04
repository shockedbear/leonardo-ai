```bash
docker-compose up -d --build
docker-compose exec builder npx prisma db push --force-reset && npx prisma db seed && npx prisma studio
```