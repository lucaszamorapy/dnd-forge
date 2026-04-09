-- AlterTable
ALTER TABLE `users` MODIFY `image` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Characters` (
    `characterId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `race` VARCHAR(191) NULL,
    `class` VARCHAR(191) NULL,
    `level` INTEGER NULL,
    `background` VARCHAR(191) NULL,
    `alignment` VARCHAR(191) NULL,
    `experiencePoints` INTEGER NULL,
    `strength` INTEGER NULL,
    `dexterity` INTEGER NULL,
    `constitution` INTEGER NULL,
    `intelligence` INTEGER NULL,
    `wisdom` INTEGER NULL,
    `charisma` INTEGER NULL,
    `strengthMod` INTEGER NULL,
    `dexterityMod` INTEGER NULL,
    `constitutionMod` INTEGER NULL,
    `intelligenceMod` INTEGER NULL,
    `wisdomMod` INTEGER NULL,
    `charismaMod` INTEGER NULL,
    `armorClass` INTEGER NULL,
    `initiative` INTEGER NULL,
    `speed` VARCHAR(191) NULL,
    `hitPointsMax` INTEGER NULL,
    `hitPointsCurrent` INTEGER NULL,
    `hitDice` VARCHAR(191) NULL,
    `proficiencyBonus` INTEGER NULL,
    `saveStrength` INTEGER NULL,
    `saveDexterity` INTEGER NULL,
    `saveConstitution` INTEGER NULL,
    `saveIntelligence` INTEGER NULL,
    `saveWisdom` INTEGER NULL,
    `saveCharisma` INTEGER NULL,
    `skillAcrobatics` INTEGER NULL,
    `skillArcana` INTEGER NULL,
    `skillAthletics` INTEGER NULL,
    `skillPerformance` INTEGER NULL,
    `skillDeception` INTEGER NULL,
    `skillStealth` INTEGER NULL,
    `skillHistory` INTEGER NULL,
    `skillIntimidation` INTEGER NULL,
    `skillInsight` INTEGER NULL,
    `skillInvestigation` INTEGER NULL,
    `skillAnimalHandling` INTEGER NULL,
    `skillMedicine` INTEGER NULL,
    `skillNature` INTEGER NULL,
    `skillPerception` INTEGER NULL,
    `skillPersuasion` INTEGER NULL,
    `skillSleightOfHand` INTEGER NULL,
    `skillReligion` INTEGER NULL,
    `skillSurvival` INTEGER NULL,
    `passivePerception` INTEGER NULL,
    `age` INTEGER NULL,
    `height` VARCHAR(191) NULL,
    `weight` VARCHAR(191) NULL,
    `eyes` VARCHAR(191) NULL,
    `skin` VARCHAR(191) NULL,
    `hair` VARCHAR(191) NULL,
    `languages` VARCHAR(191) NULL,
    `armorProficiencies` VARCHAR(191) NULL,
    `weaponProficiencies` VARCHAR(191) NULL,
    `toolProficiencies` VARCHAR(191) NULL,

    PRIMARY KEY (`characterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterAttacks` (
    `attackId` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `bonus` INTEGER NULL,
    `damage` VARCHAR(191) NULL,
    `damageType` VARCHAR(191) NULL,

    PRIMARY KEY (`attackId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterFeatures` (
    `featureId` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NULL,
    `featureName` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`featureId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CharacterEquipment` (
    `equipmentId` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NULL,
    `itemName` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,

    PRIMARY KEY (`equipmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campaigns` (
    `campaignId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `inviteCode` VARCHAR(191) NULL,
    `title` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `worldSetting` VARCHAR(191) NULL,
    `coverImage` VARCHAR(191) NULL,
    `maxPlayers` INTEGER NULL,
    `status` ENUM('Nao_Iniciada', 'Iniciada', 'Finalizada') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Campaigns_inviteCode_key`(`inviteCode`),
    PRIMARY KEY (`campaignId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CampaignCharacters` (
    `campaignId` VARCHAR(191) NOT NULL,
    `characterId` VARCHAR(191) NOT NULL,
    `joinedAt` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`campaignId`, `characterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Characters` ADD CONSTRAINT `Characters_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterAttacks` ADD CONSTRAINT `CharacterAttacks_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Characters`(`characterId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterFeatures` ADD CONSTRAINT `CharacterFeatures_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Characters`(`characterId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CharacterEquipment` ADD CONSTRAINT `CharacterEquipment_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Characters`(`characterId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campaigns` ADD CONSTRAINT `Campaigns_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignCharacters` ADD CONSTRAINT `CampaignCharacters_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaigns`(`campaignId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CampaignCharacters` ADD CONSTRAINT `CampaignCharacters_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `Characters`(`characterId`) ON DELETE RESTRICT ON UPDATE CASCADE;
