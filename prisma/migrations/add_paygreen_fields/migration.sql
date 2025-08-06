-- Migration pour ajouter les champs PayGreen à la table Order

-- Ajouter les nouveaux champs
ALTER TABLE "Order" ADD COLUMN "paymentProvider" TEXT NOT NULL DEFAULT 'stripe';
ALTER TABLE "Order" ADD COLUMN "paygreenOrderId" TEXT;

-- Créer un index sur paygreenOrderId pour les recherches rapides
CREATE INDEX "Order_paygreenOrderId_idx" ON "Order"("paygreenOrderId");

-- Créer un index sur paymentProvider pour filtrer par provider
CREATE INDEX "Order_paymentProvider_idx" ON "Order"("paymentProvider");

-- Mettre à jour les commandes existantes pour marquer qu'elles utilisent Stripe
UPDATE "Order" SET "paymentProvider" = 'stripe' WHERE "paymentProvider" IS NULL;
