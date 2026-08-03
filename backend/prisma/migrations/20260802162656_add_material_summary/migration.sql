-- CreateTable
CREATE TABLE "MaterialSummary" (
    "id" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaterialSummary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaterialSummary_materialId_key" ON "MaterialSummary"("materialId");

-- AddForeignKey
ALTER TABLE "MaterialSummary" ADD CONSTRAINT "MaterialSummary_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material"("id") ON DELETE CASCADE ON UPDATE CASCADE;
