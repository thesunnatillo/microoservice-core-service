git submodule init
git submodule update
cp env.example .env
npm install
npm run typeorm:generate-migration ./migrations/Course
npm run typeorm:run-migrations
npm run lint
npm run build
npm run start