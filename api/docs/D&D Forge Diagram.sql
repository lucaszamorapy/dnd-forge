CREATE TABLE `characters` (
  `characterId` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) COMMENT 'Sir Barik Lindholm',
  `userId` integer,
  `race` varchar(255) COMMENT 'Anão da Montanha',
  `class` varchar(255) COMMENT 'Bárbaro',
  `level` integer COMMENT '1',
  `background` varchar(255) COMMENT 'Nobre',
  `alignment` varchar(255) COMMENT 'Caótico Bom',
  `experience_points` integer COMMENT '0',
  `strength` integer COMMENT '17',
  `dexterity` integer COMMENT '16',
  `constitution` integer COMMENT '12',
  `intelligence` integer COMMENT '10',
  `wisdom` integer COMMENT '11',
  `charisma` integer COMMENT '6',
  `strength_mod` integer COMMENT '+3',
  `dexterity_mod` integer COMMENT '+3',
  `constitution_mod` integer COMMENT '+1',
  `intelligence_mod` integer COMMENT '0',
  `wisdom_mod` integer COMMENT '0',
  `charisma_mod` integer COMMENT '-2',
  `armor_class` integer COMMENT '13',
  `initiative` integer COMMENT '+3',
  `speed` varchar(255) COMMENT '7,5m',
  `hit_points_max` integer COMMENT '16',
  `hit_points_current` integer COMMENT '16',
  `hit_dice` varchar(255) COMMENT 'D12',
  `proficiency_bonus` integer COMMENT '+2',
  `save_strength` integer COMMENT '+5',
  `save_dexterity` integer COMMENT '+5',
  `save_constitution` integer COMMENT '+1',
  `save_intelligence` integer COMMENT '0',
  `save_wisdom` integer COMMENT '0',
  `save_charisma` integer COMMENT '-2',
  `skill_acrobatics` integer COMMENT '+3',
  `skill_arcana` integer COMMENT '0',
  `skill_athletics` integer COMMENT '+5',
  `skill_performance` integer COMMENT '-2',
  `skill_deception` integer COMMENT '-2',
  `skill_stealth` integer COMMENT '+3',
  `skill_history` integer COMMENT '+2',
  `skill_intimidation` integer COMMENT '-2',
  `skill_insight` integer COMMENT '0',
  `skill_investigation` integer COMMENT '0',
  `skill_animal_handling` integer COMMENT '+2',
  `skill_medicine` integer COMMENT '0',
  `skill_nature` integer COMMENT '0',
  `skill_perception` integer COMMENT '+2',
  `skill_persuasion` integer COMMENT '-2',
  `skill_sleight_of_hand` integer COMMENT '+3',
  `skill_religion` integer COMMENT '0',
  `skill_survival` integer COMMENT '0',
  `passive_perception` integer COMMENT '12',
  `age` integer COMMENT '65',
  `height` varchar(255) COMMENT '1,50m',
  `weight` varchar(255) COMMENT '70kg',
  `eyes` varchar(255) COMMENT 'Pretos',
  `skin` varchar(255) COMMENT 'Branco',
  `hair` varchar(255) COMMENT 'Pretos',
  `languages` varchar(255) COMMENT 'Comum, Anão, Élfico',
  `armor_proficiencies` varchar(255) COMMENT 'Armaduras leves, médias e escudos',
  `weapon_proficiencies` varchar(255) COMMENT 'Armas simples, armas marciais',
  `tool_proficiencies` varchar(255) COMMENT 'Cervejaria, Kit de Jogos (UNO)'
);

CREATE TABLE `character_attacks` (
  `attackId` integer PRIMARY KEY AUTO_INCREMENT,
  `characterId` integer,
  `name` varchar(255),
  `bonus` integer,
  `damage` varchar(255),
  `damage_type` varchar(255)
);

CREATE TABLE `character_features` (
  `featureId` integer PRIMARY KEY AUTO_INCREMENT,
  `characterId` integer,
  `feature_name` varchar(255),
  `description` text
);

CREATE TABLE `character_equipment` (
  `equipmentId` integer PRIMARY KEY AUTO_INCREMENT,
  `characterId` integer,
  `item_name` varchar(255),
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
  `invite_code` varchar(255) UNIQUE,
  `title` varchar(255),
  `description` text,
  `world_setting` varchar(255),
  `cover_image` varchar(255),
  `max_players` integer,
  `status` enum(Não Iniciada,Iniciada,Finalizada),
  `created_at` timestamp
);

CREATE TABLE `campaign_characters` (
  `campaignId` integer,
  `characterId` integer,
  `joined_at` timestamp,
  `is_active` boolean DEFAULT true
);

ALTER TABLE `characters` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `character_attacks` ADD FOREIGN KEY (`characterId`) REFERENCES `characters` (`characterId`);

ALTER TABLE `character_features` ADD FOREIGN KEY (`characterId`) REFERENCES `characters` (`characterId`);

ALTER TABLE `character_equipment` ADD FOREIGN KEY (`characterId`) REFERENCES `characters` (`characterId`);

ALTER TABLE `campaigns` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `campaign_characters` ADD FOREIGN KEY (`campaignId`) REFERENCES `campaigns` (`campaignId`);

ALTER TABLE `campaign_characters` ADD FOREIGN KEY (`characterId`) REFERENCES `characters` (`characterId`);
