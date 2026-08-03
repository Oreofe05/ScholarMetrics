-- CreateTable
CREATE TABLE "MaterialEmbedding" (
    "id" TEXT NOT NULL,
    "vector" JSONB NOT NULL,
    "materialChunkId" TEXT NOT NULL,

    CONSTRAINT "MaterialEmbedding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaterialEmbedding_materialChunkId_key" ON "MaterialEmbedding"("materialChunkId");

-- AddForeignKey
ALTER TABLE "MaterialEmbedding" ADD CONSTRAINT "MaterialEmbedding_materialChunkId_fkey" FOREIGN KEY ("materialChunkId") REFERENCES "MaterialChunk"("id") ON DELETE CASCADE ON UPDATE CASCADE;
