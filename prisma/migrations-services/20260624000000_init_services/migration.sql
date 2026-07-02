-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "services";

-- CreateTable
CREATE TABLE "services"."Service" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "iconKey" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "namePt" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descPt" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,
    "ctaPt" TEXT NOT NULL,
    "ctaEn" TEXT NOT NULL,
    "deliveryPt" TEXT NOT NULL,
    "deliveryEn" TEXT NOT NULL,
    "priceFromBrl" TEXT NOT NULL,
    "priceToBrl" TEXT,
    "priceFromUsd" TEXT NOT NULL,
    "priceToUsd" TEXT,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services"."ServiceFeature" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "textPt" TEXT NOT NULL,
    "textEn" TEXT NOT NULL,

    CONSTRAINT "ServiceFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services"."ProcessStep" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "iconKey" TEXT NOT NULL,
    "titlePt" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descPt" TEXT NOT NULL,
    "descEn" TEXT NOT NULL,

    CONSTRAINT "ProcessStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services"."FaqItem" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "questionPt" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "answerPt" TEXT NOT NULL,
    "answerEn" TEXT NOT NULL,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "services"."Service"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProcessStep_order_key" ON "services"."ProcessStep"("order");

-- AddForeignKey
ALTER TABLE "services"."ServiceFeature" ADD CONSTRAINT "ServiceFeature_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"."Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
