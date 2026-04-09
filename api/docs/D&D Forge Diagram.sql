CREATE TABLE `characters` (
  `characterId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) COMMENT 'Sir Barik Lindholm',
  `userId` integer,
  `race` varchar(255) COMMENT 'Anão da Montanha',
  `class` varchar(255) COMMENT 'Bárbaro',
  `level` integer COMMENT '1',
  `background` varchar(255) COMMENT 'Nobre',
  `alignment` varchar(255) COMMENT 'Caótico Bom',
  `experiencePoints` integer COMMENT '0',
  `strength` integer COMMENT '17',
  `dexterity` integer COMMENT '16',
  `constitution` integer COMMENT '12',
  `intelligence` integer COMMENT '10',
  `wisdom` integer COMMENT '11',
  `charisma` integer COMMENT '6',
  `strengthMod` integer COMMENT '+3',
  `dexterityMod` integer COMMENT '+3',
  `constitutionMod` integer COMMENT '+1',
  `intelligenceMod` integer COMMENT '0',
  `wisdomMod` integer COMMENT '0',
  `charismaMod` integer COMMENT '-2',
  `armorClass` integer COMMENT '13',
  `initiative` integer COMMENT '+3',
  `speed` varchar(255) COMMENT '7,5m',
  `hitPointsMax` integer COMMENT '16',
  `hitPointsCurrent` integer COMMENT '16',
  `hitDice` varchar(255) COMMENT 'D12',
  `proficiencyBonus` integer COMMENT '+2',
  `saveStrength` integer COMMENT '+5',
  `saveDexterity` integer COMMENT '+5',
  `saveConstitution` integer COMMENT '+1',
  `saveIntelligence` integer COMMENT '0',
  `saveWisdom` integer COMMENT '0',
  `saveCharisma` integer COMMENT '-2',
  `skillAcrobatics` integer COMMENT '+3',
  `skillArcana` integer COMMENT '0',
  `skillAthletics` integer COMMENT '+5',
  `skillPerformance` integer COMMENT '-2',
  `skillDeception` integer COMMENT '-2',
  `skillStealth` integer COMMENT '+3',
  `skillHistory` integer COMMENT '+2',
  `skillIntimidation` integer COMMENT '-2',
  `skillInsight` integer COMMENT '0',
  `skillInvestigation` integer COMMENT '0',
  `skillAnimalHandling` integer COMMENT '+2',
  `skillMedicine` integer COMMENT '0',
  `skillNature` integer COMMENT '0',
  `skillPerception` integer COMMENT '+2',
  `skillPersuasion` integer COMMENT '-2',
  `skillSleightOfHand` integer COMMENT '+3',
  `skillReligion` integer COMMENT '0',
  `skillSurvival` integer COMMENT '0',
  `passivePerception` integer COMMENT '12',
  `age` integer COMMENT '65',
  `height` varchar(255) COMMENT '1,50m',
  `weight` varchar(255) COMMENT '70kg',
  `eyes` varchar(255) COMMENT 'Pretos',
  `skin` varchar(255) COMMENT 'Branco',
  `hair` varchar(255) COMMENT 'Pretos',
  `languages` varchar(255) COMMENT 'Comum, Anão, Élfico',
  `armorProficiencies` varchar(255) COMMENT 'Armaduras leves, médias e escudos',
  `weaponProficiencies` varchar(255) COMMENT 'Armas simples, armas marciais',
  `toolProficiencies` varchar(255) COMMENT 'Cervejaria, Kit de Jogos (UNO)'
);

CREATE TABLE `characterAttacks` (
  `attackId` integer PRIMARY KEY AUTO_INCREMENT,
  `characterId` integer,
  `name` varchar(255),
  `bonus` integer,
  `damage` varchar(255),
  `damageType` varchar(255)
);

CREATE TABLE `characterFeatures` (
  `featureId` integer PRIMARY KEY AUTO_INCREMENT,
  `characterId` integer,
  `featureName` varchar(255),
  `description` text
);

CREATE TABLE `characterEquipment` (
  `equipmentId` integer PRIMARY KEY AUTO_INCREMENT,
  `characterId` integer,
  `itemName` varchar(255),
  `quantity` integer
);

CREATE TABLE `users` (
  `userId` integer PRIMARY KEY,
  `name` varchar(255),
  `email` varchar(255),
  `image` varchar(255),
  `password` varchar(255),
  `createdAt` datetime,
  `updatedAt` datetime
);

CREATE TABLE `campaigns` (
  `campaignId` integer PRIMARY KEY,
  `userId` integer,
  `inviteCode` varchar(255) UNIQUE,
  `title` varchar(255),
  `description` text,
  `worldSetting` varchar(255),
  `coverImage` varchar(255),
  `maxPlayers` integer,
  `status` enum('Não Iniciada','Iniciada','Finalizada'),
  `createdAt` timestamp
);

CREATE TABLE `campaignCharacters` (
  `campaignId` integer,
  `characterId` integer,
  `joinedAt` timestamp,
  `isActive` boolean DEFAULT true
);

ALTER TABLE `characters` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `characterAttacks` ADD FOREIGN KEY (`characterId`) REFERENCES `characters` (`characterId`);

ALTER TABLE `characterFeatures` ADD FOREIGN KEY (`characterId`) REFERENCES `characters` (`characterId`);

ALTER TABLE `characterEquipment` ADD FOREIGN KEY (`characterId`) REFERENCES `characters` (`characterId`);

ALTER TABLE `campaigns` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `campaignCharacters` ADD FOREIGN KEY (`campaignId`) REFERENCES `campaigns` (`campaignId`);

ALTER TABLE `campaignCharacters` ADD FOREIGN KEY (`characterId`) REFERENCES `characters` (`characterId`);