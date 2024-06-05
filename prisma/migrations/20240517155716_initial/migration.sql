-- CreateTable
CREATE TABLE `Employer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `post` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Employer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VideoBNCC` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `stage` VARCHAR(191) NOT NULL,
    `curricularComponent` VARCHAR(191) NOT NULL,
    `yearTeaching` INTEGER NOT NULL,
    `axis` JSON NOT NULL,
    `skills` JSON NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VideoBNCC_url_key`(`url`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EmployerToVideoBNCC` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_EmployerToVideoBNCC_AB_unique`(`A`, `B`),
    INDEX `_EmployerToVideoBNCC_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmployerToVideoBNCC` ADD CONSTRAINT `_EmployerToVideoBNCC_A_fkey` FOREIGN KEY (`A`) REFERENCES `Employer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployerToVideoBNCC` ADD CONSTRAINT `_EmployerToVideoBNCC_B_fkey` FOREIGN KEY (`B`) REFERENCES `VideoBNCC`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
