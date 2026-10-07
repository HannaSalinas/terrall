-- CreateEnum
CREATE TYPE "Topic" AS ENUM ('TRANSPORTE', 'TURISMO', 'EDUCACION', 'ECONOMIA');

-- CreateTable
CREATE TABLE "departments" (
    "code" CHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "departments_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "department_topics" (
    "id" SERIAL NOT NULL,
    "department_code" CHAR(2) NOT NULL,
    "topic" "Topic" NOT NULL,
    "description" TEXT NOT NULL,
    "items" TEXT[],
    "main_terminal" TEXT,
    "is_sample" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "department_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tourism_stats" (
    "department_code" CHAR(2) NOT NULL,
    "total" INTEGER NOT NULL,
    "source" TEXT NOT NULL,
    "updated_on" DATE NOT NULL,

    CONSTRAINT "tourism_stats_pkey" PRIMARY KEY ("department_code")
);

-- CreateTable
CREATE TABLE "tourism_categories" (
    "id" SERIAL NOT NULL,
    "department_code" CHAR(2) NOT NULL,
    "category" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "rank" INTEGER NOT NULL,

    CONSTRAINT "tourism_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tourism_venues" (
    "id" SERIAL NOT NULL,
    "department_code" CHAR(2) NOT NULL,
    "name" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "tourism_venues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "population" INTEGER NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_key" ON "departments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "department_topics_department_code_topic_key" ON "department_topics"("department_code", "topic");

-- CreateIndex
CREATE UNIQUE INDEX "tourism_categories_department_code_rank_key" ON "tourism_categories"("department_code", "rank");

-- CreateIndex
CREATE INDEX "tourism_venues_department_code_idx" ON "tourism_venues"("department_code");

-- CreateIndex
CREATE UNIQUE INDEX "cities_name_key" ON "cities"("name");

-- AddForeignKey
ALTER TABLE "department_topics" ADD CONSTRAINT "department_topics_department_code_fkey" FOREIGN KEY ("department_code") REFERENCES "departments"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourism_stats" ADD CONSTRAINT "tourism_stats_department_code_fkey" FOREIGN KEY ("department_code") REFERENCES "departments"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourism_categories" ADD CONSTRAINT "tourism_categories_department_code_fkey" FOREIGN KEY ("department_code") REFERENCES "tourism_stats"("department_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tourism_venues" ADD CONSTRAINT "tourism_venues_department_code_fkey" FOREIGN KEY ("department_code") REFERENCES "departments"("code") ON DELETE CASCADE ON UPDATE CASCADE;
