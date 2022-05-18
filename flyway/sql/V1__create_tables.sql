CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(72) NOT NULL,
  `profile_picture` LONGBLOB,
  `type` ENUM('ADMIN','REGULAR') NOT NULL,
  `date_added` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `id_UNIQUE` (`id`)
);


INSERT INTO `users`(`full_name`,`email`,`password_hash`,`profile_picture`,`type`,`date_added`) VALUES ('alice','alice@gmail.com','alice',NULL,'ADMIN','2021-10-20 00:00:00'),('bob','bob@gmail.com','bob',NULL,'REGULAR','2021-10-22 00:00:00'),('charlie','charlie@gmail.com','charlie',NULL,'REGULAR','2021-10-22 00:00:00'),('david','david@gmail.com','david',NULL,'REGULAR','2021-10-22 00:00:00');

CREATE TABLE `ingredients` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
);


INSERT INTO `ingredients`(`name`) VALUES ('broccoli'), ('tofu');

CREATE TABLE `recipes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `owner_id` INT NOT NULL,
  `instruction` LONGTEXT NOT NULL,
  `image` LONGBLOB,
  `date_added` DATETIME NOT NULL,
  `date_modified` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `owner_FK_idx` (`owner_id`),
  CONSTRAINT `owner_fk` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
);


INSERT INTO `recipes`(`name`,`owner_id`,`instruction`,`image`,`date_added`,`date_modified`) VALUES ('Cooked Tofu',1,'Cook tofu on pan and eat it',NULL,'2021-10-24 00:00:00','2021-10-24 00:00:00'),('Cooked Broccoli',2,'Cook broccoli on pan and ready to eat',NULL,'2021-10-24 00:00:00','2021-10-24 00:00:00');

CREATE TABLE `recipes_ingredients` (
  `recipe_id` INT NOT NULL,
  `ingredient_id` INT NOT NULL,
  PRIMARY KEY (`recipe_id`,`ingredient_id`),
  KEY `ingredient_fk_idx` (`ingredient_id`),
  CONSTRAINT `ingredient_id_m2m_fk` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`),
  CONSTRAINT `recipe_id_m2m_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
);

INSERT INTO `recipes_ingredients` VALUES (1,1),(2,2);

CREATE TABLE `recipe_comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `commentor_id` INT NOT NULL,
  `recipe_id` INT NOT NULL,
  `comment` LONGTEXT NOT NULL,
  `date_added` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `commentor_fk_idx` (`commentor_id`),
  KEY `recipe_fk_idx` (`recipe_id`),
  CONSTRAINT `commentor_fk` FOREIGN KEY (`commentor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `recipe_fk` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`)
);